/**
 * Host half of @gsnowdrift/dsh-java-ops.
 *
 * Owns everything that needs a real process: Spring Boot discovery, per-workspace
 * service records, build/start/stop/restart, readiness polling and log capture.
 * The Web panel talks to it through one authenticated `/api` fetch route, and the
 * agent talks to it through the `java_ops_*` tools; both call the same functions.
 *
 * @module @gsnowdrift/dsh-java-ops
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { homedir } from 'node:os'
import { dirname, join, resolve, relative, sep } from 'node:path'
import { connect } from 'node:net'

export const name = '@gsnowdrift/dsh-java-ops'

export const inject = ['connection', 'tools', 'sessions', 'subprocess']

const ROUTE = '/api/java-ops'
const MAX_LOG_LINES = 5000
// one logs reply is paged so the panel never waits on a full buffer
const LOG_PAGE = 400
const READY_TIMEOUT_MS = 120_000
const STOP_GRACE_MS = 30_000
const SKIP_DIRS = new Set(['node_modules', 'target', 'build', '.git', '.idea', 'out', '.gradle'])

/** Profile directory this process runs in. */
function profileDirectory() {
  if (process.env.DSH_PROFILE_DIR) return process.env.DSH_PROFILE_DIR
  const home = process.env.DSH_HOME ?? join(homedir(), '.dsh')
  return join(home, 'profiles', process.env.DSH_PROFILE ?? 'desktop')
}

const STATE_FILE = join(profileDirectory(), 'plugin-data', 'java-ops.json')

/** `{ workspaces: { [root]: { services: Service[], buildEnabled: boolean } }, seq }` */
function readDb() {
  try {
    const raw = JSON.parse(readFileSync(STATE_FILE, 'utf8'))
    if (raw && typeof raw.workspaces === 'object' && raw.workspaces !== null) {
      seedLegacySql(raw)
      return raw
    }
  } catch {
    /* missing or partially written file means "nothing saved yet" */
  }
  return { workspaces: {}, seq: 0 }
}

/**
 * One-time migration: connections and the SQL audit trail used to be global. Copy
 * them into every workspace that does not have its own list yet, then drop the
 * globals so a later deletion in one workspace cannot resurrect in another.
 */
function seedLegacySql(db) {
  const legacyConnections = Array.isArray(db.sqlConnections) ? db.sqlConnections : null
  const legacyLog = Array.isArray(db.sqlLog) ? db.sqlLog : null
  if (!legacyConnections && !legacyLog) return
  const roots = Object.keys(db.workspaces ?? {})
  if (roots.length === 0) return
  for (const root of roots) {
    const state = db.workspaces[root]
    if (!state || typeof state !== 'object') continue
    if (!Array.isArray(state.sqlConnections) && legacyConnections) {
      state.sqlConnections = legacyConnections.map((item) => ({ ...item }))
    }
    if (!Array.isArray(state.sqlLog) && legacyLog) {
      state.sqlLog = legacyLog.map((item) => ({ ...item }))
    }
  }
  delete db.sqlConnections
  delete db.sqlLog
  try {
    writeDb(db)
  } catch {
    /* read-only profile: keep serving from memory, the next write persists it */
  }
}

/**
 * SQL connections and their audit trail belong to one workspace now. Older files
 * stored both at the top level; those copies are seeded into each workspace the
 * first time it is read, so nothing disappears and later edits stay separate.
 */
function sqlConnections(db, root) {
  const state = workspaceState(db, root)
  if (!Array.isArray(state.sqlConnections)) {
    state.sqlConnections = Array.isArray(db.sqlConnections) ? db.sqlConnections.map((item) => ({ ...item })) : []
  }
  return state.sqlConnections
}

function sqlLogOf(db, root) {
  const state = workspaceState(db, root)
  if (!Array.isArray(state.sqlLog)) {
    state.sqlLog = Array.isArray(db.sqlLog) ? db.sqlLog.map((item) => ({ ...item })) : []
  }
  return state.sqlLog
}

/** Passwords never enter the JSON file; the credentials service holds them by ref. */
function sqlPasswordRef(root, id) {
  // env-var shaped name: the credentials provider accepts these for plugin-owned refs.
  // The workspace is hashed into the ref so two projects can hold different passwords
  // for connections that happen to share an id after a migration.
  const scope = createHash('sha1').update(String(root ?? '')).digest('hex').slice(0, 8)
  return `JAVA_OPS_SQL_${scope}_${String(id).toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`
}

function credentialsOf(ctx) {
  const service = typeof ctx.get === 'function' ? ctx.get('credentials') : ctx.credentials
  return service ?? undefined
}

function publicSqlConnection(record) {
  const { passwordRef, ...rest } = record
  return rest
}

async function saveSqlConnection(ctx, root, input) {
  const db = readDb()
  const list = sqlConnections(db, root)
  const id = typeof input.id === 'string' && input.id !== '' ? input.id : `sql-${++db.seq}`
  const index = list.findIndex((item) => item.id === id)
  const base = index >= 0 ? list[index] : {}
  const record = {
    id,
    name: (typeof input.name === 'string' && input.name.trim() !== '' ? input.name.trim() : base.name) ?? id,
    driver: String(input.driver ?? base.driver ?? 'mysql').trim() || 'mysql',
    host: String(input.host ?? base.host ?? '').trim(),
    port: Number(input.port ?? base.port) || 3306,
    database: String(input.database ?? base.database ?? '').trim(),
    user: String(input.user ?? base.user ?? '').trim(),
    passwordRef: base.passwordRef ?? sqlPasswordRef(root, id),
    hasPassword: Boolean(base.hasPassword),
  }
  if (record.host === '') throw new Error('host is required')
  const password = typeof input.password === 'string' ? input.password : ''
  if (password !== '') {
    const creds = credentialsOf(ctx)
    if (!creds) throw new Error('credentials service is not available, the password cannot be stored')
    await creds.set(record.passwordRef, password)
    record.hasPassword = true
  } else if (input.clearPassword === true) {
    const creds = credentialsOf(ctx)
    if (creds) await creds.unset(record.passwordRef)
    record.hasPassword = false
  }
  if (index >= 0) list[index] = record
  else list.push(record)
  writeDb(db)
  return { ok: true, id, hasPassword: record.hasPassword }
}

async function removeSqlConnection(ctx, root, id) {
  const db = readDb()
  const list = sqlConnections(db, root)
  const index = list.findIndex((item) => item.id === id)
  if (index < 0) return { ok: true, removed: false }
  const [record] = list.splice(index, 1)
  // a migrated record can be referenced by another workspace; only drop the secret
  // when nobody else still points at the same reference
  const stillUsed = Object.values(db.workspaces ?? {}).some((state) =>
    (state?.sqlConnections ?? []).some((item) => item.passwordRef && item.passwordRef === record.passwordRef))
  const creds = credentialsOf(ctx)
  if (creds && record.passwordRef && !stillUsed) await creds.unset(record.passwordRef)
  writeDb(db)
  return { ok: true, removed: true }
}

/** Reachability only: a real login check needs a driver, which this plugin does not ship yet. */
function probeTcp(host, port, timeoutMs = 3_000) {
  return new Promise((resolveP) => {
    const started = Date.now()
    const socket = connect({ host, port })
    const done = (result) => {
      socket.removeAllListeners()
      socket.destroy()
      resolveP(result)
    }
    socket.setTimeout(timeoutMs)
    socket.once('connect', () => done({ ok: true, ms: Date.now() - started }))
    socket.once('timeout', () => done({ ok: false, error: `timed out after ${timeoutMs}ms` }))
    socket.once('error', (error) => done({ ok: false, error: error.message }))
  })
}

async function testSqlConnection(input) {
  const host = String(input.host ?? '').trim()
  const port = Number(input.port) || 3306
  if (host === '') throw new Error('host is required')
  const result = await probeTcp(host, port)
  return { ...result, host, port }
}

/* ------------------------------------------------------------- sql 执行 */

const SQL_TIMEOUT_MS = 10_000
const SQL_MAX_ROWS = 500
/** SQL 执行流水保留 3 天；条数上限只是防失控，正常用量一天到不了这个数。 */
const SQL_LOG_DAYS = 3
const SQL_LOG_LIMIT = 2000
const SQL_LOG_WINDOW = SQL_LOG_DAYS * 24 * 60 * 60 * 1000

function freshSqlLog(list) {
  const since = Date.now() - SQL_LOG_WINDOW
  return (list ?? []).filter((item) => typeof item?.time === 'number' && item.time >= since)
}

/** 分组决定用哪个权限开关：读 = 查询，写 = 改数据/结构，删 = 删数据/删表。 */
function sqlGroupOf(statement) {
  const head = statement.replace(/^[\s(]+/, '').toLowerCase()
  if (/^(select|show|desc|describe|explain|with)\b/.test(head)) return 'read'
  if (/^(delete|truncate|drop)\b/.test(head)) return 'delete'
  return 'write'
}

/**
 * 引号里的 "where"（例如 note='no-where'）和注释都不算 WHERE 子句，
 * 否则一句整表更新就能绕过拦截。
 */
function stripSqlNoise(statement) {
  return statement
    .replace(/'(?:[^'\\]|\\.|'')*'/g, "''")
    .replace(/"(?:[^"\\]|\\.|"")*"/g, '""')
    .replace(/--[^\n]*/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
}

/** UPDATE/DELETE 不带 WHERE 一律拦下，避免整表被改。 */
function unscopedWrite(statement, group) {
  if (group === 'read') return false
  const bare = stripSqlNoise(statement)
  const head = bare.replace(/^[\s(]+/, '').toLowerCase()
  if (!/^(update|delete)\b/.test(head)) return false
  return !/\bwhere\b/i.test(bare)
}

/**
 * 每个引擎一个适配器。mysql/pg 是纯 JS 依赖；没有适配器的库（Oracle、SQLServer、
 * 达梦、金仓）走 JDBC 桥，不需要为了一个库再装一个原生驱动。
 */
const SQL_DRIVERS = {
  async mysql(connection, password, statement) {
    let module
    try {
      module = await import('mysql2/promise')
    } catch {
      throw new Error('mysql 驱动未安装，请在插件目录执行 npm install mysql2')
    }
    const link = await module.createConnection({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      password,
      database: connection.database || undefined,
      connectTimeout: 5_000,
      multipleStatements: false,
      dateStrings: true,
    })
    try {
      const [result, fields] = await link.query({ sql: statement, timeout: SQL_TIMEOUT_MS })
      if (Array.isArray(result)) {
        const rows = result.slice(0, SQL_MAX_ROWS).map((row) => (fields ?? []).map((field) => row[field.name]))
        return {
          columns: (fields ?? []).map((field) => field.name),
          rows,
          truncated: result.length > rows.length,
        }
      }
      return { columns: [], rows: [], affected: result.affectedRows ?? 0, truncated: false }
    } finally {
      await link.end().catch(() => {})
    }
  },
}

function resolveSqlConnection(db, root, payload) {
  const wanted = String(payload.connection ?? payload.id ?? '').trim()
  const list = sqlConnections(db, root)
  if (list.length === 0) throw new Error('还没有配置数据库连接')
  const found = wanted === ''
    ? list[0]
    : list.find((item) => item.id === wanted || item.name === wanted)
  if (!found) throw new Error(`unknown database connection: ${wanted}`)
  return found
}

async function sqlPasswordOf(ctx, connection) {
  const creds = credentialsOf(ctx)
  if (!creds) throw new Error('credentials service is not available, the password cannot be read')
  const resolved = await creds.resolve(connection.passwordRef)
  if (!resolved?.value) throw new Error('这个连接还没有保存密码')
  return resolved.value
}

/** confirm 开关打开时走 DSH 原生确认框；拿不到回答就当作拒绝。 */
async function confirmSql(ctx, connection, statement, group, agent) {
  const service = typeof ctx.get === 'function' ? ctx.get('userQuestions') : ctx.userQuestions
  if (!service) throw new Error('确认框不可用（userQuestions 服务缺失），已阻止执行')
  const answer = await service.ask({
    ...(agent ? { agent } : {}),
    questions: [
      {
        id: 'sql-confirm',
        header: 'SQL 执行确认',
        question: `在 ${connection.name} 上执行这条 ${group} 语句？`,
        detail: statement,
        // 不用 approval 意图：approval 走会话审批策略，策略为 never 时会被直接放行，
        // 这里要的是无论如何都拦到人，所以只用普通选项让 answerer 弹卡片
        options: [{ label: '执行' }, { label: '取消' }],
      },
    ],
  })
  const chosen = answer?.answers?.find((item) => item.id === 'sql-confirm')
  const selected = chosen?.selected ?? []
  if (!selected.includes('执行')) throw new Error('用户取消了这次 SQL 执行')
  // 审计：确认框到底给了什么回答，落进执行记录一眼能看出来
  return { confirmed: selected.join(','), custom: chosen?.custom }
}

/** 每个工作区各留一份执行流水，落盘：插件重载/重启后历史还在。 */
function rejectSql(root, group, statement, message) {
  pushSqlLog(root, { time: Date.now(), op: group, sql: statement, ok: false, ms: 0, error: message })
  throw new Error(message)
}

function pushSqlLog(root, entry) {
  const db = readDb()
  const log = sqlLogOf(db, root)
  const merged = [entry, ...freshSqlLog(log)].slice(0, SQL_LOG_LIMIT)
  workspaceState(db, root).sqlLog = merged
  writeDb(db)
}

async function runSql(ctx, root, payload, agent) {
  const statement = String(payload.sql ?? '').trim().replace(/;\s*$/, '')
  if (statement === '') throw new Error('sql is required')
  if (statement.includes(';')) throw new Error('一次只能执行一条语句')
  const db = readDb()
  const connection = resolveSqlConnection(db, root, payload)
  const state = workspaceState(db, root)
  const group = sqlGroupOf(statement)
  const perm = normalizeSqlPerms(state.sqlPerms)[group]
  let confirmed
  if (!perm.allow) rejectSql(root, group, statement, `${group} 权限未开启，请先在设置页打开`)
  if (unscopedWrite(statement, group)) rejectSql(root, group, statement, 'UPDATE/DELETE 必须带 WHERE，已阻止执行')
  if (perm.confirm) {
    try {
      confirmed = await confirmSql(ctx, connection, statement, group, agent)
    } catch (error) {
      rejectSql(root, group, statement, error.message)
    }
  }
  const driver = SQL_DRIVERS[connection.driver ?? 'mysql']
  if (!driver) throw new Error(`暂不支持的数据库类型：${connection.driver}`)
  const password = await sqlPasswordOf(ctx, connection)
  const started = Date.now()
  const entry = { time: Date.now(), op: group, sql: statement, ok: false, ms: 0, affected: undefined }
  try {
    const result = await driver(connection, password, statement)
    entry.ok = true
    entry.ms = Date.now() - started
    entry.affected = result.affected
    if (confirmed) entry.confirmed = confirmed.confirmed
    pushSqlLog(root, entry)
    return {
      ok: true,
      connection: { id: connection.id, name: connection.name, database: connection.database },
      columns: result.columns,
      rows: result.rows,
      rowCount: result.rows.length,
      affected: result.affected,
      truncated: result.truncated,
      ms: entry.ms,
    }
  } catch (error) {
    entry.ms = Date.now() - started
    entry.error = error.message
    pushSqlLog(root, entry)
    throw error
  }
}

function writeDb(db) {
  mkdirSync(dirname(STATE_FILE), { recursive: true })
  writeFileSync(STATE_FILE, JSON.stringify(db, null, 2))
}

/** Runtime state is process-owned: it cannot survive a restart. */
const runtimes = new Map()

function runtimeOf(id) {
  let runtime = runtimes.get(id)
  if (!runtime) {
    runtime = {
      handle: undefined,
      status: 'stopped',
      pid: undefined,
      startedAt: undefined,
      exitCode: undefined,
      lastError: undefined,
      logLines: [],
      logEpoch: 0,
      stdoutOffset: 0,
      stderrOffset: 0,
      pump: undefined,
      busy: false,
    }
    runtimes.set(id, runtime)
  }
  return runtime
}

const ANSI = /\u001b\[[0-9;?]*[A-Za-z]/g

function recordLog(runtime, text) {
  if (!text) return
  const lines = text.split(/\r?\n/)
  for (const line of lines) {
    if (line === '' && lines.length > 1) continue
    runtime.logLines.push(line.replace(ANSI, ''))
  }
  if (runtime.logLines.length > MAX_LOG_LINES) {
    runtime.logLines.splice(0, runtime.logLines.length - MAX_LOG_LINES)
  }
}

/** Clearing the buffer bumps the epoch so clients can drop their stale offset. */
function resetLogs(runtime) {
  if (runtime.logLines.length > 0 || runtime.logEpoch > 0) runtime.logEpoch += 1
  runtime.logLines = []
}

function drainLogs(live) {
  if (!live.collected) return
  for (const stream of ['stdout', 'stderr']) {
    const reader = live.collected[stream]
    if (!reader) continue
    const key = stream === 'stdout' ? 'stdoutOffset' : 'stderrOffset'
    try {
      const read = reader.readFrom(live[key])
      live[key] = read.nextOffset
      recordLog(live.runtime, read.text)
    } catch {
      /* reader unavailable after exit */
    }
  }
}

/**
 * Terminal output arrives as one byte stream: ANSI escapes, CRLF, and sometimes
 * a line that only completes in the next chunk. Buffer the tail so a half line
 * never becomes its own log row.
 */
function pumpTerminal(runtime, terminal) {
  let pending = ''
  // a Windows console ends every line with CRLF; the CR is console noise, not content
  const emit = (text) => recordLog(runtime, text.replace(/\r+$/, ''))
  terminal.output.setEncoding('utf8')
  terminal.output.on('data', (chunk) => {
    pending += chunk
    const cut = pending.lastIndexOf('\n')
    if (cut < 0) {
      if (pending.length > 8192) {
        emit(pending)
        pending = ''
      }
      return
    }
    recordLog(runtime, pending.slice(0, cut).split('\n').map((line) => line.replace(/\r+$/, '')).join('\n'))
    pending = pending.slice(cut + 1)
  })
  terminal.done.then(
    () => {
      if (pending) emit(pending)
      pending = ''
    },
    () => {
      if (pending) emit(pending)
      pending = ''
    },
  )
}

function stopPump(runtime) {
  if (runtime.pump) {
    clearInterval(runtime.pump)
    runtime.pump = undefined
  }
}

/* ---------------------------------------------------------------- discovery */

function walkJavaFiles(root, budget = 4000) {
  const out = []
  const stack = [root]
  while (stack.length > 0 && out.length < budget) {
    const dir = stack.pop()
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') && entry.name !== '.') continue
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue
        stack.push(full)
      } else if (entry.isFile() && entry.name.endsWith('.java')) {
        out.push(full)
      }
      if (out.length >= budget) break
    }
  }
  return out
}

function nearestModuleDir(root, file) {
  let dir = dirname(file)
  const stop = resolve(root)
  while (true) {
    if (existsSync(join(dir, 'pom.xml')) || existsSync(join(dir, 'build.gradle'))) return dir
    if (resolve(dir) === stop) return undefined
    const parent = dirname(dir)
    if (parent === dir) return undefined
    dir = parent
  }
}

function javaSourceFacts(file) {
  let text
  try {
    text = readFileSync(file, 'utf8')
  } catch {
    return undefined
  }
  const boot = /@SpringBootApplication|@EnableAutoConfiguration/.test(text)
  if (!boot && !/\bstatic\s+void\s+main\s*\(/.test(text)) return undefined
  const pkg = /^\s*package\s+([\w.]+)\s*;/m.exec(text)?.[1]
  const cls = /(?:class|interface)\s+(\w+)/.exec(text)?.[1]
  if (!cls) return undefined
  return { boot, mainClass: pkg ? `${pkg}.${cls}` : cls }
}

function yamlFacts(moduleDir) {
  const facts = { port: undefined, contextPath: undefined, profile: undefined }
  const resources = join(moduleDir, 'src', 'main', 'resources')
  for (const fileName of ['application.yml', 'application.yaml', 'application.properties']) {
    const file = join(resources, fileName)
    if (!existsSync(file)) continue
    let text
    try {
      text = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    const port =
      /^\s{0,4}server:\s*(?:\n[\s\S]*?)?^\s{2,6}port:\s*(\d+)/m.exec(text)?.[1] ??
      /^\s*port:\s*(\d+)/m.exec(text)?.[1] ??
      /^server\.port\s*=\s*(\d+)/m.exec(text)?.[1]
    if (port && facts.port === undefined) facts.port = Number(port)
    const ctx =
      /context-path:\s*([^\s#]+)/.exec(text)?.[1] ?? /context_path\s*=\s*([^\s#]+)/.exec(text)?.[1]
    if (ctx && facts.contextPath === undefined) facts.contextPath = ctx
    const prof = /^\s{2,6}profiles:\s*(?:\n[\s\S]*?)?^\s{4,8}active:\s*([\w.-]+)/m.exec(text)?.[1]
    if (prof && facts.profile === undefined) facts.profile = prof
  }
  return facts
}

function scanProject(root) {
  const candidates = []
  const seen = new Set()
  for (const file of walkJavaFiles(root)) {
    const facts = javaSourceFacts(file)
    if (!facts || !facts.boot) continue
    const moduleDir = nearestModuleDir(root, file)
    if (!moduleDir) continue
    const key = `${moduleDir}#${facts.mainClass}`
    if (seen.has(key)) continue
    seen.add(key)
    const relModule = relative(root, moduleDir).split(sep).join('/')
    const yml = yamlFacts(moduleDir)
    candidates.push({
      moduleDir: relModule === '' ? '.' : relModule,
      mainClass: facts.mainClass,
      port: yml.port,
      contextPath: yml.contextPath,
      profile: yml.profile,
      suggestedName: facts.mainClass.split('.').pop() || relModule,
    })
  }
  candidates.sort((a, b) => a.moduleDir.localeCompare(b.moduleDir))
  return candidates
}

/* ------------------------------------------------------------- sql 授权 */

// 读 = SELECT；写 = INSERT/UPDATE/ALTER/CREATE 等改数据或结构；删 = DELETE/DROP/TRUNCATE
const DEFAULT_SQL_PERMS = {
  read: { allow: true, confirm: false },
  write: { allow: false, confirm: false },
  delete: { allow: false, confirm: false },
}

function normalizeSqlPerms(input) {
  const merged = {}
  for (const key of Object.keys(DEFAULT_SQL_PERMS)) {
    const base = DEFAULT_SQL_PERMS[key]
    const given = input?.[key] ?? {}
    // 高风险提醒只在允许执行时才有意义
    const allow = typeof given.allow === 'boolean' ? given.allow : base.allow
    merged[key] = { allow, confirm: allow && (typeof given.confirm === 'boolean' ? given.confirm : base.confirm) }
  }
  return merged
}

/* ------------------------------------------------------------- service CRUD */

function workspaceState(db, root) {
  if (!db.workspaces[root]) db.workspaces[root] = { services: [], buildEnabled: true }
  return db.workspaces[root]
}

function publicService(db, root, service) {
  const runtime = runtimeOf(service.id)
  return {
    id: service.id,
    name: service.name,
    moduleDir: service.moduleDir,
    mainClass: service.mainClass,
    port: service.port,
    contextPath: service.contextPath,
    profile: service.profile ?? '',
    vmArgs: service.vmArgs ?? '',
    env: service.env ?? {},
    readyUrl: service.readyUrl ?? '',
    buildEnabled: service.buildEnabled !== false,
    status: runtime.status,
    pid: runtime.pid,
    startedAt: runtime.startedAt,
    build: runtime.lastBuild,
    buildErrors: runtime.lastBuildErrors ?? [],
    startup: runtime.lastStartup,
    exitCode: runtime.exitCode,
    lastError: runtime.lastError,
  }
}

/**
 * Panel root: always the session's own workspace. Falling back to another
 * registered workspace used to "look nicer" but leaked one project's services
 * (and edits) into a session opened elsewhere, which is exactly what workspace
 * isolation must prevent. Only a session-less call (no cwd at all) falls back.
 */
function panelRoot(ctx, sessionId) {
  const sessionRoot = workspaceFromSession(ctx, sessionId)
  if (sessionRoot) return sessionRoot
  const db = readDb()
  let chosen
  for (const [root, state] of Object.entries(db.workspaces ?? {})) {
    if ((state?.services?.length ?? 0) > 0) chosen = root
  }
  return chosen
}

function viewState(root, extra = {}) {
  const db = readDb()
  const state = workspaceState(db, root)
  const services = state.services.map((service) => publicService(db, root, service))
  return {
    workspace: root,
    buildEnabled: state.buildEnabled !== false,
    sqlPerms: normalizeSqlPerms(state.sqlPerms),
    services,
    activities: activities.get(root) ?? [],
    sqlLog: freshSqlLog(sqlLogOf(db, root)),
    sqlConnections: sqlConnections(db, root).map(publicSqlConnection),
    ...extra,
  }
}

function saveService(root, input) {
  const db = readDb()
  const state = workspaceState(db, root)
  const id = typeof input.id === 'string' && input.id !== '' ? input.id : `svc-${++db.seq}`
  const existing = state.services.findIndex((service) => service.id === id)
  const base = existing >= 0 ? state.services[existing] : {}
  // partial update: fields missing from the payload keep their stored value
  const record = {
    id,
    root,
    name: (typeof input.name === 'string' && input.name.trim() !== '' ? input.name.trim() : base.name) ?? id,
    moduleDir: String(input.moduleDir ?? base.moduleDir ?? '.'),
    mainClass: String(input.mainClass ?? base.mainClass ?? ''),
    port: Number(input.port ?? base.port) || 0,
    contextPath: input.contextPath ?? base.contextPath ?? '',
    profile: input.profile ?? base.profile ?? '',
    vmArgs: input.vmArgs ?? base.vmArgs ?? '',
    env: input.env && typeof input.env === 'object' ? input.env : base.env ?? {},
    readyUrl: input.readyUrl ?? base.readyUrl ?? '',
    pid: base.pid,
    buildEnabled: (typeof input.buildEnabled === 'boolean' ? input.buildEnabled : base.buildEnabled) !== false,
  }
  if (!record.mainClass) throw new Error('mainClass is required')
  if (!Number.isInteger(record.port) || record.port <= 0) throw new Error('port is required')
  if (existing >= 0) state.services[existing] = record
  else state.services.push(record)
  writeDb(db)
  return record
}

/**
 * Record the pid of a started JVM in the service row, so a plugin reload can
 * re-attach to it instead of leaving an orphan that holds the port.
 */
function markServicePid(service, pid) {
  try {
    const db = readDb()
    const record = db.workspaces?.[service.root]?.services?.find((item) => item.id === service.id)
    if (!record) return
    if (record.pid === pid) return
    if (pid === undefined) delete record.pid
    else record.pid = pid
    writeDb(db)
  } catch {
    /* a bookkeeping failure must never abort a start or stop */
  }
}

/**
 * A plugin reload drops our subprocess handles but not the JVMs themselves.
 * Re-attach the ones whose recorded pid still owns the port, so the panel keeps
 * listing them as running and stop can still reach them.
 */
async function adoptRunning(ctx) {
  for (const workspace of Object.values(readDb().workspaces ?? {})) {
    for (const service of workspace?.services ?? []) {
      const runtime = runtimeOf(service.id)
      if (runtime.handle || runtime.status === 'running' || !service.pid) continue
      const pid = await pidByPort(ctx, service.port)
      if (pid !== service.pid) continue
      runtime.status = 'running'
      runtime.pid = pid
      runtime.adopted = true
      recordLog(runtime, `[java-ops] adopted pid ${pid} after a plugin reload; earlier log lines are gone`)
    }
  }
}

function findService(root, id) {
  const db = readDb()
  const service = workspaceState(db, root).services.find((item) => item.id === id)
  if (!service) throw new Error(`unknown service: ${id}`)
  return service
}

function removeService(root, id) {
  const db = readDb()
  const state = workspaceState(db, root)
  const runtime = runtimes.get(id)
  if (runtime && runtime.handle && runtime.status === 'running') throw new Error('stop the service first')
  state.services = state.services.filter((service) => service.id !== id)
  writeDb(db)
  stopPump(runtime ?? {})
  runtimes.delete(id)
}

/* ------------------------------------------------------------- build & run */

function toolPath(root, moduleDir) {
  const module = moduleDir === '.' ? '' : moduleDir
  return module === '' ? '' : module
}

async function mavenInvocation(ctx, root, cwd) {
  const wrapper = process.platform === 'win32' ? 'mvnw.cmd' : 'mvnw'
  if (existsSync(join(root, wrapper))) return { argv: [join(root, wrapper)], env: {} }
  const home = bundledMavenHome()
  if (home) {
    // launching maven's launcher directly beats quoting a .cmd wrapper with spaces in its path
    const plexus = readdirSync(join(home, 'boot')).find((name) => /^plexus-classworlds-.*\.jar$/.test(name))
    if (plexus) {
      const java = await ctx.subprocess.resolveExecutable('java')
      return {
        argv: [
          java,
          '-classpath',
          join(home, 'boot', plexus),
          `-Dclassworlds.conf=${join(home, 'bin', 'm2.conf')}`,
          `-Dmaven.home=${home}`,
          `-Dmaven.multiModuleProjectDirectory=${cwd}`,
          'org.codehaus.plexus.classworlds.launcher.Launcher',
        ],
        env: { MAVEN_HOME: home, M2_HOME: home },
      }
    }
  }
  try {
    return { argv: [await ctx.subprocess.resolveExecutable('mvn')], env: {} }
  } catch {
    throw new Error('maven not found: add a mvnw wrapper to the project or install maven')
  }
}

/** IntelliJ ships a full Maven distribution; reuse it when the host has none. */
function bundledMavenHome() {
  const roots = [process.env.MAVEN_HOME, process.env.M2_HOME]
  if (process.platform === 'win32') {
    roots.push(
      join(process.env.ProgramFiles ?? 'C:\\Program Files', 'JetBrains'),
      join(process.env.LOCALAPPDATA ?? '', 'Programs'),
      'D:\\software',
      'D:\\Program Files',
    )
  }
  for (const root of roots) {
    if (!root || !existsSync(root)) continue
    let entries
    try {
      entries = readdirSync(root, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const home = join(root, entry.name, 'plugins', 'maven-plugin', 'lib', 'maven3')
      if (existsSync(join(home, 'bin', 'm2.conf'))) return home
    }
  }
  return undefined
}

/** Windows batch launchers cannot be spawned directly; run them through cmd.exe. */
function shellArgv(argv) {
  const [bin, ...rest] = argv
  if (process.platform !== 'win32' || !/\.(cmd|bat)$/i.test(bin)) return argv
  const quote = (value) => (/[\s"&|<>^]/.test(value) ? `"${value}"` : value)
  // cmd /s /c strips exactly one outer pair of quotes, so the line needs its own
  return [process.env.ComSpec ?? 'cmd.exe', '/d', '/s', '/c', `"${[quote(bin), ...rest.map(quote)].join(' ')}"`]
}

/** One token per line in a Java @argfile; forward slashes avoid backslash escaping. */
function argFileLine(value) {
  const token = process.platform === 'win32' ? String(value).replace(/\\/g, '/') : String(value)
  return /[\s"]/.test(token) ? `"${token.replace(/"/g, '\\"')}"` : token
}

async function runToEnd(ctx, argv, cwd, extraEnv = {}, onText) {
  let live
  try {
    live = ctx.subprocess.spawn({
      argv: shellArgv(argv),
      cwd,
      ...(Object.keys(extraEnv).length > 0 ? { env: extraEnv } : {}),
      stdio: {
        stdin: 'ignore',
        stdout: { maxBytes: 512 * 1024, spill: { maxBytes: 4 * 1024 * 1024 } },
        stderr: { maxBytes: 512 * 1024, spill: { maxBytes: 4 * 1024 * 1024 } },
      },
      graceMs: 5_000,
    })
  } catch (error) {
    throw new Error(`spawn failed, ${argv.length} args / ${argv.join(' ').length} chars: ${error.message}`)
  }
  const seen = { stdout: 0, stderr: 0 }
  const pump = onText
    ? setInterval(() => {
        for (const stream of ['stdout', 'stderr']) {
          const reader = live.collected[stream]
          if (!reader) continue
          try {
            const read = reader.readFrom(seen[stream])
            seen[stream] = read.nextOffset
            if (read.text) onText(read.text)
          } catch {
            /* reader unavailable after exit */
          }
        }
      }, 400)
    : undefined
  const outcome = await live.done
  if (pump) clearInterval(pump)
  const out = live.collected.stdout?.readFrom(0)
  const err = live.collected.stderr?.readFrom(0)
  return {
    ok: outcome.exitCode === 0,
    exitCode: outcome.exitCode,
    text: `${out?.text ?? ''}\n${err?.text ?? ''}`,
  }
}

function summarizeFailure(text) {
  const lines = text.split(/\r?\n/)
  const problems = lines
    .filter((line) => /\[ERROR\]/.test(line) && /\.java:\[\d+/.test(line))
    .slice(0, 8)
    .map((line) => line.replace(/^\[ERROR\]\s*/, '').replace(/^\/?\S*\/src\//, 'src/'))
  if (problems.length > 0) return problems.join('\n')
  const firstError = lines.find((line) => /\[ERROR\]/.test(line))
  if (firstError) return firstError.replace(/^\[ERROR\]\s*/, '')
  const meaningful = lines.filter((line) => line.trim() !== '').slice(-12)
  return meaningful.length > 0 ? meaningful.join('\n') : 'build failed'
}

/**
 * Maven prints javac diagnostics as `[ERROR] /path/File.java:[42,7] message`.
 * Structured rows let the agent jump straight to the file instead of re-reading logs.
 */
function parseBuildErrors(text) {
  const errors = []
  const seen = new Set()
  const keep = (row) => {
    const key = `${row.file}:${row.line}:${row.column}:${row.message}`
    if (seen.has(key)) return
    seen.add(key)
    errors.push(row)
  }
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim()
    const located = line.match(/\[ERROR\]\s+(.+?\.java):\[(\d+)(?:,(\d+))?\]\s*(.*)$/)
    if (located) {
      keep({ file: located[1], line: Number(located[2]), column: Number(located[3] ?? 0), message: located[4].trim() })
      continue
    }
    const generic = line.match(/\[ERROR\]\s+(.+)$/)
    if (generic && !/^(Re-run Maven|For more information|Help 1|To see the full|-> \[Help)/.test(generic[1])) {
      keep({ file: '', line: 0, column: 0, message: generic[1].trim() })
    }
  }
  return errors.slice(0, 50)
}

/** A malformed pattern must not break log search: fall back to a literal match. */
function safeRegExp(pattern) {
  try {
    return new RegExp(pattern, 'i')
  } catch {
    const literal = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(literal, 'i')
  }
}

/** Newest mtime under the module (skipping build output) plus every pom on its path. */
function moduleSignature(root, moduleDir) {
  const base = moduleDir === '.' ? root : join(root, moduleDir)
  let newest = 0
  const bump = (file) => {
    try {
      const stat = statSync(file)
      if (stat.mtimeMs > newest) newest = stat.mtimeMs
    } catch {
      /* missing file is not a change */
    }
  }
  bump(join(root, 'pom.xml'))
  let cursor = base
  while (cursor.length > root.length) {
    bump(join(cursor, 'pom.xml'))
    bump(join(cursor, 'build.gradle'))
    const parent = dirname(cursor)
    if (parent === cursor) break
    cursor = parent
  }
  const stack = [base]
  while (stack.length > 0) {
    const dir = stack.pop()
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name) || entry.name === 'target' || entry.name === 'build') continue
        stack.push(join(dir, entry.name))
      } else {
        bump(join(dir, entry.name))
      }
    }
  }
  return String(newest)
}

async function buildService(ctx, root, service) {
  const runtime = runtimeOf(service.id)
  const modulePath = toolPath(root, service.moduleDir)
  const outFile = join(root, service.moduleDir === '.' ? '' : service.moduleDir, 'target', 'java-ops-classpath.txt')
  const classes = join(root, service.moduleDir === '.' ? '' : service.moduleDir, 'target', 'classes')
  const signature = moduleSignature(root, service.moduleDir)
  const fresh = runtime.buildSignature === signature && existsSync(outFile) && existsSync(classes) && runtime.classpath
  if (fresh) {
    recordLog(runtime, '[java-ops] build skipped: sources unchanged since the last build')
    runtime.status = 'building'
    runtime.lastError = undefined
    runtime.lastBuild = { skipped: true, seconds: 0 }
    runtime.lastBuildErrors = []
    return runtime.classpath
  }
  const mvn = await mavenInvocation(ctx, root, root)
  const argv = [...mvn.argv, '-q', '-B']
  if (modulePath !== '') argv.push('-pl', modulePath, '-am')
  // compile in the reactor and resolve the classpath in the same Maven run; install is not needed
  argv.push('-DskipTests', 'compile', 'dependency:build-classpath', `-Dmdep.outputFile=${outFile}`, '-Dmdep.includeScope=runtime')
  runtime.status = 'building'
  runtime.lastError = undefined
  const started = Date.now()
  const result = await runToEnd(ctx, argv, root, mvn.env, (chunk) => recordLog(runtime, chunk))
  if (!result.ok) {
    runtime.status = 'failed'
    runtime.lastError = `${summarizeFailure(result.text)} (mvn exit ${result.exitCode})`
    runtime.lastBuildErrors = parseBuildErrors(result.text)
    throw new Error(runtime.lastError)
  }
  const jars = readFileSync(outFile, 'utf8').trim()
  const classpath = `${classes}${process.platform === 'win32' ? ';' : ':'}${jars}`
  runtime.classpath = classpath
  runtime.buildSignature = signature
  runtime.lastBuildErrors = []
  runtime.lastBuild = { skipped: false, seconds: Math.round((Date.now() - started) / 100) / 10 }
  recordLog(runtime, `[java-ops] built in ${runtime.lastBuild.seconds}s`)
  return classpath
}

async function classpathOf(ctx, root, service) {
  const modulePath = toolPath(root, service.moduleDir)
  const outFile = join(root, service.moduleDir === '.' ? '' : service.moduleDir, 'target', 'java-ops-classpath.txt')
  const mvn = await mavenInvocation(ctx, root, root)
  const argv = [...mvn.argv, '-q', '-B', '-pl', modulePath === '' ? '.' : modulePath]
  argv.push('dependency:build-classpath', `-Dmdep.outputFile=${outFile}`, '-Dmdep.includeScope=runtime')
  const result = await runToEnd(ctx, argv, root, mvn.env)
  if (!result.ok) throw new Error(summarizeFailure(result.text))
  const jars = readFileSync(outFile, 'utf8').trim()
  const classes = join(root, service.moduleDir === '.' ? '' : service.moduleDir, 'target', 'classes')
  return `${classes}${process.platform === 'win32' ? ';' : ':'}${jars}`
}

function tcpReady(port, timeoutMs = 800) {
  return new Promise((resolvePromise) => {
    const socket = connect({ host: '127.0.0.1', port })
    const done = (value) => {
      socket.destroy()
      resolvePromise(value)
    }
    socket.setTimeout(timeoutMs, () => done(false))
    socket.once('connect', () => done(true))
    socket.once('error', () => done(false))
  })
}

/**
 * The subprocess handle does not always expose a pid on Windows, so ask the OS
 * which process owns the listening socket once the service is up.
 */
async function pidByPort(ctx, port) {
  try {
    const netstat = await ctx.subprocess.resolveExecutable('netstat')
    const result = await runToEnd(ctx, [netstat, '-ano'], process.cwd())
    const match = result.text.match(new RegExp(`:${port}\\s+\\S+\\s+LISTENING\\s+(\\d+)`))
    return match ? Number(match[1]) : undefined
  } catch {
    return undefined
  }
}

const FATAL_START_LINES = [
  /APPLICATION FAILED TO START/,
  /Error starting ApplicationContext/,
  /Web server failed to start/,
  /BUILD FAILURE/,
]

/** A start that already printed a fatal line will never open the port: stop waiting. */
function findFatalLine(lines) {
  const floor = Math.max(0, lines.length - 300)
  for (let index = lines.length - 1; index >= floor; index -= 1) {
    const line = lines[index]
    if (FATAL_START_LINES.some((pattern) => pattern.test(line))) return line.trim()
  }
  return ''
}

async function waitReady(service, runtime, signal) {
  const deadline = Date.now() + READY_TIMEOUT_MS
  while (Date.now() < deadline) {
    if (signal?.aborted) return false
    if (runtime.status === 'failed' || runtime.status === 'stopped') return false
    if (await tcpReady(service.port)) return true
    const fatal = findFatalLine(runtime.logLines)
    if (fatal !== '') {
      runtime.lastError = fatal
      return false
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 400))
  }
  return false
}

/**
 * Windows hands the child a CP936 text layer even when the app logs UTF-8, which is exactly
 * the mojibake we saw. A batch launcher sets the console code page to 65001 first, so the
 * bytes and the decoding agree.
 */
function writeLauncher(service, java, argsFile) {
  const launcher = join(dirname(STATE_FILE), `run-${service.id}.cmd`)
  const body = ['@echo off', 'chcp 65001>nul', `"${java}" @"${argsFile}"`, ''].join('\r\n')
  writeFileSync(launcher, body, 'utf8')
  return launcher
}

async function startPipeline(ctx, root, service) {
  const runtime = runtimeOf(service.id)
  if (runtime.busy) return
  // Someone already serves this port (a run from before a reload, or a manual one):
  // launching a second JVM would only fail to bind. Take the live one over instead.
  const holder = await pidByPort(ctx, service.port)
  if (holder) {
    runtime.status = 'running'
    runtime.pid = holder
    runtime.busy = false
    markServicePid(service, holder)
    recordLog(runtime, `[java-ops] port ${service.port} is already served by pid ${holder}; adopting that process instead of starting a duplicate JVM`)
    return
  }
  runtime.busy = true
  // a new run starts with empty logs: previous build/startup output is stale
  resetLogs(runtime)
  const pipelineStarted = Date.now()
  try {
    const classpath = service.buildEnabled !== false
      ? await buildService(ctx, root, service)
      : await classpathOf(ctx, root, service)
    const java = await ctx.subprocess.resolveExecutable('java')
    const jvmArgs = []
    if (service.port) jvmArgs.push(`-Dserver.port=${service.port}`)
    const vmArgs = String(service.vmArgs ?? '').trim()
    if (vmArgs) jvmArgs.push(...vmArgs.split(/\s+/).filter(Boolean))
    // a resolved classpath easily passes the Windows command-line limit, so pass it by argfile
    const argsFile = join(dirname(STATE_FILE), `run-${service.id}.args`)
    const lines = [...jvmArgs, '-cp', classpath, service.mainClass].map(argFileLine)
    writeFileSync(argsFile, `${lines.join('\n')}\n`, 'utf8')
    runtime.status = 'starting'
    runtime.lastError = undefined
    const env = service.env && Object.keys(service.env).length > 0 ? { ...service.env } : undefined
    // Windows consoles hand the child a CP936 text layer unless the code page is switched:
    // a UTF-8 app log turned into mojibake there, so terminal runs go through a 65001 launcher.
    const argv = [java, `@${argsFile}`]
    const launcher = process.platform === 'win32' ? writeLauncher(service, java, argsFile) : undefined
    let live
    if (typeof ctx.subprocess.spawnTerminal === 'function') {
      // a real terminal is what makes a Ctrl+C stop possible; pipes cannot carry it
      live = await ctx.subprocess.spawnTerminal({
        argv: launcher ? [launcher] : argv,
        cwd: root,
        ...(env ? { env } : {}),
        rows: 40,
        cols: 240,
        terminalType: 'xterm-256color',
        graceMs: 5_000,
      })
      pumpTerminal(runtime, live)
    } else {
      live = ctx.subprocess.spawn({
        argv,
        cwd: root,
        ...(env ? { env } : {}),
        stdio: {
          stdin: 'ignore',
          stdout: { maxBytes: 512 * 1024, spill: { maxBytes: 8 * 1024 * 1024 } },
          stderr: { maxBytes: 512 * 1024, spill: { maxBytes: 8 * 1024 * 1024 } },
        },
        graceMs: 5_000,
      })
      live.runtime = runtime
      runtime.pump = setInterval(() => drainLogs(live), 400)
    }
    runtime.handle = live
    runtime.pid = live.pid
    runtime.startedAt = Date.now()
    runtime.stdoutOffset = 0
    runtime.stderrOffset = 0
    // the terminal path streams through pumpTerminal; only the pipe fallback polls here
    if (typeof ctx.subprocess.spawnTerminal !== 'function') runtime.pump = setInterval(() => drainLogs(live), 400)
    live.done.then((outcome) => {
      drainLogs(live)
      stopPump(runtime)
      runtime.handle = undefined
      runtime.exitCode = outcome.exitCode
      runtime.pid = undefined
      markServicePid(service, undefined)
      if (runtime.stopping) {
        runtime.stopping = false
        runtime.status = 'stopped'
        runtime.lastError = undefined
        runtime.exitCode = undefined
        return
      }
      if (runtime.status === 'running' || runtime.status === 'starting') {
        runtime.status = outcome.exitCode === 0 ? 'stopped' : 'failed'
        if (runtime.status === 'failed') runtime.lastError = `exit code ${outcome.exitCode}`
      }
    })
    const ready = await waitReady(service, runtime)
    if (!ready) {
      runtime.status = 'failed'
      runtime.lastError = runtime.lastError ?? `port ${service.port} not ready in time`
      return
    }
    runtime.status = 'running'
    runtime.pid = runtime.pid ?? (await pidByPort(ctx, service.port))
    markServicePid(service, runtime.pid)
    runtime.lastStartup = { seconds: Math.round((Date.now() - pipelineStarted) / 100) / 10, buildSkipped: Boolean(runtime.lastBuild?.skipped) }
  } catch (error) {
    runtime.status = 'failed'
    runtime.lastError = error instanceof Error ? error.message : String(error)
  } finally {
    runtime.busy = false
  }
}

/**
 * One pipeline per service. A second start (panel click plus agent call, or an
 * impatient agent) joins the running pipeline instead of spawning a second JVM
 * that would fail on the port. The promise settles when the service is up, so a
 * caller that passes wait:true gets the ready state back in a single call.
 */
function launch(ctx, root, service, runtime) {
  if (runtime.pipeline) return runtime.pipeline
  runtime.pipeline = startPipeline(ctx, root, service)
    .catch(() => {})
    .finally(() => {
      runtime.pipeline = undefined
    })
  return runtime.pipeline
}

/**
 * Hand the JVM its own Ctrl+C (SIGINT) and let it run its shutdown hooks — the
 * same thing IDEA's stop button does. Only a real terminal can deliver that on
 * Windows, so a pipe-only run is merely terminated: a console JVM has no other
 * signal channel there.
 */
async function requestJvmExit(runtime, handle) {
  if (typeof handle.signalForeground !== 'function') return false
  try {
    await handle.signalForeground('SIGINT')
    recordLog(runtime, '[java-ops] sent Ctrl+C; waiting for the app to shut itself down')
    return true
  } catch (error) {
    recordLog(runtime, `[java-ops] Ctrl+C was rejected (${error instanceof Error ? error.message : String(error)}); terminating`)
    return false
  }
}

/**
 * A terminal handle stays open after the child exits (the PTY is not the process),
 * so the JVM has to be watched through the OS instead of the handle. The listening
 * port closes before the JVM is gone (shutdown hooks keep running), so the PID is
 * what decides.
 */
async function pidAlive(ctx, pid) {
  try {
    const tasklist = await ctx.subprocess.resolveExecutable('tasklist')
    const result = await runToEnd(ctx, [tasklist, '/FI', `PID eq ${pid}`, '/NH', '/FO', 'CSV'], process.cwd())
    return result.text.includes(`"${pid}"`)
  } catch {
    return false
  }
}

async function waitForJvmExit(ctx, service, pid, ms) {
  const deadline = Date.now() + ms
  for (;;) {
    const gone = pid ? !(await pidAlive(ctx, pid)) : (await pidByPort(ctx, service.port)) === undefined
    if (gone) return true
    if (Date.now() >= deadline) return false
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 400))
  }
}

/** Terminate a JVM we no longer hold a handle for (adopted after a plugin reload). */
async function killPid(ctx, pid, runtime) {
  try {
    const taskkill = await ctx.subprocess.resolveExecutable('taskkill')
    const soft = await runToEnd(ctx, [taskkill, '/PID', String(pid)], process.cwd())
    if (soft.ok) return true
    const hard = await runToEnd(ctx, [taskkill, '/F', '/PID', String(pid)], process.cwd())
    if (hard.ok) {
      recordLog(runtime, `[java-ops] force-killed adopted pid ${pid}`)
      return true
    }
  } catch {
    /* the process is already gone */
  }
  recordLog(runtime, `[java-ops] could not stop adopted pid ${pid}`)
  return false
}

async function stopPipeline(ctx, service) {
  const runtime = runtimeOf(service.id)
  if (!runtime.handle) {
    // adopted after a plugin reload: there is no handle left, so ask the OS
    const pid = runtime.pid ?? (await pidByPort(ctx, service.port))
    if (pid) await killPid(ctx, pid, runtime)
    runtime.status = 'stopped'
    runtime.pid = undefined
    runtime.adopted = false
    markServicePid(service, undefined)
    return
  }
  const handle = runtime.handle
  runtime.stopping = true
  const pid = runtime.pid
  const asked = await requestJvmExit(runtime, handle)
  if (!asked) handle.terminate()
  let exited = await waitForJvmExit(ctx, service, pid, STOP_GRACE_MS)
  if (!exited) {
    try {
      if (pid) await killPid(ctx, pid, runtime)
      else handle.terminate()
    } catch {
      /* already gone */
    }
    exited = await waitForJvmExit(ctx, service, pid, 10_000)
    runtime.status = exited ? 'stopped' : 'killed'
    if (!exited) runtime.lastError = 'graceful stop timed out; forced termination requested'
  } else {
    runtime.status = 'stopped'
  }
  runtime.pid = undefined
  markServicePid(service, undefined)
  drainLogs(handle)
  stopPump(runtime)
}

/* --------------------------------------------------------------- entrypoints */

function workspaceFromSession(ctx, sessionId) {
  if (typeof sessionId !== 'string' || sessionId === '') return undefined
  const session = ctx.sessions.get(sessionId)
  return session?.header?.cwd
}

/** Newest-first feed of what the agent is doing, so the panel can show live progress. */
const activities = new Map()

/** SQL is executed by tools only; the panel just reads this audit trail. */

function pushActivity(root, entry) {
  const list = activities.get(root) ?? []
  list.unshift(entry)
  if (list.length > 40) list.length = 40
  activities.set(root, list)
  return entry
}

/**
 * Resolve a service from either its id or a main class. A main class that is not
 * registered yet is registered on the spot, so the agent can ask for a service it
 * only knows by class name.
 */
function resolveService(root, payload = {}) {
  const id = typeof payload.id === 'string' ? payload.id.trim() : ''
  if (id !== '') return findService(root, id)
  const mainClass = typeof payload.mainClass === 'string' ? payload.mainClass.trim() : ''
  if (mainClass === '') throw new Error('pass id, or mainClass to let java-ops register the service')
  const known = readDb().workspaces[root]?.services?.find((service) => service.mainClass === mainClass)
  if (known) return known
  const hit = scanProject(root).find((candidate) => candidate.mainClass === mainClass)
  return saveService(root, {
    name: payload.name ?? hit?.suggestedName ?? mainClass.split('.').pop(),
    moduleDir: payload.moduleDir ?? hit?.moduleDir ?? '.',
    mainClass,
    port: payload.port ?? hit?.port ?? 0,
    contextPath: payload.contextPath ?? hit?.contextPath ?? '',
    profile: payload.profile ?? hit?.profile ?? '',
    vmArgs: payload.vmArgs ?? '',
    buildEnabled: payload.buildEnabled,
  })
}

async function act(ctx, root, action, payload = {}, agent) {
  const id = payload.id
  // polling reads (logs/refresh) are not operations worth listing
  const tracked = action !== 'logs' && action !== 'refresh'
  const entry = tracked ? pushActivity(root, {
    at: Date.now(),
    action,
    id: id ?? payload.mainClass ?? '',
    status: 'running',
  }) : { status: 'ok', ms: 0 }
  entry.at = entry.at ?? Date.now()
  const finish = (status, extra = {}) => {
    entry.status = status
    entry.ms = Date.now() - entry.at
    Object.assign(entry, extra)
  }
  try {
    const result = await performAction(ctx, root, action, payload, agent)
    if (result && typeof result === 'object' && typeof result.resolved === 'string') entry.id = result.resolved
    else if (result && typeof result === 'object' && typeof result.saved === 'string') entry.id = result.saved
    finish('ok', { id: entry.id })
    return result
  } catch (error) {
    finish('error', { error: error instanceof Error ? error.message : String(error) })
    throw error
  }
}

async function performAction(ctx, root, action, payload = {}, agent) {
  const id = payload.id
  switch (action) {
    case 'scan':
      return viewState(root, { candidates: scanProject(root) })
    case 'save': {
      const record = saveService(root, payload.service ?? payload)
      return viewState(root, { saved: record.id })
    }
    case 'remove':
      removeService(root, id)
      return viewState(root)
    case 'start': {
      const service = resolveService(root, payload)
      const runtime = runtimeOf(service.id)
      const active = runtime.status === 'running' || runtime.status === 'starting' || runtime.status === 'building'
      let pipeline = runtime.pipeline
      if (!pipeline && !active && !runtime.busy) pipeline = launch(ctx, root, service, runtime)
      // wait defaults to true: the agent wants the ready state, not a "building" guess
      if (payload.wait !== false && pipeline) await pipeline
      return viewState(root, { resolved: service.id, already: active })
    }
    case 'ensure': {
      const service = resolveService(root, payload)
      const runtime = runtimeOf(service.id)
      if (runtime.status === 'running') return viewState(root, { resolved: service.id, already: true })
      const pipeline = runtime.pipeline ?? launch(ctx, root, service, runtime)
      if (payload.wait !== false) await pipeline
      return viewState(root, { resolved: service.id, already: false })
    }
    case 'stop': {
      const service = resolveService(root, payload)
      await stopPipeline(ctx, service)
      return viewState(root, { resolved: service.id })
    }
    case 'restart': {
      const service = resolveService(root, payload)
      const runtime = runtimeOf(service.id)
      await stopPipeline(ctx, service)
      const pipeline = launch(ctx, root, service, runtime)
      if (payload.wait !== false) await pipeline
      return viewState(root, { resolved: service.id })
    }
    case 'build': {
      const service = resolveService(root, payload)
      const runtime = runtimeOf(service.id)
      if (!runtime.pipeline && !runtime.busy) {
        const resumeStatus = runtime.status === 'running' ? 'running' : 'stopped'
        resetLogs(runtime)
        runtime.status = 'building'
        runtime.lastError = undefined
        runtime.pipeline = buildService(ctx, root, service)
          .then(() => {
            runtime.status = resumeStatus
          })
          .catch((error) => {
            runtime.status = 'failed'
            if (!runtime.lastError) runtime.lastError = String(error?.message ?? error)
          })
          .finally(() => {
            runtime.pipeline = undefined
          })
      }
      if (payload.wait !== false && runtime.pipeline) await runtime.pipeline
      return viewState(root, { resolved: service.id, failed: runtime.status === 'failed' })
    }
    case 'logs': {
      const runtime = runtimeOf(id)
      const tail = Math.max(0, Number(payload.tail) || 0)
      const pattern = typeof payload.grep === 'string' ? payload.grep.trim() : ''
      const level = typeof payload.level === 'string' ? payload.level.trim().toUpperCase() : ''
      // grep/level/tail are server-side filters: a 5000-line buffer must never be
      // shipped so the agent can look for one stack trace
      if (pattern !== '' || level !== '' || tail > 0) {
        const matcher = pattern !== '' ? safeRegExp(pattern) : undefined
        const matched = runtime.logLines.filter(
          (line) => (matcher ? matcher.test(line) : true) && (level === '' || line.includes(level)),
        )
        const limit = Math.min(LOG_PAGE, tail > 0 ? tail : 200)
        const lines = matched.slice(Math.max(0, matched.length - limit))
        return {
          ok: true,
          id,
          lines,
          matched: matched.length,
          offset: runtime.logLines.length,
          epoch: runtime.logEpoch,
          status: runtime.status,
          filtered: true,
        }
      }
      let from = Number(payload.offset) || 0
      if (from > runtime.logLines.length) from = 0
      // first look shows the tail, and every reply is paged: a 5000-line buffer
      // must never travel in one response
      if (from === 0) from = Math.max(0, runtime.logLines.length - LOG_PAGE)
      const lines = runtime.logLines.slice(from, from + LOG_PAGE)
      return {
        ok: true,
        id,
        lines,
        offset: from + lines.length,
        epoch: runtime.logEpoch,
        status: runtime.status,
      }
    }
    case 'refresh':
      return viewState(root)
    case 'settings': {
      const db = readDb()
      const state = workspaceState(db, root)
      if (typeof payload.buildEnabled === 'boolean') state.buildEnabled = payload.buildEnabled
      if (payload.sqlPerms && typeof payload.sqlPerms === 'object') {
        state.sqlPerms = normalizeSqlPerms({ ...state.sqlPerms, ...payload.sqlPerms })
      }
      writeDb(db)
      return viewState(root)
    }
    case 'sqlConnSave': {
      const saved = await saveSqlConnection(ctx, root, payload)
      return viewState(root, { sqlSaved: saved })
    }
    case 'sqlConnRemove': {
      await removeSqlConnection(ctx, root, String(payload.id ?? ''))
      return viewState(root)
    }
    case 'sqlConnTest': {
      const result = await testSqlConnection(payload)
      return { ok: true, test: result }
    }
    case 'sqlQuery': {
      return runSql(ctx, root, payload, agent)
    }
    default:
      throw new Error(`unknown action: ${action}`)
  }
}

function toolDefinition(serviceName, description, action, parameters, buildPayload) {
  return {
    name: serviceName,
    description,
    parameters: {
      type: 'object',
      properties: {
        ...parameters,
        workspace: {
          type: 'string',
          description:
            'absolute project root to operate on; omit to use the workspace this session was opened in',
        },
      },
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object' },
      render(args, value) {
        return [{ type: 'text', text: JSON.stringify(value, null, 2) }]
      },
    },
    async execute(args, exec) {
      const explicit = typeof args?.workspace === 'string' ? args.workspace.trim() : ''
      // explicit root, else this session's workspace, else the last workspace that
      // actually has services — an agent running in a meta workspace still reaches them
      const root = explicit !== '' ? resolve(explicit) : panelRoot(ctxRef, exec.agent?.id)
      if (!root) throw new Error('no workspace for this session')
      // tool output must be lossless JSON: undefined does not round-trip
      const view = JSON.parse(JSON.stringify(await act(ctxRef, root, action, buildPayload(args ?? {}, exec), exec?.agent)))
      // the panel wants the whole state; a model reading a tool result does not.
      // the SQL history alone is tens of KB, which buries the answer.
      const { sqlLog, activities, ...rest } = view
      return { ...rest, activities: (activities ?? []).slice(0, 5) }
    },
  }
}

let ctxRef

export function apply(ctx) {
  ctxRef = ctx

  ctx.effect(() =>
    ctx.connection.fetch.register({
      path: `${ROUTE}/state`,
      methods: ['GET'],
      requestBody: 'buffered',
      fetch: async (request) => {
        const url = new URL(request.url, 'http://localhost')
        const root = panelRoot(ctx, url.searchParams.get('session') ?? undefined)
        if (!root) return json({ ok: false, error: 'unknown-session' }, 404)
        return json({ ok: true, ...viewState(root) })
      },
    }),
  )

  ctx.effect(() =>
    ctx.connection.fetch.register({
      path: `${ROUTE}/action`,
      methods: ['POST'],
      requestBody: 'buffered',
      fetch: async (request) => {
        let body
        try {
          body = await request.json()
        } catch {
          return json({ ok: false, error: 'invalid-json' }, 400)
        }
        const root = panelRoot(ctx, body?.session)
        if (!root) return json({ ok: false, error: 'unknown-session' }, 404)
        try {
          const state = await act(ctx, root, String(body?.action ?? ''), body?.payload ?? {})
          return json({ ok: true, ...state })
        } catch (error) {
          return json(
            { ok: false, error: error instanceof Error ? error.message : String(error) },
            400,
          )
        }
      },
    }),
  )

  const tools = [
    {
      name: 'java_ops_project_scan',
      description:
        'List Spring Boot entry classes of the current workspace, with their module directory, port and context path read from application.yml.',
      action: 'scan',
      parameters: {},
      payload: () => ({}),
    },
    {
      name: 'java_ops_service_list',
      description:
        'List configured services of the current workspace with their live status, port and last error.',
      action: 'refresh',
      parameters: {},
      payload: () => ({}),
    },
    {
      name: 'java_ops_service_add',
      description:
        'Register a service for the current workspace. Prefer a candidate from java_ops_project_scan; a custom main class must belong to moduleDir.',
      action: 'save',
      parameters: {
        name: { type: 'string', description: 'display name' },
        moduleDir: { type: 'string', description: 'module directory relative to the workspace root, "." for the root' },
        mainClass: { type: 'string', description: 'fully qualified Spring Boot main class' },
        port: { type: 'integer', description: 'port; a runtime -Dserver.port override, never a source edit' },
        contextPath: { type: 'string' },
        profile: { type: 'string', description: 'spring profile passed as -Dspring.profiles.active' },
        vmArgs: { type: 'string', description: 'extra JVM arguments, space separated' },
        buildEnabled: { type: 'boolean', description: 'build before start, default true' },
      },
      payload: (args) => ({
        service: {
          ...args,
          vmArgs: [args.vmArgs, args.profile ? `-Dspring.profiles.active=${args.profile}` : '']
            .filter(Boolean)
            .join(' '),
        },
      }),
    },
    {
      name: 'java_ops_service_remove',
      description: 'Remove a configured service from the current workspace.',
      action: 'remove',
      parameters: { id: { type: 'string' } },
      payload: (args) => args,
    },
    {
      name: 'java_ops_service_start',
      description:
        'Build (unless disabled) and start a service, then wait until it is ready. Pass id, or mainClass to register an unknown service on the spot. A second start joins the attempt already running instead of launching a duplicate JVM.',
      action: 'start',
      parameters: {
        id: { type: 'string', description: 'registered service id; omit when using mainClass' },
        mainClass: { type: 'string', description: 'fully qualified main class; registers the service when it is not configured yet' },
        moduleDir: { type: 'string', description: 'module directory; filled from the project scan when omitted' },
        port: { type: 'integer', description: 'port; filled from application.yml when omitted' },
        name: { type: 'string', description: 'display name for an auto-registered service' },
        profile: { type: 'string', description: 'spring profile passed as -Dspring.profiles.active' },
        vmArgs: { type: 'string', description: 'extra JVM arguments, space separated' },
        buildEnabled: { type: 'boolean', description: 'build before start, default true' },
        wait: { type: 'boolean', description: 'return only when the service is ready (default true); false returns the building status immediately' },
      },
      payload: (args) => ({
        ...args,
        vmArgs: [args.vmArgs, args.profile ? `-Dspring.profiles.active=${args.profile}` : '']
          .filter(Boolean)
          .join(' '),
      }),
    },
    {
      name: 'java_ops_service_ensure',
      description:
        'Make sure a service is running. Returns immediately when it already runs; otherwise starts it and waits. Safe to call repeatedly.',
      action: 'ensure',
      parameters: {
        id: { type: 'string', description: 'registered service id; omit when using mainClass' },
        mainClass: { type: 'string', description: 'fully qualified main class; registers the service when it is not configured yet' },
        port: { type: 'integer' },
        wait: { type: 'boolean', description: 'return only when the service is ready (default true)' },
      },
      payload: (args) => args,
    },
    {
      name: 'java_ops_service_stop',
      description: 'Stop a service gracefully and fall back to forced termination after 30s.',
      action: 'stop',
      parameters: {
        id: { type: 'string', description: 'registered service id; omit when using mainClass' },
        mainClass: { type: 'string' },
      },
      payload: (args) => args,
    },
    {
      name: 'java_ops_service_restart',
      description: 'Stop then start a service.',
      action: 'restart',
      parameters: {
        id: { type: 'string', description: 'registered service id; omit when using mainClass' },
        mainClass: { type: 'string' },
        port: { type: 'integer' },
        wait: { type: 'boolean', description: 'return only when the service is ready (default true)' },
      },
      payload: (args) => args,
    },
    {
      name: 'java_ops_service_status',
      description: 'Read one service status and the tail of its log.',
      action: 'logs',
      parameters: {
        id: { type: 'string' },
        offset: { type: 'integer', description: 'log line offset from a previous call; omit for the last 200 lines' },
        grep: { type: 'string', description: 'only lines matching this pattern (case insensitive); ignores offset' },
        level: { type: 'string', description: 'only lines containing this marker, e.g. ERROR or WARN' },
        tail: { type: 'integer', description: 'number of lines to return, at most 400' },
      },
      payload: (args) => ({ ...args, offset: args.offset ?? Math.max(0, runtimeOf(args.id).logLines.length - 200) }),
    },
    {
      name: 'java_ops_build',
      description:
        'Build a service module and its dependency modules with the project wrapper; failures report file:line.',
      action: 'build',
      parameters: {
        id: { type: 'string', description: 'registered service id; omit when using mainClass' },
        mainClass: { type: 'string' },
        wait: { type: 'boolean', description: 'return only when the build finished (default true)' },
      },
      payload: (args) => args,
    },
    {
      name: 'java_ops_sql_connections',
      description:
        'List configured database connections (host, port, database, user, driver) without passwords. Use it before running SQL.',
      action: 'refresh',
      parameters: {},
      payload: () => ({}),
    },
    {
      name: 'java_ops_sql_query',
      description:
        'Run one SQL statement on a configured connection. Read/write/delete permissions and the no-WHERE guard come from the panel settings; confirm-enabled groups ask the user first. Returns at most 500 rows.',
      action: 'sqlQuery',
      parameters: {
        connection: {
          type: 'string',
          description: 'connection id or name; omit to use the first configured connection',
        },
        sql: { type: 'string', description: 'one statement, without a trailing semicolon' },
      },
      payload: (args) => args,
    },
  ]

  for (const tool of tools) {
    ctx.effect(() =>
      ctx.tools.register(
        toolDefinition(tool.name, tool.description, tool.action, tool.parameters, tool.payload),
      ),
    )
  }

  // a plugin reload must not kill the JVMs it started: adoptRunning() re-attaches
  // them by the pid recorded in the service row
  void adoptRunning(ctx).catch(() => {})

  ctx.effect(() => () => {
    for (const runtime of runtimes.values()) {
      stopPump(runtime)
      runtime.handle = undefined
    }
    runtimes.clear()
  })
}

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // live status must never be replayed from the browser cache
      'cache-control': 'no-store',
    },
  })
}

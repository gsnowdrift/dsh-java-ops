import * as React from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import * as RadixDialog from '@radix-ui/react-dialog'
import * as RadixTabs from '@radix-ui/react-tabs'

export const inject = ["slots", "locale"]

const h = React.createElement
const { useEffect, useRef, useState } = React

const API = '/api/java-ops'

const LANG = String((navigator && navigator.language) || 'en')
  .toLowerCase()
  .startsWith('zh')
  ? 'zh'
  : 'en'

const TEXT = {
  zh: {
    view: '运行服务',
    services: '服务',
    sql: 'SQL',
    settings: '设置',
    workspace: '工作区',
    wsFollow: '跟随当前会话',
    wsScope:
      '服务、数据库连接、SQL 执行记录、权限、构建开关都按工作区各存一套，切换工作区即整套切换。',
    add: '添加服务',
    addTitle: '添加服务',
    addHint: '输入包名或类名，下拉里会联想已扫到的启动类；也可以直接填全限定类名。',
    noCandidates: '这个工作区里没扫到 Spring Boot 启动类，可以直接手填类名。',
    errMainClass: '请填写全限定类名',
    errMainClassMissing: '在项目里找不到这个类，检查一下拼写',
    errName: '请填写服务名',
    errPort: '请填写端口',
    checking: '校验中…',
    scanned: '候选',
    manual: '类名',
    manualHint: 'com.example.DemoApplication',
    port: '端口',
    profile: 'profile',
    name: '服务名',
    vmArgs: 'VM 参数',
    vmArgsHint: '-Xmx512m -Dspring.profiles.active=dev',
    confirm: '确定',
    cancel: '取消',
    blockedHint: '端口被占用，已取消',
    edit: '编辑',
    editTitle: '编辑服务',
    editHint: '端口改动会在下次启动时生效；VM 参数每次启动都会重新读取。',
    portBusyTitle: '端口被占用',
    portBusyLine: '端口 {port} 已被 {process}（PID {pid}）占用。',
    portBusyOwnedLine: '占用者是本工作区的服务「{name}」，关闭它会先停掉那个服务。',
    portBusyAsk: '关闭占用进程，然后启动当前服务？',
    portBusyKill: '关闭并启动',
    start: '启动',
    stop: '停止',
    forceStop: '强制停止',
    restart: '重启',
    build: '构建',
    remove: '移除',
    module: '模块',
    main: '主类',
    pid: 'PID',
    lastStart: '上次启动耗时',
    buildSkipped: '已跳过',
    logs: '日志',
    filter: '过滤',
    wrap: '自动换行',
    follow: '跟踪最新',
    logTheme: '日志配色',
    logEmpty: '还没有日志。',
    state_running: '运行中',
    state_stopped: '已停止',
    state_starting: '启动中',
    state_stopping: '停止中',
    state_building: '构建中',
    state_failed: '失败',
    state_killed: '已强杀',
    noServices: '还没有服务，点「添加服务」开始。',
    emptyTitle: '添加第一个服务',
    emptySub: '扫描项目里的 Spring Boot 启动类，选一个就能编译、启动、看日志。',
    ops: '操作记录',
    opsEmpty: '这个服务还没有操作记录。',
    expandLog: '放大',
    close: '关闭',
    inProgress: '进行中',
    act_scan: '扫描项目',
    act_save: '保存服务',
    act_remove: '移除服务',
    act_start: '启动服务',
    act_stop: '停止服务',
    act_restart: '重启服务',
    act_build: '构建服务',
    act_logs: '读取日志',
    act_refresh: '刷新状态',
    sqlHistory: 'SQL 执行记录',
    connTitle: '数据库连接',
    connListLabel: '连接',
    connNew: '新建连接',
    connDriver: '类型',
    connUrl: '连接 URL',
    connName: '名称',
    connHost: '主机',
    connPort: '端口',
    connDb: '数据库',
    connUser: '用户',
    connPassword: '密码',
    connPasswordSaved: '已保存，留空表示不修改',
    connSecure: '配置只保存在本机，不会上传到任何服务器。',
    connStatus: '状态',
    connTest: '连接测试',
    connTesting: '测试中…',
    connTestOk: '连接测试通过',
    connTestFail: '连接测试失败',
    connRemove: '删除连接',
    connNone: '还没有数据库连接，点「连接」添加。',
    connSaved: '已保存',
    connPick: '选择连接',
    sqlNote: 'SQL 由 Agent 工具执行，这里只记录执行流水。',
    http: '接口',
    httpHeaders: '请求头',
    httpHeadersHint: '保存后每次调用都会自动带上；Agent 临时传的同名头优先。',
    httpName: '名称',
    httpValue: '值',
    httpEnabled: '启用',
    httpAdd: '新增一行',
    httpSave: '保存请求头',
    httpSaved: '已保存',
    httpSaveFailed: '保存失败',
    httpLog: '调用记录',
    httpNote: 'Agent 通过 java_ops_http_request 调用，这里只记录。',
    httpDetail: '详情',
    httpReqHeaders: '请求头',
    httpResHeaders: '响应头',
    httpReqParams: '请求参数',
    httpReqBody: '请求体',
    httpResBody: '响应体',
    httpBodyEmpty: '（空）',
    httpTruncated: '（超过 64 KB，已截断）',
    col_method: '方法',
    col_url: '接口',
    col_ms: '耗时',
    col_status: '状态',
    sqlEmpty: '还没有执行记录。',
    sqlDetail: '执行详情',
    sqlOpen: '查看完整 SQL',
    col_at: '时间',
    col_op: '操作类型',
    col_sql: '执行 SQL',
    col_ok: '是否成功',
    col_affected: '影响条数',
    okYes: '成功',
    okNo: '失败',
    settingsBuild: '启动前自动构建',
    proxyTitle: '网络代理',
    proxyLabel: '代理地址',
    proxyHint: '留空表示直连。规则包从 GitHub 下载，走本机代理通常快很多。',
    proxySave: '保存',
    proxySaved: '已保存',
    proxyInvalid: '代理地址格式不对',
    settingsBuildHint: '源码没变时自动跳过构建。',
    settingsData: '数据目录',
    settingsPerms: 'SQL 操作授权',
    permAllow: '允许执行',
    permCat: '类别',
    permGrant: '授权',
    permConfirm: '高风险',
    permRead: '读',
    permReadHint: 'SELECT',
    permWrite: '写',
    permWriteHint: 'INSERT / UPDATE / ALTER / CREATE',
    permDelete: '删',
    permDeleteHint: 'DELETE / DROP / TRUNCATE',
    permDenied: '未允许的语句直接拒绝执行。',

    lintTitle: 'Java 代码校验',

    lintCheckAll: '检查全部更新',
    lintRunning: '检查中…',
    lintLastRun: '上次检查',
    lintRunClean: '未发现问题',
    lintRunFailed: '失败',

    lintRuleSet: '规则集',

    lintThreshold: '命中阈值',

    lintCpd: '附加检查',

    lintCpdText: '同时查重复代码（CPD，≥ 100 行）',

    lintPremise: '前提',

    lintPremiseText: '需要编译产物（target/classes），复用最近一次构建。',

    lintNotInstalled: '未安装',

    lintDownloading: '下载中',

    lintCheck: '检查更新',
    lintUpdate: '更新',

    lintCheckNow: '检查中…',
    lintUpToDate: '已是最新',
    lintNewVersion: '有新版本',
    lintCheckFailed: '检查失败',

    lintUpdating: '更新中',

    lintFailed: '下载失败',

    lintBuildLock: 'SpotBugs 已启用：检查必须基于编译产物，所以构建开关保持开启。',

    lintStyle: '代码风格：命名、行宽、import 顺序',

    lintSource: '源码写法：未用变量、空 catch、复杂度',

    lintBytecode: '编译后缺陷：NPE 风险、equals/hashCode、资源泄漏',

    lintRsGoogle: '内置 · Google 风格',

    lintRsSun: '内置 · Sun 风格',
    lintRsAliyun: '内置 · 阿里巴巴规约',

    lintRsPmd: '内置 · 标准规则集',

    lintRsPmdStrict: '内置 · 严格规则集（含复杂度门禁）',

    lintRsSb: '内置 · 默认缺陷集',

    lintRsSbStrict: '内置 · 严格（含低置信度）',


    lintRsCustom: '外部文件…',
    lintRuleFile: '配置文件',
    lintPickFile: '选择文件…',

    lintLvWarn: 'warn 及以上',

    lintLvError: 'error 及以上',

    lintLvAll: '全部',
    permConfirmHint: '开启后高风险语句执行前会弹审批。',
    confirmTitle: '执行 {group} 语句',
    confirmBody: '这条语句要改动 {connection}，确认后才会执行。',
    confirmRun: '执行',
    confirmCancel: '取消',
    confirmWaiting: '等待确认…',
    errPrefix: '出错了：',
    loading: '载入中…',
  },
  en: {
    view: 'Services',
    services: 'Services',
    sql: 'SQL',
    settings: 'Settings',
    workspace: 'Workspace',
    wsFollow: 'follows this session',
    wsScope:
      'Services, database connections, the SQL audit trail, permissions and the build toggle are all per workspace.',
    add: 'Add service',
    addTitle: 'Add service',
    addHint: 'Type a package or class name to see matching scanned entry classes; a fully qualified name works too.',
    noCandidates: 'No Spring Boot entry class in this workspace; type the class name.',
    errMainClass: 'Enter the fully qualified class name',
    errMainClassMissing: 'This class does not exist in the project',
    errName: 'Enter a service name',
    errPort: 'Enter a port',
    checking: 'Checking…',
    scanned: 'Candidates',
    manual: 'Class',
    manualHint: 'com.example.DemoApplication',
    port: 'Port',
    profile: 'Profile',
    name: 'Name',
    vmArgs: 'VM args',
    vmArgsHint: '-Xmx512m -Dspring.profiles.active=dev',
    confirm: 'OK',
    cancel: 'Cancel',
    blockedHint: 'port busy, cancelled',
    edit: 'Edit',
    editTitle: 'Edit service',
    editHint: 'A new port takes effect on the next start; VM args are read on every start.',
    portBusyTitle: 'Port in use',
    portBusyLine: 'Port {port} is already used by {process} (PID {pid}).',
    portBusyOwnedLine: 'It belongs to the workspace service "{name}"; closing it stops that service first.',
    portBusyAsk: 'Close that process and start this service?',
    portBusyKill: 'Close and start',
    start: 'Start',
    stop: 'Stop',
    forceStop: 'Force stop',
    restart: 'Restart',
    build: 'Build',
    remove: 'Remove',
    module: 'Module',
    main: 'Main',
    pid: 'PID',
    lastStart: 'Last start',
    buildSkipped: 'skipped',
    logs: 'Logs',
    filter: 'Filter',
    wrap: 'Wrap lines',
    follow: 'Follow',
    logTheme: 'Log palette',
    logEmpty: 'No logs yet.',
    state_running: 'running',
    state_stopped: 'stopped',
    state_starting: 'starting',
    state_stopping: 'stopping',
    state_building: 'building',
    state_failed: 'failed',
    state_killed: 'killed',
    noServices: 'No services yet — use "Add service".',
    emptyTitle: 'Add your first service',
    emptySub: 'Scan the project for Spring Boot entry points, then build, start and follow the logs.',
    ops: 'Activity',
    opsEmpty: 'No operations recorded for this service yet.',
    expandLog: 'Expand',
    close: 'Close',
    inProgress: 'in progress',
    act_scan: 'Scan project',
    act_save: 'Save service',
    act_remove: 'Remove service',
    act_start: 'Start service',
    act_stop: 'Stop service',
    act_restart: 'Restart service',
    act_build: 'Build service',
    act_logs: 'Read logs',
    act_refresh: 'Refresh state',
    sqlHistory: 'SQL history',
    connTitle: 'Database connections',
    connListLabel: 'Connections',
    connNew: 'New connection',
    connDriver: 'Driver',
    connUrl: 'JDBC URL',
    connName: 'Name',
    connHost: 'Host',
    connPort: 'Port',
    connDb: 'Database',
    connUser: 'User',
    connPassword: 'Password',
    connPasswordSaved: 'saved, leave blank to keep',
    connSecure: 'Stored on this machine only; nothing is uploaded anywhere.',
    connStatus: 'Status',
    connTest: 'Test connection',
    connTesting: 'Testing…',
    connTestOk: 'Connection OK',
    connTestFail: 'Connection failed',
    connRemove: 'Delete connection',
    connNone: 'No database connection yet — click "Connection" to add one.',
    connSaved: 'Saved',
    connPick: 'Pick a connection',
    sqlNote: 'SQL runs through Agent tools; this page only records it.',
    http: 'HTTP',
    httpHeaders: 'Request headers',
    httpHeadersHint: 'Saved headers are applied to every call; headers passed by the agent win on the same name.',
    httpName: 'Name',
    httpValue: 'Value',
    httpEnabled: 'On',
    httpAdd: 'Add row',
    httpSave: 'Save headers',
    httpSaved: 'Saved',
    httpSaveFailed: 'Save failed',
    httpLog: 'Calls',
    httpNote: 'Sent by the agent through java_ops_http_request; this page only records them.',
    httpDetail: 'Details',
    httpReqHeaders: 'Request headers',
    httpResHeaders: 'Response headers',
    httpReqParams: 'Request parameters',
    httpReqBody: 'Request body',
    httpResBody: 'Response body',
    httpBodyEmpty: '(empty)',
    httpTruncated: '(over 64 KB, truncated)',
    col_method: 'Method',
    col_url: 'URL',
    col_ms: 'Duration',
    col_status: 'Status',
    sqlEmpty: 'No statements executed yet.',
    sqlDetail: 'Statement detail',
    sqlOpen: 'Open the full statement',
    col_at: 'Time',
    col_op: 'Type',
    col_sql: 'SQL',
    col_ok: 'Result',
    col_affected: 'Rows',
    okYes: 'OK',
    okNo: 'Failed',
    settingsBuild: 'Build before start',
    proxyTitle: 'Network proxy',
    proxyLabel: 'Proxy URL',
    proxyHint: 'Leave empty to connect directly. Rule packages come from GitHub; a local proxy is usually much faster.',
    proxySave: 'Save',
    proxySaved: 'Saved',
    proxyInvalid: 'The proxy URL is not valid',
    settingsBuildHint: 'Skipped automatically when sources are unchanged.',
    settingsData: 'Data directory',
    settingsPerms: 'SQL permissions',
    permAllow: 'Allow',
    permCat: 'Category',
    permGrant: 'Grant',
    permConfirm: 'High risk',
    permRead: 'Read',
    permReadHint: 'SELECT',
    permWrite: 'Write',
    permWriteHint: 'INSERT / UPDATE / ALTER / CREATE',
    permDelete: 'Delete',
    permDeleteHint: 'DELETE / DROP / TRUNCATE',
    permDenied: 'Statements that are not allowed are rejected outright.',

    lintTitle: 'Java checks',

    lintCheckAll: 'Check all updates',
    lintRunning: 'Checking...',
    lintLastRun: 'Last run',
    lintRunClean: 'No issues',
    lintRunFailed: 'failed',

    lintRuleSet: 'Rule set',

    lintThreshold: 'Report from',

    lintCpd: 'Extra check',

    lintCpdText: 'Also look for duplicated code (CPD, >= 100 lines)',

    lintPremise: 'Needs',

    lintPremiseText: 'Compiled classes (target/classes); reuses the last build.',

    lintNotInstalled: 'Not installed',

    lintDownloading: 'Downloading',

    lintCheck: 'Check for updates',
    lintUpdate: 'Update',

    lintCheckNow: 'Checking...',
    lintUpToDate: 'Up to date',
    lintNewVersion: 'New version',
    lintCheckFailed: 'Check failed',

    lintUpdating: 'Updating',

    lintFailed: 'Download failed',

    lintBuildLock: 'SpotBugs is on: it reads compiled classes, so the build switch stays on.',

    lintStyle: 'Style: naming, line length, import order',

    lintSource: 'Source: unused variables, empty catch, complexity',

    lintBytecode: 'Bytecode: NPE risks, equals/hashCode, resource leaks',

    lintRsGoogle: 'Built-in: Google style',

    lintRsSun: 'Built-in: Sun style',
    lintRsAliyun: 'Built-in: Alibaba guide',

    lintRsPmd: 'Built-in: standard rules',

    lintRsPmdStrict: 'Built-in: strict (with complexity gates)',

    lintRsSb: 'Built-in: default bug set',

    lintRsSbStrict: 'Built-in: strict (low confidence too)',


    lintRsCustom: 'External file...',
    lintRuleFile: 'Config file',
    lintPickFile: 'Choose file…',

    lintLvWarn: 'warn and above',

    lintLvError: 'error and above',

    lintLvAll: 'Everything',
    permConfirmHint: 'High-risk statements ask for approval before running.',
    confirmTitle: 'Run this {group} statement',
    confirmBody: 'It will change {connection}. Nothing runs until you confirm.',
    confirmRun: 'Run',
    confirmCancel: 'Cancel',
    confirmWaiting: 'Waiting for confirmation…',
    errPrefix: 'Error: ',
    loading: 'Loading…',
  },
}

const STATE_KEY = {
  running: 'state_running',
  starting: 'state_starting',
  stopping: 'state_stopping',
  building: 'state_building',
  failed: 'state_failed',
  killed: 'state_killed',
  stopped: 'state_stopped',
}

const txt = (key) => (LANG === 'zh' ? TEXT.zh : TEXT.en)[key] ?? key

// keep the local buffer small and the rendered window smaller: both directly
// bound how long the services tab takes to repaint
const LOCAL_LOG_LINES = 2000
const VISIBLE_LOG_LINES = 400

const CSS = `
/* ===================== 设计变量 =====================
   一套变量管住全站的间距、圆角、控件高度、灰阶与阴影，
   各页签只引用变量，不再各自写具体数值。 */
/* Radix 给非激活页签挂 hidden，而类选择器的 display:flex 会盖掉它，
   四个页签就各分走四分之一高度，界面看起来只显示了一小条。 */
.jops-tabpane[hidden],[role="tabpanel"][hidden]{display:none}
.jops-tabpane{display:flex;flex-direction:column;min-height:0;flex:1}
.jops-root{
  --jops-s1:4px;--jops-s2:8px;--jops-s3:12px;--jops-s4:16px;--jops-s5:20px;--jops-s6:24px;
  --jops-r-sm:4px;--jops-r:6px;--jops-r-lg:8px;--jops-r-xl:12px;--jops-r-full:999px;
  --jops-h:28px;--jops-h-sm:24px;
  --jops-bg:var(--dsw-alias-bg-base);
  --jops-surface:var(--dsw-alias-bg-layer-1);
  --jops-surface-2:var(--dsw-alias-bg-layer-2);
  --jops-line:var(--dsw-alias-border-l2);
  --jops-line-soft:var(--dsw-alias-border-l1);
  --jops-fg:var(--dsw-alias-label-primary);
  --jops-fg-muted:var(--dsw-alias-label-secondary);
  --jops-fg-subtle:var(--dsw-alias-label-tertiary);
  --jops-brand:var(--dsw-alias-brand-primary);
  --jops-ring:color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, transparent);
  --jops-shadow-sm:0 1px 2px rgba(16,24,40,.05);
  --jops-shadow:0 1px 3px rgba(16,24,40,.07),0 1px 2px rgba(16,24,40,.04);
  --jops-shadow-lg:0 18px 48px rgba(16,24,40,.2),0 2px 8px rgba(16,24,40,.08);
  --jops-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --jops-ease:cubic-bezier(.2,.8,.2,1);
  position:relative;display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;
  background:var(--jops-bg);color:var(--jops-fg);font-size:13px;line-height:1.5;z-index:1;
}
.jops-log-wrap.jops-log-full{position:absolute;inset:var(--jops-s3);z-index:30;display:flex;flex-direction:column;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-xl);box-shadow:var(--jops-shadow-lg)}

/* ===================== 顶部页签 ===================== */
.jops-top{display:flex;align-items:center;gap:var(--jops-s2);padding:0 var(--jops-s4);border-bottom:1px solid var(--jops-line);flex:none;min-height:40px}
.jops-seg{display:inline-flex;gap:2px;height:40px;align-items:stretch}
.jops-seg [role="tablist"]{display:inline-flex;gap:2px;height:100%;align-items:stretch}
.jops-seg [role="tab"]{position:relative;background:transparent;border:0;color:var(--jops-fg-muted);padding:0 var(--jops-s3);font:inherit;font-weight:500;cursor:pointer;transition:color .15s var(--jops-ease)}
.jops-seg [role="tab"]:hover{color:var(--jops-fg)}
.jops-seg [role="tab"][data-state="active"]{color:var(--jops-fg)}
.jops-seg [role="tab"][data-state="active"]::after{content:'';position:absolute;left:8px;right:8px;bottom:0;height:2px;border-radius:2px 2px 0 0;background:var(--jops-brand);animation:jops-ink .22s var(--jops-ease)}
.jops-seg [role="tab"]:focus-visible{outline:none;color:var(--jops-fg)}
.jops-seg [role="tab"]:focus-visible::before{content:'';position:absolute;inset:9px 5px;border-radius:var(--jops-r-sm);box-shadow:var(--jops-ring)}
@keyframes jops-ink{from{transform:scaleX(.4);opacity:.4}to{transform:none;opacity:1}}
.jops-spacer{flex:1}
.jops-ws{color:var(--jops-fg-muted);font-size:12px;display:inline-flex;align-items:center;gap:6px;height:var(--jops-h-sm);padding:0 10px;border:1px solid var(--jops-line);border-radius:var(--jops-r-full);background:var(--jops-surface);max-width:280px}
.jops-ws b{color:var(--jops-fg);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-note{margin:var(--jops-s2) var(--jops-s4) 0;padding:var(--jops-s2) var(--jops-s3);border-radius:var(--jops-r);border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);color:var(--dsw-alias-state-error-primary);font-size:12px;flex:none}
.jops-pane{display:flex;flex-direction:column;min-height:0;flex:1}
.jops-subtabs{display:flex;gap:2px;padding:0 var(--jops-s4);border-bottom:1px solid var(--jops-line);flex:none;height:32px;align-items:stretch}
/* 内容区要接住剩余的竖向空间，LogPane 靠它撑满 */
.jops-pane-body{display:flex;flex-direction:column;min-height:0;flex:1}
.jops-pane-body>[role="tabpanel"]{display:flex;flex-direction:column;min-height:0;flex:1}
.jops-pane-body>[role="tabpanel"][hidden]{display:none}
.jops-subtabs [role="tab"]{position:relative;background:transparent;border:0;color:var(--jops-fg-muted);padding:0 10px;font:inherit;font-size:12px;font-weight:500;cursor:pointer;transition:color .15s var(--jops-ease)}
.jops-subtabs [role="tab"]:hover{color:var(--jops-fg)}
.jops-subtabs [role="tab"][data-state="active"]{color:var(--jops-fg)}
.jops-subtabs [role="tab"][data-state="active"]::after{content:'';position:absolute;left:8px;right:8px;bottom:-1px;height:2px;border-radius:2px 2px 0 0;background:var(--jops-brand)}
.jops-subtabs [role="tab"]:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-oplog div{white-space:pre-wrap;word-break:break-all}
.jops-oplog div[data-status="error"]{color:var(--dsw-alias-state-error-primary)}
.jops-oplog div[data-status="blocked"]{color:var(--dsw-alias-state-warning-primary)}

/* ===================== 服务页 ===================== */
.jops-body{display:flex;min-height:0;flex:1}
.jops-side{width:248px;flex:none;display:flex;flex-direction:column;border-right:1px solid var(--jops-line);min-height:0;background:var(--jops-surface)}
.jops-side-head{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s3) var(--jops-s3) var(--jops-s2)}
.jops-side-head b{font-weight:600;font-size:12px;color:var(--jops-fg-muted);letter-spacing:.01em}
.jops-side-list{overflow:auto;min-height:0;flex:1;padding:0 var(--jops-s2) var(--jops-s3);display:flex;flex-direction:column;gap:1px}
.jops-empty-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--jops-s2);text-align:center;padding:var(--jops-s6) var(--jops-s5)}
.jops-empty-art{width:44px;height:44px;border-radius:var(--jops-r-full);display:flex;align-items:center;justify-content:center;background:var(--jops-surface-2);color:var(--jops-fg-subtle);font-size:22px;font-weight:300;margin-bottom:var(--jops-s1)}
.jops-empty-title{font-size:14px;font-weight:600;color:var(--jops-fg)}
.jops-empty-sub{font-size:12px;color:var(--jops-fg-muted);max-width:34em;line-height:1.6;margin-bottom:var(--jops-s2)}
.jops-svc{display:flex;gap:var(--jops-s2);align-items:center;height:32px;padding:0 10px;border-radius:var(--jops-r);cursor:pointer;color:var(--jops-fg-muted);transition:background .12s var(--jops-ease),color .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
.jops-svc:hover{background:var(--jops-surface-2);color:var(--jops-fg)}
.jops-svc:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-svc[data-on="true"]{background:var(--jops-bg);color:var(--jops-fg);box-shadow:inset 0 0 0 1px var(--jops-line),var(--jops-shadow-sm)}
.jops-svc-name{font-weight:500;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-svc-port{flex:none;color:var(--jops-fg-subtle);font-size:11.5px;font-family:var(--jops-mono);font-variant-numeric:tabular-nums;border-left:1px solid var(--jops-line);padding-left:var(--jops-s2);line-height:12px}
.jops-dot{width:7px;height:7px;border-radius:50%;flex:none;background:var(--dsw-alias-state-idle-primary);color:var(--dsw-alias-state-idle-primary);box-shadow:0 0 0 2px color-mix(in srgb, currentColor 16%, transparent)}
.jops-dot[data-state="running"]{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}
.jops-dot[data-state="starting"],.jops-dot[data-state="building"],.jops-dot[data-state="stopping"]{background:var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-state-warn-primary)}
.jops-dot[data-state="failed"],.jops-dot[data-state="killed"]{background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.jops-dot[data-busy="true"]{position:relative}
.jops-dot[data-busy="true"]::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid currentColor;animation:jops-ring 1.2s var(--jops-ease) infinite}
@keyframes jops-ring{0%{transform:scale(.75);opacity:.75}70%{opacity:.15}100%{transform:scale(2);opacity:0}}
.jops-spin{width:10px;height:10px;border-radius:50%;display:inline-block;vertical-align:-1px;margin-right:5px;border:1.5px solid color-mix(in srgb, currentColor 28%, transparent);border-top-color:currentColor;animation:jops-spin .7s linear infinite}
@keyframes jops-spin{to{transform:rotate(360deg)}}
.jops-btn[data-busy="true"]:disabled{opacity:1;cursor:progress}
.jops-pill[data-state="starting"],.jops-pill[data-state="building"],.jops-pill[data-state="stopping"]{animation:jops-pulse 1.4s ease-in-out infinite}
.jops-pulse{animation:jops-pulse 1.1s ease-in-out infinite}
@keyframes jops-pulse{0%,100%{opacity:1}50%{opacity:.25}}
.jops-main{flex:1;min-width:0;display:flex;flex-direction:column;min-height:0;padding:var(--jops-s3) var(--jops-s4);gap:var(--jops-s3)}
.jops-detail-head{display:flex;align-items:center;gap:var(--jops-s2);flex-wrap:wrap}
.jops-title{font-size:15px;font-weight:600;letter-spacing:-.01em}
.jops-actions{display:flex;gap:var(--jops-s1);margin-left:auto;flex-wrap:wrap}

/* ===================== 控件：按钮 / 输入 / 复选 ===================== */
.jops-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:var(--jops-h);padding:0 10px;font:inherit;font-size:12.5px;font-weight:500;line-height:1;white-space:nowrap;border-radius:var(--jops-r);border:1px solid var(--jops-line);background:var(--jops-bg);color:var(--jops-fg);cursor:pointer;transition:background .12s var(--jops-ease),border-color .12s var(--jops-ease),box-shadow .12s var(--jops-ease),opacity .12s var(--jops-ease)}
.jops-btn:hover:not(:disabled){background:var(--jops-surface-2)}
.jops-btn:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-btn:disabled{opacity:.45;cursor:not-allowed}
.jops-btn[data-primary="true"]{background:var(--jops-brand);border-color:transparent;color:#fff}
.jops-btn[data-primary="true"]:hover:not(:disabled){background:color-mix(in srgb, var(--jops-brand) 84%, #000);border-color:transparent;color:#fff}
.jops-btn[data-dark="true"]{background:#1f2328;border-color:transparent;color:#fff}
.jops-btn[data-dark="true"]:hover:not(:disabled){background:#101317;border-color:transparent;color:#fff}
.jops-btn[data-ghost="true"]{background:transparent;border-color:transparent;color:var(--jops-fg-muted)}
.jops-btn[data-ghost="true"]:hover:not(:disabled){background:var(--jops-surface-2);color:var(--jops-fg)}
/* 语义操作：淡底 + 同色描边 + 同色文字，比纯底色更好读 */
.jops-btn[data-act="start"]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 26%, transparent)}
.jops-btn[data-act="start"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent)}
.jops-btn[data-act="stop"]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 24%, transparent)}
.jops-btn[data-act="stop"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent)}
.jops-btn[data-act="restart"]{color:var(--jops-brand);background:color-mix(in srgb, var(--jops-brand) 10%, transparent);border-color:color-mix(in srgb, var(--jops-brand) 26%, transparent)}
.jops-btn[data-act="restart"]:hover:not(:disabled){background:color-mix(in srgb, var(--jops-brand) 16%, transparent)}
.jops-btn[data-act="build"]{color:var(--dsw-alias-state-warning-primary);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 10%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 26%, transparent)}
.jops-btn[data-act="build"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 16%, transparent)}
.jops-btn[data-act="edit"]{color:#0d9488;background:color-mix(in srgb, #0d9488 10%, transparent);border-color:color-mix(in srgb, #0d9488 26%, transparent)}
.jops-btn[data-act="edit"]:hover:not(:disabled){background:color-mix(in srgb, #0d9488 16%, transparent)}
.jops-btn[data-act="remove"]{color:var(--dsw-alias-state-error-primary);background:transparent;border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 22%, transparent)}
.jops-btn[data-act="remove"]:hover:not(:disabled){background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent)}
.jops-pill{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:500;padding:1px 8px;border-radius:var(--jops-r-full);border:1px solid var(--jops-line);background:var(--jops-surface);color:var(--jops-fg-muted);line-height:17px}
.jops-pill[data-state="running"]{color:var(--dsw-alias-state-success-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent)}
.jops-pill[data-state="failed"],.jops-pill[data-state="killed"]{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)}
.jops-pill[data-state="starting"],.jops-pill[data-state="building"],.jops-pill[data-state="stopping"]{color:var(--dsw-alias-state-warning-primary);border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 26%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 8%, transparent)}
.jops-meta{display:flex;gap:var(--jops-s4);flex-wrap:wrap;font-size:12px;color:var(--jops-fg-muted);align-items:center}
.jops-meta b{color:var(--jops-fg);font-weight:500;font-family:var(--jops-mono);font-size:11.5px;font-variant-numeric:tabular-nums}
.jops-input{box-sizing:border-box;font:inherit;font-size:12.5px;height:var(--jops-h);padding:0 10px;border-radius:var(--jops-r);border:1px solid var(--jops-line);background:var(--jops-bg);color:var(--jops-fg);min-width:0;transition:border-color .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
.jops-input::placeholder{color:var(--jops-fg-subtle)}
.jops-input:hover:not(:focus){border-color:color-mix(in srgb, var(--jops-fg) 22%, transparent)}
.jops-input:focus{outline:none;border-color:var(--jops-brand);box-shadow:var(--jops-ring)}
select.jops-input{appearance:none;padding-right:26px;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%236b7280' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center}
textarea.jops-input,textarea.jops-textarea{height:auto;padding:6px 10px;line-height:1.55}
.jops-textarea{height:96px;min-height:96px;max-height:40vh;resize:vertical;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable;font-family:var(--jops-mono)}
.jops-check{display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-size:12.5px}

/* ===================== 日志区 ===================== */
.jops-log-wrap{display:flex;flex-direction:column;min-height:0;flex:1;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);overflow:hidden;box-shadow:var(--jops-shadow-sm);--jops-log-bg:var(--dsw-alias-bg-base);--jops-log-fg:var(--dsw-alias-label-primary);--jops-log-dim:var(--dsw-alias-label-secondary);--jops-log-info:#1a6fd4;--jops-log-warn:#9a6700;--jops-log-err:#cf222e;--jops-log-exc:#a40e26;background:var(--jops-log-bg)}
.jops-log-wrap[data-theme="paper"]{--jops-log-bg:#fdf6e3;--jops-log-fg:#586e75;--jops-log-dim:#93a1a1;--jops-log-info:#268bd2;--jops-log-warn:#b58900;--jops-log-err:#dc322f;--jops-log-exc:#cb4b16;border-color:#e6dfc8}
.jops-log-wrap[data-theme="graphite"]{--jops-log-bg:#23272e;--jops-log-fg:#c9d1d9;--jops-log-dim:#7d8590;--jops-log-info:#79c0ff;--jops-log-warn:#e3b341;--jops-log-err:#ff7b72;--jops-log-exc:#ffa198;border-color:#333a44}
.jops-log-wrap[data-theme="midnight"]{--jops-log-bg:#0d1117;--jops-log-fg:#c9d1d9;--jops-log-dim:#6e7681;--jops-log-info:#58a6ff;--jops-log-warn:#d29922;--jops-log-err:#f85149;--jops-log-exc:#ff7b72;border-color:#21262d}
.jops-log-head{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s2) var(--jops-s3);border-bottom:1px solid color-mix(in srgb, var(--jops-log-fg) 14%, transparent);font-size:12px;color:var(--jops-log-dim);background:var(--jops-log-bg)}
.jops-log-head .jops-input,.jops-log-head .jops-btn{height:var(--jops-h-sm);background:color-mix(in srgb, var(--jops-log-fg) 7%, transparent);border-color:color-mix(in srgb, var(--jops-log-fg) 20%, transparent);color:var(--jops-log-fg)}
.jops-log-head .jops-btn:hover:not(:disabled){background:color-mix(in srgb, var(--jops-log-fg) 14%, transparent)}
.jops-log-head .jops-check{color:var(--jops-log-dim)}
.jops-follow{display:inline-flex;align-items:center;gap:6px;color:var(--jops-log-dim)}
.jops-follow-label{font-size:12.5px}
.jops-log{flex:1;min-height:0;overflow:auto;padding:var(--jops-s2) var(--jops-s3);font-family:var(--jops-mono);font-size:12px;line-height:1.6;scrollbar-width:none;background:var(--jops-log-bg);color:var(--jops-log-fg);tab-size:4}
.jops-log .lg-ts{color:var(--jops-log-dim);opacity:.8}
.jops-log .lg-info{color:var(--jops-log-info);font-weight:600}
.jops-log .lg-warn{color:var(--jops-log-warn);font-weight:600}
.jops-log .lg-err{color:var(--jops-log-err);font-weight:700}
.jops-log .lg-debug{color:var(--jops-log-dim)}
.jops-log .lg-exc{color:var(--jops-log-exc)}
.jops-log .lg-caused{color:var(--jops-log-err);font-weight:600}
.jops-line[data-lvl="error"]{background:color-mix(in srgb, var(--jops-log-err) 8%, transparent);box-shadow:inset 2px 0 0 var(--jops-log-err)}
.jops-line[data-lvl="warn"]{background:color-mix(in srgb, var(--jops-log-warn) 8%, transparent);box-shadow:inset 2px 0 0 var(--jops-log-warn)}
.jops-log::-webkit-scrollbar{display:none}
.jops-oplog{flex:1;min-height:0;overflow:auto;padding:var(--jops-s2) var(--jops-s3);font-family:var(--jops-mono);font-size:12px;line-height:1.75;scrollbar-width:none}
.jops-oplog::-webkit-scrollbar{display:none}
.jops-line{white-space:pre-wrap;word-break:break-all}
.jops-log[data-wrap="off"] .jops-line{white-space:pre;word-break:normal;width:max-content;min-width:100%}

/* ===================== 空态 / 提示 ===================== */
.jops-empty{padding:var(--jops-s4);color:var(--jops-fg-muted);font-size:12px;line-height:1.7}
.jops-log .jops-empty{color:var(--jops-log-dim)}
.jops-hint{color:var(--jops-fg-muted);font-size:12px}
.jops-hint[data-error="true"]{color:var(--dsw-alias-state-error-primary)}
.jops-req{color:var(--dsw-alias-state-error-primary);font-weight:400;margin-left:2px}
.jops-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}

/* ===================== 弹窗 ===================== */
.jops-overlay{position:absolute;inset:0;overflow:hidden;background:color-mix(in srgb, var(--dsw-alias-bg-base) 58%, transparent);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:20;padding:var(--jops-s4);overscroll-behavior:contain;animation:jops-fade .14s var(--jops-ease)}
.jops-dialog{width:min(680px,100%);max-height:min(640px,calc(100% - 8px));display:flex;flex-direction:column;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-xl);overflow:hidden;box-shadow:var(--jops-shadow-lg);animation:jops-pop .16s var(--jops-ease)}
@keyframes jops-pop{from{opacity:0;transform:translateY(6px) scale(.99)}to{opacity:1;transform:none}}
.jops-dialog .jops-input{border-color:var(--jops-line)}
.jops-dialog-head{padding:14px var(--jops-s4);border-bottom:1px solid var(--jops-line);font-weight:600;font-size:13.5px;letter-spacing:-.01em}
.jops-dialog-body{padding:var(--jops-s4);display:flex;flex-direction:column;gap:var(--jops-s3);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;min-height:0}
/* 下拉浮层要能盖出弹窗下缘，否则列表被 dialog 的 overflow 裁掉、点击落空 */
.jops-dialog[data-float="true"],.jops-dialog[data-float="true"] .jops-dialog-body{overflow:visible}
.jops-dialog-foot{padding:var(--jops-s3) var(--jops-s4);border-top:1px solid var(--jops-line);display:flex;justify-content:flex-end;gap:var(--jops-s2);background:var(--jops-surface)}
.jops-dialog.jops-dialog-wide{width:min(880px,100%);height:min(620px,calc(100% - 8px))}
.jops-dialog[data-auto="true"]{height:auto;max-height:min(620px,calc(100% - 8px));align-self:center}
.jops-dialog.jops-dialog-wide .jops-dialog-body{flex:1;min-height:0;overflow:hidden}

/* ===================== 连接 / 字段 / 下拉候选 ===================== */
.jops-url{font-family:var(--jops-mono);font-size:12px;line-height:30px;color:var(--jops-fg-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-conn{display:flex;gap:var(--jops-s4);min-height:0;flex:1;align-items:stretch}
.jops-connlist{flex:0 0 216px;width:216px;display:flex;flex-direction:column;gap:var(--jops-s2);padding:var(--jops-s3);border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);background:var(--jops-surface);min-height:0}
.jops-connhead{display:flex;align-items:center;gap:var(--jops-s1)}
.jops-connlabel{flex:1;font-size:12px;font-weight:600;color:var(--jops-fg-muted)}
.jops-connicon{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;line-height:1;border:1px solid var(--jops-line);border-radius:var(--jops-r);background:var(--jops-bg);color:var(--jops-fg-muted);cursor:pointer;font-size:13px;transition:background .12s var(--jops-ease),color .12s var(--jops-ease)}
.jops-connicon:hover:not(:disabled){background:var(--jops-surface-2);color:var(--jops-fg)}
.jops-connicon:disabled{opacity:.4;cursor:default}
.jops-delcell{width:44px;text-align:center}
.jops-rowdel{width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:1px solid transparent;border-radius:var(--jops-r);background:transparent;color:var(--jops-fg-subtle);font-size:15px;line-height:1;cursor:pointer;transition:background .12s var(--jops-ease),color .12s var(--jops-ease),border-color .12s var(--jops-ease)}
.jops-rowdel:hover{background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 34%, transparent);color:var(--dsw-alias-state-error-primary)}
.jops-rowdel:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-connitems{display:flex;flex-direction:column;gap:2px;overflow:auto;min-height:0}
.jops-connitem{display:block;width:100%;text-align:left;padding:7px 9px;border:1px solid transparent;border-radius:var(--jops-r);background:transparent;color:inherit;cursor:pointer;font:inherit;font-size:12px;transition:background .12s var(--jops-ease),box-shadow .12s var(--jops-ease)}
.jops-connitem:hover{background:var(--jops-surface-2)}
.jops-connitem[data-on="true"]{background:var(--jops-bg);box-shadow:inset 0 0 0 1px var(--jops-line),var(--jops-shadow-sm)}
.jops-connitem:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-connname{display:block;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-connsub{display:block;font-size:11px;color:var(--jops-fg-muted);font-family:var(--jops-mono);font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-connnone{padding:6px 4px;font-size:12px;color:var(--jops-fg-muted);line-height:1.6}
.jops-connform{display:flex;flex-direction:column;gap:var(--jops-s3);flex:1;min-width:0;overflow:auto;padding:2px 2px 2px 0}
.jops-note-inline{margin:0;padding:0 8px;line-height:24px;background:transparent;font-size:12px}
.jops-note[data-tone="ok"]{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 9%, transparent)}
.jops-note[data-tone="fail"]{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 9%, transparent)}
.jops-note-inline[data-tone="ok"]{color:var(--dsw-alias-state-success-primary)}
.jops-note-inline[data-tone="fail"]{color:var(--dsw-alias-state-error-primary)}
.jops-field{display:grid;grid-template-columns:88px minmax(0,1fr);gap:var(--jops-s3);align-items:center}
.jops-field[data-top="true"]{align-items:start}
.jops-field > .jops-hint{line-height:var(--jops-h)}
.jops-field[data-top="true"] > .jops-hint{line-height:1.6;padding-top:6px}
.jops-field .jops-input{width:100%}
.jops-combo{position:relative}
.jops-combo-list{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:25;max-height:180px;overflow:auto;background:var(--jops-bg);border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s1);box-shadow:var(--jops-shadow-lg);animation:jops-fade .1s var(--jops-ease)}
.jops-combo-item{display:block;width:100%;padding:6px 8px;border:0;border-radius:var(--jops-r-sm);background:transparent;cursor:pointer;text-align:left;color:inherit;font-family:var(--jops-mono);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jops-combo-item:hover,.jops-combo-item[data-on="true"]{background:var(--jops-surface-2)}
.jops-cand{display:flex;gap:var(--jops-s2);align-items:flex-start;padding:6px 8px;border-radius:var(--jops-r);cursor:pointer;font-size:12px}
.jops-cand[data-on="true"]{background:var(--jops-surface)}
.jops-cand code{font-family:var(--jops-mono);color:var(--jops-fg-muted)}
.jops-row{display:flex;gap:var(--jops-s2);align-items:center;font-size:12px}
.jops-row > .jops-field{flex:1;min-width:0}

/* ===================== 接口页 / 表格 ===================== */
.jops-http-top{display:flex;flex-direction:column;gap:var(--jops-s2);padding:var(--jops-s3) var(--jops-s4) 0;flex:none}
.jops-http-top .jops-toolbar{padding:0}
.jops-http-log .jops-toolbar{padding:0 var(--jops-s4)}
.jops-http-top .jops-hint{padding:0}
.jops-http-log{flex:1;min-height:0;display:flex;flex-direction:column;border-top:1px solid var(--jops-line);margin-top:var(--jops-s2)}
.jops-http-log .jops-toolbar{padding-top:var(--jops-s3)}
.jops-http-top .jops-tablewrap{padding:0 0 var(--jops-s1)}
.jops-http-log .jops-tablewrap{padding:var(--jops-s3) var(--jops-s4)}
.jops-detail-section{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s3);margin-bottom:var(--jops-s3);background:var(--jops-bg)}
.jops-detail-section>h4{margin:0 0 var(--jops-s2);font-size:12px;font-weight:600;color:var(--jops-fg)}
.jops-gridtable td.jops-kv-key{width:180px;color:var(--jops-fg-muted);word-break:break-all}
.jops-gridtable td.jops-kv-val{word-break:break-all;font-family:var(--jops-mono)}
.jops-detail-section .jops-pre{margin:0;border-color:var(--jops-line);background:var(--jops-surface)}
.jops-http-top .jops-table td,.jops-http-log .jops-table td{padding:var(--jops-s1) var(--jops-s2);vertical-align:middle}
.jops-http-top .jops-table th,.jops-http-log .jops-table th{padding:6px var(--jops-s2)}
.jops-http-headwrap{overflow:visible}
/* 网格表格：选择器带两个类，才能压过后面的 .jops-table{border-collapse:collapse} */
.jops-table.jops-gridtable{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);border-collapse:separate;border-spacing:0;overflow:hidden}
.jops-table.jops-gridtable th,.jops-table.jops-gridtable td{border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line)}
.jops-table.jops-gridtable th:last-child,.jops-table.jops-gridtable td:last-child{border-right:0}
.jops-table.jops-gridtable thead th{background:var(--jops-surface)}
.jops-table.jops-gridtable tbody tr:last-child td{border-bottom:0}
.jops-http-top .jops-table td .jops-input{border-color:transparent;background:transparent;box-shadow:none}
.jops-http-top .jops-table td .jops-input:focus{border-color:var(--jops-brand);background:var(--jops-bg);box-shadow:var(--jops-ring)}
.jops-http-top td .jops-input{width:100%}
.jops-http-top td .jops-btn{padding:0 8px;min-width:0;height:var(--jops-h-sm)}
.jops-section{margin-bottom:var(--jops-s3)}
.jops-section h4{margin:0 0 6px;font-size:12px;font-weight:500;color:var(--jops-fg-muted)}
.jops-pre{margin:0;padding:var(--jops-s2) 10px;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);background:var(--jops-surface);font-family:var(--jops-mono);font-size:12px;line-height:1.6;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-all}
.jops-tablewrap{flex:1;min-height:0;overflow:auto;padding:0 var(--jops-s4) var(--jops-s3)}
.jops-table{width:100%;border-collapse:collapse;font-size:12.5px;table-layout:fixed}
.jops-table th{text-align:left;font-weight:500;font-size:11.5px;letter-spacing:.02em;color:var(--jops-fg-muted);padding:var(--jops-s2) var(--jops-s2);border-bottom:1px solid var(--jops-line);position:sticky;top:0;background:var(--jops-bg);z-index:1}
.jops-table td{padding:var(--jops-s2) var(--jops-s2);border-bottom:1px solid var(--jops-line-soft);vertical-align:top}
.jops-table tbody tr{transition:background .1s var(--jops-ease)}
.jops-table tbody tr:hover{background:color-mix(in srgb, var(--jops-surface) 70%, transparent)}
.jops-table td code{font-family:var(--jops-mono)}
.jops-toolbar{display:flex;align-items:center;gap:var(--jops-s2);padding:var(--jops-s2) var(--jops-s4);flex:none}
.jops-nowrap{white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--jops-fg-muted);font-family:var(--jops-mono);font-size:11.5px}
.jops-num{text-align:right;font-variant-numeric:tabular-nums}
.jops-sql-op{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.02em;padding:1px 6px;border-radius:var(--jops-r-sm);background:var(--jops-surface-2);color:var(--jops-fg-muted)}
.jops-sql-ok{font-size:12px;font-weight:500}
.jops-sql-ok[data-ok="true"]{color:var(--dsw-alias-state-success-primary)}
.jops-sql-ok[data-ok="false"]{color:var(--dsw-alias-state-error-primary)}
.jops-sql-text{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--jops-mono);font-size:11.5px;color:var(--jops-fg-muted)}
.jops-cell-btn{display:block;width:100%;text-align:left;background:transparent;border:0;padding:0;cursor:pointer;font:inherit;color:inherit;border-radius:var(--jops-r-sm)}
.jops-cell-btn:hover .jops-sql-text{color:var(--jops-fg);text-decoration:underline;text-decoration-color:color-mix(in srgb, var(--jops-fg-muted) 40%, transparent)}
.jops-cell-btn:focus-visible{outline:none;box-shadow:var(--jops-ring)}

/* ===================== 设置页 ===================== */
.jops-settings{padding:var(--jops-s4) var(--jops-s5) var(--jops-s6);display:flex;flex-direction:column;gap:var(--jops-s4);overflow:auto;min-height:0;flex:1}
.jops-card{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s4);display:flex;flex-direction:column;gap:var(--jops-s3);background:var(--jops-bg);box-shadow:var(--jops-shadow-sm)}
.jops-card b{font-size:13px;font-weight:600}
.jops-lint{border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);padding:var(--jops-s3);margin-top:var(--jops-s2);background:var(--jops-bg);transition:background .2s var(--jops-ease),border-color .2s var(--jops-ease);box-shadow:var(--jops-shadow-sm)}
.jops-lint[data-off="true"]{background:var(--jops-surface);box-shadow:none}
.jops-lint-head{display:flex;align-items:center;gap:var(--jops-s3)}
.jops-lint-id{display:flex;flex-direction:column;gap:2px;min-width:0}
.jops-lint-id b{font-size:13px;font-weight:600}
.jops-lint-id span{font-size:12px;color:var(--jops-fg-muted)}
.jops-lint-ver{height:22px;display:inline-flex;align-items:center;gap:6px;padding:0 9px;border-radius:var(--jops-r-full);border:1px solid var(--jops-line);background:var(--jops-surface);color:var(--jops-fg-muted);font-family:var(--jops-mono);font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap;transition:background .2s var(--jops-ease),border-color .2s var(--jops-ease),color .2s var(--jops-ease)}
.jops-lint-ver[data-state="none"]{color:var(--jops-fg-subtle);background:var(--jops-surface-2);border-color:transparent}
.jops-lint-ver[data-state="busy"]{border-color:color-mix(in srgb, var(--jops-brand) 40%, transparent);color:var(--jops-brand);background:color-mix(in srgb, var(--jops-brand) 8%, transparent)}
.jops-lint-ver[data-state="old"]{border-color:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 40%, transparent);color:var(--dsw-alias-state-warning-primary);background:color-mix(in srgb, var(--dsw-alias-state-warning-primary) 8%, transparent)}
.jops-lint-ver[data-state="new"]{border-color:color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, transparent);color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent)}
.jops-lint-body{display:grid;grid-template-columns:max-content minmax(0,1fr);column-gap:var(--jops-s3);row-gap:10px;align-items:center;margin-top:var(--jops-s3);padding-top:var(--jops-s3);border-top:1px solid var(--jops-line);animation:jops-fade .18s var(--jops-ease)}
.jops-lint-body>.jops-lint-k{font-size:12.5px;color:var(--jops-fg-muted)}
.jops-lint-body .jops-input{width:auto;min-width:180px}
.jops-lint-progress{height:3px;border-radius:2px;background:var(--jops-surface-2);margin-top:10px;overflow:hidden}
.jops-lint-progress i{display:block;height:100%;background:var(--jops-brand);transition:width .18s var(--jops-ease)}
/* 服务端还没回报百分比时先跑一段不确定进度，点下开关就有反馈 */
.jops-lint-progress[data-indet="true"] i{width:35%;animation:jops-indet 1s ease-in-out infinite}
@keyframes jops-indet{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}
.jops-lint-pick{display:inline-flex;align-items:center;gap:6px;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jops-lint-ver[data-state="busy"]::before{content:'◌';display:inline-block;margin-right:4px;animation:jops-spin .8s linear infinite}
.jops-lint-note{font-size:12px;white-space:nowrap;color:var(--jops-fg-muted)}
.jops-lint-note[data-tone="same"]{color:var(--dsw-alias-state-success-primary)}
.jops-lint-note[data-tone="new"]{color:var(--dsw-alias-state-warning-primary)}
.jops-lint-note[data-tone="fail"]{color:var(--dsw-alias-state-error-primary)}
.jops-lint-note[data-tone="none"]{color:var(--jops-fg-subtle)}
.jops-lint-running{font-size:12px;color:var(--jops-fg-muted);display:inline-flex;align-items:center;gap:6px;animation:jops-pulse 1.1s ease-in-out infinite}
.jops-lint-summary{font-size:12px;color:var(--jops-fg-muted);margin:0 0 var(--jops-s2);padding-left:2px;font-variant-numeric:tabular-nums}
@keyframes jops-fade{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:none}}
@keyframes jops-flash{0%{box-shadow:0 0 0 0 rgba(22,163,74,.45)}100%{box-shadow:0 0 0 7px rgba(22,163,74,0)}}
.jops-lint-ver[data-state="new"]{animation:jops-flash .6s ease-out}

/* ===================== SQL 授权表 ===================== */
.jops-permtable{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--jops-line);border-radius:var(--jops-r-lg);overflow:hidden;font-size:12.5px}
.jops-permtable th{height:34px;font-size:11.5px;font-weight:500;letter-spacing:.02em;color:var(--jops-fg-muted);background:var(--jops-surface);text-align:left;padding:0 var(--jops-s3);border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line)}
.jops-permtable td{height:48px;padding:0 var(--jops-s3);border-bottom:1px solid var(--jops-line);border-right:1px solid var(--jops-line);vertical-align:middle;text-align:left}
.jops-permtable th:last-child,.jops-permtable td:last-child{border-right:0}
.jops-permtable tbody tr:last-child td{border-bottom:0}
.jops-permtable tbody tr{transition:background .15s var(--jops-ease)}
.jops-permtable tbody tr:hover{background:color-mix(in srgb, var(--jops-surface) 60%, transparent)}
.jops-permtable th:first-child,.jops-permtable td:first-child{width:34%;min-width:220px}
.jops-permcat b{font-weight:600;font-size:13px;margin-right:var(--jops-s2)}
.jops-permcat span{font-family:var(--jops-mono);font-size:11.5px;color:var(--jops-fg-muted)}
.jops-tgrow{display:flex;align-items:center;gap:var(--jops-s5);flex-wrap:wrap}
.jops-tg{display:inline-flex;align-items:center;gap:var(--jops-s2)}
.jops-tg .jops-tgl{font-size:12.5px;color:var(--jops-fg-muted);white-space:nowrap;line-height:20px}
/* switch 的外观全在 switchControl 的内联样式里；这里只补焦点环，
   避免样式表失效时注意力全部落在内联样式上 */
.jops-sw:focus-visible{outline:none;box-shadow:var(--jops-ring)}
.jops-swrow{display:flex;align-items:center;gap:var(--jops-s3);cursor:pointer;padding:var(--jops-s2) 0;font-size:12.5px;color:var(--jops-fg)}
.jops-swrow>span{flex:1;min-width:0}
.jops-swrow[data-muted="true"]{cursor:not-allowed;color:var(--jops-fg-muted)}
.jops-sw[data-muted="false"]:hover{filter:brightness(.97)}
`

function StatusPill(props) {
  return h('span', { className: 'jops-pill', 'data-state': props.state }, props.label)
}

function OpsLog(props) {
  const items = props.items || []
  const boxRef = useRef(null)
  useEffect(() => {
    const box = boxRef.current
    if (box) box.scrollTop = box.scrollHeight
  }, [items.length])
  if (items.length === 0) return h('div', { className: 'jops-empty' }, txt('opsEmpty'))
  return h('div', { className: 'jops-oplog', ref: boxRef },
    items.map((item, index) => h('div', {
      key: String(item.at) + index,
      'data-status': item.status,
    },
      new Date(item.at).toLocaleTimeString() + '  ' +
      (txt('act_' + item.action) || item.action) +
      (item.status === 'running' ? '  ' + txt('inProgress')
        : item.status === 'error' ? '  ' + (item.error || '')
          : item.status === 'blocked' ? '  ' + txt('blockedHint')
            : '  ok  ' + ((item.ms || 0) / 1000).toFixed(1) + 's'))))
}

// console-style colouring: timestamps dim, levels coloured, stack traces red
const LOG_TOKEN_RE = /(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}[.,]\d{3})|\b(ERROR|FATAL|SEVERE|WARN|WARNING|INFO|DEBUG|TRACE)\b|\b(Caused by:)|\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:Exception|Error))\b/g
const LEVEL_CLASS = { ERROR: 'lg-err', FATAL: 'lg-err', SEVERE: 'lg-err', WARN: 'lg-warn', WARNING: 'lg-warn', INFO: 'lg-info', DEBUG: 'lg-debug', TRACE: 'lg-debug' }

function lineLevel(line) {
  if (/\b(ERROR|FATAL|SEVERE)\b/.test(line) || /Exception|Caused by:/.test(line)) return 'error'
  if (/\b(WARN|WARNING)\b/.test(line)) return 'warn'
  return ''
}

function logSpans(line) {
  const spans = []
  let last = 0
  let match
  LOG_TOKEN_RE.lastIndex = 0
  while ((match = LOG_TOKEN_RE.exec(line)) !== null) {
    if (match.index > last) spans.push(line.slice(last, match.index))
    const cls = match[1] ? 'lg-ts' : match[2] ? LEVEL_CLASS[match[2]] : match[3] ? 'lg-caused' : 'lg-exc'
    spans.push(h('span', { className: cls || undefined }, match[0]))
    last = match.index + match[0].length
    if (match[0].length === 0) LOG_TOKEN_RE.lastIndex += 1
  }
  if (last < line.length) spans.push(line.slice(last))
  return spans
}

const LOG_THEMES = [
  { id: 'theme', label: { zh: '跟随主题', en: 'Theme' } },
  { id: 'paper', label: { zh: '护眼米色', en: 'Paper' } },
  { id: 'graphite', label: { zh: '石墨深灰', en: 'Graphite' } },
  { id: 'midnight', label: { zh: '午夜黑', en: 'Midnight' } },
]
const LOG_THEME_KEY = STATE_KEY + ':log-theme'

function LogPane(props) {
  const logs = props.logs || []
  const [query, setQuery] = useState('')
  const [wrap, setWrap] = useState(false)
  // 跟踪最新：开着就始终停在末尾；关掉以后新日志进来也不打扰当前阅读位置
  const [follow, setFollow] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem(LOG_THEME_KEY) || 'theme')
  const boxRef = useRef(null)
  const shown = React.useMemo(() => (query
    ? logs.filter((line) => line.toLowerCase().includes(query.toLowerCase()))
    : logs), [logs, query])
  // rendering thousands of nodes on every poll is what made the tab feel stuck
  const tail = shown.length > VISIBLE_LOG_LINES ? shown.slice(shown.length - VISIBLE_LOG_LINES) : shown

  useEffect(() => {
    const box = boxRef.current
    if (box && follow) box.scrollTop = box.scrollHeight
  }, [shown.length, expanded, follow])

  useEffect(() => {
    if (!expanded) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        // capture phase: closed log must not also reach the composer's own Esc handling
        event.stopPropagation()
        setExpanded(false)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [expanded])

  const pickTheme = (id) => {
    setTheme(id)
    try {
      localStorage.setItem(LOG_THEME_KEY, id)
    } catch {
      // private mode: keep the choice for this session only
    }
  }

  return h('div', {
    className: expanded ? 'jops-log-wrap jops-log-full' : 'jops-log-wrap',
    'data-theme': theme,
  },
    h('div', { className: 'jops-log-head' },
      h('b', null, txt('logs')),
      h('span', null, String(shown.length)),
      h('span', { className: 'jops-spacer' }),
      h('input', {
        className: 'jops-input',
        style: { width: 160 },
        placeholder: txt('filter'),
        value: query,
        onChange: (e) => setQuery(e.target.value),
      }),
      h('label', { className: 'jops-check' },
        h('input', { type: 'checkbox', checked: wrap, onChange: (e) => setWrap(e.target.checked) }),
        txt('wrap')),
      h('span', { className: 'jops-follow' },
        h('span', { className: 'jops-follow-label' }, txt('follow')),
        switchControl({
          on: follow,
          compact: true,
          label: txt('follow'),
          onChange: (next) => setFollow(next),
        })),
      h('select', {
        className: 'jops-input',
        style: { width: 108 },
        title: txt('logTheme'),
        'aria-label': txt('logTheme'),
        value: theme,
        onChange: (e) => pickTheme(e.target.value),
      }, LOG_THEMES.map((item) => h('option', { key: item.id, value: item.id }, item.label[LANG] || item.label.en))),
      h('button', {
        className: 'jops-btn',
        'data-ghost': 'true',
        title: expanded ? txt('close') : txt('expandLog'),
        'aria-label': expanded ? txt('close') : txt('expandLog'),
        onClick: () => setExpanded((value) => !value),
      }, expanded ? '⤡' : '⤢')),
    h('div', { className: 'jops-log', ref: boxRef, 'data-wrap': wrap ? 'on' : 'off' },
      shown.length === 0
        ? h('div', { className: 'jops-empty' }, txt('logEmpty'))
        : tail.map((line, index) => h('div', {
          key: shown.length - tail.length + index,
          className: 'jops-line',
          'data-lvl': lineLevel(line) || undefined,
        }, logSpans(line)))))
}

function ServiceDetail(props) {
  const { svc, onStart, onStop, onForceStop, onRestart, onBuild, onRemove, onEdit, activities } = props
  const [pane, setPane] = useState('log')
  const [pending, setPending] = useState('')
  const busy = svc.state === 'starting' || svc.state === 'stopping' || svc.state === 'building'
  const running = svc.state === 'running'
  const ops = (activities || []).filter((item) => item.id === svc.id).slice().reverse()
  useEffect(() => {
    if (!busy) setPending('')
  }, [busy])
  // switching selection reuses this component, so a spinner started on the
  // previous service used to keep spinning on the new one
  useEffect(() => {
    setPending('')
  }, [svc.id])
  const stateAct = svc.state === 'starting' ? 'start' : svc.state === 'building' ? 'build' : svc.state === 'stopping' ? 'stop' : ''
  const active = pending || stateAct
  const act = (name, handler, text, extra) => h('button', {
    className: 'jops-btn',
    'data-act': name,
    'data-busy': active === name ? 'true' : 'false',
    disabled: Boolean(extra && extra.disabled),
    onClick: () => {
      setPending(name)
      const result = handler(svc)
      // 请求一结束就收 spinner：启动被端口占用挡下时状态不会变，不能靠 busy 收
      if (result && typeof result.then === 'function') result.then(() => setPending(''), () => setPending(''))
      else setPending('')
    },
  }, active === name ? h('span', { className: 'jops-spin', 'aria-hidden': 'true' }) : null, text)
  return h('div', { className: 'jops-main' },
    h('div', { className: 'jops-detail-head' },
      h('span', { className: 'jops-dot', 'data-state': svc.state, 'data-busy': busy ? 'true' : 'false' }),
      h('span', { className: 'jops-title' }, svc.name),
      h(StatusPill, { state: svc.state, label: txt(STATE_KEY[svc.state] || 'state_stopped') }),
      h('span', { className: 'jops-actions' },
        act('start', onStart, txt('start'), { disabled: busy || running }),
        svc.state === 'stopping'
          // 优雅停机可能要等 30 秒，这期间给一个立刻强杀的出口
          ? act('stop', onForceStop, txt('forceStop'), { disabled: false })
          : act('stop', onStop, txt('stop'), { disabled: busy || svc.state === 'stopped' }),
        act('restart', onRestart, txt('restart'), { disabled: busy || !running }),
        act('build', onBuild, txt('build'), { disabled: busy }),
        act('edit', onEdit, txt('edit'), { disabled: busy, instant: true }),
        act('remove', onRemove, txt('remove'), { disabled: busy, instant: true }))),
    h('div', { className: 'jops-meta' },
      h('span', null, txt('main') + ' ', h('b', null, svc.mainClass || '—')),
      h('span', null, txt('pid') + ' ', h('b', null, svc.pid ? String(svc.pid) : '—')),
      h('span', null, txt('lastStart') + ' ', h('b', null, svc.startup ? svc.startup.seconds + 's' : '—')),
      svc.build
        ? h('span', null, txt('build') + ' ', h('b', null, svc.build.skipped ? txt('buildSkipped') : svc.build.seconds + 's'))
        : null),
    svc.lastError ? h('div', { className: 'jops-note' }, svc.lastError) : null,
    h(RadixTabs.Root, { className: 'jops-pane-body', value: pane, onValueChange: setPane },
      h(RadixTabs.List, { className: 'jops-subtabs' },
        h(RadixTabs.Trigger, { value: 'log' }, txt('logs')),
        h(RadixTabs.Trigger, { value: 'ops' }, txt('ops') + (ops.length > 0 ? ' (' + ops.length + ')' : ''))),
      h(RadixTabs.Content, { value: 'log' }, h(LogPane, { logs: svc.logs })),
      h(RadixTabs.Content, { value: 'ops' }, h(OpsLog, { items: ops }))))
}

// 超长类名中间省略：保留包前缀和类名尾部，下拉里永远单行
function shortenClass(name) {
  if (name.length <= 52) return name
  return name.slice(0, 18) + '…' + name.slice(-32)
}

// 滚轮默认会把整个弹窗一起滚上去；这里拦下来只滚参数框自己
function SelfScrollTextarea(props) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const onWheel = (event) => {
      event.preventDefault()
      node.scrollTop += event.deltaY
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [])
  return h('textarea', { ...props, ref })
}

// 弹窗的 portal 目标：面板根节点。留在面板里，遮罩只盖面板不盖整页
const DialogHost = React.createContext(null)

// 面板内弹窗。Esc、焦点陷阱、点遮罩关闭、滚动锁定都交给 Radix，
// 以前手写 overlay 时 Tab 键能跑到背后的页面上
function JopsDialog(props) {
  const host = React.useContext(DialogHost)
  return h(RadixDialog.Root, {
    open: true,
    onOpenChange: (next) => { if (!next) props.onClose() },
  },
    h(RadixDialog.Portal, { container: host || undefined },
      h(RadixDialog.Overlay, { className: 'jops-overlay' },
        h(RadixDialog.Content, {
          className: 'jops-dialog' + (props.wide ? ' jops-dialog-wide' : ''),
          'data-float': props.float ? 'true' : 'false',
          'data-auto': props.auto ? 'true' : 'false',
          'aria-label': props.title,
        },
          // 标题文字已经画在 .jops-dialog-head 里，这里只补读屏需要的名字
          h(RadixDialog.Title, { className: 'jops-sr' }, props.title),
          props.children))))
}

function AddDialog(props) {
  const { candidates, onClose, onAdd, verify } = props
  const first = candidates[0]
  const [query, setQuery] = useState((first && first.mainClass) || '')
  const [open, setOpen] = useState(false)
  const [port, setPort] = useState(String((first && first.port) || ''))
  const [name, setName] = useState((first && first.suggestedName) || '')
  const [vmArgs, setVmArgs] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const needle = query.trim().toLowerCase()
  // 包名、类名、模块目录都能命中，方便从任意前缀联想到启动类
  const matches = needle === ''
    ? candidates
    : candidates.filter((cand) => `${cand.mainClass} ${cand.moduleDir} ${cand.suggestedName || ''}`
      .toLowerCase()
      .includes(needle))
  const choose = (cand) => {
    setQuery(cand.mainClass)
    setOpen(false)
    setError('')
    if (cand.port) setPort(String(cand.port))
    setName(cand.suggestedName || '')
  }
  // mousedown 而不是 click：input 的 blur 会把列表先卸掉，click 就落不到按钮上
  const list = open && matches.length > 0
    ? h('div', { className: 'jops-combo-list' }, matches.slice(0, 12).map((cand) => h('button', {
      key: cand.mainClass,
      type: 'button',
      className: 'jops-combo-item',
      title: cand.mainClass,
      'data-on': String(cand.mainClass === query.trim()),
      onMouseDown: (event) => {
        event.preventDefault()
        choose(cand)
      },
    }, shortenClass(cand.mainClass))))
    : null
  const confirm = async () => {
    const mainClass = query.trim()
    if (mainClass === '') return setError(txt('errMainClass'))
    if (name.trim() === '') return setError(txt('errName'))
    setBusy(true)
    setError('')
    try {
      const found = await verify(mainClass)
      if (!found || !found.ok) {
        setError((found && found.error) || txt('errMainClassMissing'))
        return
      }
      const located = found.located || {}
      // 手输的类名没有候选端口，回落到源码里读到的 server.port
      const chosenPort = Number(port) > 0 ? Number(port) : Number(located.port) || 0
      if (chosenPort <= 0) {
        setError(txt('errPort'))
        return
      }
      if (!(Number(port) > 0)) setPort(String(chosenPort))
      onAdd({
        mainClass,
        moduleDir: located.moduleDir,
        port: chosenPort,
        name: name.trim(),
        vmArgs: vmArgs.trim(),
      })
    } finally {
      setBusy(false)
    }
  }
  return h(JopsDialog, { title: txt('addTitle'), float: open && matches.length > 0, onClose },
      h('div', { className: 'jops-dialog-head' }, txt('addTitle')),
      h('div', { className: 'jops-dialog-body', 'data-float': open && matches.length > 0 ? 'true' : 'false' },
        h('div', { className: 'jops-hint' }, txt('addHint')),
        candidates.length === 0 ? h('div', { className: 'jops-hint' }, txt('noCandidates')) : null,
        h('div', { className: 'jops-field' },
          h('span', null, txt('manual'), h('b', { className: 'jops-req' }, '*')),
          h('div', { className: 'jops-combo' },
            h('input', {
              className: 'jops-input',
              placeholder: txt('manualHint'),
              value: query,
              autoComplete: 'off',
              onChange: (e) => {
                setQuery(e.target.value)
                setError('')
                setOpen(true)
              },
              onFocus: () => setOpen(true),
              onBlur: () => setTimeout(() => setOpen(false), 120),
            }),
            list)),
        h('div', { className: 'jops-field' },
          h('span', null, txt('port'), h('b', { className: 'jops-req' }, '*')),
          h('input', {
            className: 'jops-input',
            style: { width: 120 },
            inputMode: 'numeric',
            value: port,
            onChange: (e) => {
              setPort(e.target.value.replace(/[^\d]/g, ''))
              setError('')
            },
          })),
        h('div', { className: 'jops-field' },
          h('span', null, txt('name'), h('b', { className: 'jops-req' }, '*')),
          h('input', {
            className: 'jops-input',
            value: name,
            onChange: (e) => {
              setName(e.target.value)
              setError('')
            },
          })),
        h('div', { className: 'jops-field', 'data-top': 'true' },
          h('span', null, txt('vmArgs')),
          h(SelfScrollTextarea, {
            className: 'jops-input jops-textarea',
            placeholder: txt('vmArgsHint'),
            value: vmArgs,
            onChange: (e) => setVmArgs(e.target.value),
          })),
        error === '' ? null : h('div', { className: 'jops-hint', 'data-error': 'true' }, error)),
      h('div', { className: 'jops-dialog-foot' },
        h('button', { className: 'jops-btn', onClick: onClose }, txt('cancel')),
        h('button', {
          className: 'jops-btn',
          'data-primary': 'true',
          disabled: busy,
          onClick: () => void confirm(),
        }, busy ? txt('checking') : txt('confirm'))))
}
function EditDialog(props) {
  const { svc, onClose, onSave } = props
  const [vmArgs, setVmArgs] = useState(svc.vmArgs || '')
  const [port, setPort] = useState(String(svc.port || ''))
  const [profile, setProfile] = useState(svc.profile || '')
  return h(JopsDialog, { title: txt('editTitle') + ' · ' + svc.name, onClose },
      h('div', { className: 'jops-dialog-head' }, txt('editTitle') + ' · ' + svc.name),
      h('div', { className: 'jops-dialog-body' },
        h('div', { className: 'jops-field', 'data-top': 'true' },
          h('span', { className: 'jops-hint' }, txt('vmArgs')),
          h(SelfScrollTextarea, {
            className: 'jops-input jops-textarea',
            placeholder: txt('vmArgsHint'),
            value: vmArgs,
            onChange: (e) => setVmArgs(e.target.value),
          })),
        h('div', { className: 'jops-field' },
          h('span', { className: 'jops-hint' }, txt('port')),
          h('input', {
            className: 'jops-input',
            inputMode: 'numeric',
            value: port,
            onChange: (e) => setPort(e.target.value.replace(/[^\d]/g, '')),
          })),
        h('div', { className: 'jops-field' },
          h('span', { className: 'jops-hint' }, txt('profile')),
          h('input', {
            className: 'jops-input',
            value: profile,
            onChange: (e) => setProfile(e.target.value),
          })),
        h('div', { className: 'jops-hint' }, txt('editHint'))),
      h('div', { className: 'jops-dialog-foot' },
        h('button', { className: 'jops-btn', onClick: onClose }, txt('cancel')),
        h('button', {
          className: 'jops-btn',
          'data-primary': 'true',
          disabled: port === '' || Number(port) <= 0,
          onClick: () => onSave({ vmArgs, port: Number(port), profile }),
        }, txt('confirm'))))
}

function SqlConfirmDialog(props) {
  const item = props.item
  const text = (key, vars) => fill(txt(key), vars)
  // Esc 或点遮罩等同于取消，不能直接关掉：这条确认还要给出结论
  return h(JopsDialog, { title: text('confirmTitle', { group: item.group }), wide: true, onClose: () => props.onAnswer(item.id, false) },
      h('div', { className: 'jops-dialog-head' }, text('confirmTitle', { group: item.group })),
      h('div', { className: 'jops-dialog-body' },
        h('p', { className: 'jops-hint' }, text('confirmBody', { connection: item.connection })),
        h('pre', { className: 'jops-pre' }, item.sql)),
      h('div', { className: 'jops-dialog-foot' },
        h('button', {
          className: 'jops-btn',
          onClick: () => props.onAnswer(item.id, false),
        }, txt('confirmCancel')),
        h('button', {
          className: 'jops-btn',
          'data-primary': 'true',
          onClick: () => props.onAnswer(item.id, true),
        }, txt('confirmRun'))))
}

function PortConflictDialog(props) {
  const { svc, blocked, action, onCancel, onConfirm } = props
  const fill = (key, vars) => txt(key).replace(/\{(\w+)\}/g, (whole, name) => (vars[name] ?? whole))
  return h(JopsDialog, { title: `${txt('portBusyTitle')} · ${svc.name}`, onClose: onCancel },
      h('div', { className: 'jops-dialog-head' }, `${txt('portBusyTitle')} · ${svc.name}`),
      h('div', { className: 'jops-dialog-body' },
        h('div', { className: 'jops-hint' },
          fill('portBusyLine', { port: blocked.port, process: blocked.process || 'process', pid: blocked.pid })),
        blocked.serviceName
          ? h('div', { className: 'jops-hint' }, fill('portBusyOwnedLine', { name: blocked.serviceName }))
          : null,
        h('div', { className: 'jops-hint' }, txt('portBusyAsk'))),
      h('div', { className: 'jops-dialog-foot' },
        h('button', { className: 'jops-btn', onClick: onCancel }, txt('cancel')),
        h('button', {
          className: 'jops-btn',
          'data-primary': 'true',
          onClick: () => onConfirm(action),
        }, txt('portBusyKill'))))
}

function ServicesTab(props) {
  const { snapshot, selectedId, onSelect, onAddClick, handlers, logs } = props
  const services = snapshot.services || []
  const svc = services.find((item) => item.id === selectedId) || services[0]

  const rows = services.map((item) => h('div', {
    key: item.id,
    className: 'jops-svc',
    'data-on': svc && item.id === svc.id ? 'true' : 'false',
    role: 'button',
    tabIndex: 0,
    onClick: () => onSelect(item.id),
    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(item.id) },
  },
    h('span', {
      className: 'jops-dot',
      'data-state': item.state,
      'data-busy': item.state === 'starting' || item.state === 'building' || item.state === 'stopping' ? 'true' : 'false',
    }),
    h('span', { className: 'jops-svc-name' }, item.name),
    h('span', { className: 'jops-spacer' }),
    h('span', { className: 'jops-svc-port' }, ':' + item.port)))

  const side = h('div', { className: 'jops-side' },
    h('div', { className: 'jops-side-head' },
      h('b', null, txt('services')),
      h('span', { className: 'jops-spacer' }),
      h('button', { className: 'jops-btn', 'data-ghost': 'true', onClick: onAddClick }, '+ ' + txt('add'))),
    h('div', { className: 'jops-side-list' },
      rows))

  const detail = svc
    ? h(ServiceDetail, {
      svc: Object.assign({}, svc, { logs: logs[svc.id] || [] }),
      activities: snapshot.activities || [],
      onStart: handlers.start,
      onStop: handlers.stop,
      onForceStop: handlers.forceStop,
      onRestart: handlers.restart,
      onBuild: handlers.build,
      onRemove: handlers.remove,
      onEdit: handlers.edit,
    })
    : h('div', { className: 'jops-main' },
      h('div', { className: 'jops-empty-center' },
        h('div', { className: 'jops-empty-art' }, '+'),
        h('div', { className: 'jops-empty-title' }, txt('emptyTitle')),
        h('div', { className: 'jops-empty-sub' }, txt('emptySub')),
        h('button', { className: 'jops-btn', 'data-primary': 'true', onClick: onAddClick }, '+ ' + txt('add'))))

  return h('div', { className: 'jops-pane' },
    h('div', { className: 'jops-body' }, side, detail))
}

const BLANK_CONN = { id: '', name: '', driver: 'mysql', host: '127.0.0.1', port: '3306', database: '', user: 'root', password: '', hasPassword: false }

function connDraft(record) {
  if (!record) return Object.assign({}, BLANK_CONN)
  return {
    id: record.id || '',
    name: record.name || '',
    driver: record.driver || 'mysql',
    host: record.host || '',
    port: String(record.port || 3306),
    database: record.database || '',
    user: record.user || '',
    password: '',
    hasPassword: Boolean(record.hasPassword),
  }
}

// 连接串只做展示，避免再维护一套 JDBC URL 解析
function connUrl(draft) {
  const host = draft.host || 'localhost'
  const port = draft.port || (draft.driver === 'postgres' ? '5432' : '3306')
  const scheme = draft.driver === 'postgres' ? 'postgresql' : 'mysql'
  return `jdbc:${scheme}://${host}:${port}${draft.database ? '/' + draft.database : ''}`
}

function SqlConnDialog(props) {
  const connections = props.connections || []
  const [draft, setDraft] = useState(() => connDraft(connections[0]))
  const [note, setNote] = useState({ tone: '', text: '' })
  const [busy, setBusy] = useState('')
  const put = (key) => (e) => setDraft(Object.assign({}, draft, { [key]: e.target.value }))
  const field = (key, label, extra) => h('label', { className: 'jops-field' },
    h('span', null, label),
    h('input', Object.assign({
      className: 'jops-input',
      value: draft[key] ?? '',
      onChange: put(key),
    }, extra || {})))
  const quiet = () => setNote({ tone: '', text: '' })
  const pick = (record) => {
    setDraft(connDraft(record))
    quiet()
  }
  const blank = () => {
    setDraft(Object.assign({}, BLANK_CONN))
    quiet()
  }
  const save = async () => {
    setBusy('save')
    const data = await props.run('sqlConnSave', {
      id: draft.id,
      name: draft.name,
      driver: draft.driver,
      host: draft.host,
      port: Number(draft.port) || 3306,
      database: draft.database,
      user: draft.user,
      password: draft.password,
    })
    setBusy('')
    const saved = data && data.sqlSaved
    if (!saved) return
    // 保存后留在弹窗里，左侧列表和右侧表单都换成服务器回传的那条记录
    const kept = (data.sqlConnections || []).find((item) => item.id === saved.id)
    if (kept) setDraft(connDraft(kept))
    setNote({ tone: 'ok', text: txt('connSaved') })
  }
  const test = async () => {
    setBusy('test')
    const data = await props.run('sqlConnTest', { host: draft.host, port: Number(draft.port) || 3306 })
    setBusy('')
    const result = data && data.test
    if (!result) return
    setNote(result.ok
      ? { tone: 'ok', text: `${txt('connTestOk')} · ${result.ms}ms` }
      : { tone: 'fail', text: `${txt('connTestFail')} · ${result.error}` })
  }
  const drop = async () => {
    if (!draft.id) return
    const data = await props.run('sqlConnRemove', { id: draft.id })
    const rest = (data && data.sqlConnections) || []
    setDraft(connDraft(rest[0] ?? connections.find((item) => item.id !== draft.id)))
    quiet()
  }

  const addButton = h('button', {
    className: 'jops-connicon',
    title: txt('connNew'),
    'aria-label': txt('connNew'),
    onClick: blank,
  }, '+')
  const removeButton = h('button', {
    className: 'jops-connicon',
    title: txt('connRemove'),
    'aria-label': txt('connRemove'),
    disabled: !draft.id,
    onClick: drop,
  }, '−')
  const items = connections.length === 0
    ? h('div', { className: 'jops-connnone' }, txt('connNone'))
    : h('div', { className: 'jops-connitems' }, connections.map((item) => h('button', {
      key: item.id,
      className: 'jops-connitem',
      'data-on': String(item.id === draft.id),
      title: `${item.host}:${item.port}/${item.database}`,
      onClick: () => pick(item),
    },
      h('span', { className: 'jops-connname' }, item.name || item.id),
      h('span', { className: 'jops-connsub' }, `${item.host}:${item.port}`))))
  const connList = h('div', { className: 'jops-connlist' },
    h('div', { className: 'jops-connhead' },
      h('span', { className: 'jops-connlabel' }, txt('connListLabel')),
      addButton,
      removeButton),
    items)
  const statusRow = h('div', { className: 'jops-field' },
    h('span', null, txt('connStatus')),
    note.text
      ? h('span', { className: 'jops-note jops-note-inline', 'data-tone': note.tone }, note.text)
      : h('span', { className: 'jops-hint' }, '—'))
  const connForm = h('div', { className: 'jops-connform' },
    field('name', txt('connName')),
    h('div', { className: 'jops-row' },
      h('label', { className: 'jops-field' },
        h('span', null, txt('connDriver')),
        h('select', { className: 'jops-input', value: draft.driver, onChange: put('driver') },
          ['mysql', 'postgres'].map((item) => h('option', { key: item, value: item }, item === 'postgres' ? 'PostgreSQL' : 'MySQL')))),
      field('database', txt('connDb'))),
    h('div', { className: 'jops-row' },
      field('host', txt('connHost')),
      field('port', txt('connPort'), { style: { width: 90 } })),
    h('div', { className: 'jops-row' },
      field('user', txt('connUser')),
      field('password', txt('connPassword'), {
        type: 'password',
        placeholder: draft.hasPassword ? txt('connPasswordSaved') : '',
        autoComplete: 'new-password',
      })),
    h('label', { className: 'jops-field' },
      h('span', null, txt('connUrl')),
      h('code', { className: 'jops-url' }, connUrl(draft))),
    statusRow,
    h('div', { className: 'jops-hint' }, txt('connSecure')))
  const body = h('div', { className: 'jops-dialog-body' },
    h('div', { className: 'jops-conn' }, connList, connForm))
  const foot = h('div', { className: 'jops-dialog-foot' },
    h('button', { className: 'jops-btn', disabled: busy !== '', onClick: test },
      busy === 'test' ? txt('connTesting') : txt('connTest')),
    h('button', { className: 'jops-btn', disabled: busy !== '', onClick: () => props.onClose() }, txt('close')),
    h('button', { className: 'jops-btn', 'data-primary': 'true', disabled: busy !== '', onClick: save }, txt('confirm')))
  return h(JopsDialog, { title: txt('connTitle'), wide: true, onClose: props.onClose },
      h('div', { className: 'jops-dialog-head' }, txt('connTitle')),
      body,
      foot)
}

function HttpDetailDialog(props) {
  const { row, onClose } = props
  const emptyText = txt('httpBodyEmpty')
  const entriesOf = (obj) => (obj ? Object.entries(obj) : [])
  const kvTable = (pairs) => {
    const list = pairs || []
    if (list.length === 0) return h('div', { className: 'jops-hint' }, emptyText)
    return h('table', { className: 'jops-table jops-gridtable' },
      h('thead', null, h('tr', null,
        h('th', null, txt('httpName')),
        h('th', null, txt('httpValue')))),
      h('tbody', null, list.map(([key, value], index) => h('tr', { key: index },
        h('td', { className: 'jops-kv-key' }, String(key)),
        h('td', { className: 'jops-kv-val' }, String(value))))))
  }
  // JSON 响应/请求体直接拍平看不动，能解析就缩进两格展示
  const pretty = (text) => {
    const raw = String(text ?? '')
    const trimmed = raw.trim()
    if (!trimmed || (trimmed[0] !== '{' && trimmed[0] !== '[')) return raw
    try {
      return JSON.stringify(JSON.parse(trimmed), null, 2)
    } catch {
      return raw
    }
  }
  const paramsOf = (url) => {
    const at = url.indexOf('?')
    if (at < 0) return []
    return url.slice(at + 1).split('&').filter(Boolean).map((pair) => {
      const eq = pair.indexOf('=')
      const decode = (part) => {
        try { return decodeURIComponent(part) } catch { return part }
      }
      return [decode(eq < 0 ? pair : pair.slice(0, eq)), decode(eq < 0 ? '' : pair.slice(eq + 1))]
    })
  }
  const card = (title, node) => h('div', { className: 'jops-detail-section' },
    h('h4', null, title),
    node)
  const code = (body) => h('pre', { className: 'jops-pre' }, body)
  const method = String(row.method ?? '')
  const url = String(row.url ?? '')
  const params = paramsOf(url)
  const paramNode = kvTable(params)
  const resBody = row.error
    ? row.error
    : pretty(row.resBody || emptyText) + (row.truncated ? '\n' + txt('httpTruncated') : '')
  return h(JopsDialog, { title: method + ' ' + url, wide: true, onClose },
      h('div', { className: 'jops-dialog-head' }, method + ' ' + url),
      h('div', { className: 'jops-dialog-body' },
        card(txt('httpReqParams'), paramNode),
        card(txt('httpReqHeaders'), kvTable(entriesOf(row.reqHeaders))),
        row.reqBody ? card(txt('httpReqBody'), code(pretty(row.reqBody))) : null,
        card(txt('httpResHeaders'), kvTable(entriesOf(row.resHeaders))),
        card(txt('httpResBody'), code(resBody))),
      h('div', { className: 'jops-dialog-foot' },
        h('button', { className: 'jops-btn', 'data-primary': 'true', onClick: onClose }, txt('close'))))
}

function HttpTab(props) {
  const stored = props.headers || []
  const log = props.log || []
  const [draft, setDraft] = useState([])
  const [notice, setNotice] = useState(null)
  const [detail, setDetail] = useState(null)
  const noticeTimer = useRef(null)
  const storedKey = JSON.stringify(stored)
  // the server list only changes on save or workspace switch; local edits survive meanwhile
  useEffect(() => {
    setDraft(stored.map((row) => ({ ...row })))
  }, [storedKey])
  useEffect(() => () => clearTimeout(noticeTimer.current), [])
  const patchRow = (index, patch) =>
    setDraft((list) => list.map((row, at) => (at === index ? { ...row, ...patch } : row)))
  const addRow = () => setDraft((list) => [...list, { id: '', name: '', value: '', enabled: true }])
  const dropRow = (index) => setDraft((list) => list.filter((_, at) => at !== index))
  const flash = (tone, text) => {
    setNotice({ tone, text })
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 2_000)
  }
  const save = async () => {
    const data = await props.run('httpSave', { headers: draft })
    if (data) flash('ok', txt('httpSaved'))
    else flash('fail', txt('httpSaveFailed'))
  }

  const headerRows = draft.map((row, index) => {
    const nameCell = h('td', null, h('input', {
      className: 'jops-input',
      value: row.name,
      spellCheck: false,
      placeholder: 'Authorization',
      onChange: (e) => patchRow(index, { name: e.target.value }),
    }))
    const valueCell = h('td', null, h('input', {
      className: 'jops-input',
      value: row.value,
      spellCheck: false,
      placeholder: 'Bearer ...',
      onChange: (e) => patchRow(index, { value: e.target.value }),
    }))
    const enabledCell = h('td', null, h('input', {
      type: 'checkbox',
      checked: row.enabled !== false,
      onChange: (e) => patchRow(index, { enabled: e.target.checked }),
    }))
    const dropCell = h('td', { className: 'jops-delcell' }, h('button', {
      className: 'jops-rowdel',
      title: txt('remove'),
      'aria-label': txt('remove'),
      onClick: () => dropRow(index),
    }, '×'))
    return h('tr', { key: row.id || `row-${index}` }, nameCell, valueCell, enabledCell, dropCell)
  })

  const headerTable = h('table', { className: 'jops-table jops-gridtable' },
      h('thead', null, h('tr', null,
        h('th', { style: { width: 190 } }, txt('httpName')),
        h('th', null, txt('httpValue')),
        h('th', { style: { width: 64 } }, txt('httpEnabled')),
        h('th', { style: { width: 44 } }, ''))),
      h('tbody', null, headerRows))

  const logRows = log.map((row, index) => {
    const status = row.status != null ? String(row.status) : (row.error ? txt('okNo') : '—')
    const statusCell = h('td', null, h('span', {
      className: 'jops-sql-ok',
      'data-ok': String(Boolean(row.ok)),
    }, status))
    const detailCell = h('td', null, h('button', {
      className: 'jops-btn',
      onClick: () => setDetail(row),
    }, txt('httpDetail')))
    return h('tr', { key: `${row.at}-${index}` },
      h('td', { className: 'jops-nowrap' }, new Date(row.at).toLocaleString()),
      h('td', null, h('code', null, row.method)),
      h('td', null, h('code', { className: 'jops-sql-text' }, row.url)),
      h('td', { className: 'jops-num' }, row.ms != null ? `${row.ms} ms` : '—'),
      statusCell,
      detailCell)
  })

  const logTable = h('div', { className: 'jops-tablewrap' },
      h('table', { className: 'jops-table' },
        h('thead', null, h('tr', null,
          h('th', null, txt('col_at')),
          h('th', { style: { width: 70 } }, txt('col_method')),
          h('th', null, txt('col_url')),
          h('th', { style: { width: 82 } }, txt('col_ms')),
          h('th', { style: { width: 70 } }, txt('col_status')),
          h('th', { style: { width: 64 } }, ''))),
        h('tbody', null, logRows)))

  const top = h('div', { className: 'jops-http-top' },
    h('div', { className: 'jops-toolbar' },
      h('b', null, txt('httpHeaders')),
      h('span', { className: 'jops-spacer' }),
      notice ? h('span', { className: 'jops-note-inline', 'data-tone': notice.tone }, notice.text) : null,
      h('button', { className: 'jops-btn', onClick: addRow }, txt('httpAdd')),
      h('button', { className: 'jops-btn', 'data-primary': 'true', onClick: () => void save() }, txt('httpSave'))),
    h('div', { className: 'jops-hint' }, txt('httpHeadersHint')),
    h('div', { className: 'jops-tablewrap jops-http-headwrap' }, headerTable))

  const bottom = h('div', { className: 'jops-http-log' },
    h('div', { className: 'jops-toolbar', style: { padding: '0 12px' } },
      h('b', null, txt('httpLog')),
      h('span', { className: 'jops-spacer' }),
      h('span', { className: 'jops-hint' }, txt('httpNote'))),
    logTable)

  return h('div', { className: 'jops-pane' },
    top,
    bottom,
    detail ? h(HttpDetailDialog, { row: detail, onClose: () => setDetail(null) }) : null)
}

function SqlTab(props) {
  const rows = props.sqlLog || []
  const connections = props.connections || []
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const [connId, setConnId] = useState('')
  const current = connections.find((item) => item.id === connId) || connections[0]
  // 操作类型优先用记录里的字段，没有就取 SQL 的第一个关键字
  const opOf = (row) => {
    if (row.op) return String(row.op).toUpperCase()
    const first = String(row.sql || '').trim().match(/^[A-Za-z]+/)
    return first ? first[0].toUpperCase() : '—'
  }
  const okOf = (row) => (typeof row.ok === 'boolean' ? row.ok : row.status === 'ok')
  return h('div', { className: 'jops-pane' },
    h('div', { className: 'jops-toolbar' },
      h('b', null, txt('sqlHistory')),
      h('span', { className: 'jops-spacer' }),
      connections.length > 0
        ? h('select', {
          className: 'jops-input',
          style: { width: 200 },
          title: txt('connPick'),
          value: current ? current.id : '',
          onChange: (e) => setConnId(e.target.value),
        }, connections.map((item) => h('option', { key: item.id, value: item.id }, `${item.name} · ${item.database || item.host}`)))
        : h('span', { className: 'jops-hint' }, txt('connNone')),
      h('button', { className: 'jops-btn', 'data-dark': 'true', onClick: () => setOpen(true) }, '+ ' + txt('connTitle')),
      h('span', { className: 'jops-hint' }, txt('sqlNote'))),
    rows.length === 0
      ? h('div', { className: 'jops-empty' }, txt('sqlEmpty'))
      : h('div', { className: 'jops-tablewrap' },
        h('table', { className: 'jops-table' },
          h('thead', null, h('tr', null,
            h('th', { style: { width: 156 } }, txt('col_at')),
            h('th', { style: { width: 88 } }, txt('col_op')),
            h('th', null, txt('col_sql')),
            h('th', { style: { width: 72 } }, txt('col_ok')),
            h('th', { style: { width: 88 }, textAlign: 'right' }, txt('col_affected')))),
          h('tbody', null, rows.map((row, index) => h('tr', { key: index },
            h('td', { className: 'jops-nowrap' }, new Date(row.time ?? row.at).toLocaleString()),
            h('td', null, h('span', { className: 'jops-sql-op', 'data-op': opOf(row) }, opOf(row))),
            h('td', null, h('button', {
              className: 'jops-cell-btn',
              title: txt('sqlOpen'),
              onClick: () => setDetail(row),
            }, h('code', { className: 'jops-sql-text' }, row.sql))),
            h('td', null, h('span', { className: 'jops-sql-ok', 'data-ok': String(okOf(row)) },
              okOf(row) ? txt('okYes') : txt('okNo'))),
            h('td', { className: 'jops-num' },
              row.affected != null ? String(row.affected) : '—')))))),
    open ? h(SqlConnDialog, { connections, run: props.run, onClose: () => setOpen(false) }) : null,
    detail ? h(SqlDetailDialog, { row: detail, onClose: () => setDetail(null) }) : null)
}

// 表格里只放得下一行，完整语句放到弹窗里看
function SqlDetailDialog(props) {
  const row = props.row
  const op = String(row.op || '').toUpperCase()
  const ok = typeof row.ok === 'boolean' ? row.ok : row.status === 'ok'
  const rows = [
    [txt('col_at'), new Date(row.time ?? row.at).toLocaleString()],
    [txt('col_op'), op || '—'],
    [txt('col_ok'), ok ? txt('okYes') : txt('okNo')],
    [txt('col_affected'), row.affected != null ? String(row.affected) : '—'],
    [txt('col_ms'), row.ms != null ? row.ms + ' ms' : '—'],
  ]
  return h(JopsDialog, { title: txt('sqlDetail'), wide: true, auto: true, onClose: props.onClose },
    h('div', { className: 'jops-dialog-head' }, txt('sqlDetail')),
    h('div', { className: 'jops-dialog-body' },
      h('table', { className: 'jops-gridtable' },
        h('tbody', null, rows.map((pair, index) => h('tr', { key: index },
          h('td', { className: 'jops-kv-key' }, pair[0]),
          h('td', { className: 'jops-kv-val' }, pair[1]))))),
      h('div', { className: 'jops-detail-section' },
        h('h4', null, txt('col_sql')),
        h('pre', { className: 'jops-pre' }, row.sql || '—')),
      row.error ? h('div', { className: 'jops-detail-section' }, h('h4', null, 'Error'), h('pre', { className: 'jops-pre' }, String(row.error))) : null),
    h('div', { className: 'jops-dialog-foot' },
      h('button', { className: 'jops-btn', 'data-primary': 'true', onClick: props.onClose }, txt('close'))))
}

function LintCard(props) {
  const lint = props.lint || { tools: {} }
  const tools = props.tools || []
  const busy = props.busy
  const [checkedAt, setCheckedAt] = useState(0)
  // 打开开关到服务端回报 progress 之间有 1s 空窗，用本地 pending 立刻锁住开关
  const [pending, setPending] = useState({})
  // 检查更新要等一次网络往返，期间给按钮一个「检查中」并在结束后留下结果
  const [checking, setChecking] = useState({})
  const [checkedMsg, setCheckedMsg] = useState({})
  const run = props.run

  const save = (tool, patch) => run('lintSave', Object.assign({ tool }, patch))

  const check = async (tool) => {
    const slot = tool || 'all'
    setChecking((prev) => Object.assign({}, prev, { [slot]: true }))
    try {
      const data = await run('lintCheck', tool ? { tool } : {})
      // the reply may carry no lint block (failed request or older host);
      // the snapshot the cards already render is then the safer source
      const tools = (data && data.lint && data.lint.tools) || (lint && lint.tools) || {}
      const names = tool ? [tool] : Object.keys(tools)
      const nextMsg = {}
      names.forEach((key) => {
        const info = tools[key] || {}
        // 未安装时没有版本可比，别说成「检查失败」
        if (!info.version) {
          nextMsg[key] = { tone: 'none', text: txt('lintNotInstalled') }
          return
        }
        nextMsg[key] = info.latest && info.latest !== info.version
          ? { tone: 'new', text: txt('lintNewVersion') + ' v' + info.latest }
          : { tone: 'same', text: txt('lintUpToDate') + ' · v' + info.version }
      })
      if (!names.length || Object.keys(nextMsg).length === 0) {
        nextMsg[tool || 'checkstyle'] = { tone: 'fail', text: txt('lintCheckFailed') }
      }
      setCheckedMsg((prev) => Object.assign({}, prev, nextMsg))
      setCheckedAt(Date.now())
    } finally {
      setChecking((prev) => {
        const left = Object.assign({}, prev)
        delete left[slot]
        return left
      })
    }
  }

  const toggle = async (tool, next) => {
    const tool_ = lint.tools[tool] || {}
    const download = next && !tool_.version && !tool_.progress
    if (download) setPending((prev) => Object.assign({}, prev, { [tool]: true }))
    try {
      // 未安装时不允许开启：只下载，开关保持关闭并锁住，装好后由用户自己打开
      if (download) {
        await run('lintInstall', { tool })
        setCheckedAt(Date.now())
      } else {
        await save(tool, { enabled: next })
      }
    } finally {
      if (download) {
        setPending((prev) => {
          const nextPending = Object.assign({}, prev)
          delete nextPending[tool]
          return nextPending
        })
      }
    }
  }

  const versionPill = (tool) => {
    const info = lint.tools[tool] || {}
    if (!info.progress && pending[tool]) {
      return h('span', { className: 'jops-lint-ver', 'data-state': 'busy' }, txt('lintDownloading'))
    }
    if (info.progress) {
      return h('span', { className: 'jops-lint-ver', 'data-state': 'busy' },
        txt('lintDownloading') + ' ' + info.progress.percent + '%')
    }
    if (!info.version) return h('span', { className: 'jops-lint-ver', 'data-state': 'none' }, txt('lintNotInstalled'))
    const state = info.latest && info.latest !== info.version ? 'old' : 'new'
    return h('span', { className: 'jops-lint-ver', 'data-state': state },
      'v' + info.version + (state === 'old' ? ' → ' + info.latest : ''))
  }

  const ruleOptions = (tool) => {
    const info = lint.tools[tool] || {}
    const sets = info.ruleSets || []
    const label = (id) => ({
      google: txt('lintRsGoogle'),
      sun: txt('lintRsSun'),
      aliyun: txt('lintRsAliyun'),
      standard: txt('lintRsPmd'),
      strict: tool === 'pmd' ? txt('lintRsPmdStrict') : txt('lintRsSbStrict'),
      default: txt('lintRsSb'),
      custom: txt('lintRsCustom'),
    })[id] || id
    return sets.map((id) => h('option', { key: id, value: id }, label(id)))
  }

  const body = (tool) => {
    const info = lint.tools[tool] || {}
    if (!info.enabled) return null
    const rows = [
      h('div', { key: 'k-rs', className: 'jops-lint-k' }, txt('lintRuleSet')),
      h('div', { key: 'v-rs' },
        !info.version
          ? h('span', { className: 'jops-lint-note' }, txt('lintNotInstalled'))
          : h('select', {
              className: 'jops-input',
              value: info.ruleSet,
              onChange: (e) => save(tool, { ruleSet: e.target.value }),
            }, ruleOptions(tool))),
    ]
    if (info.ruleSet === 'custom') {
      rows.push(h('div', { key: 'k-rf', className: 'jops-lint-k' }, txt('lintRuleFile')))
      rows.push(h('div', { key: 'v-rf' },
        h('label', { className: 'jops-btn jops-lint-pick' },
          info.ruleFile ? info.ruleFile.split(/[\\/]/).pop() : txt('lintPickFile'),
          h('input', {
            type: 'file',
            accept: '.xml,text/xml,application/xml',
            style: { display: 'none' },
            // 浏览器不给绝对路径，所以把文件内容交给主机校验并存一份，ruleFile 指向那份副本
            onChange: async (e) => {
              const file = e.target.files && e.target.files[0]
              e.target.value = ''
              if (!file) return
              let content = ''
              try {
                content = await file.text()
              } catch (err) {
                setCheckedMsg((prev) => Object.assign({}, prev, { [tool]: { tone: 'fail', text: String(err && err.message ? err.message : err) } }))
                return
              }
              const data = await run('lintRuleFile', { tool, name: file.name, content })
              if (data && data.ok === false) {
                setCheckedMsg((prev) => Object.assign({}, prev, { [tool]: { tone: 'fail', text: data.error } }))
              } else if (data) {
                setCheckedMsg((prev) => {
                  const left = Object.assign({}, prev)
                  delete left[tool]
                  return left
                })
              }
            },
          }))))
    }
    if (tool === 'checkstyle') {
      rows.push(h('div', { key: 'k-lv', className: 'jops-lint-k' }, txt('lintThreshold')))
      rows.push(h('div', { key: 'v-lv' },
        h('select', {
          className: 'jops-input',
          value: info.level || 'error',
          onChange: (e) => save(tool, { level: e.target.value }),
        },
        h('option', { value: 'warn' }, txt('lintLvWarn')),
        h('option', { value: 'error' }, txt('lintLvError')),
        h('option', { value: 'all' }, txt('lintLvAll')))))
    }
    if (tool === 'pmd') {
      rows.push(h('div', { key: 'k-cpd', className: 'jops-lint-k' }, txt('lintCpd')))
      rows.push(h('div', { key: 'v-cpd' },
        h(SwitchRow, {
          on: Boolean(info.cpd),
          label: txt('lintCpd'),
          compact: true,
          onChange: (next) => save(tool, { cpd: next }),
        }, h('span', null, txt('lintCpdText')))))
    }
    if (tool === 'spotbugs') {
      rows.push(h('div', { key: 'k-pre', className: 'jops-lint-k' }, txt('lintPremise')))
      rows.push(h('div', { key: 'v-pre', className: 'jops-lint-note' }, txt('lintPremiseText')))
    }
    return h('div', { className: 'jops-lint-body' }, rows)
  }

  const lastRun = lint.lastRun || null
  const summaryOf = (row) => {
    const parts = Object.keys(row.tools || {}).map((tool) => {
      const info = row.tools[tool]
      const name = (lint.tools[tool] || {}).label || tool
      return `${name} ${info.ok ? `${info.count} 处` : txt('lintRunFailed')}`
    })
    return parts.join(' · ')
  }
  const lastLine = lastRun
    ? h('div', { className: 'jops-lint-summary' },
        h('span', null, `${txt('lintLastRun')} ${new Date(lastRun.at).toLocaleTimeString()} · ${summaryOf(lastRun)} · ${(lastRun.ms / 1000).toFixed(1)}s`))
    : null

  return h('div', { className: 'jops-card' },
    h('div', { className: 'jops-row' },
      h('b', null, txt('lintTitle')),
      h('span', { className: 'jops-spacer' }),
      // 检查由 Agent 在改完代码后触发；这里只报告进度，不再给用户一个点了也没用的按钮
      props.running ? h('span', { className: 'jops-lint-running' }, txt('lintRunning')) : null,
      h('button', {
        className: 'jops-btn',
        disabled: busy || Boolean(checking.all),
        onClick: () => check(),
      }, checking.all ? txt('lintCheckNow') : txt('lintCheckAll'))),
    lastLine,
    props.error ? h('div', { className: 'jops-note' }, txt('lintRunFailed') + '：' + props.error) : null,
    tools.map((tool) => {
      const info = lint.tools[tool] || {}
      return h('div', { key: tool, className: 'jops-lint', 'data-off': String(!info.enabled) },
        h('div', { className: 'jops-lint-head' },
          switchControl({
            on: Boolean(info.enabled),
            disabled: Boolean(info.progress) || Boolean(pending[tool]),
            label: (info.label || tool) + ' ' + txt('lintTitle'),
            onChange: (checked) => toggle(tool, checked),
          }),
          h('div', { className: 'jops-lint-id' },
            h('b', null, (lint.tools[tool] || {}).label || tool),
            h('span', null, tool === 'checkstyle' ? txt('lintStyle') : tool === 'pmd' ? txt('lintSource') : txt('lintBytecode'))),
          h('span', { className: 'jops-spacer' }),
          checkedMsg[tool]
            ? h('span', { className: 'jops-lint-note', 'data-tone': checkedMsg[tool].tone }, checkedMsg[tool].text)
            : null,
          versionPill(tool),
          info.version
            ? h('button', {
                className: 'jops-btn',
                disabled: busy || Boolean(info.progress) || Boolean(pending[tool]) || Boolean(checking[tool]),
                onClick: async () => {
                  // 单个工具只查这一个；查到新版后按钮变成「更新」，再点才下载
                  if (info.latest && info.latest !== info.version) await run('lintInstall', { tool })
                  else await check(tool)
                },
              }, checking[tool]
                ? txt('lintCheckNow')
                : info.latest && info.latest !== info.version ? txt('lintUpdate') : txt('lintCheck'))
            : null),
        body(tool),
        info.progress
          ? h('div', { className: 'jops-lint-progress' },
            h('i', { style: { width: (info.progress.percent || 0) + '%' } }))
          : pending[tool]
            ? h('div', { className: 'jops-lint-progress', 'data-indet': 'true' }, h('i'))
            : null)
    }),
    lint.tools.spotbugs && lint.tools.spotbugs.enabled
      ? h('div', { className: 'jops-hint', style: { marginTop: '10px' } }, txt('lintBuildLock'))
      : null)
}


// 开关用内联样式，样式表万一没生效也保持开关外观，不会退化成复选框。
// 行为交给 Radix Switch：它渲染的是 role=switch 的 button，不是受控
// <input type=checkbox>，所以不会出现「浏览器先翻转、React 再回写」导致
// 开关自己翻回去的问题，键盘与 aria 也由它处理。
function switchControl(props) {
  const on = Boolean(props.on)
  // 原型里普通开关 34x20、表格里的紧凑开关 30x18
  const compact = Boolean(props.compact)
  const width = compact ? 30 : 34
  const height = compact ? 18 : 20
  const knob = compact ? 14 : 16
  // 轨道左右各留 2px，滑块在两端都不贴边
  const inset = 2
  const shift = width - knob - inset * 2
  return h(RadixSwitch.Root, {
    className: 'jops-sw',
    'data-on': String(on),
    'data-muted': String(Boolean(props.disabled)),
    checked: on,
    disabled: Boolean(props.disabled),
    'aria-label': props.label,
    onCheckedChange: (next) => props.onChange(Boolean(next)),
    style: {
      all: 'unset',
      display: 'inline-flex',
      alignItems: 'center',
      flex: 'none',
      width: width + 'px',
      height: height + 'px',
      borderRadius: 'var(--jops-r-full)',
      position: 'relative',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      background: on ? 'var(--jops-brand)' : 'color-mix(in srgb, var(--jops-fg-muted) 28%, transparent)',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.04)',
      opacity: props.disabled ? '.45' : '1',
      transition: 'background .18s var(--jops-ease)',
    },
  },
    h(RadixSwitch.Thumb, {
      style: {
        display: 'block',
        width: knob + 'px',
        height: knob + 'px',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,.24), 0 0 0 .5px rgba(0,0,0,.04)',
        position: 'absolute',
        top: (height - knob) / 2 + 'px',
        left: inset + 'px',
        transform: on ? 'translateX(' + shift + 'px)' : 'none',
        transition: 'transform .18s var(--jops-ease)',
        willChange: 'transform',
      },
    }))
}

// 复选框换成开关：左侧说明文字，右侧开关，整行可点
function SwitchRow(props) {
  return h('label', { className: 'jops-swrow', 'data-muted': String(Boolean(props.disabled)) },
    props.children,
    switchControl({
      on: props.on,
      disabled: props.disabled,
      label: props.label,
      compact: Boolean(props.compact),
      onChange: props.onChange,
    }))
}

function SettingsTab(props) {
  const state = props.state || {}
  const perms = state.sqlPerms || {}
  const groups = [
    ['read', txt('permRead'), txt('permReadHint')],
    ['write', txt('permWrite'), txt('permWriteHint')],
    ['delete', txt('permDelete'), txt('permDeleteHint')],
  ]
  // 每次改动立刻落盘；高风险提醒在未允许时被强制关掉
  const patch = (group, field, value) => {
    const next = Object.assign({}, perms[group], { [field]: value })
    if (field === 'allow' && value === false) next.confirm = false
    props.run('settings', { sqlPerms: { [group]: next } })
  }
  const buildLocked = Boolean(state.lint && state.lint.tools && state.lint.tools.spotbugs && state.lint.tools.spotbugs.enabled)
  const [proxyNote, setProxyNote] = React.useState('')
  const saveProxy = async (value) => {
    const data = await props.run('proxySave', { httpProxy: value })
    setProxyNote(data && data.ok === false ? String(data.error || txt('proxyInvalid')) : txt('proxySaved'))
  }
  return h('div', { className: 'jops-settings' },
    h('div', { className: 'jops-hint' }, txt('wsScope')),
    h('div', { className: 'jops-card' },
      h('b', null, txt('settingsBuild')),
      h(SwitchRow, {
        on: buildLocked || state.buildEnabled !== false,
        disabled: buildLocked,
        label: txt('settingsBuild'),
        onChange: (next) => props.run('settings', { buildEnabled: next }),
      }, h('span', null, txt('settingsBuildHint')))),
    h('div', { className: 'jops-card' },
      h('b', null, txt('proxyTitle')),
      h('div', { className: 'jops-row' },
        h('div', { className: 'jops-field' },
          h('span', null, txt('proxyLabel')),
          h('input', {
            className: 'jops-input',
            defaultValue: state.httpProxy || '',
            placeholder: 'http://127.0.0.1:7890',
            onBlur: (e) => saveProxy(e.target.value),
          }))),
      h('div', { className: 'jops-hint' },
        txt('proxyHint') + (proxyNote ? ' · ' + proxyNote : ''))),
    h('div', null,
      h(LintCard, {
        lint: state.lint,
        tools: ['checkstyle', 'pmd', 'spotbugs'],
        busy: false,
        running: state.lintRunning,
        error: state.lintError,
        run: props.run,
      })),
    h('div', { className: 'jops-card' },
      h('b', null, txt('settingsPerms')),
      h('table', { className: 'jops-permtable' },
        h('thead', null,
          h('tr', null, h('th', null, txt('permCat')), h('th', null, txt('permGrant')))),
        h('tbody', null,
          groups.map(([key, label, hint]) => {
            const group = perms[key] || {}
            const off = !group.allow
            return h('tr', { key },
              h('td', null,
                h('div', { className: 'jops-permcat' },
                  h('b', null, label),
                  h('span', null, hint))),
              h('td', null,
                h('div', { className: 'jops-tgrow' },
                  h('span', { className: 'jops-tg' },
                    h('span', { className: 'jops-tgl' }, txt('permAllow')),
                    switchControl({
                      on: Boolean(group.allow),
                      compact: true,
                      disabled: false,
                      label: label + ' ' + txt('permAllow'),
                      onChange: (checked) => patch(key, 'allow', checked),
                    })),
                  h('span', { className: 'jops-tg' },
                    h('span', { className: 'jops-tgl' }, txt('permConfirm')),
                    switchControl({
                      on: Boolean(group.confirm),
                      compact: true,
                      disabled: off,
                      label: label + ' ' + txt('permConfirm'),
                      onChange: (checked) => patch(key, 'confirm', checked),
                    })))))
          })))),
    h('div', { className: 'jops-hint' },
      txt('permDenied') + ' · ' + txt('permConfirmHint')))
}

// 页签 id 与文案 key 同名，顺序即展示顺序
const TAB_IDS = ['services', 'sql', 'http', 'settings']

function JavaOpsView(props) {
  const sessionId = props.sessionId
  const [tab, setTab] = useState('services')
  const [snapshot, setSnapshot] = useState({
    loading: true,
    services: [],
    activities: [],
    sqlLog: [],
    workspace: '',
    candidates: [],
  })
  const [logs, setLogs] = useState({})
  const [selectedId, setSelectedId] = useState('')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [conflict, setConflict] = useState(null)
  const [error, setError] = useState('')
  const offsets = useRef({})
  const epochs = useRef({})
  const rootRef = useRef(null)
  const [paneH, setPaneH] = useState(0)
  // 弹窗的 portal 容器要等挂载后才有 DOM 节点，所以放 state 里
  const [hostEl, setHostEl] = useState(null)
  useEffect(() => { setHostEl(rootRef.current) }, [])

  const apply = (next) => {
    if (next && next.ok) {
      // 逐字段合并：漏掉任何一个都会被设置页当成默认值（曾因此显示「权限全未勾选」）
      setSnapshot((prev) => ({
        loading: false,
        services: (next.services || []).map((svc) => Object.assign({}, svc, {
          name: svc.mainClass ? svc.mainClass.split('.').pop() : svc.name,
          module: svc.moduleDir,
          main: svc.mainClass,
          state: svc.status,
        })),
        activities: next.activities || [],
        sqlLog: next.sqlLog || [],
        sqlConnections: next.sqlConnections || prev.sqlConnections || [],
        // 接口页的数据同样会随 reload 丢字段：漏了它，面板会显示空表并可能把空列表存回去
        httpHeaders: next.httpHeaders || prev.httpHeaders || [],
        httpLog: next.httpLog || prev.httpLog || [],
        sqlPerms: next.sqlPerms || prev.sqlPerms,
        // 待确认的高风险 SQL：漏字段会让对话框永远不出现
        sqlConfirms: next.sqlConfirms || prev.sqlConfirms || [],

        lint: next.lint || prev.lint,
        // 检查要跑几十秒，面板靠这个字段显示「检查中」
        lintRunning: next.lintRunning || null,
        lintError: typeof next.lintError === 'string' ? next.lintError : (prev.lintError || ''),
        // 代理地址同理：漏字段会让输入框在切页签后变空，看起来像没保存
        httpProxy: typeof next.httpProxy === 'string' ? next.httpProxy : prev.httpProxy,
        buildEnabled: typeof next.buildEnabled === 'boolean' ? next.buildEnabled : prev.buildEnabled,
        workspace: next.workspace || prev.workspace,
        candidates: next.candidates || prev.candidates,
      }))
      setError('')
    } else if (next && next.error) {
      setError(String(next.error))
    }
  }

  const call = async (action, payload) => {
    const res = await fetch(API + '/action', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ session: sessionId, action, payload: payload || {} }),
    })
    return res.json()
  }

  const refresh = async () => {
    try {
      const res = await fetch(API + '/state?session=' + encodeURIComponent(sessionId || ''))
      apply(await res.json())
    } catch (err) {
      setError(String(err && err.message ? err.message : err))
    }
  }

  const run = async (action, payload) => {
    try {
      const data = await call(action, payload)
      apply(data)
      return data
    } catch (err) {
      setError(String(err && err.message ? err.message : err))
      return undefined
    }
  }

  const pullLogs = async (id) => {
    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const offset = offsets.current[id] || 0
        const res = await fetch(API + '/action', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ session: sessionId, action: 'logs', payload: { id, offset } }),
        })
        const data = await res.json()
        if (!data || !data.ok || !Array.isArray(data.lines)) return
        const known = epochs.current[id]
        if (attempt === 0 && data.epoch !== undefined && known !== undefined && known !== data.epoch) {
          // the host started a new run and cleared its buffer: drop the stale local copy
          epochs.current[id] = data.epoch
          offsets.current[id] = 0
          setLogs((prev) => Object.assign({}, prev, { [id]: [] }))
          continue
        }
        epochs.current[id] = data.epoch
        offsets.current[id] = data.offset || 0
        if (data.lines.length > 0) {
          setLogs((prev) => {
            const merged = (prev[id] || []).concat(data.lines)
            return Object.assign({}, prev, {
              [id]: merged.length > LOCAL_LOG_LINES ? merged.slice(merged.length - LOCAL_LOG_LINES) : merged,
            })
          })
        }
        return
      }
    } catch {
      /* logs are best-effort */
    }
  }

  useEffect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, 1500)
    return () => clearInterval(timer)
  }, [sessionId])

  useEffect(() => {
    // the detail pane always shows a service, so logs must follow that selection
    const list = snapshot.services || []
    if (list.length === 0) return
    if (!selectedId || !list.some((svc) => svc.id === selectedId)) setSelectedId(list[0].id)
  }, [snapshot.services, selectedId])

  useEffect(() => {
    if (!selectedId || tab !== 'services') return undefined
    void pullLogs(selectedId)
    const timer = setInterval(() => { void pullLogs(selectedId) }, 1000)
    return () => clearInterval(timer)
  }, [selectedId, tab])

  useEffect(() => {
    // the panel owns its height: fit everything above the composer so the page never scrolls
    const measure = () => {
      const box = rootRef.current
      if (!box) return
      // a dialog is on top: scrolling inside it fires window scroll events, and
      // re-measuring then resized the panel under the dialog (it visibly bounced)
      if (box.querySelector('.jops-overlay')) return
      const rect = box.getBoundingClientRect()
      // once the page scrolls our own box starts above the viewport; measuring then
      // would add the scroll offset back as height and never stop growing
      if (rect.top < -1) return
      let bottom = window.innerHeight - 72
      // only the chat composer counts; a textarea inside our own dialog is not it
      const composer = Array.prototype.find.call(
        document.querySelectorAll('textarea, [contenteditable="true"]'),
        (node) => !box.contains(node),
      )
      if (composer) {
        const composerRect = composer.getBoundingClientRect()
        if (composerRect.top > rect.top + 200) bottom = composerRect.top - 10
      }
      setPaneH(Math.max(360, Math.floor(bottom - rect.top - 8)))
    }
    const frame = requestAnimationFrame(measure)
    const late = setTimeout(measure, 300)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(late)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [tab])

  const services = snapshot.services
  const current = services.find((svc) => svc.id === selectedId) || services[0]
  const startOrRestart = (action) => async (svc) => {
    const data = await run(action, { id: svc.id, wait: false })
    if (data && data.blocked) setConflict({ svc, blocked: data.blocked, action })
  }
  const handlers = {
    start: startOrRestart('start'),
    stop: (svc) => run('stop', { id: svc.id }),
    forceStop: (svc) => run('stop', { id: svc.id, force: true }),
    restart: startOrRestart('restart'),
    build: (svc) => run('build', { id: svc.id, wait: false }),
    remove: (svc) => run('remove', { id: svc.id }),
    edit: (svc) => setEditing(svc),
  }

  const wsLabel = snapshot.workspace ? snapshot.workspace.split(/[\\/]/).filter(Boolean).pop() : ''

  const pane = (id) => {
    if (snapshot.loading) return h('div', { className: 'jops-empty' }, txt('loading'))
    if (id === 'services') {
      return h(ServicesTab, {
        snapshot,
        selectedId: current ? current.id : '',
        onSelect: setSelectedId,
        onAddClick: () => {
          setAdding(true)
          void run('scan', {})
        },
        handlers,
        logs,
      })
    }
    if (id === 'sql') return h(SqlTab, { sqlLog: snapshot.sqlLog, connections: snapshot.sqlConnections || [], run })
    if (id === 'http') return h(HttpTab, { headers: snapshot.httpHeaders || [], log: snapshot.httpLog || [], run })
    return h(SettingsTab, { state: snapshot, run })
  }

  return h(DialogHost.Provider, { value: hostEl },
    h(RadixTabs.Root, {
      className: 'jops-root',
      ref: rootRef,
      style: paneH > 0 ? { height: paneH } : undefined,
      value: tab,
      onValueChange: setTab,
    },
    h('div', { className: 'jops-top' },
      h(RadixTabs.List, { className: 'jops-seg', 'aria-label': txt('view') },
        TAB_IDS.map((id) => h(RadixTabs.Trigger, { key: id, value: id }, txt(id)))),
      h('span', { className: 'jops-spacer' }),
      h('span', { className: 'jops-ws', title: snapshot.workspace || txt('wsScope') },
        txt('workspace') + ' ',
        h('b', null, wsLabel || txt('wsFollow')))),
    error ? h('div', { className: 'jops-note' }, txt('errPrefix') + error) : null,
    TAB_IDS.map((id) => h(RadixTabs.Content, { key: id, className: 'jops-tabpane', value: id },
      id === tab ? pane(id) : null)),
    adding ? h(AddDialog, {
      candidates: snapshot.candidates || [],
      onClose: () => setAdding(false),
      verify: (mainClass) => run('lookup', { mainClass }),
      onAdd: (input) => {
        setAdding(false)
        void run('save', { service: Object.assign({ buildEnabled: true }, input) })
      },
    }) : null,
    editing ? h(EditDialog, {
      svc: editing,
      onClose: () => setEditing(null),
      onSave: (patch) => {
        const id = editing.id
        setEditing(null)
        void run('save', { service: Object.assign({ id }, patch) })
      },
    }) : null,
    (snapshot.sqlConfirms || [])[0] ? h(SqlConfirmDialog, {
      item: (snapshot.sqlConfirms || [])[0],
      onAnswer: (id, allow) => void run('sqlConfirm', { id, allow }),
    }) : null,
    conflict ? h(PortConflictDialog, {
      svc: conflict.svc,
      blocked: conflict.blocked,
      action: conflict.action,
      onCancel: () => setConflict(null),
      onConfirm: (action) => {
        const svc = conflict.svc
        setConflict(null)
        void run(action, { id: svc.id, wait: false, killOccupant: true })
      },
    }) : null,
    ))
}

export function apply(ctx) {
  const style = document.createElement('style')
  style.setAttribute('data-dsh-java-ops', '')
  style.textContent = CSS
  document.head.appendChild(style)
  ctx.effect(() => () => style.remove())

  ctx.slots.inject('conversation.view', () =>
    ctx.slots.register(
      {
        name: 'conversation.view',
        id: 'java-ops',
        order: 40,
        label: () => txt('view'),
      },
      JavaOpsView,
    ))
}
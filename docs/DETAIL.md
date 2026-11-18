# dsh-java-ops

本地服务运行面板。服务页已接真实进程（扫描 / 添加 / 构建 / 启动 / 停止 / 重启 / 日志）；设置页的构建开关与 SQL 授权已真实落盘；SQL 页仍是只读的执行记录。

## 入口

会话内 View tab，显示名「运行服务」。注册在 `conversation.view` 槽：

```js
ctx.slots.inject('conversation.view', () => ctx.slots.register({
  name: 'conversation.view',
  id: 'java-ops',
  order: 40,
  label: () => txt('view'),
}, View))
```

现有占用顺序：WC/chat 0、WC/trajectory 10、dsh-context/context 20、dsh-context/fleet 30，因此本插件排在最后。

## 四个页签

- **服务**：左侧服务列表（运行中 / 启动中 / 构建中 / 已停止 / 已强杀 / 失败），右侧详情（端口、模块、启动类、PID、启动耗时、启动/停止/重启/构建、编辑、移除），详情下方分「运行日志 / 操作记录」两个 tab：运行日志是进程输出（过滤、自动换行默认关闭、自动滚动），操作记录按行列出 agent 对这个服务做过的扫描/构建/启动/停止/重启（时间 · 动作 · 结果 · 耗时）。运行日志右上角 ⤢ 把日志区铺满面板宽度，变成 ⤡ 点回；不再有整页全屏按钮。面板高度按视口自适应：取面板顶端到输入框上沿的空间，整页不再出现滚动条；日志与操作记录区固定占剩余高度，滚轮可翻但隐藏原生滚动条。`+ 添加服务` 打开对话框：扫描候选启动类勾选，或手输全限定类名并填端口。
- **SQL**：只读的**执行记录**表格，五列 —— 时间、操作类型（取 SQL 首个关键字，或记录里的 `op`）、执行 SQL（单行省略，完整内容在记录里）、是否成功、影响条数。页面不提供执行入口——SQL 只由 Agent 工具 `java_ops_sql_query` 执行，这里记录每一次执行；无记录时显示空态说明。
  - **数据库连接**：工具栏右侧 `+ 数据库连接` 打开对话框，字段为 类型（mysql / postgres）、名称、主机、端口、数据库、账号、密码。密码不落盘，交给 DSH credentials 服务，JSON 里只留 `passwordRef`（`JAVA_OPS_SQL_<工作区哈希>_<ID>`）与 `hasPassword`；留空表示不修改。「测试」只探测端口可达（真正的登录校验需要连库）。连接与执行记录都按工作区各存一套（旧版本存成全局的，读取时自动复制进各工作区）。
  - **执行记录保留**：`sqlLog` 落盘到 `plugin-data/java-ops.json`，按时间保留 3 天（`SQL_LOG_DAYS = 3`，读取时过滤、写入时清理），另有 2000 条上限防失控；插件重载/重启后历史仍在。
  - **确认链路**：开了「高风险提示」的分组，执行前调用 DSH 原生审批服务 `ctx.approval.request({ agent, toolName: 'java_ops_sql_query', callId, reason, displayReason })`，弹出的是和工具授权同一套的审批弹窗（允许一次 / 拒绝），弹窗正文就是这条 SQL 原文（`displayReason` 截断 400 字符），便于和工具授权区分。只有拿到 `allowed-once` 才执行，`rejected` / `cancelled` 直接记为拒绝。两个前提缺一不可：调用方 `agent` 必须逐层透传（`execute` 里记下 `exec.agent` 与 `exec.callId`），以及会话审批策略必须是「每次询问」——策略为「从不询问」时审批请求会被直接判否，表现为秒回「用户拒绝了这次 SQL 执行」。approval 服务不可用时退回 `ctx.userQuestions.ask`（带 `intent: { kind: 'approval', approve, reject }` 时 `options` 里必须有同名 label，否则报 `declares intent approval whose action label ... names none of its options`）。放行后记录字段 `confirmed` 写成 `approval`，审计时一眼看出这次是人工批准的。
  - **驱动策略**：内置纯 JS 驱动（mysql2；pg 待接入），Oracle / SQLServer / 达梦 / 金仓等走 JDBC 桥拿项目 `~/.m2` 里的 jar —— 不做运行时下载驱动。执行超时 10s、单次最多 500 行、一次只允许一条语句；`sqlPerms` 按 读/写/删 分组拦截，开了「高风险提示」就弹 DSH 原生确认框，UPDATE/DELETE 不带 WHERE 一律拦下。
- **设置**：启动前自动构建（真实生效，写 `buildEnabled`）；**SQL 授权**三组 —— 读（SELECT）、写（INSERT / UPDATE / ALTER / CREATE…）、删（DELETE / DROP / TRUNCATE…），每组两个开关：「允许执行」与「高风险提示」。未允许 = 执行时直接拒绝；允许 + 勾选高风险提示 = 每次执行先弹窗确认；允许但未勾选 = 直接执行。关掉「允许」时「高风险提示」自动置灰并清空。改动即时落盘到工作区状态，刷新后保留。
- **设置 · Java 代码校验**：三张卡片（Checkstyle / PMD / SpotBugs），开关打开即启用；未安装时自动从 GitHub Releases 下载对应版本（下到同目录 `.tmp`，校验文件头后原子 rename），版本胶囊显示已装版本，点「检查更新」查最新版；规则集可选内置（Google / Sun、标准 / 严格、默认 / 严格）、项目自带（`checkstyle.xml` / `pmd-ruleset.xml` / `exclude-filter.xml`）或外部文件；Checkstyle 有「命中阈值」（warn / error / all），PMD 有「重复代码检查」。SpotBugs 需要编译产物，启用时强制打开「启动前自动构建」并锁住开关。卡片里的「运行检查」跑一遍已启用的检查器，结果摘要显示条数与耗时，明细看 `state.lint.lastRun`。
- **接口**：上半部分是请求头预设表格（名称 / 值 / 启用 / 删除），可增删行并「保存请求头」；保存后 Agent 每次调 `java_ops_http_request` 都会自动套用这些头，Agent 自己传的同名头优先。下半部分是调用记录（时间、方法、URL、耗时、状态码、详情），最多 100 条，点「详情」弹出请求头、请求体、响应头、响应体。页面本身不发请求，只维护预设与展示记录。

设置作用域是**工作区**：服务、连接、权限、构建开关、校验规则各存一套，切换工作区整套切换。顶栏只显示「工作区 · 跟随当前会话」，不提供跨项目下拉。

## 服务链路（Host 侧）

- **发现**：扫描工作区 `.java` 源文件，跳过 `node_modules/target/build/.git/out/.gradle`；命中 `@SpringBootApplication` / `@EnableAutoConfiguration`；启动类归属最近的 `pom.xml` / `build.gradle` 模块；读该模块 `src/main/resources/application*.{yml,yaml,properties}` 取 `server.port`、`context-path`、`profiles.active`。
- **构建**：优先项目自带 `mvnw.cmd`，其次复用 IDE 捆绑的 Maven（直接经 plexus launcher 启动，避开带空格的 `mvn.cmd` 路径），最后才是 PATH 上的 maven。一次 Maven 调用同时完成编译与 classpath 解析：`mvn -q -B -pl <module> -am -DskipTests compile dependency:build-classpath -Dmdep.outputFile=<module>/target/java-ops-classpath.txt -Dmdep.includeScope=runtime`（不需要 `install`）。源文件与 pom 的 mtime 未变且 classpath 已生成时直接跳过构建；失败取 `[ERROR] ... .java:[line]` 前 8 行，无 `[ERROR]` 时给最后 12 行非空输出。
- **启动**：把 JVM 参数、classpath、主类写进 `<profile>/plugin-data/run-<id>.args`，用 `java @argfile` 启动（classpath 动辄上万字符，直接 `-cp` 会 ENAMETOOLONG）。Windows 上再套一层 `run-<id>.cmd`：`@echo off` + `chcp 65001>nul` + `"<java>" @"<argsFile>"`。终端是真实控制台，默认代码页 936；应用按 UTF-8 写出的中文日志会在控制台里先被当成 GBK 解码，面板收到的就是乱码（`閫€娆鹃噾棰?` 这类），`chcp 65001` 把代码页切成 UTF-8 才能拿到正确中文。就绪轮询 120s，400ms 一次，判据依次为：探针报告的 `listening port=<端口>`（连接器真正绑定端口的那一刻）→ 对 `readyUrl`（缺省 `http://127.0.0.1:<port><contextPath>/`）发一次 HTTP 请求，拿到任意状态码（404/401/500 都算）。探针未加载时 HTTP 兜底，所以受管容器里也能判。classpath 末尾还会追加 `lib/java-ops-probe.jar`，用来捕获 Spring 的启动成功/失败事件（见下一条）。
- **停止**：和 IDE 一样给进程发 Ctrl+C —— 服务跑在 `ctx.subprocess.spawnTerminal` 分配的真实终端里，停止时 `signalForeground('SIGINT')`，JVM 触发 shutdown hook、Spring 关上下文后自己退出，日志里会看到 `[java-ops] sent Ctrl+C; waiting for the app to shut itself down` 与 `Commencing graceful shutdown`。终端句柄不会随着子进程结束而结束（PTY 不是进程本身），而且监听端口在 shutdown hook 跑完前就关了，所以等待退出时按 PID 用 `tasklist` 轮询，而不是看句柄或端口。30s 内没退才 `taskkill /PID` 强杀并标记 `killed`；终端不可用时退回 `terminate()`。不再请求 `/actuator/shutdown`，也不再需要任何开关。退出码非 0 记 `failed` + `lastError`，主动停止不算失败。实测 Order：Ctrl+C 后 2.1s 退出、PID 消失、8801 释放。
- **VM 参数**：添加/编辑对话框都有「VM 参数」多行输入，随 `java @argfile` 一起下发。
- **日志**：构建与运行共用同一条日志流，命令输出每 400ms 增量抽取（构建期间也能看到 mvn 输出）；保留最近 5000 行。终端输出按 CRLF 切行，行尾 CR 会去掉，日志里不会留 `^M`。每次启动/重启先把缓冲区清空并自增 `logEpoch`，面板发现 epoch 变化就丢弃旧日志重拉，保证看到的永远是本次运行的日志。展示按终端风格着色，配色可在日志标题栏右侧切换并记住选择（`localStorage`）：跟随主题（默认，跟面板同底）、护眼米色（Solarized Light）、石墨深灰、午夜黑。时间戳压暗、`INFO/WARN/ERROR/DEBUG` 分级上色，`*Exception`/`*Error` 与 `Caused by:` 标红，错误行与警告行整行带淡色底。
- **状态机**：`stopped | building | starting | running | failed | killed`；单独点「构建」时状态先切 `building`，结束后回到原状态（原来会一直停在构建中）。运行态只存在内存，DSH 重启后需要重新启动。
- **持久化**：`<profile>/plugin-data/java-ops.json`，结构 `{ workspaces: { [root]: { services, buildEnabled, sqlPerms, sqlConnections, sqlLog, httpHeaders, httpLog } }, seq }`。
- **按需登记**：`start` / `stop` / `restart` / `build` 除了 `id` 也接受 `mainClass`。未登记的主类先用本次扫描补全 moduleDir / 端口 / context-path，再落盘并执行——agent 只要知道启动类就能用，不必先手工添加。
- **操作流水**：每次 `act()` 记一条 `{at, action, id, status, ms}`（进行中 → 成功/失败），最多留 40 条；随 `/api/java-ops/state` 下发，面板详情页「操作记录」tab 按服务过滤后倒序显示。
- **单实例**：一个服务同时只允许一条启动流水线（`runtime.pipeline`）。重复 `start` 不会起第二个 JVM，而是并入正在跑的那条；返回 `already: true`。
- **等待就绪**：`start` / `restart` / `ensure` / `build` 默认 `wait: true`，工具调用会一直等到探针报告端口已监听或接口能回 HTTP（或失败）才返回，agent 拿到成功即是能访问。面板按钮传 `wait: false`，保持异步靠轮询。失败有三条短路：探针的 `ApplicationFailedEvent`（最准，带异常类名与首行）、日志里的 `APPLICATION FAILED TO START` / `Web server failed to start` / `BUILD FAILURE`、进程提前退出。
- **启动探针**：classpath 末尾追加 `lib/java-ops-probe.jar`（源码在 `probe/`，`bash probe/build.sh` 重建；jar 被运行中的 JVM 打开时重建会失败，先停掉用它的服务）。jar 里只有 `META-INF/spring.factories` 注册的 `javaops.probe.StartupListener`，监听 `ApplicationReadyEvent` / `ApplicationFailedEvent` / `WebServerInitializedEvent`，打印 `[java-ops-probe] event ready pid=N ctx=<id>`、`[java-ops-probe] listening port=N`、`[java-ops-probe] failed <异常类名>: <首行>`。就绪以 `listening` 为准（`ServletWebServerInitializedEvent` 等子类靠类名后缀匹配），因为它出现在连接器绑定端口之后；`event ready` 只作诊断，Spring Cloud 的 bootstrap 上下文会提前发它。只依赖 spring-context 接口、`--release 8` 编译，5.3 编出的字节码 4.x–6.x 都能直接加载。失败事件直接给 `lastError`（实测 `org.springframework.context.ApplicationContextException: Failed to start bean 'webServerStartStop'`，24.7s 返回，不再等 120s）。实测该应用 `[java-ops-probe] listening port=8801` 与 `Started OrderApplication` 几乎同时，`startup 28.0s`；没有端口也没有 `readyUrl` 的服务（非 Web）用 `event ready` 判就绪。
- **热重载接管**：插件 dispose 只停止日志泵，不再 terminate Java 进程。重新加载后 `adoptRunning` 用登记的 pid + `netstat` 端口比对，把还在监听的服务恢复成 running（日志会注明 earlier log lines are gone）；此时 `stop` 走 `taskkill /PID`（先不带 `/F`，失败再强杀）。
- **端口接管**：`start` 之前先 `pidByPort` 查一次端口。已经被别的进程占着（重载前留下的运行、面板外手工起的实例）就直接把那个 pid 认领成 running，日志写 `port 8801 is already served by pid N; adopting that process instead of starting a duplicate JVM`，不再启动第二个 JVM —— 否则新实例只会因端口冲突在几秒内退出，看起来像「启动失败」。
- **端口占用校验**：启动（以及重启、ensure）在动手前先查端口。占用者不是这个服务自己、也不是它自己记录的 pid 时，默认**不动手**：工具返回 `blocked: { port, pid, process, serviceId?, serviceName? }`，由 agent 决定要不要结束占用进程（`killOccupant: true` 才会先 `taskkill` 再等端口释放最多 10s，然后启动）；面板则在启动/重启前弹出「端口被占用」对话框，显示端口、进程名、PID（占用者是本工作区的其它服务时还会点名那个服务），用户点「关闭并启动」才执行同样的 kill。实测：`python -m http.server 8801` 占住端口时，`java_ops_service_start` 返回 `blocked` 且不起 JVM；带 `killOccupant: true` 后 python 被杀、8801 由新 JVM 接管。

- **构建错误**：失败时除 `lastError` 文本外，还把 mvn 输出里的 `[ERROR] Foo.java:[12,34] 原因` 解析成 `buildErrors: [{file, line, column, message}]`（最多 50 条，去重），agent 可直接定位到文件行。
- **日志过滤**：`java_ops_service_status` 支持 `grep`（不区分大小写的正则，非法正则按字面量匹配）、`level`（如 `ERROR`）、`tail`（上限 400）；命中时忽略 offset 返回匹配行数与行内容，未命中时按 400 行分页取尾部。
- **接口调用**：`runHttpRequest` 先读工作区保存的 `httpHeaders`（跳过停用行与空名行），再用调用方 `headers` 覆盖同名项；非 GET/HEAD 才带 body，缺 `content-type` 时按 `application/json` 补。工具返回状态码、响应头（多值用 `, ` 合并）与最多 64 KB 的响应体；审计记录只存 8 KB 副本（`HTTP_LOG_BODY`），避免 100 条 × 64 KB 把状态文件和每秒的状态轮询撑爆，详情弹窗里看到的是这份副本。工具同时回显 `requestHeaders`（实际发出的头），便于确认保存的头已生效。失败时把 `fetch` 埋掉的真实原因一并写进 `error`（如 `fetch failed (ECONNREFUSED)`），并回传 method 与 url。仅用 Node 内置 `fetch` + `AbortSignal.timeout`（默认 15s），不引依赖。

## 工具

`java_ops_project_scan`、`java_ops_service_list`、`java_ops_service_add`、`java_ops_service_remove`、`java_ops_service_start`、`java_ops_service_ensure`、`java_ops_service_stop`、`java_ops_service_restart`、`java_ops_service_status`、`java_ops_build`、`java_ops_sql_connections`、`java_ops_sql_query`、`java_ops_http_request`。全部走同一 `act()` 实现，与面板共用。工作区解析顺序：显式 `workspace` → 会话 cwd → 最后一个已有服务的根目录（所以在元工作区里调用也不会扫错目录）。`ensure` 是幂等入口：已在运行直接返回，否则启动并等到就绪。

面板通道：`GET /api/java-ops/state?session=<id>`、`POST /api/java-ops/action`（`{session, action, payload}`），注册在 `ctx.connection.fetch`。

PID 来源：`ctx.subprocess` 的句柄在 Windows 上不一定给出 pid，服务就绪后用 `netstat -ano` 找拥有该监听端口的进程号，实测 8801 → `PID 29340`（`tasklist` 核对为 `java.exe`）。

## 约定

- 样式只用 DSH theme token（`--dsw-alias-*`），不写死颜色，跟随明暗主题。
- 页面渲染为槽内 React 组件，不用 iframe，不触碰 app root 与 `document.body`。
- 文案经 locale 服务读取，`label` 用 thunk，切换语言即刷新。

## 已验证（2026-11-15，示例项目 Order 服务）

`java_ops_project_scan` 扫出 6 个启动类，端口与 context-path 与 `application.yml` 一致。Order 实测：构建通过 → `Started OrderApplication in 29.673 seconds` → `Tomcat started on port 8801`、Nacos 注册成功 → 停止后 PID 消失、8801 释放 → 重启后新 PID 再次监听 8801。日志经 `/api/java-ops/state` 按 offset 增量拉取，单次实测 1000+ 行。按需登记同一轮验证：只传 `mainClass: com.example.demo.sync.DataSyncApplication` 即自动登记 svc-2、构建 5.5s、启动到消息消费者订阅完成，停止耗时 92ms；活动流水记录 start → stop，id 自动解析成 svc-2。构建状态修复后实测：单独点构建 svc-2 返回 `building`，5s 后回到 `stopped`，日志里能看到 mvn 输出；重启 svc-2 时 `epoch` 由 0 变 1、日志只剩本次运行内容。

## 已验证（2026-11-16 第二轮，本机 Nacos 不可达）

- 单实例：连续两次 `java_ops_service_start {id:'svc-2', wait:false}`，第二次 1ms 返回 `already: true`，没有第二条流水线。
- 等待就绪：`java_ops_service_ensure {id:'svc-1'}` 阻塞到超时才返回（活动记录 `ensure ms: 141406` = 构建 21.2s + 就绪 120s），`lastError: "port 8801 not ready in time"`。失败原因是环境：Nacos 连不上，Order 卡在 Dubbo 注册重试，8801 始终不监听。
- 构建错误结构化：临时登记 `svc-3`（moduleDir `no-such-module`）构建，1.85s 返回 `failed: true` 并给出 3 条 `buildErrors`，首条 `Could not find the selected project in the reactor: no-such-module @`；验证后已移除该服务。
- 日志过滤：`service_status` 带 `grep: 'ERROR|APPLICATION FAILED|...'`、`tail: 40` 返回 `matched: 187, filtered: true`，只回 40 行。
- 热重载：先记下 `tasklist` 的 java 进程，`plugin_manager set_plugin` false → true 后同一批进程仍在（没有 terminate）。
- 未验证：`adoptRunning` 需要服务真正监听端口才有 pid 可比对，本机因 Nacos 不可用暂时无法端到端确认。

## 已验证（2026-11-17，接口调用）

- 保存的请求头会被自动套用：手工写入 `X-Java-Ops: probe-1`、`Accept: application/json` 与一条 `enabled: false` 的头，`java_ops_http_request` 的审计记录里 `reqHeaders` 正确带上前两条、跳过停用那条。
- `GET http://127.0.0.1:<port>/` 打到本机临时静态服务：`status 200`、`ms 31`、响应头齐全、响应体完整返回（45 KB < 64 KB 上限）；同时审计记录里只留 8192 字节并标 `truncated: true`。
- 打到没在监听的端口：`ok: false`、`ms 2`、`error: "fetch failed (ECONNREFUSED)"`，并回传 method 与 url。
- 打到在跑的 Spring 服务根路径：`status 404`、`ms 62`、body 为应用自己的 `{"code":404,...}` —— 接口能回就说明通了。


## 已验证（2026-11-18，Java 代码校验）

- Checkstyle 14.4.0 从 GitHub Releases 下载成功（15 225 265 字节，`java -jar … --version` 输出 `Checkstyle version: 14.4.0`）；本机 30 KB/s 级带宽下耗时约 8 分钟。
- `action=run tool=checkstyle`（规则集 google、阈值 warn）在示例项目上跑通：`ms 10 585`、`count 2236`，findings 解析出中文消息与规则名（`Indentation` / `LineLength` / `SummaryJavadoc` / `TodoFormat` / `AbbreviationAsWordInName` / `GoogleMethodName`）。
- 阈值语义：`warn` 保留 warning 及以上，`error` 只留 error，`all` 全留；Google / Sun 规则集默认输出 `[WARNING]`，选 `error` 会得到 0 条。
- PMD（约 60 MB）与 SpotBugs（约 30 MB）尚未在本机实测下载与执行。

## 尚未实现

SQL 执行已接通 MySQL（连接配置 + 读写删授权 + 无 WHERE 拦截 + 确认弹窗 + 记录落 `sqlLog`）；接口调用已接通（请求头预设 + 调用记录）。仍待补：PostgreSQL 适配器、JDBC 桥（Oracle / SQLServer / 达梦 / 金仓）、Gradle 构建、DDL、表结构浏览、结果集分页与取消。见 `docs/decision-map.md`。

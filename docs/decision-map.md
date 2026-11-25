# 决策地图：dsh-java-ops（DSH 服务运行与 SQL 插件）

目标：一个 DSH 原生插件，提供 Java 服务生命周期管理（起/停/重启/状态/日志/就绪）与 SQL 执行，并支持服务发现与编译构建。
硬约束：不依赖任何 IDE 进程，不解析 IDE 工程文件；读代码/终端/发 HTTP 继续用 DSH 原生工具与 dsh-api-client；密码等凭据不进仓库。

已定（本会话）：
- 完全脱离 IDE，插件自己管进程与 SQL 连接。
- 范围：服务生命周期、SQL、服务发现、编译构建；不做 Java 符号分析、不做 HTTP/终端/文件编辑。
- 服务发现：扫描源码找 `@SpringBootApplication` / `@EnableAutoConfiguration` / 含 `main` 的应用类（跳过 `target`、`node_modules`、`.git`）；启动类归属最近的 `pom.xml`/`build.gradle` 模块；读该模块 `application*.yml` 取 `server.port`/`context-path`/profile。端口扫不到要求用户填。
- 添加服务：面板与工具都支持；可勾选扫描出的候选，也可手输全限定类名（校验归属模块）；字段可编辑（服务名、端口、VM 参数、环境变量、工作目录、profile、就绪 URL）。端口覆盖只用运行时参数（`-Dserver.port=8802`），绝不改源文件。
- 停止：优雅停（`taskkill` 不带 `/F`，配了 actuator 先调 shutdown）→ 轮询端口释放 → 30s 超时自动强杀并标记。restart 复用。
- 构建：只用面板「设置 → 构建环境」固定的 Maven 目录与 settings.xml（不回落项目 `mvnw`、IDE 捆绑或 PATH），编译该模块及其依赖兄弟模块；失败返回 `file:line` + 错误摘要；有单独 build 操作（`java_ops_build`，按服务 id 或 mainClass 解析模块）；启动前自动构建默认开、可按服务关闭。
- SQL：连接手填（host/port/db/user/password），可测连通；密码加密保存不回显；默认最多 500 行、超时 10s；权限矩阵 SELECT/INSERT/UPDATE/DELETE/DDL 默认只开 SELECT，面板与工具共用；UPDATE/DELETE 无 WHERE 硬拦截（设置可放行）。
- SQL 页面不提供执行入口：SQL 只能由 Agent 工具执行，页面是只读的执行记录（时间/语句/结果/耗时）。
- 高危操作一律人工确认，走 DSH 原生 `ctx.userQuestions` 弹窗（`ctx.approval` 亦可）。
- 工具统一 `java_ops_` 前缀，全部常驻暴露（不用按需发现，Agent 才能知道有哪些工具）。
- 交互：Agent 工具 + 会话内 View tab（`conversation.view` 槽，不是侧栏独立页）：服务列表、一键起停、实时日志、SQL 执行记录、设置。tab 名「运行服务」（en: Services）。
- 按需登记：Agent 不需要先手工添加服务，启动类名（`mainClass`）即可让工具扫描并登记后启动；面板的「AI 操作」带实时显示 agent 正在扫描/构建/启动/停止什么。
- 作用域：一个工作区一套设置（服务、连接、权限、构建开关、数据目录），切换工作区整套切换；不提供跨项目下拉切换，页面只标注"工作区 · 跟随当前会话"。
- 过渡：与旧 MCP 方案并存对照，验收后再下线旧连接。

---

## #1: 是否继续依赖 IDE？

Blocked by: 无
Type: Grilling

### Question

插件是否仍通过 IDE 调试端口获取 run configuration 与数据库连接？

### Answer

否。完全脱离 IDE；读代码交给 DSH 原生文件工具，启动、停止、SQL 全部由插件自管。

## #2: 保留旧 MCP 的哪些能力？

Blocked by: 无
Type: Grilling

### Question

"在原基础上"具体保留哪些能力？

### Answer

服务生命周期、SQL 执行、服务发现、编译构建。不做 Java 符号分析（search_symbol/analyze_calls），不做 HTTP 请求、终端、文件编辑（已有对应工具）。

## #3: 服务从哪定义？

Blocked by: #1
Type: Grilling

### Question

服务清单、启动类、端口、VM 参数从哪里来？

### Answer

不解析 IDE 工程文件（run config 散落，不可靠）。扫描源码识别启动类 → 归属模块 → 读模块 `application*.yml`；其余字段面板/工具手动补。示例项目的 OrderApplication 需手动补 `-Dspring.cloud.nacos.discovery.namespace=<namespace-id>` 这类 VM 参数（不在 yml 里）。

## #4: 停服务怎么停？

Blocked by: 无
Type: Grilling

### Question

stop/restart 的停止策略与失败处理？

### Answer

优雅停止（Windows 先 `taskkill` 不带 `/F`；配了 actuator 先调 shutdown）→ 轮询端口释放 → 30s 未释放自动强杀并标记"已强杀"。restart 复用同一套。

## #5: SQL 权限怎么管？

Blocked by: 无
Type: Grilling

### Question

SQL 工具是否分读写、如何授权？

### Answer

按增删改查分类：SELECT / INSERT / UPDATE / DELETE / DDL 各自开关，全局 + 按连接；默认只开 SELECT。UPDATE/DELETE 无 WHERE 硬拦截（设置可放行）；所有高危操作（无 WHERE 写、DDL、批量删除等）必须经 `userQuestions` 人工确认。DDL 与 PostgreSQL 放 v2。

## #6: 插件给人用到什么程度？

Blocked by: 无
Type: Grilling

### Question

只有 Agent 工具，还是给人界面？

### Answer

工具 + 完整管理面板：服务列表（状态/端口/模块/启动耗时，行内含起停重启/日志/编辑/删除）、实时日志（合并 stdout+stderr、关键字过滤、保留最近 5000 行）、SQL 只读执行记录（时间/语句/结果/耗时，不提供执行入口）、设置页（构建开关、权限矩阵、数据目录）；端口冲突/崩溃告警。

入口形态（用户 m00202 定）：**会话内 View tab**，注册到 `conversation.view` 槽（list，scope session，注册项 `{id, order, label}`；现有占用 chat 0 / trajectory 10 / context 20 / fleet 30，本插件 `id: java-ops, order: 40`）。页面内部用分段控件切 服务 / SQL / 设置 三页，日志内嵌在服务详情里，不做侧栏独立页。

## #7: 插件同时管几个项目？

Blocked by: 无
Type: Grilling

### Question

项目根如何确定？

### Answer

跟随会话工作区自动识别项目根；设置、服务、连接、权限都挂在工作区上（用户 m00431：一个工作区一套设置），切换工作区整套切换，不做跨项目下拉；服务记模块相对路径，不写死绝对路径。

## #8: 与旧 MCP 怎么过渡？

Blocked by: 无
Type: Grilling

### Question

装好即替换，还是并存？

### Answer

先并存对照，验收通过后再下线旧连接。

## #9: 无 IDE 如何启动 Spring Boot 服务？

Blocked by: 无
Type: Research

### Question

不依赖 IDE 时，如何把 `OrderApplication`（module `order-service`，VM 参数含 nacos namespace）按原语义启动？

候选：`mvn -pl ... spring-boot:run`；`mvn dependency:build-classpath` + `java -cp`；复用 `target/classes` + 依赖 jar。需验证：VM 参数、工作目录、profile、环境变量、多模块依赖（`-am` 会重编公共模块）的传递与代价。

### Answer

实测选定 **`dependency:build-classpath` + `java @argfile`**（2026-11-15，示例项目 Order 全链路验证）：

- `mvn -q -B -pl <module> -am -DskipTests compile dependency:build-classpath -Dmdep.outputFile=<module>/target/java-ops-classpath.txt -Dmdep.includeScope=runtime` 一次调用完成编译与 classpath 解析，拿 `target/classes;依赖 jar`。
- 关键坑：Spring Boot 依赖树拼出的 classpath 单参数常超 Windows 限制，`java -cp <超长串>` 直接 `spawn ENAMETOOLONG`。解法是把 JVM 参数、`-cp`、主类逐行写进 `<profile>/plugin-data/run-<id>.args`，用 `java @argfile` 启动。
- 端口覆盖用 `-Dserver.port=<port>`，不改源文件；vmArgs（如 nacos namespace）、工作目录、`spring.profiles.active` 均原样传递。
- 不用 `spring-boot:run`：多模块 `-pl` 解析与进程树更绕，且 `@argfile` 方案让 PID 精确可控。
- 启动耗时优化（2026-11-15 实测）：编译与 classpath 解析合并为一次 Maven 调用（`compile dependency:build-classpath`，去掉 `install`）→ 增量构建 12.7s；源文件与 pom 的 mtime 未变则整段跳过构建 → 示例项目 Order 从点击到端口可连 32s 降到 17s。

## #10: 项目与服务发现能解析到什么程度？

Blocked by: 无
Type: Research

### Question

扫描源码找启动类的性能与准确率（示例项目全量扫描耗时、多模块归属判定、`main` 方法类误报、`application*.yml` 多 profile 合并规则）？

### Answer

待办。规则已定：`@SpringBootApplication` / `@EnableAutoConfiguration` / 含 `main` 方法，跳过 `target`/`node_modules`/`.git`，归属最近模块；待在真实项目实测。

## #11: 进程管理与状态持久化

Blocked by: #9
Type: Prototype

### Question

进程树归属（java 子进程）、端口认领、优雅停→强杀、孤儿进程回收、DSH 重启后如何恢复管理、同端口多 PID 与多实例？

### Answer

待办。

## #12: SQL 层实现

Blocked by: 无
Type: Research / Grilling

### Question

驱动选型（mysql2 / pg）、SQL 分类器（SELECT/INSERT/UPDATE/DELETE/DDL）、凭据存储（插件配置/DSH credentials）、行数上限、超时与取消、事务语义。

### Answer

待办。已定：默认 500 行、超时 10s、`sql_cancel` 取消。

## #13: 工具契约

Blocked by: #11, #12
Type: Grilling

### Question

工具入参出参、错误结构、日志截断与分页。

### Answer

待办。已定：`java_ops_` 前缀、全部常驻暴露。清单：`service_list`/`service_status`/`service_start`/`service_stop`/`service_restart`/`service_add`/`service_update`/`service_remove`/`service_logs`/`project_scan`/`build`/`sql_connections`/`sql_query`/`sql_schema`/`sql_cancel`。

## #14: 插件形态与配置模型

Blocked by: 无
Type: Grilling

### Question

Host + Client 插件结构、配置存放（profile `plugin-data`）、多项目登记、与现有 dsh 插件（archive-manager / identity-switch）的结构对齐。

### Answer

待办。

## #15: 管理面板 UI

Blocked by: #13, #14
Type: Prototype

### Question

布局、实时日志传输方式（轮询/SSE）、服务操作按钮、SQL 控制台、深色主题与 DSH 插槽。

### Answer

原型已落地（0.1.0，服务页已接真实数据）：`lib/client.js` 注册 `conversation.view`（id `java-ops`，order 40，label 走 thunk 跟随语言），页面三段：服务页（顶部「AI 操作」实时带 + 左列表 + 右详情：端口/模块/启动类/PID/启动耗时/构建耗时 + 启动、停止、重启、构建、移除 + 内嵌日志过滤/自动滚动）、SQL 页（只读执行记录表，空态说明「SQL 由 Agent 工具执行」）、设置页（连接 × 操作权限矩阵、启动前自动构建、高危确认固定开启、数据目录）。添加服务为模态框：扫描候选勾选或手输 FQCN。样式只用 `--dsw-alias-*` token。

已验证：`plugin_manager install_bundle` 安装并 enabled（application applied）；页面侧 `cordis_inspect_query client Slots.listSubTree root=conversation.view` 的 occupants 出现 `id: java-ops, order: 40, active: true`，说明客户端已加载并成功注册。服务链路端到端实测通过（见 #9/#16）；按需登记实测：只传 `mainClass` 即登记并启动 DataSync 成功。视觉走查需用户在自己的会话里切到该 tab（本机 Web GUI 需鉴权，沙箱内无法另起浏览器截图）。

待办：SQL 工具与真实执行记录、日志传输方式（轮询 vs SSE）、5000 行环形缓冲、明暗两色走查。

## #16: 编译构建

Blocked by: #9
Type: Grilling

### Question

编译触发方式（启动前自动 / 单独工具）、mvn/gradle 选择、错误摘要、与热重启的关系。

### Answer

实测落地（示例项目 Order）：只认面板固定的 Maven（经 plexus launcher 直接起 `Launcher`，避开带空格的 `mvn.cmd`），未设置或失效直接报中文原因；一次调用 `compile dependency:build-classpath` 同时完成编译与 classpath；源文件与 pom 的 mtime 未变则跳过构建（面板显示「构建 已跳过」）；失败取 `[ERROR] file.java:[line]` 前 8 行，无 `[ERROR]` 时回退最后 12 行非空输出。单独 `java_ops_build` 走同一条路径。

## #17: 验收场景

Blocked by: #9–#16
Type: Grilling

### Question

用示例项目的 OrderApplication 跑通端到端：起→就绪→改代码重启→SQL 查数据；并与旧方案对照。

### Answer

待办。

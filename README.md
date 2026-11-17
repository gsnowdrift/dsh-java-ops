<div align="center">

# Java Ops

**DeepSeek Harness 插件：把 Java 服务的编译、启停、重启、调接口、读数据库交给 AI**

改代码 → 构建 → 重启 → 调接口看结果 → 查库核对，这一圈以前得在 IDE、终端、Postman、数据库客户端之间来回切；
现在 Agent 自己就能跑完，再回来告诉你结果。

[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![npm](https://img.shields.io/npm/v/@gsnowdrift/dsh-java-ops)](https://www.npmjs.com/package/@gsnowdrift/dsh-java-ops) [![ci](https://img.shields.io/github/actions/workflow/status/gsnowdrift/dsh-java-ops/check.yml?branch=main&label=ci)](https://github.com/gsnowdrift/dsh-java-ops/actions/workflows/check.yml) [![stars](https://img.shields.io/github/stars/gsnowdrift/dsh-java-ops)](https://github.com/gsnowdrift/dsh-java-ops/stargazers) [![topic](https://img.shields.io/badge/dsh--plugin-listed-blueviolet)](https://github.com/topics/dsh-plugin)

[安装](#安装) · [功能一览](#功能一览) · [特性](#特性) · [工具](#工具) · [数据安全](#数据安全) · [限制](#限制)

![Java Ops 面板](docs/images/cover.png)

</div>

## 安装

```bash
dsh plugin --profile web add @gsnowdrift/dsh-java-ops
```

`dsh plugin` 会把参数原样转给 profile 目录里的 pnpm，所以这就是标准的加包流程。常用变体：

```bash
dsh plugin --profile web remove @gsnowdrift/dsh-java-ops   # 卸载
dsh plugin --profile web why @gsnowdrift/dsh-java-ops      # 看装的是哪个版本
```

想装最新源码而不等 npm 发版：

```bash
dsh plugin --profile web add github:gsnowdrift/dsh-java-ops
```

本机需要 JDK 与 Maven（或项目自带 `mvnw`）——构建和启动都靠它；插件自身依赖 `mysql2`（纯 JS，无原生编译），安装时自动装。

本地开发用 link 方式：

```jsonc
// ~/.dsh/profiles/<profile>/package.json
{
  "dependencies": {
    "@gsnowdrift/dsh-java-ops": "link:/path/to/dsh-java-ops"
  }
}
```

首次链接后在该目录执行一次 `npm install`，再按上面同样的方式启用。

> 改完 `lib/` 下的代码要热重载插件，并**刷新页面**——已加载的 client 模块不会自己重跑。

## 功能一览

三个页签对应三件事：跑服务、验数据、定规矩。

**服务** —— 左侧是扫描出来的启动类与端口，右侧是启动 / 停止 / 重启 / 构建按钮、PID 与启动耗时、实时日志（可过滤、可放大、按级别着色）：

![服务页](docs/images/services.png)

**SQL** —— 每条执行都留痕：时间、操作类型、SQL 原文、成功与否、影响条数，顶部可切数据库连接：

![SQL 执行记录](docs/images/sql.png)

**设置** —— 启动前自动构建；SQL 的读 / 写 / 删三组独立授权，每组可再勾高风险提示：

![设置页](docs/images/settings.png)

## 特性

五组能力，逐项细节见下面的表格：

- **服务**：扫描发现、添加、启动、停止、重启、单独构建，含端口占用校验、单实例守卫、就绪判定与启动失败归因
- **可观测**：实时日志（分级着色、过滤、放大）、操作记录、PID、启动与构建耗时
- **接口验证**：任意方法 HTTP 请求，请求头可按工作区预设并自动带上，调用记录可回看请求头、响应头、响应体
- **数据核对**：SQL 查询与增删改，读/写/删三组独立授权与高风险确认，执行记录保留 3 天
- **工作区隔离**：服务、连接、权限、请求头、执行记录都按会话所在项目各存一套

| 能力 | 说明 |
| --- | --- |
| 服务发现 | 扫描 `@SpringBootApplication` / `@EnableAutoConfiguration` / 带 `main` 的类，按最近 `pom.xml` / `build.gradle` 归属模块，从 `application*.yml` 读端口、`context-path`、profile |
| 添加服务 | 下拉联想（输包名或类名即可筛）+ 手填全限定类名；端口、服务名、VM 参数、profile 均可改 |
| 启停重启 | 启动前自动构建（可关）、等待就绪＝探针报告端口已监听或接口能回 HTTP（最长 120s），启动失败由内置探针的 Spring 事件直接报因；同一服务单实例守卫，不同服务可并行；启动前校验端口，被占用时报出进程名与 PID，由调用方决定是否结束 |
| 停止 | 给进程发 Ctrl+C（SIGINT），Spring 优雅停机；30s 未退出才强杀 |
| 构建 | `mvnw` / `gradlew` 优先，失败给 `file:line` 结构化错误 |
| 日志 | 实时日志分级着色、搜索过滤、放大、Esc 退出；每次启动/重启清空上一轮 |
| SQL | 三组权限（读/写/删）+ 可选高风险确认、结果 500 行 / 10s 超时、执行记录留 3 天 |
| 接口调用 | `java_ops_http_request` 发任意方法请求；面板「接口」页维护请求头预设（可按行启用/停用），调用自动带上；下部分列出时间、方法、URL、耗时、状态码，可点开看请求头、响应头与响应体 |
| 凭据 | 数据库密码只进 DSH credentials，不落 JSON、不回显 |

## 工具

Agent 侧通过工具操作，人看面板：

| 工具 | 作用 |
| --- | --- |
| `java_ops_project_scan` | 扫描启动类候选 |
| `java_ops_service_list` | 服务列表、状态、PID、SQL 权限与最近执行记录 |
| `java_ops_service_add` / `java_ops_service_remove` | 登记 / 移除服务 |
| `java_ops_service_start` / `java_ops_service_stop` / `java_ops_service_restart` | 启动 / 停止 / 重启 |
| `java_ops_service_ensure` | 幂等入口：没在跑就启动并等到就绪 |
| `java_ops_service_status` | 状态 + 日志，支持 `grep` / `level` / `tail` |
| `java_ops_build` | 只构建，返回结构化错误 |
| `java_ops_sql_connections` | 列出数据库连接 |
| `java_ops_sql_query` | 执行 SQL（受权限矩阵约束） |
| `java_ops_http_request` | 发 HTTP 请求，自动套用面板保存的请求头，返回状态码、响应头与 64 KB 以内的响应体 |

工具都接受可选的 `workspace`（项目根绝对路径）；不传时按「会话 cwd → 最近用过的项目根」解析。

## 数据安全

- 状态文件：`~/.dsh/profiles/<profile>/plugin-data/java-ops.json`
  结构：`{ workspaces: { [root]: { services, buildEnabled, sqlPerms, sqlConnections, sqlLog, httpHeaders, httpLog } }, seq }`
- 服务、数据库连接、SQL 执行记录、接口请求头与调用记录、权限与构建开关都按工作区各存一套。
- 数据库密码：DSH credentials，ref 形如 `JAVA_OPS_SQL_<工作区哈希>_<ID>`，不落 JSON、不回显。
- 接口请求头按原样明文存在状态文件里（`Authorization` 这类也在内），只在本机、不上传；调用记录保留最近 100 条，每条响应体最多存 8 KB。
- SQL 权限模型：

| 组 | 覆盖语句 | 默认 |
| --- | --- | --- |
| 读 | `SELECT` / `SHOW` / `DESC` / `EXPLAIN` / `WITH` | 允许 |
| 写 | 其余语句：`INSERT` / `UPDATE` / `ALTER` / `CREATE` … | 拒绝 |
| 删 | `DELETE` / `DROP` / `TRUNCATE` | 拒绝 |

每组两个开关：**允许执行**（关闭即拒绝并留痕）、**高风险提示**（开启后每次执行弹 DSH 原生确认框）。无 `WHERE` 的 `UPDATE` / `DELETE` 一律拦截，判断前先剥掉字符串与注释里的 `where`，避免 `note='no-where'` 这类绕过。

## 限制

- 端口被占用时默认不抢占：工具返回 `blocked`、面板弹确认框，由调用方决定是否结束占用进程。
- 启动探针只对 Spring Boot 生效；非 Spring 进程回退到端口 + `readyUrl` 探测。
- 探针 jar 被运行中的 JVM 打开时无法重建，改完 `probe/` 要先停掉使用它的服务再 `bash probe/build.sh`。
- 接口调用没有独立的鉴权闸门：能调 `java_ops_http_request` 的 Agent 就能打到任意 URL，请求头预设不要放长期有效的生产密钥。
- Gradle 支持有限，构建主走 Maven wrapper / `mvn`。
- 表结构浏览、DDL 专门界面、PG / Oracle / 达梦等驱动尚在计划中。

实现细节与历史决策见 [docs/DETAIL.md](docs/DETAIL.md)、[docs/decision-map.md](docs/decision-map.md)。

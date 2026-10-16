# 后台管理系统

后台位于 `apps/admin`，与官网共享 Go API 和 PostgreSQL，独立构建、启动。官网不加载后台组件。

## 本地使用

- 官网：<http://127.0.0.1:3000>
- 后台：<http://127.0.0.1:3001>
- 管理员邮箱：`admin@zhiyu.local`
- 首次生成的随机密码：`.runtime/admin-credentials.txt`（仅本机文件，权限 0600，不进入源码包）。登录后可在账户设置中修改；修改后所有旧会话失效。初始化不会覆盖既有密码。

2026-10-16 品牌拼写修正已保留现有管理员 ID 和密码，仅更新默认邮箱为 `admin@zhiyu.local`。登录 Cookie 已改为 `zhiyu_admin`，原登录状态需要重新登录。现有数据库及测试库已分别改名为 `zhiyu`、`zhiyu_admin_test`；当前品牌的可恢复备份保存在 `.runtime/backups/zhiyu-20261016`。项目完整目录为 `<项目根目录>`。本机 8080 被另一项目占用，当前 API 使用 8081；重启完整服务时使用 `API_ADDR=127.0.0.1:8081 WEB_MODE=start bash scripts/start-local.sh`。

```bash
npm ci
bash scripts/start-local.sh
# 生产预览（先停止旧进程）
npm run build
WEB_MODE=start bash scripts/start-local.sh
# 停止官网、后台、API、本地数据库
bash scripts/stop-local.sh
```

已有官网服务需要重启才能加载新增 API 和埋点。单独启动后台：`npm run dev:admin` 或 `npm run start:admin`。首次初始化：`bash scripts/admin-local.sh`。已有数据库会通过 `002_management.sql` 增量迁移，保留既有留言；内容快照仍按原有 seed 同步，客户与资源管理数据不会被 seed 覆盖。

## 功能边界

- **数据概览**：PV、按钮/链接点击、联系入口点击、近 5 分钟活跃会话、成功提交量、会话转化率，24 小时 / 7 天 / 30 天趋势、热门页面、峰值时间、星期 × 小时热力图。
- **客户与留言**：分页、姓名/学校/联系方式搜索、待跟进/跟进中/已联系/已结束筛选，姓名/联系方式/状态/备注编辑。官网新增必填联系方式输入；旧留言兼容空联系方式。本版本管理客户线索，不含公众注册账号体系。
- **资源库**：导入原有 715 张图片，分页搜索、真实图片上传、预览、复制公开地址、名称/分类/描述编辑、归档/恢复。名称和描述是管理元数据，不自动修改官网文案或图片 alt；上传不自动替换现有官网素材。归档不删除文件，避免破坏线上引用。
- **账户与审计**：管理员登录/退出/改密；登录、客户编辑、资源编辑与上传记审计日志（界面展示最近 100 条）。当前全部管理员具有同一管理权限，没有实现角色分级。

## 转化与时间口径

用户确认的业务转化是**联系表单被 Go 服务成功保存到 PostgreSQL**，不是点击二维码或按钮，也不是管理员标记联系状态。

- 成功提交量：所选时段创建的 `inquiries` 行数；幂等提交重试只保留一行。
- 会话转化率：所选时段内既有浏览记录、又有成功提交的去重会话数 / 所选时段内有浏览记录的会话数。同一会话的多次不同留言提高提交量，但不会重复增加转化会话数。
- 无会话 ID 或本时段没有对应浏览记录的留言仍计入提交量，单独标记未归因，不进入会话转化率分子。
- PV：页面加载事件；点击：链接/按钮的点击事件；纯输入、滚动、悬停不计点击。匿名会话按标签页保存，30 分钟无信号后更新；可见页面每 30 秒发送在线信号。不是跨设备用户数。
- 时间以服务器入库时间为准；界面、日桶、星期/小时均为 UTC+8。24h 按 15 分钟、7d 按小时、30d 按天聚合；起点对齐桶边界，含当前未完成桶，界面显示实际起点。环比使用此前等长时段。
- 前台最多每 5 秒批量上报，后台可见时每 5 秒读取；正常网络下约 5–10 秒显示点击更新。隐藏的后台标签暂停刷新。统计尚未接入时的历史访问无法恢复；禁用脚本、拦截上报或网络失败会产生漏计。
- 仅官网加载埋点，后台操作不计业务点击。埋点不上传姓名、联系方式、输入内容、URL 查询参数或持久化 IP。

## 架构与接口

- `apps/admin/src/app`：Next.js 路由、服务端登录检查、同源 BFF。
- `apps/admin/src/components`：独立的概览/客户/资源/账户 UI；`packages/admin-contracts`：TypeScript 接口类型。
- `apps/api/internal/management`：后台契约、认证管理 HTTP、上传校验。`internal/analytics`：事件契约、输入校验、限流。
- `apps/api/internal/postgres`：SQL、认证持久化、查询聚合、事务、冲突保护。管理层依赖 Store 接口，不暴露 SQL 到前端。
- `POST /v1/events`：最多 30 个事件/批、32 KB；事件 UUID 唯一去重。
- `/v1/admin/login|logout|me|password`：管理员会话。
- `/v1/admin/analytics?period=24h|7d|30d`：统计快照。
- `GET /v1/admin/inquiries`、`PATCH /v1/admin/inquiries/{id}`：客户列表及修改。
- `GET|POST /v1/admin/assets`、`PATCH /v1/admin/assets/{id}`、`GET /v1/admin/assets/{id}/file`：资源管理。
- `GET /v1/admin/audit`：操作日志。
- `GET /uploads/{sha256}.{ext}`：新图片的公开不可变地址，由官网同路径代理。原图片地址仍为 `/images/...`。

## 可靠性与运行

- 密码 bcrypt 哈希；256 位随机会话，数据库仅存 token 的 SHA-256，12 小时有效。后台浏览器仅获得 HttpOnly + SameSite=Strict cookie；后端逐请求验证 bearer token。
- BFF 写操作校验同源 Origin；不将 token 放入 JS 或 localStorage。读取客户、预览素材和统计均需鉴权且不缓存。线上 HTTPS 设置 `COOKIE_SECURE=true`。
- 登录限流；事件体积、批数、页面路径、事件种类均受限。限流是进程内、按直连来源地址执行，当前 BFF 下用户共享配额；多实例上线应在可信网关按真实来源限流，不能直接信任任意 X-Forwarded-For。
- 图片按内容识别 MIME，限制 8 MB，仅 PNG/JPEG/WebP/GIF；文件名为内容哈希，阻止用户路径注入。上传目录默认 `.runtime/uploads`，生产应设置 `UPLOAD_DIR` 指向持久卷，并设置 `PUBLIC_DIR`。资源是公开素材，不适合上传私密文件。
- 客户/资源编辑以 `updated_at` 进行乐观锁，旧版本返回 409，避免互相覆盖；修改和审计在一个事务提交。
- 看板使用只读一致性事务；索引覆盖时间、会话和事件类型。图表补齐空桶，不以模拟数据填充。当前按需 SQL 聚合，未声称通过高并发容量测试；大流量应改为小时汇总表并缓存查询。
- 原始访问事件保留 90 天，每 24 小时清理一次；客户、资源、审计记录不随之清理。备份必须包含 PostgreSQL 和上传目录。源码 ZIP 不含运行数据库、密码或上传数据。

## 验证

`npm run typecheck`、`npm run build`、`go vet ./apps/api/...`、`go test -race ./apps/api/...`。

完整数据库集成测试必须指向**独立且名称以 `_test` 结尾**的数据库，会清空该测试库的管理相关表：

```bash
DATABASE_URL_ADMIN_TEST='postgres://.../zhiyu_admin_test?sslmode=disable' go test -race ./apps/api/...
```

覆盖认证拒绝、错误密码、密码变更撤销会话、登出、事件去重、表单幂等、会话转化去重、未归因提交、三种统计周期、图表与总数一致性、客户搜索与冲突保护、资源归档和审计、90 天保留策略。

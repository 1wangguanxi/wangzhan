# 知瑜网络 · ZHIYU NETWORK

<p align="center">
  <img src="apps/web/public/images/zhiyu-logo.png" width="240" alt="知瑜 ZHIYU NETWORK" />
</p>

知瑜网络官网与运营管理后台。项目采用 **Next.js + React + Go + PostgreSQL**，在同一个 monorepo 中管理官网、后台、API 和共享类型。所有品牌名称、Logo、二维码及案例水印已统一为当前版本。

仓库地址：[1wangguanxi/wangzhan](https://github.com/1wangguanxi/wangzhan)。

## 目录

- [功能概览](#功能概览)
- [技术栈与运行环境](#技术栈与运行环境)
- [快速开始：本机 PostgreSQL](#快速开始本机-postgresql)
- [使用 Docker 数据库](#使用-docker-数据库)
- [环境变量](#环境变量)
- [项目结构与数据流](#项目结构与数据流)
- [常用命令与验证](#常用命令与验证)
- [内容和品牌维护](#内容和品牌维护)
- [主要接口](#主要接口)
- [生产运行](#生产运行)
- [数据备份与恢复](#数据备份与恢复)
- [常见问题](#常见问题)
- [相关文档](#相关文档)

## 功能概览

### 官网

- 首页、服务介绍、服务流程、关于我们、成功案例、客户好评、常见问题、联系我们，共 8 个页面。
- 138 个案例、162 张院校封面、24 个 FAQ、12 条好评；官网包含 715 张图片。
- 案例分类筛选、多图浏览、院校图库、FAQ 折叠、二维码弹窗和移动端导航。
- 联系表单包含联系方式、姓名、学校、专业、截止日期与需求描述，真实写入数据库，支持重复提交保护。
- 访问、点击和联系入口事件统计；表单失败会明确提示，不模拟提交成功。
- 页面元数据、结构化数据、网站图标及社交分享图。

### 运营后台

| 功能 | 说明 |
| --- | --- |
| 数据概览 | PV、点击、活跃会话、提交量、转化率、趋势及访问时段分析；每 5 秒刷新 |
| 客户与留言 | 搜索、分页、跟进状态、联系方式及备注编辑 |
| 资源管理 | 现有图片索引、图片上传、预览、分类、描述和归档 |
| 账户设置 | 管理员登录、退出及修改密码 |
| 操作审计 | 登录、密码变更、客户和资源操作记录 |

当前所有管理员拥有相同管理权限，尚未实现多角色权限划分。后台修改资源描述或分类不会自动替换官网页面素材。

## 技术栈与运行环境

| 项目 | 要求或当前版本 |
| --- | --- |
| Node.js | 20.9 或以上，npm 支持 workspaces |
| Next.js / React | 16.3.5 / 19.3.0，以 `package-lock.json` 为准 |
| TypeScript | 7.0.2 |
| Go | 1.24 或以上，以 `go.work`、`apps/api/go.mod` 为准 |
| PostgreSQL | 本机方案 15 或以上；Compose 使用 `postgres:17-alpine` |
| 本地脚本 | Bash、curl、openssl；本机数据库还需要 `pg_config` 及 PostgreSQL 工具 |
| Docker 方案 | Docker Engine / Desktop 和 Compose 插件；宿主机仍需 Node.js 与 Go |

本地自动脚本面向 macOS / Linux 的普通用户环境。Windows 可使用 WSL2；`initdb` 不应以 root 身份运行。

## 快速开始：本机 PostgreSQL

本方案会在项目内创建独立的 `.runtime/postgres` 数据目录，数据库端口为 **55432**。

```bash
git clone https://github.com/1wangguanxi/wangzhan.git zhiyu
cd zhiyu
npm ci
bash scripts/start-local.sh
```

首次运行会依次完成：

1. 初始化并启动本项目数据库。
2. 执行数据库迁移，导入内容快照。
3. 创建默认管理员并索引官网图片；已存在的管理员不会被覆盖密码。
4. 构建 Go API，启动官网和后台开发服务。

| 服务 | 默认地址 |
| --- | --- |
| 官网 | <http://127.0.0.1:3000> |
| 案例页 | <http://127.0.0.1:3000/cases.html> |
| 后台 | <http://127.0.0.1:3001> |
| API 健康检查 | <http://127.0.0.1:8080/healthz> |
| PostgreSQL | `127.0.0.1:55432` |

管理员邮箱为 **`admin@zhiyu.local`**。首次随机密码写入 `.runtime/admin-credentials.txt`，请在本机查看并登录后修改。仓库不包含任何现有管理员密码；新克隆项目会创建自己的账号数据。

### 端口冲突、停止和生产预览

如果 API 的 8080 端口被占用：

```bash
API_ADDR=127.0.0.1:8081 bash scripts/start-local.sh
```

脚本会同步向两个前端传入 `CONTENT_API_URL`，并检查健康接口和内容接口，避免将其他服务当作本项目 API。官网和后台端口在当前脚本中固定为 3000、3001。

```bash
# 停止本项目的官网、后台、API 和本机数据库
bash scripts/stop-local.sh

# 构建后启动生产预览；省略 API_ADDR 时默认使用 8080
npm run build
API_ADDR=127.0.0.1:8081 WEB_MODE=start bash scripts/start-local.sh
```

日志位于 `.runtime/web.log`、`.runtime/admin.log`、`.runtime/api.log` 和 `.runtime/postgres.log`。脚本不会自动重启已经在运行的服务；修改环境变量后应先停止，再启动。

## 使用 Docker 数据库

Compose **只提供 PostgreSQL**，不构建或启动前后台应用。本方案与本机数据库使用相同的 55432 端口，二选一即可。不要在 Docker 数据库运行时调用会创建本机数据库的 `start-local.sh`。

在仓库根目录执行：

```bash
npm ci
docker compose up -d postgres

# 等数据库可用后再进行下一步；未就绪时稍后重试该检查
docker compose exec postgres pg_isready -U zhiyu -d zhiyu

# 以下密码仅用于本地开发，与 compose.yaml 的默认值一致
export DATABASE_URL='postgres://zhiyu:zhiyu_local@127.0.0.1:55432/zhiyu?sslmode=disable'
go run ./apps/api/cmd/db -seed packages/content/snapshot.json
bash scripts/admin-local.sh

# 终端 1：保持 API 运行
API_ADDR=127.0.0.1:8080 go run ./apps/api/cmd/server
```

分别打开另外两个终端，进入仓库根目录：

```bash
# 终端 2：官网
CONTENT_API_URL=http://127.0.0.1:8080 npm run dev
```

```bash
# 终端 3：后台
CONTENT_API_URL=http://127.0.0.1:8080 npm run dev:admin
```

三个应用终端使用 `Ctrl+C` 停止，数据库使用 `docker compose stop postgres` 停止。数据保存在 Compose 的 `postgres-data` 卷中；不要在需要保留数据时执行 `docker compose down -v`。

## 环境变量

配置模板见 [`.env.example`](.env.example)。本地自动脚本自带开发默认值；**Go 命令和 Bash 启动脚本不会自动读取根目录 `.env`**。需要自定义时，在运行它们的终端显式导出变量，或加载自己填写的文件：

```bash
cp .env.example .env
# 编辑 .env 后，在同一终端加载并启动
set -a
. ./.env
set +a
```

| 变量 | 使用方 | 说明 |
| --- | --- | --- |
| `DATABASE_URL` | Go | PostgreSQL 连接串；数据库管理、迁移和服务命令均需要 |
| `API_ADDR` | Go / 启动脚本 | API 监听地址，默认 `127.0.0.1:8080` |
| `CONTENT_API_URL` | 两个 Next.js 服务 | 服务端请求 Go API 的地址，默认开发地址为 `http://127.0.0.1:8080` |
| `SITE_URL` | 官网 | 结构化数据使用的官网地址；默认 `http://localhost:3000`，部署时在构建及运行环境设置 |
| `NEXT_PUBLIC_SITE_URL` | 后台 | “查看官方网站”的链接地址；浏览器构建时写入，修改后需重新构建后台 |
| `COOKIE_SECURE` | 后台 | HTTPS 部署设为 `true`；本地 HTTP 使用 `false` |
| `PUBLIC_DIR` | Go | 公开资源根目录，默认 `apps/web/public` |
| `UPLOAD_DIR` | Go | 上传文件目录，默认 `.runtime/uploads`；官网通过 API 代理访问上传图片 |
| `WEB_MODE` | 启动脚本 | `dev` 或 `start`；后者要求已有前后台构建产物 |
| `POSTGRES_PASSWORD` | Compose | Docker 数据库初始化密码；修改后应同步 `DATABASE_URL` |
| `WEB_URL` | 内容验证脚本 | 被验证官网的地址，默认 `http://127.0.0.1:3000` |
| `DATABASE_URL_TEST` | Go 测试 | 官网持久化集成测试连接串 |
| `DATABASE_URL_ADMIN_TEST` | Go 测试 | 后台与统计集成测试连接串，数据库名必须以 `_test` 结尾 |

路径变量相对 Go 进程的工作目录解析，建议所有命令都从仓库根目录运行。本机数据库自动脚本固定使用开发角色 `zhiyu` 和本地开发密码；已有数据库、自定义凭据或生产环境请使用独立的迁移和服务命令，不使用本机初始化流程。Compose 初始化密码也不会自动修改已有卷中的数据库密码。

## 项目结构与数据流

```text
zhiyu/
├── apps/
│   ├── web/                       # 官网 Next.js 应用
│   │   ├── src/app/               # 路由、API 代理、页面入口
│   │   ├── src/views/             # 8 个页面的文案和布局
│   │   ├── src/components/        # 页头、页脚、二维码及共享组件
│   │   ├── src/features/          # 图库、FAQ、联系表单和好评
│   │   └── public/                # 715 张图片、公共及页面样式
│   ├── admin/                     # 独立的 Next.js 管理后台
│   │   └── src/                   # 登录、工作台、BFF、图表和资源管理
│   └── api/
│       ├── cmd/{server,db,admin}/ # 服务、迁移、管理员和资源初始化命令
│       └── internal/
│           ├── site/              # 官网业务类型与验证
│           ├── httpapi/           # 公开 HTTP 接口
│           ├── management/       # 管理认证、客户和资源接口
│           ├── analytics/        # 访问事件与统计
│           └── postgres/         # SQL、事务和版本化迁移
├── packages/
│   ├── content/                   # 内容类型、快照、SEO 与结构化数据
│   └── admin-contracts/           # 后台共享 TypeScript 契约
├── scripts/                       # 本地启停、初始化和校验
├── docs/                          # 架构、后台及验收说明
├── reference/                     # 已规范化品牌的页面/图片存档及哈希清单
├── .runtime/                      # 自动生成的数据库、上传、日志和凭据，不提交
├── .env.example                   # 配置模板
├── compose.yaml                   # 可选的 PostgreSQL 容器
├── package.json / package-lock.json
└── go.work
```

浏览器请求各自的 Next.js 应用，前端通过同源 API 代理访问 Go，Go 再连接 PostgreSQL。浏览器不直接持有数据库连接信息。后台 Cookie 为 `zhiyu_admin`，由后台 BFF 管理，Go 校验会话。

官网公开内容支持预渲染、300 秒 ISR 和 SSR；API 不可用时可回退到版本化内容快照。留言、登录和后台数据操作仍需要正常运行的 API 与数据库。

## 常用命令与验证

| 命令 | 用途 |
| --- | --- |
| `npm ci` | 按锁文件安装全部前端 workspace 依赖 |
| `npm run dev` / `npm run dev:admin` | 分别启动官网 / 后台开发服务 |
| `npm run build` | 顺序构建官网和后台 |
| `npm run start` / `npm run start:admin` | 分别运行已构建的官网 / 后台 |
| `npm run typecheck` | 两个前端的 TypeScript 检查 |
| `npm run verify:assets` | 检查官网引用图片是否缺失 |
| `node scripts/verify-content.mjs` | 对照运行中的官网与参考页面正文 |
| `npm run test:api` | Go 测试，未配置数据库时会跳过相应集成测试 |
| `go vet ./apps/api/...` | Go 静态检查 |

提交代码前的基础检查：

```bash
npm run typecheck
npm run verify:assets
npm run test:api
go vet ./apps/api/...
npm run build

# 官网已启动时执行
node scripts/verify-content.mjs
```

完整持久化验证需要独立测试库。以下示例适用于本机默认开发数据库；`createdb` 只需在测试库尚不存在时执行：

```bash
PGPASSWORD=zhiyu_local createdb -h 127.0.0.1 -p 55432 -U zhiyu zhiyu_admin_test
export DATABASE_URL_TEST='postgres://zhiyu:zhiyu_local@127.0.0.1:55432/zhiyu_admin_test?sslmode=disable'
export DATABASE_URL_ADMIN_TEST="$DATABASE_URL_TEST"
go test -race ./apps/api/...
```

**管理集成测试会清空测试库中的管理、访问统计与留言表，不要指向业务数据库。** 测试覆盖会话、幂等提交、访问统计、资源管理、编辑冲突及数据保留逻辑。

## 内容和品牌维护

| 要修改的内容 | 主要位置 |
| --- | --- |
| 官网文案、布局 | `apps/web/src/views/*.tsx` |
| 页头、页脚、导航、二维码 | `apps/web/src/components/` |
| 官网样式 | `apps/web/public/css/`，包括公共、页面和首屏关键样式 |
| 案例、院校、好评及 FAQ 索引 | `packages/content/snapshot.json` |
| 页面 SEO / 结构化数据 | `packages/content/pages.json`、`structured-data.json` |
| 后台界面 | `apps/admin/src/components/` |
| 官网 / 后台 Logo | 两个应用各自的 `public/images/zhiyu-logo.png` |
| 二维码 / 分享图 | 官网 `public/images/zhiyu-qrcode.png`、`zhiyu-share.png` |
| 数据库结构 | `apps/api/internal/postgres/migrations/` |

快照更新后，同步到运行数据库：

```bash
# 先在当前终端配置 DATABASE_URL
go run ./apps/api/cmd/db -seed packages/content/snapshot.json
```

种子数据按集合和 ID 更新，不删除客户留言；已应用的 SQL 迁移不应直接改写，结构变化应新增迁移文件。FAQ 富文本目前保存在官网视图中，快照索引不等同于动态 CMS。

图片改名时需要同步页面、快照及数据库资源记录。`reference/` 是参考存档；`scripts/migrate-reference.mjs` 为一次性恢复工具，会覆盖页面、样式及内容文件，不属于日常构建命令。

## 主要接口

| 接口 | 用途 |
| --- | --- |
| `GET /healthz` | 数据库健康状态 |
| `GET /v1/catalog` | 案例、院校、FAQ 索引和好评，支持 ETag |
| `POST /v1/inquiries` | 提交留言，需要 `Idempotency-Key` |
| `POST /v1/events` | 匿名浏览和点击事件 |
| `/v1/admin/login`、`logout`、`me`、`password` | 管理员认证和账户 |
| `/v1/admin/inquiries` | 客户与留言管理 |
| `/v1/admin/assets` | 图片资源与元数据管理 |
| `/v1/admin/analytics`、`audit` | 统计和审计 |
| `GET /uploads/{file}` | 公开访问上传图片 |

浏览器使用官网 `/api/contact-message`、`/api/events`，以及后台 `/api/admin/*` 代理。留言 JSON 字段为 `contact`、`name`、`school`、`major`、`deadline`、`message`，可携带匿名 `sessionId`。后台资源上传仅接受 PNG/JPEG/WebP/GIF，单张最大 8 MB。

## 生产运行

当前仓库提供源码、构建命令及数据库 Compose 配置，不包含完整的一键生产部署方案。

1. 准备独立的生产数据库与持久化上传目录，使用自己的数据库凭据。
2. 配置 `DATABASE_URL`，执行 `go run ./apps/api/cmd/db`。新站点需要示例内容时再追加 `-seed packages/content/snapshot.json`。
3. 通过 `go run ./apps/api/cmd/admin -email <管理员邮箱> -password-file <密码文件>` 初始化管理员并索引资源。密码文件应仅在服务器本地可读。
4. 设置 `CONTENT_API_URL`、`SITE_URL`、`NEXT_PUBLIC_SITE_URL`，HTTPS 后台设置 `COOKIE_SECURE=true`。
5. 执行 `npm ci`、`npm run build`、`go build -trimpath -o .runtime/zhiyu-api ./apps/api/cmd/server`，构建前先创建 `.runtime`。
6. 使用进程管理器分别运行 Go API、`npm run start` 和 `npm run start:admin`，并传入对应运行环境变量。
7. 通过 HTTPS 反向代理提供官网和后台入口，保留正确的 `Host` / `Origin`；Go API 与数据库通常仅供应用服务内部访问。

上线前应填写真实的域名、联系方式及备案信息，当前页面仍包含示例备案号。图片资源按公开素材设计，不应用于存储私密文件。数据库与上传目录需要独立持久化，重新部署源码不能替代业务数据备份。

## 数据备份与恢复

仓库只保存源码、品牌资源和内容快照，以下内容不会进入 Git：

- `.runtime/` 中的数据库、管理员凭据、上传文件、日志与本机备份。
- 实际 `.env` 配置、IDE 个人设置、`node_modules/`、`.next/` 及编译缓存。

数据库备份示例：

```bash
mkdir -p .runtime/backups
pg_dump "$DATABASE_URL" -Fc -f .runtime/backups/zhiyu.dump
```

还应单独备份 `.runtime/uploads/`（存在时）以及部署所需配置。恢复时先创建目标空库并备份现有数据，再执行：

```bash
pg_restore --exit-on-error --dbname="$DATABASE_URL" .runtime/backups/zhiyu.dump
```

上述命令不负责创建数据库角色。恢复后要核对管理员登录、内容和资源数量、上传目录与文件权限。删除 `.runtime` 或 Docker 数据卷会丢失对应业务数据；重新克隆仓库不会自动找回。

## 常见问题

| 现象 | 排查方式 |
| --- | --- |
| 找不到 `pg_config`、`initdb` 或 `pg_ctl` | 确认安装了完整 PostgreSQL 工具且在 PATH 中；也可使用 Docker 数据库方案 |
| 8080 被占用或提示 API 服务不兼容 | 使用 `API_ADDR=127.0.0.1:8081`，独立启动时同步 `CONTENT_API_URL` |
| 3000 / 3001 被占用 | 先停止占用进程；手动运行 Next.js 时可传入自定义端口 |
| 官网能打开，但留言失败或后台不可用 | 公开内容可能来自快照；检查 Go `/healthz`、数据库连接及前后台 API 地址 |
| 后台无法登录 | 查看本机凭据文件；密码修改后该文件仍是初始值，重新初始化不会覆盖已有密码 |
| 后台请求返回 403 | 检查浏览器访问地址及反向代理 `Host` / `Origin` 是否一致 |
| 本地 HTTP 登录后会话不保留 | 确认没有在 HTTP 环境设置 `COOKIE_SECURE=true` |
| 更新内容后仍显示旧页面 | ISR 有缓存周期；确认数据库快照同步，必要时重新构建并重启 |
| 官网构建正常但验证脚本失败 | `verify-content.mjs` 需要已运行的官网，且有意修改文案后应同步参考页面 |
| Go 集成测试被跳过 | 设置对应测试数据库环境变量；管理测试只能使用独立 `_test` 数据库 |

## 相关文档

- [架构与维护](docs/architecture.md)
- [后台使用、统计口径与接口说明](docs/admin.md)
- [品牌与迁移验收记录](docs/verification.md)
- [环境配置模板](.env.example)

仓库没有声明开源许可证。代码、图片及品牌素材的授权范围需由维护者另行确认。

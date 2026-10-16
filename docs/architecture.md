# 架构与维护

项目是 npm workspaces + Go workspace 的 monorepo。新增后台、埋点、统计口径、安全与运行说明见 [admin.md](admin.md)。React 负责视图和交互，Next.js App Router 负责路由、预渲染及 SSR，Go 负责业务验证和 HTTP 接口，PostgreSQL 负责内容及留言持久化。

## 模块

| 路径                       | 职责                                                           |
| -------------------------- | -------------------------------------------------------------- |
| apps/admin                 | 独立 Next.js 管理后台、登录检查与同源 BFF                       |
| packages/admin-contracts   | 管理端 API 的 TypeScript 契约                                  |
| apps/api/internal/management | 管理认证、客户与资源操作契约及 HTTP                           |
| apps/api/internal/analytics | 匿名事件契约、输入限制及上报 HTTP                               |
| apps/web/src/views         | 8 个页面的可编辑 React 服务端视图，保留原站文案、结构和 CSS 类 |
| apps/web/src/components    | 导航、页脚、图标、弹窗焦点管理、页面滚动行为                   |
| apps/web/src/features      | 案例筛选与翻图、院校图库、FAQ、留言表单                        |
| packages/content           | 有类型的内容契约、恢复内容快照、页面 SEO 元数据                |
| apps/api/internal/site     | 业务类型、验证规则与存储 interface                             |
| apps/api/internal/postgres | PostgreSQL adapter，封装 SQL、连接池、事务、迁移、种子数据     |
| apps/api/internal/httpapi  | HTTP 编解码、状态码、载荷限制与条件请求                        |

`site.Store` 是数据存储 seam，SQL 细节只存在于 PostgreSQL adapter。前端仅向同源 Next.js 接口提交留言，数据库连接字符串不会进入浏览器。没有公共查询留言的接口。

## 渲染与性能

- `/`、`/index.html`、`/services.html`、`/process.html`、`/about.html`、`/cases.html`、`/faq.html`、`/contact.html` 使用 Next 静态预渲染／300 秒 ISR。
- `/reviews.html` 使用每请求 SSR，从 Go 读取最新好评内容。
- 构建／运行时设置 `CONTENT_API_URL` 后，案例、院校与好评读取 Go / PostgreSQL。服务不可用时公开内容回退到版本化快照；留言写入从不模拟成功。
- 页面 CSS 保留原站层叠顺序，每页独立加载；图片使用原缩略图、延迟加载，弹窗才加载原图。滚动监听使用 requestAnimationFrame，动画尊重 reduced-motion。
- PostgreSQL 使用有界连接池、超时、有序内容索引。公开内容带 ETag；留言禁用缓存。

## 更新内容

修改页面排版和静态文案：`apps/web/src/views/*.tsx`。修改案例、院校或好评：`packages/content/snapshot.json`，然后执行种子命令同步数据库。FAQ 的富文本视图在 `views/faq.tsx` 中；快照中的 FAQ 是恢复索引，当前不作为动态 CMS。公共 CSS 在 `apps/web/public/css/style.css` 中；页面专属 CSS 在 `page-{page}.css` 中；首屏关键样式在 `critical/` 中。通过有序样式加载保持原站层叠顺序，共享样式只维护一份。

迁移新增 SQL 文件放在 `apps/api/internal/postgres/migrations`。已应用版本不修改；迁移使用事务和 advisory lock。种子数据按 collection/id 幂等更新，不删除留言。

## 行为差异与恢复范围

原站为静态宣传站，联系表单模拟提交。本项目新增真实数据库写入和失败提示。字段、成功提示、校验风格仍沿用原站；后台管理阶段新增联系方式字段，支持真实客户跟进；此前没有联系方式的留言仍可读取。后台统计口径为表单成功入库。

恢复全部 8 个公开页面、138 个案例、162 张院校封面、24 个 FAQ、12 条好评，以及所有直接引用的素材。原站的 Kimi 托管平台水印／访问分析脚本不属于业务功能，本地项目不加载。不能从公开页面恢复原始编辑历史、未发布文件或原数据库，这些不在恢复包内。示例备案号仍按原站保留。

原站隐藏元素的键盘与焦点处理存在不足，本地弹窗补充焦点约束、焦点归还与院校图片键盘操作。案例页 HTML 原有未闭合标签已修正为合法 React 树。

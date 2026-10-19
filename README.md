# 知瑜网络 · ZHIYU NETWORK

<p align="center">
  <img src="public/images/zhiyu-logo.png" width="240" alt="知瑜 ZHIYU NETWORK" />
</p>

知瑜网络官网，现为**纯静态多页面站点**。构建后得到完整的 HTML、CSS、JavaScript 和图片文件，直接部署 `dist/` 即可。线上无需 Node.js、Next.js、Go、数据库或管理后台。

保留首页、服务介绍、服务流程、关于我们、成功案例、客户好评、常见问题、联系我们共 8 个页面，以及原有 `.html` 地址、715 张图片、案例筛选与翻图、院校图库、FAQ、二维码弹窗和移动导航。React 组件用于维护源码与浏览器交互；所有正文和 SEO 信息已在构建时写入 HTML。

联系页支持在浏览器整理并复制咨询信息，再由访客发送给顾问。它不会上传、保存留言或自动通知顾问。原有留言接口、访问统计、上传接口、管理后台及数据库服务已移除。

## 本地开发

需要 Node.js 20.9 或以上和 npm。

```bash
npm ci
npm run dev
```

打开 <http://127.0.0.1:3000>。修改页面、内容或静态资源后会自动重新构建，刷新浏览器查看更新。`Ctrl+C` 停止。端口被占用时可使用 `PORT=3100 npm run dev`。

## 构建与部署

```bash
# 本地构建，默认 SEO 地址为 http://localhost:3000
npm run build

# 正式部署时替换为真实域名
SITE_URL=https://www.example.com npm run build

# 本地预览构建结果
npm run preview
```

将根目录 **`dist/` 内的全部文件**上传到 Nginx、对象存储静态网站、CDN 等静态托管服务，设置 `index.html` 为默认首页、`404.html` 为错误页即可。保留目录结构；不需要应用进程、API 代理或 SPA 回退规则。当前链接使用站点根路径，部署到域名根目录。

本地预览命令只提供文件服务，不参与页面渲染。也可以使用任意静态 HTTP 服务预览 `dist/`；不建议通过 `file://` 双击打开，因为页面使用根路径和 ES module。

`.env.example` 仅列出可选的构建域名及本地预览端口。脚本不会自动读取 `.env`，请通过终端或 CI 环境变量传入；无需配置任何密钥或数据库连接。

## 项目结构

```text
zhiyu/
├── src/
│   ├── pages/         # 8 个业务页面，home.tsx 对应 index.html
│   ├── components/    # 导航、页脚、弹窗等公共组件
│   ├── features/      # 图库、FAQ、咨询信息等交互
│   ├── content/       # 内容 JSON、SEO 和 TypeScript 类型
│   ├── lib/           # 类型化的内容读取和页面索引
│   ├── client.tsx     # 浏览器交互入口
│   └── render.tsx     # 构建时生成 HTML
├── public/            # 原样复制到 dist 的图片和 CSS
├── scripts/           # 构建、开发预览和验证命令
├── docs/              # 架构和验收说明
├── reference/         # 用于正文比对的历史参考，不参与构建
├── dist/              # 构建生成的部署目录，不提交
├── AGENTS.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

依赖和命令统一维护在根目录，不再使用 npm workspaces。`src/content/types.ts` 定义内容类型，项目内部使用 `@/` 引用 `src/` 下的模块。

## 内容维护

| 内容                         | 位置                                             |
| ---------------------------- | ------------------------------------------------ |
| 8 个页面的文案和布局         | `src/pages/*.tsx`                                |
| 导航、页脚、弹窗与滚动交互   | `src/components/`                                |
| 图库、FAQ、咨询信息整理      | `src/features/`                                  |
| 案例、院校、好评             | `src/content/snapshot.json`                      |
| 标题、描述、分享与结构化数据 | `src/content/pages.json`、`structured-data.json` |
| 图片、公共及页面 CSS         | `public/`                                        |
| 静态构建、本地预览和校验     | `scripts/`                                       |

更新内容后重新构建并替换静态文件。FAQ 富文本仍在 `pages/faq.tsx`，快照中的 FAQ 是参考索引。`reference/` 是历史参考存档，不参与构建，也不需要部署。原来的本地 `.runtime/` 数据仍保留且被 Git 忽略，新站点不再读取这些文件。

## 验证

```bash
# 格式、类型、构建、图片、正文和静态产物检查
npm run check

# 统一整理源码、配置与文档格式
npm run format
```

- `typecheck` 同时检查未使用的导入和参数，避免恢复代码中的冗余依赖重新出现。
- `verify:assets` 检查 715 个引用图片。
- `verify:content` 直接检查 `dist/` 中 8 页正文与参考存档的一致性；明确排除已替换的在线留言区，并对应新的联系页引导文案。设置 `WEB_URL` 可改为检查 HTTP 预览。
- `verify:static` 检查页面、SEO、CSS 顺序、站内链接及锚点、静态资源、无 JavaScript 时的表单保护，以及构建产物和依赖中不存在原来的服务端接口或 Next.js。

参见 [架构与维护](docs/architecture.md)、[验收记录](docs/verification.md)。上线前填写实际域名及备案信息，当前页脚仍包含示例备案号。仓库未声明开源许可证，代码、图片及品牌素材的授权由维护者另行确认。

# 架构与维护

官网是纯静态多页面站点，采用单一 npm 项目，代码与内容集中在 `src/`，静态资源在 `public/`。React + TypeScript 用于维护页面及浏览器交互，esbuild 用于编译。没有 Next.js、API 路由、SSR / ISR 服务、管理后台或数据库依赖。

## 构建和访问

1. `scripts/build.mjs` 将 `public/` 复制到根目录 `dist/`。
2. esbuild 打包 `src/client.tsx`，生成带内容哈希的浏览器脚本。
3. `src/render.tsx` 只在构建时执行，将本地内容及页面组件转换为完整 HTML，写入 8 个 `.html` 文件，另生成 `404.html`。
4. 线上静态服务器按文件返回 HTML、CSS、JS、图片。浏览器 React 为现有 HTML 绑定交互，无远程数据请求。

`/` 与 `/index.html` 均由同一个 `index.html` 提供。好评页同样使用本地快照，不再逐请求生成页面。标题、描述、canonical、社交分享标签和 JSON-LD 在构建时写入；`SITE_URL` 只影响构建结果，修改域名后需重新构建。

构建中间文件位于 `.build/`，完成后清理；线上只发布 `dist/`。`npm run preview` 是方便本地检查的静态文件服务器，未知路径返回 404，不使用首页兜底。`npm run dev` 监视源码、内容、脚本和资源变化，顺序重新构建，刷新页面即可查看。

## 模块

| 路径                 | 职责                                           |
| -------------------- | ---------------------------------------------- |
| `src/pages`          | 8 个页面的静态文案和布局                       |
| `src/components`     | 导航、页脚、图标、弹窗焦点、滚动行为           |
| `src/features`       | 案例筛选和翻图、院校图库、FAQ、咨询信息整理    |
| `src/lib/catalog.ts` | 唯一内容来源：版本化 JSON 快照                 |
| `src/render.tsx`     | 构建时 HTML 和 SEO 生成                        |
| `src/client.tsx`     | 浏览器交互入口                                 |
| `src/content`        | 内容类型、静态内容、页面元数据和结构化数据     |
| `public`             | 图片和 CSS，按原有顺序加载首屏、公共、页面样式 |

## 咨询信息

联系页保留字段校验，生成可复制的咨询文本。支持剪贴板时复制；权限受限或普通 HTTP 环境下显示可选中的文本供手动复制。输入变更后清除旧摘要。页面明确要求访客将文本发送给顾问，不宣称提交成功。

该功能不调用接口、不保存到浏览器持久化存储，也不通知顾问。HTML 中表单字段默认禁用，JS 初始化后启用，避免脚本不可用时触发原生表单提交、将联系方式写进 URL。页面同时提供无脚本咨询指引。

## 维护约定

内容更新后重新构建和发布。案例、院校、好评改 `snapshot.json`；FAQ 富文本改 `pages/faq.tsx`。所有图片随站点静态发布，不再支持后台上传。图片改名时同步页面和快照，再运行 README 中的检查命令。

`reference/` 为历史参考存档，其中旧脚本及表单不属于生产代码。旧 `.runtime/` 数据没有清除，迁移后的应用不再使用它；不要将它与源码、构建中间文件或 `node_modules/` 一起部署。

构建 API 参考：[esbuild](https://esbuild.github.io/api/)、[React renderToString](https://react.dev/reference/react-dom/server/renderToString)。

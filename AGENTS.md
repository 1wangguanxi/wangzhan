# 官网开发约定

本项目是纯静态多页面站点。React 组件用于维护页面和浏览器交互，esbuild 在构建时生成 HTML 与 JS。不要重新引入 Next.js、API 路由、后台管理或数据库依赖。

- 使用根目录唯一的 `package.json` 和 `tsconfig.json`，不使用 npm workspaces。
- 页面文案和布局在 `src/pages`，内容 JSON 和类型在 `src/content`；`@/` 对应 `src/`。
- 公共组件在 `src/components`，功能交互在 `src/features`，图片与 CSS 在 `public`。
- 构建入口为 `scripts/build.mjs`，部署目录为 `dist/`。脚本中的项目路径统一从 `scripts/paths.mjs` 导入。
- 用 `npm run format` 统一格式，再运行 `npm run check` 完成格式、类型、构建、资源、正文与静态产物验证。
- 联系页只在浏览器生成和复制咨询信息，不发送或保存留言。
- `reference/` 是只读历史参考，不参与构建；`.runtime/` 可能含旧业务数据，不作为构建缓存清理。

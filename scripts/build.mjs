import { build } from "esbuild";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { root, src, publicDir, dist } from "./paths.mjs";

const siteUrl = new URL(process.env.SITE_URL || "http://localhost:3000");
if (
  !["http:", "https:"].includes(siteUrl.protocol) ||
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash ||
  siteUrl.username ||
  siteUrl.password
) {
  throw new Error(
    "SITE_URL 必须为 http(s) 网站根域名，例如 https://www.example.com",
  );
}
const temporary = path.join(root, ".build");
await rm(dist, { recursive: true, force: true });
await mkdir(temporary, { recursive: true });
await cp(publicDir, dist, { recursive: true });

try {
  const options = {
    absWorkingDir: root,
    bundle: true,
    tsconfig: path.join(root, "tsconfig.json"),
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "info",
  };
  const browser = await build({
    ...options,
    entryPoints: [path.join(src, "client.tsx")],
    outdir: path.join(dist, "assets"),
    entryNames: "site-[hash]",
    platform: "browser",
    format: "esm",
    target: ["es2022"],
    minify: true,
    metafile: true,
  });
  await build({
    ...options,
    entryPoints: [path.join(src, "render.tsx")],
    outfile: path.join(temporary, "render.cjs"),
    platform: "node",
    format: "cjs",
    packages: "external",
  });
  const require = createRequire(import.meta.url);
  // Resolve React and the local content JSON only during this build step.
  const { pageNames, renderPage } = require(path.join(temporary, "render.cjs"));
  const entry = Object.entries(browser.metafile.outputs).find(
    ([, info]) => info.entryPoint,
  )?.[0];
  if (!entry) throw new Error("Missing browser entry point");
  const script =
    "/" +
    path.relative(dist, path.resolve(root, entry)).split(path.sep).join("/");
  for (const page of pageNames) {
    await writeFile(
      path.join(dist, `${page}.html`),
      renderPage(page, script, siteUrl.origin),
    );
  }
  await writeFile(
    path.join(dist, "404.html"),
    '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>页面未找到 · 知瑜网络</title><body style="font-family:sans-serif;padding:64px;text-align:center"><h1>页面未找到</h1><p>请检查网址，或返回首页继续浏览。</p><a href="/index.html">返回首页</a></body></html>',
  );
  console.log(`Built ${pageNames.length} static pages in dist/`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}

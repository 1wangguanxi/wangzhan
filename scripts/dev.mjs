import { execFile } from "node:child_process";
import { watch } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { root, src, publicDir } from "./paths.mjs";
import { serve } from "./serve.mjs";

const exec = promisify(execFile);
async function build() {
  const { stdout, stderr } = await exec(
    process.execPath,
    [path.join(root, "scripts/build.mjs")],
    { env: process.env },
  );
  process.stdout.write(stdout);
  process.stderr.write(stderr);
}
await build();
await serve();
let timer,
  running = false,
  queued = false;
async function rebuild() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  try {
    await build();
    console.log("已重新构建，刷新浏览器查看更新。");
  } catch (error) {
    console.error(error.stderr || error.message);
  } finally {
    running = false;
    if (queued) {
      queued = false;
      void rebuild();
    }
  }
}
for (const directory of [src, publicDir, path.join(root, "scripts")]) {
  watch(directory, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}

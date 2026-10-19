import fs from "node:fs";
import path from "node:path";
import { src, publicDir } from "./paths.mjs";
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    entry.isDirectory() ? walk(p) : files.push(p);
  }
}
walk(src);
const assets = new Set();
for (const file of files) {
  if (!/\.(tsx?|json)$/.test(file)) continue;
  for (const match of fs
    .readFileSync(file, "utf8")
    .matchAll(/\/images\/[A-Za-z0-9_./-]+/g))
    assets.add(match[0]);
}
const missing = [...assets].filter(
  (asset) => !fs.existsSync(path.join(publicDir, asset)),
);
if (missing.length) {
  console.error("Missing assets:", missing);
  process.exit(1);
}
console.log(`Verified ${assets.size} referenced images; zero missing assets.`);

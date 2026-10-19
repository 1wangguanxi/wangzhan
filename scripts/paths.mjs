import { fileURLToPath } from "node:url";
import path from "node:path";

export const root = fileURLToPath(new URL("../", import.meta.url));
export const src = path.join(root, "src");
export const content = path.join(src, "content");
export const publicDir = path.join(root, "public");
export const dist = path.join(root, "dist");

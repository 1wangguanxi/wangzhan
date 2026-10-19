import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { dist } from "./paths.mjs";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Local preview only: serves files as-is, with no application routes or fallback to index.html.
export async function serve() {
  await stat(path.join(dist, "index.html")).catch(() => {
    throw new Error("请先运行 npm run build，再预览 dist/。");
  });
  const server = createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      const file = path.resolve(
        dist,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (!file.startsWith(dist + path.sep) || pathname.includes("\0")) {
        response.writeHead(403).end();
        return;
      }
      let content,
        status = 200;
      try {
        content = await readFile(file);
      } catch {
        status = 404;
        content = await readFile(path.join(dist, "404.html"));
      }
      response.writeHead(status, {
        "Content-Type":
          status === 404
            ? types[".html"]
            : types[path.extname(file)] || "application/octet-stream",
        "Content-Length": content.length,
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(400).end();
    }
  });
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "127.0.0.1";
  server.listen(port, host, () =>
    console.log(`Static preview: http://${host}:${port}`),
  );
  return server;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await serve();

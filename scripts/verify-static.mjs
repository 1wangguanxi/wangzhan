import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";
import { root, content, dist } from "./paths.mjs";

const pages = JSON.parse(
  fs.readFileSync(path.join(content, "pages.json"), "utf8"),
);
const attr = (node, name) =>
  node.attrs?.find((entry) => entry.name === name)?.value;
function* walk(node) {
  yield node;
  for (const child of node.childNodes || []) yield* walk(child);
}
const documents = new Map();
for (const page of [...Object.keys(pages), "404"]) {
  const file = `${page}.html`;
  const html = fs.readFileSync(path.join(dist, file), "utf8");
  assert(
    !/\/_next\/|\/api\/|\/v1\/|\{\{SITE_URL\}\}/.test(html),
    `${file}: legacy runtime dependency`,
  );
  const nodes = [...walk(parse(html))];
  documents.set(file, nodes);
  assert(
    nodes.some((node) => node.tagName === "title"),
    `${file}: title missing`,
  );
  if (page === "404") continue;
  assert(
    nodes.some((node) => node.tagName === "main"),
    `${file}: missing static body`,
  );
  assert(
    nodes.some((node) => attr(node, "name") === "description"),
    `${file}: description missing`,
  );
  assert(
    nodes.some((node) => attr(node, "rel") === "canonical"),
    `${file}: canonical missing`,
  );
  const scripts = nodes.filter((node) => node.tagName === "script");
  assert(
    scripts.some((node) => attr(node, "type") === "module"),
    `${file}: browser entry missing`,
  );
  for (const node of scripts.filter(
    (node) => attr(node, "type") === "application/ld+json",
  ))
    JSON.parse(node.childNodes.map((child) => child.value || "").join(""));
  const css = nodes
    .filter((node) => attr(node, "rel") === "stylesheet")
    .map((node) => attr(node, "href"));
  assert.deepEqual(css, [
    `/css/critical/${page}.css`,
    "/css/style.css",
    `/css/page-${page}.css`,
  ]);
}

let references = 0;
for (const [file, nodes] of documents) {
  for (const node of nodes) {
    for (const name of ["href", "src", "data-full"]) {
      const value = attr(node, name);
      if (!value || /^(?:https?:|mailto:|tel:|data:|\/\/)/.test(value))
        continue;
      const url = new URL(value, `https://static.test/${file}`);
      const target =
        url.pathname === "/" ? "index.html" : url.pathname.slice(1);
      assert(
        fs.statSync(path.join(dist, target)).isFile(),
        `${file}: missing ${value}`,
      );
      const targetNodes = documents.get(target);
      // FAQ category hashes are browser filters, not section IDs.
      const faqFilter =
        target === "faq.html" &&
        ["all", "service", "price", "quality", "after", "privacy"].includes(
          url.hash.slice(1),
        );
      if (url.hash && targetNodes && !faqFilter)
        assert(
          targetNodes.some(
            (node) =>
              attr(node, "id") === decodeURIComponent(url.hash.slice(1)),
          ),
          `${file}: missing anchor ${value}`,
        );
      references++;
    }
  }
}
const contact = documents.get("contact.html");
assert(
  contact.some(
    (node) =>
      node.tagName === "fieldset" && attr(node, "disabled") !== undefined,
  ),
  "Contact form must not submit without JS",
);
const contactHtml = fs.readFileSync(path.join(dist, "contact.html"), "utf8");
assert(contactHtml.includes("生成并复制咨询信息"));
assert(!/在线留言|提交成功|顾问会在工作时间 2 小时内联系你/.test(contactHtml));
for (const file of fs.readdirSync(path.join(dist, "assets"))) {
  if (!file.endsWith(".js")) continue;
  const js = fs.readFileSync(path.join(dist, "assets", file), "utf8");
  assert(
    !/\/api\/|\/v1\/|sendBeacon|CONTENT_API_URL/.test(js),
    `${file}: unexpected backend request`,
  );
}
const lock = JSON.parse(
  fs.readFileSync(path.join(root, "package-lock.json"), "utf8"),
);
assert(
  !Object.keys(lock.packages).some((key) =>
    /(?:^|\/)next$|^(?:apps|packages)\//.test(key),
  ),
  "Legacy dependencies remain in lockfile",
);
console.log(
  `Verified ${documents.size} static HTML files, ${references} local links/assets, metadata, contact fallback, and no backend dependencies.`,
);

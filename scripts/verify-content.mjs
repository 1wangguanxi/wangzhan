import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";
import { root, dist, content } from "./paths.mjs";
const origin = process.env.WEB_URL;
const reference = process.argv[2] || path.join(root, "reference/original");
const pages = Object.keys(
  JSON.parse(fs.readFileSync(path.join(content, "pages.json"), "utf8")),
);
const attr = (n, k) => n.attrs?.find((a) => a.name === k)?.value;
function find(n, tag) {
  if (n.tagName === tag) return n;
  for (const c of n.childNodes || []) {
    const v = find(c, tag);
    if (v) return v;
  }
}
function visibleContent(n) {
  if (!n) return "";
  // The old online submission block is intentionally replaced by local preparation.
  // Still compare the contact details, benefits, and all other page content.
  if ((attr(n, "class") || "").split(" ").includes("contact-form-card"))
    return (n.childNodes || [])
      .filter(
        (c) =>
          !["h2", "form"].includes(c.tagName) &&
          !(attr(c, "class") || "").split(" ").includes("form-desc"),
      )
      .map(visibleContent)
      .join("");
  if (
    n.nodeName === "#comment" ||
    ["script", "style"].includes(n.tagName) ||
    attr(n, "id") === "form-success"
  )
    return "";
  if (attr(n, "data-count"))
    return attr(n, "data-count") + (attr(n, "data-suffix") || "");
  if (n.nodeName === "#text") return n.value;
  return (n.childNodes || []).map(visibleContent).join("");
}
let failed = false;
for (const page of pages) {
  const response = origin ? await fetch(`${origin}/${page}.html`) : null;
  const html = response
    ? await response.text()
    : fs.readFileSync(path.join(dist, `${page}.html`), "utf8");
  const expected = visibleContent(
    find(parse(fs.readFileSync(`${reference}/${page}.html`, "utf8")), "main"),
  )
    .replace(
      "或者留个言——工作时间 2 小时内必回。",
      "也可先在本页整理咨询信息，复制后发给顾问。",
    )
    .replace(/\s+/g, "");
  const actual = visibleContent(find(parse(html), "main")).replace(/\s+/g, "");
  const match = (response?.ok ?? true) && expected === actual;
  console.log(
    `${match ? "PASS" : "FAIL"} ${page}.html (${expected.length} source characters / ${actual.length} recovered characters)`,
  );
  if (!match) {
    failed = true;
    let i = 0;
    while (i < expected.length && expected[i] === actual[i]) i++;
    console.log({
      firstDifference: i,
      source: expected.slice(i, i + 100),
      recovered: actual.slice(i, i + 100),
    });
  }
}
if (failed) process.exit(1);

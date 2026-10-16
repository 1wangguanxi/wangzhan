import fs from "node:fs";
import { parse } from "parse5";
const origin = process.env.WEB_URL || "http://127.0.0.1:3000";
const reference = process.argv[2] || "reference/original";
const pages = [
  "index",
  "services",
  "process",
  "about",
  "cases",
  "reviews",
  "faq",
  "contact",
];
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
  // Explicit product addition: required contact field for the new customer backend.
  // Remaining body content must match the reference pages.
  if (
    n.tagName === "div" &&
    (n.childNodes || []).some(
      (c) => c.tagName === "input" && attr(c, "id") === "f-contact",
    )
  )
    return "";
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
  const response = await fetch(`${origin}/${page}.html`);
  const expected = visibleContent(
    find(parse(fs.readFileSync(`${reference}/${page}.html`, "utf8")), "main"),
  )
    .replace(/\s+/g, "");
  const actual = visibleContent(
    find(parse(await response.text()), "main"),
  ).replace(/\s+/g, "");
  const match = response.ok && expected === actual;
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

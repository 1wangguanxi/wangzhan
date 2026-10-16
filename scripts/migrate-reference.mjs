// One-time recovery tool. Normal development edits src/views and packages/content.
import fs from "node:fs";
import path from "node:path";
import { parse } from "parse5";
const source = path.resolve(process.argv[2] || "reference/original");
const out = path.resolve("apps/web/src");
const names = [
  "index",
  "services",
  "process",
  "about",
  "cases",
  "reviews",
  "faq",
  "contact",
];
const attr = (n, k) => n?.attrs?.find((a) => a.name === k)?.value;
const cls = (n, k) => (attr(n, "class") || "").split(" ").includes(k);
const all = (n, p) => [
  ...(p(n) ? [n] : []),
  ...(n.childNodes || []).flatMap((c) => all(c, p)),
];
const find = (n, p) => all(n, p)[0];
const text = (n) =>
  n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join("");
const write = (file, s) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, s);
};
const json = (value) => JSON.stringify(value, null, 2);
const docs = Object.fromEntries(
  names.map((n) => [
    n,
    parse(fs.readFileSync(path.join(source, n + ".html"), "utf8")),
  ]),
);
const cases = JSON.parse(
  fs
    .readFileSync(path.join(source, "js/page-cases.js"), "utf8")
    .match(/var CASE_DATA = (\[.*?\]);/s)[1],
).map((c) => ({
  ...c,
  imgs: c.imgs.map((x) => "/" + x),
  thumbnail:
    "/" +
    attr(
      find(
        docs.cases,
        (n) => attr(n, "data-case-id") === String(c.id),
      )?.childNodes?.find((n) => n.tagName === "img"),
      "src",
    ),
}));
const schools = all(docs.cases, (n) => cls(n, "schools-grid__item")).map(
  (n, i) => ({
    id: i + 1,
    thumbnail: "/" + attr(n, "src"),
    src: "/" + attr(n, "data-full"),
    alt: attr(n, "alt"),
  }),
);
const faqs = all(docs.faq, (n) => cls(n, "faq-item")).map((n, i) => ({
  id: i + 1,
  category: attr(n, "data-cat"),
  question: text(find(n, (x) => cls(x, "faq-item__q"))).trim(),
  answer: text(find(n, (x) => cls(x, "faq-item__a-inner"))).trim(),
}));
const reviews = all(docs.reviews, (n) => cls(n, "review-card")).map((n, i) => ({
  id: i + 1,
  text: text(find(n, (x) => cls(x, "review-card__text"))).trim(),
  name: text(find(n, (x) => cls(x, "user-name"))).trim(),
  info: text(find(n, (x) => cls(x, "user-info"))).trim(),
  avatarClass: attr(
    find(n, (x) => cls(x, "avatar-placeholder")),
    "class",
  ),
}));
write(
  "packages/content/snapshot.json",
  json({ cases, schools, faqs, reviews }),
);
const metadata = {};
const rename = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  viewbox: "viewBox",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "xmlns:xlink": "xmlnsXlink",
  "xlink:href": "xlinkHref",
  autocomplete: "autoComplete",
  novalidate: "noValidate",
  maxlength: "maxLength",
  readonly: "readOnly",
  srcset: "srcSet",
};
const bool = new Set([
  "required",
  "disabled",
  "checked",
  "selected",
  "multiple",
  "novalidate",
  "readonly",
  "hidden",
]);
const voids = new Set([
  "img",
  "input",
  "br",
  "hr",
  "meta",
  "link",
  "source",
  "wbr",
  "area",
  "embed",
]);
function jsx(n, page, raw = false) {
  if (n.nodeName === "#text")
    return n.value.trim() ? `{${JSON.stringify(n.value)}}` : "\n";
  if (!n.tagName || ["script", "noscript", "style"].includes(n.tagName))
    return "";
  const children = () =>
    (n.childNodes || []).map((c) => jsx(c, page, raw)).join("");
  if (!raw) {
    if (cls(n, "case-filter")) return "";
    if (attr(n, "id") === "cases-grid")
      return `<CaseGallery items={catalog.cases}>${(n.childNodes || [])
        .filter((x) => !cls(x, "case-card"))
        .map((x) => jsx(x, page, true))
        .join("")}</CaseGallery>`;
    if (attr(n, "id") === "schools-grid")
      return "<SchoolGallery items={catalog.schools} />";
    if (cls(n, "faq-tabs")) return "<FaqTabs />";
    if (cls(n, "faq-cat-tip")) return "<FaqCount />";
    if (cls(n, "faq-item")) {
      const q = find(n, (x) => cls(x, "faq-item__q")),
        a = find(n, (x) => cls(x, "faq-item__a-inner"));
      return `<Accordion category=${JSON.stringify(attr(n, "data-cat") || "")} question={<>${(
        q.childNodes || []
      )
        .filter((x) => x.tagName !== "svg")
        .map((x) => jsx(x, page, true))
        .join(
          "",
        )}</>}><div className="faq-item__a-inner">${(a.childNodes || []).map((x) => jsx(x, page, true)).join("")}</div></Accordion>`;
    }
    if (attr(n, "id") === "contact-form") return "<ContactForm />";
    if (attr(n, "id") === "form-success") return "";
    if (cls(n, "rev-grid")) return "<ReviewList items={catalog.reviews} />";
    if (attr(n, "data-count"))
      return `<Counter target={${Number(attr(n, "data-count"))}} suffix=${JSON.stringify(attr(n, "data-suffix") || "")} className=${JSON.stringify(attr(n, "class") || "")} />`;
  }
  const attrs = (n.attrs || [])
    .flatMap((a) => {
      if (a.name.startsWith("on")) return [];
      let key = rename[a.name] || a.name,
        v = a.value;
      if (key === "style") {
        const s = Object.fromEntries(
          v
            .split(";")
            .filter((x) => x.includes(":"))
            .map((x) => {
              const i = x.indexOf(":");
              return [
                x
                  .slice(0, i)
                  .trim()
                  .replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
                x.slice(i + 1).trim(),
              ];
            }),
        );
        return [`style={${JSON.stringify(s)}}`];
      }
      if (
        ["src", "href", "data-full"].includes(key) &&
        /^(images\/|[a-z]+\.html)/.test(v)
      )
        v = "/" + v;
      if (key === "href" && v.startsWith("javascript:")) v = "#";
      if (bool.has(a.name)) return [`${key}={true}`];
      return [`${key}=${JSON.stringify(v)}`];
    })
    .join(" ");
  return `<${n.tagName} ${attrs}${voids.has(n.tagName) ? " />" : `>${children()}</${n.tagName}>`}`;
}
for (const name of names) {
  const doc = docs[name];
  metadata[name] = {
    title: text(find(doc, (n) => n.tagName === "title")),
    description: attr(
      find(
        doc,
        (n) => n.tagName === "meta" && attr(n, "name") === "description",
      ),
      "content",
    ),
    keywords: attr(
      find(doc, (n) => n.tagName === "meta" && attr(n, "name") === "keywords"),
      "content",
    ),
  };
  const styles = all(doc, (n) => n.tagName === "style")
    .map(text)
    .join("\n");
  // Preserve the exact original cascade: critical CSS, common CSS, page CSS.
  const base = fs.readFileSync(path.join(source, "css/style.css"), "utf8");
  const pageCSS = path.join(source, "css/page-" + name + ".css");
  write("apps/web/public/css/critical/" + name + ".css", styles);
  write(
    "apps/web/public/css/style.css",
    base + "\n[hidden]{display:none!important}\n",
  );
  write(
    "apps/web/public/css/page-" + name + ".css",
    fs.existsSync(pageCSS)
      ? fs.readFileSync(pageCSS, "utf8")
      : "/* Common styles only. */",
  );
  const main = jsx(
    find(doc, (n) => n.tagName === "main"),
    name,
  );
  write(
    `${out}/views/${name}.tsx`,
    `// Recovered from the public ${name}.html; editable React server view.\nimport {CaseGallery, SchoolGallery} from '@/features/gallery';\nimport {Accordion, FaqTabs, FaqCount, FaqProvider} from '@/features/faq';\nimport {ContactForm} from '@/features/contact';\nimport {Counter} from '@/components/counter';\nimport {ReviewList} from '@/features/reviews';\nimport type {Catalog} from '@zhiyu/content';\nexport default function View({catalog}:{catalog:Catalog}) {return <FaqProvider>${main}</FaqProvider>}\n`,
  );
}
write("packages/content/pages.json", json(metadata));
for (const [name, node] of [
  ["Icons", find(docs.index, (n) => n.tagName === "svg")],
  ["Footer", find(docs.index, (n) => n.tagName === "footer")],
  ["QrContent", find(docs.index, (n) => cls(n, "modal__card"))],
]) {
  // QrContent only contains card content; dialog chrome belongs to Modal.
  const body =
    name === "QrContent"
      ? (node.childNodes || [])
          .filter((n) => !cls(n, "modal__close"))
          .map((n) => jsx(n, "index", true))
          .join("")
      : jsx(node, "index", true);
  write(
    `${out}/components/${name.toLowerCase()}.tsx`,
    `export function ${name}(){return <>${body}</>}\n`,
  );
}
fs.mkdirSync("apps/web/public/images", { recursive: true });
if (fs.existsSync(path.join(source, "images")))
  fs.cpSync(path.join(source, "images"), "apps/web/public/images", {
    recursive: true,
  });
console.log(
  json({
    pages: names.length,
    cases: cases.length,
    schools: schools.length,
    faqs: faqs.length,
    reviews: reviews.length,
  }),
);

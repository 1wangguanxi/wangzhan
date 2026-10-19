import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { SitePage } from "@/components/site-page";
import { pageNames, pages, type PageName } from "@/lib/pages";
import structuredData from "@/content/structured-data.json";

export { pageNames };

export function renderPage(page: PageName, script: string, siteUrl: string) {
  const metadata = pages[page];
  const canonical = new URL(`/${page}.html`, siteUrl).href;
  const shareImage = new URL("/images/zhiyu-share.png", siteUrl).href;
  // Preserve React markers so browser interactions can hydrate the static HTML.
  const body = renderToString(<SitePage page={page} />);
  return (
    "<!doctype html>" +
    renderToStaticMarkup(
      <html lang="zh-CN" className="no-js hash-cold">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="theme-color" content="#1a56db" />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          <link rel="canonical" href={canonical} />
          <link rel="icon" href="/images/zhiyu-logo.png" />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:site_name" content="知瑜网络·毕业论文辅导" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={shareImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={shareImage} />
          <link rel="stylesheet" href={`/css/critical/${page}.css`} />
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href={`/css/page-${page}.css`} />
          {structuredData[page].map((data, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data)
                  .replaceAll("{{SITE_URL}}", siteUrl)
                  .replace(/</g, "\\u003c"),
              }}
            />
          ))}
        </head>
        <body>
          <div
            id="site-root"
            data-page={page}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <script type="module" src={script} />
        </body>
      </html>,
    )
  );
}

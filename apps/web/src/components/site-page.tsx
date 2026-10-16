import type { PageName } from "@/lib/pages";
import { getCatalog } from "@/lib/catalog";
import { Header } from "./header";
import { Footer } from "./footer";
import { Icons } from "./icons";
import { QrContent } from "./qrcontent";
import { SiteInteractions } from "./site-interactions";
import Index from "@/views/index";
import Services from "@/views/services";
import Process from "@/views/process";
import About from "@/views/about";
import Cases from "@/views/cases";
import Reviews from "@/views/reviews";
import Faq from "@/views/faq";
import Contact from "@/views/contact";
import structuredData from "@zhiyu/content/structured-data.json";
const views = {
  index: Index,
  services: Services,
  process: Process,
  about: About,
  cases: Cases,
  reviews: Reviews,
  faq: Faq,
  contact: Contact,
};
export async function SitePage({
  page,
  live = false,
}: {
  page: PageName;
  live?: boolean;
}) {
  const View = views[page],
    catalog = await getCatalog(live);
  return (
    <>
      <link
        rel="stylesheet"
        href={`/css/critical/${page}.css`}
        precedence="critical"
      />
      <link rel="stylesheet" href="/css/style.css" precedence="base" />
      <link rel="stylesheet" href={`/css/page-${page}.css`} precedence="page" />
      <Icons />
      {structuredData[page].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
              .replaceAll(
                "{{SITE_URL}}",
                process.env.SITE_URL || "http://localhost:3000",
              )
              .replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <SiteInteractions qr={<QrContent />}>
        <Header page={page} />
        <View catalog={catalog} />
        <Footer />
      </SiteInteractions>
    </>
  );
}

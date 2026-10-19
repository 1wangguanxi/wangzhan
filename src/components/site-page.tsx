import type { PageName } from "@/lib/pages";
import { catalog } from "@/lib/catalog";
import { Header } from "./header";
import { Footer } from "./footer";
import { Icons } from "./icons";
import { QrContent } from "./qr-content";
import { SiteInteractions } from "./site-interactions";
import HomePage from "@/pages/home";
import ServicesPage from "@/pages/services";
import ProcessPage from "@/pages/process";
import AboutPage from "@/pages/about";
import CasesPage from "@/pages/cases";
import ReviewsPage from "@/pages/reviews";
import FaqPage from "@/pages/faq";
import ContactPage from "@/pages/contact";
const pageViews = {
  index: HomePage,
  services: ServicesPage,
  process: ProcessPage,
  about: AboutPage,
  cases: CasesPage,
  reviews: ReviewsPage,
  faq: FaqPage,
  contact: ContactPage,
};
export function SitePage({ page }: { page: PageName }) {
  const Page = pageViews[page];
  return (
    <>
      <Icons />
      <SiteInteractions qr={<QrContent />}>
        <Header page={page} />
        <Page catalog={catalog} />
        <Footer />
      </SiteInteractions>
    </>
  );
}

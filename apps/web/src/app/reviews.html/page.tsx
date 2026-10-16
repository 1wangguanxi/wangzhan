import { SitePage } from "@/components/site-page";
import { metadataFor } from "@/lib/pages";
export const dynamic = "force-dynamic";
export const metadata = metadataFor("reviews");
export default function Reviews() {
  return <SitePage page="reviews" live />;
}

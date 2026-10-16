import { SitePage } from "@/components/site-page";
import { metadataFor } from "@/lib/pages";
export const metadata = metadataFor("index");
export const revalidate = 300;
export default function Home() {
  return <SitePage page="index" />;
}

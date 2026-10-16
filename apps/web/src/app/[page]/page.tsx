import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-page";
import { pageNames, metadataFor, type PageName } from "@/lib/pages";
export const revalidate = 300;
export const dynamicParams = false;
export function generateStaticParams() {
  return pageNames
    .filter((p) => p !== "reviews")
    .map((p) => ({ page: p + ".html" }));
}
function resolve(page: string): PageName {
  const id = page.replace(/\.html$/, "") as PageName;
  if (!pageNames.includes(id) || !page.endsWith(".html")) notFound();
  return id;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  return metadataFor(resolve((await params).page));
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  return <SitePage page={resolve((await params).page)} />;
}

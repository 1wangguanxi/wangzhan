import type { Metadata } from "next";
import pages from "@zhiyu/content/pages.json";
export type PageName = keyof typeof pages;
export const pageNames = Object.keys(pages) as PageName[];
export function metadataFor(page: PageName): Metadata {
  const p = pages[page];
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/${page}.html` },
    openGraph: {
      title: p.title,
      description: p.description,
      siteName: "知瑜网络·毕业论文辅导",
      type: "website",
      images: ["/images/zhiyu-share.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: ["/images/zhiyu-share.png"],
    },
  };
}

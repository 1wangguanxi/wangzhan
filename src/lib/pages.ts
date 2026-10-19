import pages from "@/content/pages.json";

export type PageName = keyof typeof pages;
export const pageNames = Object.keys(pages) as PageName[];
export { pages };

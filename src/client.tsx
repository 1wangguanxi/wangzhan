import { hydrateRoot } from "react-dom/client";
import { SitePage } from "@/components/site-page";
import { pageNames, type PageName } from "@/lib/pages";

const root = document.getElementById("site-root");
const page = root?.dataset.page as PageName;
if (root && pageNames.includes(page)) {
  hydrateRoot(root, <SitePage page={page} />);
}

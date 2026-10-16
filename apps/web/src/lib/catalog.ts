import "server-only";
import snapshot from "@zhiyu/content/snapshot.json";
import type { Catalog } from "@zhiyu/content";
export async function getCatalog(live = false): Promise<Catalog> {
  const url = process.env.CONTENT_API_URL;
  if (!url) return snapshot;
  try {
    const response = await fetch(`${url}/v1/catalog`, {
      ...(live
        ? { cache: "no-store" as const }
        : { next: { revalidate: 300 } }),
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error(`Content API: ${response.status}`);
    return (await response.json()) as Catalog;
  } catch (error) {
    // Public content may fall back to the versioned snapshot. Writes never do.
    console.warn(
      "Content API unavailable; using recovered content snapshot.",
      String(error),
    );
    return snapshot;
  }
}

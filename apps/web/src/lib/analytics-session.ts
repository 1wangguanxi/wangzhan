// Anonymous, per-tab session. No contact details, query strings or IPs are collected.
const key = "zhiyu.analytics.session.v1";
let memory: { id: string; at: number } | null = null;
export function analyticsSession() {
  if (typeof window === "undefined") return "";
  const now = Date.now();
  let previous = memory;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.id === "string" && typeof parsed.at === "number")
        previous = parsed;
    }
  } catch {}
  if (!previous || now - previous.at > 30 * 60 * 1000)
    previous = { id: crypto.randomUUID(), at: now };
  previous.at = now;
  memory = previous;
  try {
    sessionStorage.setItem(key, JSON.stringify(previous));
  } catch {}
  return previous.id;
}

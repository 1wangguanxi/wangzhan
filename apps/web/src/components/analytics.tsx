"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsSession } from "@/lib/analytics-session";
type Event = {
  id: string;
  sessionId: string;
  kind: string;
  path: string;
  target: string;
};
export function Analytics() {
  const path = usePathname();
  const viewId = useRef({ path: "", id: "" });
  useEffect(() => {
    if (viewId.current.path !== path)
      viewId.current = { path, id: crypto.randomUUID() };
    let queue: Event[] = [];
    let inflight = false;
    let disposed = false;
    let lastSession = "";
    function enqueue(kind: string, target = "") {
      const sessionId = analyticsSession();
      if (!sessionId) return;
      if (lastSession && lastSession !== sessionId && kind !== "page_view")
        queue.push({
          id: crypto.randomUUID(),
          sessionId,
          kind: "page_view",
          path,
          target: "",
        });
      lastSession = sessionId;
      queue.push({
        id: kind === "page_view" ? viewId.current.id : crypto.randomUUID(),
        sessionId,
        kind,
        path,
        target,
      });
      if (queue.length > 100) queue = queue.slice(-100);
      if (queue.length >= 10) void flush();
    }
    async function flush(beacon = false) {
      if (!queue.length || inflight) return;
      const events = queue.splice(0, 30);
      const body = JSON.stringify({ events });
      if (
        beacon &&
        navigator.sendBeacon(
          "/api/events",
          new Blob([body], { type: "application/json" }),
        )
      )
        return;
      inflight = true;
      try {
        const r = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
          signal: AbortSignal.timeout(8000),
        });
        if (!r.ok) throw new Error("retry");
      } catch {
        if (!disposed) queue.unshift(...events);
      } finally {
        inflight = false;
      }
    }
    function click(event: MouseEvent) {
      const el = (event.target as Element)?.closest('a,button,[role="button"]');
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const contact =
        el.hasAttribute("data-open-modal") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.includes("contact.html");
      // Only known structural identifiers and same-site route paths; never button text or form values.
      const target = el.hasAttribute("data-open-modal")
        ? "contact-modal"
        : el.id
          ? el.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80)
          : href.startsWith("/") || href.endsWith(".html")
            ? href.split(/[?#]/)[0].slice(0, 80)
            : el.tagName.toLowerCase();
      enqueue(contact ? "contact_click" : "click", target);
    }
    function hide() {
      if (document.visibilityState === "hidden") void flush(true);
    }
    enqueue("page_view");
    void flush();
    document.addEventListener("click", click);
    document.addEventListener("visibilitychange", hide);
    const timer = setInterval(() => void flush(), 5000);
    const heartbeat = setInterval(() => {
      if (document.visibilityState === "visible") enqueue("heartbeat");
    }, 30000);
    const pagehide = () => void flush(true);
    window.addEventListener("pagehide", pagehide);
    return () => {
      disposed = true;
      document.removeEventListener("click", click);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", pagehide);
      clearInterval(timer);
      clearInterval(heartbeat);
      void flush(true);
    };
  }, [path]);
  return null;
}

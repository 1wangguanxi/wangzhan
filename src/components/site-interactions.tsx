import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Modal } from "./modal";
import { Icon } from "./icon";
const QrContext = createContext(() => {});
export const useQr = () => useContext(QrContext);

export function SiteInteractions({
  children,
  qr,
}: {
  children: ReactNode;
  qr: ReactNode;
}) {
  const [open, setOpen] = useState(false),
    [top, setTop] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.documentElement.classList.remove("no-js");
    let frame = 0;
    const spies = [
      ...document.querySelectorAll<HTMLAnchorElement>("[data-spy]"),
    ]
      .map((link) => ({
        link,
        target: document.getElementById(link.dataset.spy!),
      }))
      .filter((x) => x.target);
    const update = () => {
      frame = 0;
      setTop(window.scrollY > 400);
      let current = spies[0]?.link.closest(".svc-nav") ? spies[0] : undefined;
      for (const spy of spies)
        if (spy.target!.getBoundingClientRect().top <= 88) current = spy;
      if (
        spies[0]?.link.closest(".svc-nav") &&
        window.scrollY + innerHeight >=
          document.documentElement.scrollHeight - 80
      )
        current = spies.at(-1);
      spies.forEach((spy) => {
        spy.link.classList.toggle("is-active", spy === current);
        if (spy === current) spy.link.setAttribute("aria-current", "true");
        else spy.link.removeAttribute("aria-current");
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    const jump = () => {
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      if (target)
        window.scrollTo({
          top: Math.max(0, target.getBoundingClientRect().top + scrollY - 76),
          behavior: "instant",
        });
    };
    const timer = window.setTimeout(jump, 100);
    const settle = window.setTimeout(() => {
      jump();
      document.documentElement.classList.remove("hash-cold");
    }, 500);
    window.addEventListener("load", jump);
    window.addEventListener("hashchange", jump);
    const click = (event: MouseEvent) => {
      const target = (event.target as Element)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (
        !target ||
        target.hasAttribute("data-open-modal") ||
        target.hash.length < 2
      )
        return;
      const section = document.getElementById(
        decodeURIComponent(target.hash.slice(1)),
      );
      if (section) {
        event.preventDefault();
        history.pushState(null, "", target.hash);
        window.scrollTo({
          top: section.getBoundingClientRect().top + scrollY - 76,
          behavior: reduced ? "instant" : "smooth",
        });
      }
    };
    document.addEventListener("click", click);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(settle);
      cancelAnimationFrame(frame);
      document.documentElement.classList.add("no-js");
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      window.removeEventListener("load", jump);
      window.removeEventListener("hashchange", jump);
      document.removeEventListener("click", click);
    };
  }, []);
  return (
    <QrContext.Provider value={() => setOpen(true)}>
      <div
        style={{ display: "contents" }}
        onClick={(e) => {
          if (
            (e.target as Element).closest('[data-open-modal="qrcode-modal"]')
          ) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
        <div className="float-cta">
          <button className="btn btn--accent" onClick={() => setOpen(true)}>
            <Icon name="chat" />
            关注我们
          </button>
        </div>
        <button
          type="button"
          className={`back-to-top${top ? " is-visible" : ""}`}
          aria-label="回到顶部"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          <Icon name="arrow-up" />
        </button>
        {open && (
          <Modal title="知瑜网络 · 自媒体矩阵" onClose={() => setOpen(false)}>
            {qr}
          </Modal>
        )}
      </div>
    </QrContext.Provider>
  );
}

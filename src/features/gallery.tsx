import { useEffect, useState, type ReactNode } from "react";
import type { CaseStudy, School } from "@/content/types";
import { Modal } from "@/components/modal";
import { useQr } from "@/components/site-interactions";
export function CaseGallery({
  items,
  children,
}: {
  items: CaseStudy[];
  children: ReactNode;
}) {
  const [category, setCategory] = useState("all"),
    [selected, setSelected] = useState<CaseStudy | null>(null),
    [index, setIndex] = useState(0);
  const qr = useQr();
  useEffect(() => {
    if (selected && selected.imgs.length > 1) {
      const next = new Image();
      next.src = selected.imgs[(index + 1) % selected.imgs.length];
    }
  }, [selected, index]);
  const categories = ["all", ...new Set(items.map((x) => x.cat))];
  const step = (by: number) =>
    setIndex((i) => (i + by + selected!.imgs.length) % selected!.imgs.length);
  return (
    <>
      <div className="case-filter" role="group" aria-label="按专业筛选案例">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`case-filter__btn${category === c ? " is-active" : ""}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c === "all" ? "全部" : c}
          </button>
        ))}
      </div>
      <div className="cases-page-grid" id="cases-grid">
        {items.map((item) => (
          <article
            key={item.id}
            hidden={category !== "all" && category !== item.cat}
            className="case-card case-card--img"
            data-cat={item.cat}
            data-case-id={item.id}
            tabIndex={0}
            role="button"
            aria-label={`查看案例详情：${item.title}`}
            onClick={() => {
              setSelected(item);
              setIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(item);
                setIndex(0);
              }
            }}
          >
            <img
              className="img-fill"
              src={item.thumbnail}
              alt={`${item.title}（辅导案例原创素材，已脱敏）`}
              loading="lazy"
            />
            <div className="case-card__body">
              <div className="case-card__tags">
                <span className="tag">{item.cat}</span>
                <span className="tag tag--accent">
                  {item.imgs.length} 张截图
                </span>
              </div>
              <h3 className="case-card__type">{item.title}</h3>
            </div>
          </article>
        ))}
        {children}
      </div>
      {selected && (
        <Modal
          title={selected.title}
          onClose={() => setSelected(null)}
          caseModal
          onStep={step}
        >
          <div className="case-modal__tags">
            <span className="tag">{selected.cat}</span>
          </div>
          <h2 className="case-modal__title">{selected.title}</h2>
          <div className="case-flip">
            <img
              className="case-flip__img"
              src={selected.imgs[index]}
              alt={`${selected.title}（截图 ${index + 1}/${selected.imgs.length}，已脱敏）`}
            />
            {selected.imgs.length > 1 && (
              <>
                <button
                  className="case-flip__btn case-flip__prev"
                  aria-label="上一张"
                  onClick={() => step(-1)}
                >
                  ‹
                </button>
                <button
                  className="case-flip__btn case-flip__next"
                  aria-label="下一张"
                  onClick={() => step(1)}
                >
                  ›
                </button>
              </>
            )}
            <span className="case-flip__count">
              {index + 1} / {selected.imgs.length}
            </span>
          </div>
          <div className="case-modal__section">
            <p className="case-modal__privacy">
              为保护客户隐私、防止信息泄露，本页面仅展示部分设计截图，不披露客户真实信息。
            </p>
          </div>
          <div className="case-modal__section case-modal__cta">
            <button
              className="btn btn--primary"
              onClick={() => {
                setSelected(null);
                qr();
              }}
            >
              扫宣传单联系码，免费评估你的题目
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export function SchoolGallery({ items }: { items: School[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const step = (by: number) =>
    setIndex((i) => (i! + by + items.length) % items.length);
  return (
    <>
      <div className="schools-grid reveal-group" id="schools-grid">
        {items.map((item, i) => (
          <img
            key={item.id}
            className="schools-grid__item"
            src={item.thumbnail}
            data-full={item.src}
            alt={item.alt}
            loading="lazy"
            tabIndex={0}
            role="button"
            onClick={() => setIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIndex(i);
              }
            }}
          />
        ))}
      </div>
      {index !== null && (
        <Modal
          title="查看大图"
          onClose={() => setIndex(null)}
          lightbox
          onStep={step}
        >
          <img
            className="lb__img"
            src={items[index].src}
            alt={items[index].alt}
          />
          <button
            className="lb__nav lb__prev"
            aria-label="上一张"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            className="lb__nav lb__next"
            aria-label="下一张"
            onClick={() => step(1)}
          >
            ›
          </button>
        </Modal>
      )}
    </>
  );
}

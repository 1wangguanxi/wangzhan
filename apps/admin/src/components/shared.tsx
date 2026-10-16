"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./icon";
export function Heading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="description">{description}</p>
      </div>
      <div className="heading-actions">{children}</div>
    </div>
  );
}
export function Empty({
  text = "暂无数据",
  detail = "真实记录产生后会在这里展示。",
}: {
  text?: string;
  detail?: string;
}) {
  return (
    <div className="empty">
      <span>
        <Icon name="activity" size={28} />
      </span>
      <h3>{text}</h3>
      <p>{detail}</p>
    </div>
  );
}
export function Pager({
  page,
  total,
  limit,
  onChange,
}: {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="pagination">
      <span>
        共 {total} 条记录 · 第 {page} / {pages} 页
      </span>
      <div>
        <button
          className="button small"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          上一页
        </button>
        <button
          className="button small"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}
export function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      d?.close();
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="关闭">
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}

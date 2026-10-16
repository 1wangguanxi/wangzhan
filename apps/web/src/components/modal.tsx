"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./icon";

/** Owns focus, Escape, scroll locking, and dismissal for every overlay. */
export function Modal({
  children,
  title,
  onClose,
  lightbox = false,
  caseModal = false,
  onStep,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  lightbox?: boolean;
  caseModal?: boolean;
  onStep?: (step: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose),
    step = useRef(onStep);
  close.current = onClose;
  step.current = onStep;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    document.body.classList.add("modal-open");
    ref.current
      ?.querySelector<HTMLButtonElement>("button")
      ?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close.current();
      }
      if (e.key === "ArrowLeft") step.current?.(-1);
      if (e.key === "ArrowRight") step.current?.(1);
      if (e.key === "Tab") {
        const nodes = [
          ...(ref.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]),a[href],input,[tabindex="0"]',
          ) || []),
        ].filter((x) => x.getClientRects().length);
        const first = nodes[0],
          last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.classList.remove("modal-open");
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <div
      ref={ref}
      className={`${lightbox ? "lb" : "modal"} is-open`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={lightbox ? "lb__overlay" : "modal__overlay"}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={
          lightbox
            ? "lb__box"
            : `modal__card${caseModal ? " modal__card--case" : ""}`
        }
      >
        <button
          type="button"
          className={lightbox ? "lb__close" : "modal__close"}
          onClick={onClose}
          aria-label={lightbox ? "关闭" : "关闭弹窗"}
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

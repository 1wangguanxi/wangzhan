"use client";
import { useEffect, useRef, useState } from "react";
export function Counter({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null),
    [value, setValue] = useState(target);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const tick = (now: number) => {
          start ||= now;
          const p = Math.min((now - start) / 1500, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);
  return (
    <span
      ref={ref}
      className={className}
      data-count={target}
      data-suffix={suffix}
    >
      {value}
      {suffix}
    </span>
  );
}

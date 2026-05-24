"use client";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "left" | "right" | "scale";
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dirClass =
      direction === "left"  ? "reveal reveal-left"  :
      direction === "right" ? "reveal reveal-right" :
      direction === "scale" ? "reveal reveal-scale" :
      "reveal";

    el.className = [dirClass, className].filter(Boolean).join(" ");
    if (style) Object.assign(el.style, style);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [className, delay, direction, style]);

  return <div ref={ref}>{children}</div>;
}

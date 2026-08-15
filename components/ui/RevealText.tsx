"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  /** Direction the text slides from */
  direction?: "up" | "left" | "right";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Additional class names */
  className?: string;
  /** HTML tag to render */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
}

export function RevealText({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: "translateY(30px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate(0, 0)" : transforms[direction],
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

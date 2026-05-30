"use client";

import { useEffect } from "react";

/**
 * Activates scroll-reveal animations using IntersectionObserver.
 * Call once in a top-level client component (e.g. layout or page).
 * Elements with class `scroll-reveal`, `scroll-reveal-left`,
 * `scroll-reveal-scale`, or `stagger-children` get `.revealed` when visible.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selectors = ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale, .stagger-children";
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

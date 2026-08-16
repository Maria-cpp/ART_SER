"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook that tracks scroll progress within a DOM element using GSAP ScrollTrigger.
 * Returns a ref to attach to the container and a progress value (0-1).
 */
export function useGSAPScroll(
  start: string = "top bottom",
  end: string = "bottom top"
): { containerRef: React.RefObject<HTMLDivElement | null>; progress: number } {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub: true,
        onUpdate: (self: { progress: number }) => {
          setProgress(self.progress);
        },
      });

      cleanup = () => {
        trigger.kill();
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, [start, end]);

  return { containerRef, progress };
}

/**
 * Hook that animates elements when they scroll into view using GSAP.
 * Attach the returned ref to a container — direct children get staggered reveal.
 */
export function useGSAPReveal(
  stagger: number = 0.1,
  fromY: number = 40
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (!el) return;
      const children = el.children;
      if (!children.length) return;

      gsap.set(children, { opacity: 0, y: fromY });

      const tween = gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars?.trigger === el) st.kill();
        });
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, [stagger, fromY]);

  return ref;
}

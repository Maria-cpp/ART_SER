"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const MILESTONES = [
  { yearKey: "milestone1Year", titleKey: "milestone1Title", descKey: "milestone1Desc" },
  { yearKey: "milestone2Year", titleKey: "milestone2Title", descKey: "milestone2Desc" },
  { yearKey: "milestone3Year", titleKey: "milestone3Title", descKey: "milestone3Desc" },
  { yearKey: "milestone4Year", titleKey: "milestone4Title", descKey: "milestone4Desc" },
  { yearKey: "milestone5Year", titleKey: "milestone5Title", descKey: "milestone5Desc" },
] as const;

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("story.sectionLabel")}
        </p>

        {/* Large counter */}
        <div className="mb-12 scroll-reveal">
          <div className="flex items-end gap-2">
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#B58A62] leading-none tracking-tighter">
              <AnimatedCounter target={26} />+
            </span>
          </div>
          <p className="mt-2 text-xs md:text-sm tracking-[0.3em] uppercase text-[#B8B8B8] font-medium">
            {t("story.yearsLabel")}
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("story.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("story.subtitle")}
        </p>

        {/* Timeline */}
        <div className="relative stagger-children">
          {/* Vertical line */}
          <div className="absolute start-4 md:start-[120px] top-0 bottom-0 w-px bg-[#2A2A2A]" />

          {MILESTONES.map((m) => (
            <div key={m.yearKey} className="relative flex gap-6 md:gap-10 mb-10 last:mb-0">
              {/* Year label */}
              <div className="shrink-0 w-8 md:w-[120px] pt-1">
                <span className="hidden md:block text-xs font-bold text-[#B58A62] tracking-wider text-end pe-6">
                  {t(`story.${m.yearKey}`)}
                </span>
              </div>

              {/* Dot */}
              <div className="relative shrink-0 flex items-start">
                <div className="absolute start-0 top-2 h-3 w-3 rounded-full border-2 border-[#B58A62] bg-[#0B0B0B]" />
              </div>

              {/* Content */}
              <div className="ps-4 md:ps-6 pb-2">
                <span className="md:hidden text-[10px] font-bold text-[#B58A62] tracking-wider">
                  {t(`story.${m.yearKey}`)}
                </span>
                <h3 className="text-sm md:text-base font-bold text-[#F5F5F2] mt-0.5">
                  {t(`story.${m.titleKey}`)}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-[#747474] leading-relaxed max-w-lg">
                  {t(`story.${m.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

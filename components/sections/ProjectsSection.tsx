"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getProjects } from "@/lib/data";

export function ProjectsSection() {
  const { t, localized } = useLanguage();
  const projects = getProjects().slice(0, 3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("projects.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("projects.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("projects.homeSubtitle")}
        </p>
      </div>

      {/* Full-width project cards */}
      <div className="space-y-2 stagger-children">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href="/portfolio"
            className="group relative block w-full overflow-hidden"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Background image */}
            <div className="relative h-[50vh] md:h-[70vh]">
              {p.image && (
                <img
                  src={p.image}
                  alt={localized(p.title)}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIdx === i ? "scale-[1.02]" : "scale-100"
                  }`}
                />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                <div className="container-x">
                  {/* Project number */}
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#B58A62] font-medium">
                    PROJECT {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5F2] tracking-tight max-w-3xl">
                    {localized(p.title)}
                  </h3>

                  {/* Location and year */}
                  <p className="mt-2 text-sm text-[#B8B8B8]">
                    {p.location} &middot; {p.year}
                  </p>

                  {/* Category */}
                  <p className="mt-1 text-xs text-[#747474] uppercase tracking-wider">
                    {localized(p.category)}
                  </p>

                  {/* Summary — shows on hover */}
                  <p className={`mt-4 max-w-2xl text-sm text-[#B8B8B8] leading-relaxed line-clamp-3 transition-all duration-500 ${
                    hoveredIdx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:opacity-60 md:translate-y-0"
                  }`}>
                    {localized(p.summary)}
                  </p>

                  {/* View project link */}
                  <div className={`mt-6 transition-all duration-300 ${
                    hoveredIdx === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}>
                    <span className="text-xs font-semibold text-[#B58A62] tracking-[0.2em] uppercase">
                      {t("projects.viewProject")} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="container-x mt-12 scroll-reveal">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
        >
          {t("projects.viewAll")}
        </Link>
      </div>
    </section>
  );
}

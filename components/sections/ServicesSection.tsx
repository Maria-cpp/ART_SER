"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getServices } from "@/lib/data";

const SERVICE_ICONS: Record<string, string> = {
  factory: "M2 20h20M4 20V10l4 3V10l4 3V6h8v14M14 10h.01M18 10h.01M14 14h.01M18 14h.01",
  building: "M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 13v.01M9 17v.01",
  wrench: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  compass: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
  road: "M4 19h4M16 19h4M5 5l2 14M19 5l-2 14M12 5v2M12 11v2M12 17v2",
  clipboard: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 3v4M12 17v4M3 12h4M17 12h4",
};

export function ServicesSection() {
  const { t, localized } = useLanguage();
  const services = getServices().slice(0, 6);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("services.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("services.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("services.homeSubtitle")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s) => {
            const isHovered = hoveredId === s.id;
            const iconPath = SERVICE_ICONS[s.icon] || SERVICE_ICONS.wrench;

            return (
              <div
                key={s.id}
                className={`group relative border transition-all duration-500 cursor-pointer ${
                  isHovered
                    ? "border-[#B58A62]/50 bg-[#1E1E1E]"
                    : "border-[#2A2A2A] bg-[#0B0B0B]/50 hover:border-[#B58A62]/30"
                }`}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center transition-colors duration-300 ${isHovered ? "text-[#B58A62]" : "text-[#B8B8B8]"}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d={iconPath} />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F5F5F2] mb-3">
                    {localized(s.title)}
                  </h3>

                  {/* Description — reveals on hover */}
                  <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0 md:max-h-20 md:opacity-70"}`}>
                    <p className="text-xs md:text-sm text-[#747474] leading-relaxed">
                      {localized(s.description)}
                    </p>
                  </div>

                  {/* Learn more link */}
                  <div className={`mt-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <span className="text-xs font-medium text-[#B58A62] tracking-wider uppercase">
                      {t("services.learnMore")} &rarr;
                    </span>
                  </div>
                </div>

                {/* Accent line at top on hover */}
                <div className={`absolute top-0 inset-x-0 h-[2px] bg-[#B58A62] transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </div>
            );
          })}
        </div>

        <div className="mt-12 scroll-reveal">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("common.viewAll") || "View all"}
          </Link>
        </div>
      </div>
    </section>
  );
}

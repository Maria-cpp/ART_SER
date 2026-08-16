"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const STEPS = [
  { key: "step1", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { key: "step2", icon: "M9 7h6m-6 4h6m-3-8v2m0 12v2M5 12H3m18 0h-2M7.05 7.05L5.636 5.636m12.728 12.728L16.95 16.95M7.05 16.95l-1.414 1.414M18.364 5.636L16.95 7.05" },
  { key: "step3", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { key: "step4", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "step5", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { key: "step6", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { key: "step7", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "step8", icon: "M5 13l4 4L19 7" },
] as const;

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("process.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("process.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("process.subtitle")}
        </p>

        {/* Process steps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className="group relative border border-[#2A2A2A] bg-[#0B0B0B]/50 p-6 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#0B0B0B]"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-bold text-[#B58A62]/30 group-hover:text-[#B58A62]/60 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  className="h-5 w-5 text-[#747474] group-hover:text-[#B58A62] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={step.icon} />
                </svg>
              </div>

              {/* Step title */}
              <h3 className="text-sm font-bold text-[#F5F5F2] uppercase tracking-wider mb-3">
                {t(`process.${step.key}`)}
              </h3>

              {/* Step description */}
              <p className="text-xs text-[#747474] leading-relaxed">
                {t(`process.${step.key}Desc`)}
              </p>

              {/* Accent bar at bottom on hover */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#B58A62] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

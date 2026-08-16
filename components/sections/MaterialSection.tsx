"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const STEPS = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
  { key: "step5", number: "05" },
] as const;

const LABELS = ["labelProfile", "labelGlass", "labelThermalBreak", "labelGasket", "labelFrame"] as const;

export function MaterialSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/40 to-transparent" />

      <div className="container-x">
        {/* Section label */}
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("material.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("material.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("material.subtitle")}
        </p>

        {/* Material flow steps */}
        <div className="grid gap-0 md:grid-cols-5 stagger-children">
          {STEPS.map((step, i) => (
            <div key={step.key} className="relative group">
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 start-full w-full h-px bg-gradient-to-r from-[#B58A62]/40 to-transparent z-0" />
              )}

              <div className="relative z-10 p-6 md:p-4 lg:p-6 border border-[#2A2A2A] bg-[#141414]/50 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#141414]">
                {/* Step number */}
                <span className="text-[10px] tracking-[0.3em] text-[#B58A62] font-medium">
                  {step.number}
                </span>

                {/* Step title */}
                <h3 className="mt-3 text-lg md:text-xl font-bold text-[#F5F5F2] tracking-wide">
                  {t(`material.${step.key}`)}
                </h3>

                {/* Step description */}
                <p className="mt-3 text-xs md:text-sm text-[#747474] leading-relaxed">
                  {t(`material.${step.key}Desc`)}
                </p>

                {/* Arrow indicator (mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4 text-[#B58A62]/40">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technical labels — placeholder for Phase 3 3D */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10 scroll-reveal">
          {LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B58A62]/60" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#747474] font-medium">
                {t(`material.${label}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

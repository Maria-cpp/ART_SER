"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";

const MaterialScene = dynamic(
  () => import("@/components/3d/MaterialScene").then((m) => ({ default: m.MaterialScene })),
  { ssr: false }
);

const STEPS = [
  { key: "material.step1", descKey: "material.step1Desc", num: "01" },
  { key: "material.step2", descKey: "material.step2Desc", num: "02" },
  { key: "material.step3", descKey: "material.step3Desc", num: "03" },
  { key: "material.step4", descKey: "material.step4Desc", num: "04" },
  { key: "material.step5", descKey: "material.step5Desc", num: "05" },
] as const;

export function MaterialSection() {
  const { t } = useLanguage();
  const { containerRef, progress } = useGSAPScroll("top 80%", "bottom 20%");

  const activeStep = Math.min(4, Math.floor(progress * 5));

  return (
    <section ref={containerRef} className="relative py-24 md:py-32" id="material-section">
      <div className="container-x">
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-bold mb-3">
          {t("material.sectionLabel")}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("material.title")}
        </h2>
        <p className="text-base text-muted max-w-2xl mb-12">
          {t("material.subtitle")}
        </p>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: 3D scene */}
          <div className="relative aspect-square max-h-[500px]">
            <Scene
              className="h-full w-full rounded-xl overflow-hidden"
              fov={40}
              cameraPosition={[0, 0, 5]}
              fallbackContent={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                      <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted">{t("material.title")}</p>
                  </div>
                </div>
              }
            >
              <MaterialScene scrollProgress={progress} />
            </Scene>

            {/* Technical labels */}
            <div
              className="absolute top-[15%] start-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.3 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1px] bg-accent/40" />
                {t("material.labelProfile")}
              </div>
            </div>
            <div
              className="absolute top-[40%] end-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.45 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                {t("material.labelGlass")}
                <div className="w-6 h-[1px] bg-accent/40" />
              </div>
            </div>
            <div
              className="absolute bottom-[35%] start-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.55 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1px] bg-accent/40" />
                {t("material.labelThermalBreak")}
              </div>
            </div>
            <div
              className="absolute bottom-[20%] end-[5%] text-xs tracking-wider uppercase text-accent/70 transition-opacity duration-500"
              style={{ opacity: progress > 0.65 ? 1 : 0 }}
            >
              <div className="flex items-center gap-2">
                {t("material.labelGasket")}
                <div className="w-6 h-[1px] bg-accent/40" />
              </div>
            </div>
          </div>

          {/* Right: Step progression */}
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={step.key}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ${
                  i === activeStep
                    ? "bg-accent/10 border border-accent/20"
                    : i < activeStep
                      ? "opacity-60"
                      : "opacity-30"
                }`}
              >
                <span
                  className={`text-2xl font-bold tabular-nums transition-colors duration-500 ${
                    i === activeStep ? "text-accent" : "text-muted"
                  }`}
                >
                  {step.num}
                </span>
                <div>
                  <h3
                    className={`text-sm font-bold tracking-wider uppercase transition-colors duration-500 ${
                      i === activeStep ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {t(step.key)}
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

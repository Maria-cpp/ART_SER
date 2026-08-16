"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";

const ProfileToArchitectureScene = dynamic(
  () =>
    import("@/components/3d/ProfileToArchitectureScene").then((m) => ({
      default: m.ProfileToArchitectureScene,
    })),
  { ssr: false }
);

const STAGES = [
  { labelKey: "process.profileStage1", num: "01" },
  { labelKey: "process.profileStage2", num: "02" },
  { labelKey: "process.profileStage3", num: "03" },
  { labelKey: "process.profileStage4", num: "04" },
  { labelKey: "process.profileStage5", num: "05" },
  { labelKey: "process.profileStage6", num: "06" },
  { labelKey: "process.profileStage7", num: "07" },
] as const;

export function ProfileToArchitectureSection() {
  const { t } = useLanguage();
  const { containerRef, progress } = useGSAPScroll("top top", "bottom bottom");

  const activeStage = Math.min(6, Math.floor(progress * 7));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* 3D scene — full viewport background */}
        <div className="absolute inset-0">
          <Scene
            className="h-full w-full"
            fov={40}
            cameraPosition={[0, 2, 6]}
            fallbackContent={
              <div className="flex items-center justify-center h-full bg-gradient-to-b from-[#0B0B0B] to-[#111]">
                <div className="text-center px-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t("process.profileTitle")}
                  </h2>
                  <p className="text-muted max-w-lg mx-auto">{t("process.profileSubtitle")}</p>
                </div>
              </div>
            }
          >
            <ProfileToArchitectureScene scrollProgress={progress} />
          </Scene>
        </div>

        {/* Overlay content */}
        <div className="relative z-10 container-x w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-xs tracking-[0.3em] uppercase text-accent font-bold mb-3">
                {t("process.profileLabel")}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("process.profileTitle")}
              </h2>
              <p className="text-base text-foreground/60">
                {t("process.profileSubtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.num}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded transition-all duration-500 ${
                    i === activeStage
                      ? "bg-accent/15 text-accent"
                      : i < activeStage
                        ? "text-foreground/40"
                        : "text-foreground/20"
                  }`}
                >
                  <span className="text-xs font-bold tabular-nums w-5">{stage.num}</span>
                  <div
                    className={`w-6 h-[2px] transition-all duration-500 ${
                      i === activeStage ? "bg-accent" : "bg-foreground/10"
                    }`}
                  />
                  <span className="text-xs tracking-wider uppercase font-medium">
                    {t(stage.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="h-[2px] w-full bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

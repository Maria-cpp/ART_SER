"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useMousePosition } from "@/lib/useMousePosition";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import { Scene } from "@/components/3d/Scene";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function HeroSection() {
  const { t, locale } = useLanguage();
  const localePath = (href: string) => `/${locale}${href}`;
  const mouse = useMousePosition();
  const { containerRef, progress } = useGSAPScroll("top top", "bottom top");
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    if (!portfolioOpen) return;
    const handler = () => setPortfolioOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [portfolioOpen]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Scene
          className="h-full w-full"
          fov={45}
          cameraPosition={[0, 0.5, 8]}
          fallbackContent={
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#111] to-[#0B0B0B]" />
          }
        >
          <HeroScene scrollProgress={progress} mouse={mouse} />
        </Scene>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="container-x relative z-10 flex min-h-screen flex-col items-center justify-center py-20 text-center">
        <div className="mb-4">
          <Image
            src="/logo/ARTSER_logo.png"
            alt="ARTSER"
            width={280}
            height={100}
            className="mx-auto h-auto w-auto max-h-20"
            priority
          />
        </div>

        <div className="mt-2 flex flex-col items-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4 text-foreground/70">
            {t("hero.slogan")}
          </p>
          <div className="w-8 h-[2px] bg-[#B58A62]" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight max-w-4xl">
          {t("hero.headline")}
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/70">
          {t("hero.subheadline")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPortfolioOpen((o) => !o)}
              className="inline-flex items-center justify-center rounded-none border-2 border-[#B58A62] bg-[#B58A62] px-8 py-3.5 text-sm font-semibold text-[#0B0B0B] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-[#B58A62] gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {t("hero.downloadPortfolio")}
            </button>
            {portfolioOpen && (
              <div className="absolute start-0 top-full mt-2 z-20 min-w-[220px] rounded-lg border border-border bg-surface p-2 shadow-xl">
                <a
                  href="/portfolio/ART_SER_Portfolio_EN .pdf"
                  download="ART_SER_Portfolio_EN.pdf"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portfolio — English
                </a>
                <a
                  href="/portfolio/ART_SER_Portafoglio_IT.pdf"
                  download="ART_SER_Portafoglio_IT.pdf"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portafoglio — Italiano
                </a>
              </div>
            )}
          </div>
          <Link
            href={localePath("/portfolio")}
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3.5 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        <button
          onClick={() => document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 hidden sm:flex flex-col items-center gap-2 text-foreground/50 transition hover:text-accent"
        >
          <span className="text-xs tracking-widest uppercase font-bold">
            {t("hero.scrollIndicator")}
          </span>
          <div className="animate-bounce">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

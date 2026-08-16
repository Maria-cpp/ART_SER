"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const scrollToContent = () => {
    document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden w-full bg-[#0B0B0B]">
      {/* Dark gradient background — Phase 3 will add 3D here */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#141414] to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(181,138,98,0.08),transparent)]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,184,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,184,184,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-x relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-16 md:py-24 text-center">
        {/* Logo */}
        <div className="mb-8 scroll-reveal">
          <Image
            src="/logo/ART_SER_logo.png"
            alt="ARTSER"
            width={200}
            height={72}
            className="mx-auto h-auto w-auto max-h-16 md:max-h-20"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="scroll-reveal max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F2] leading-[1.1]">
          {t("hero.headline")}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-[#B8B8B8] leading-relaxed scroll-reveal">
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-4 scroll-reveal">
          <div className="relative">
            <button
              onClick={() => setPortfolioOpen((o) => !o)}
              className="inline-flex items-center justify-center rounded-none border-2 border-[#B58A62] bg-[#B58A62] px-8 py-3.5 text-sm font-semibold text-[#0B0B0B] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-[#B58A62]"
            >
              {t("hero.ctaPrimary")}
            </button>
            {portfolioOpen && (
              <div className="absolute start-0 top-full mt-2 z-20 min-w-[220px] rounded-sm border border-[#2A2A2A] bg-[#141414] p-2 shadow-xl">
                <a
                  href="/portfolio/ART_SER_Portfolio_EN .pdf"
                  download="ART_SER_Portfolio_EN.pdf"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#F5F5F2] transition hover:text-[#B58A62]"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portfolio — English
                </a>
                <a
                  href="/portfolio/ART_SER_Portafoglio_IT.pdf"
                  download="ART_SER_Portafoglio_IT.pdf"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#F5F5F2] transition hover:text-[#B58A62]"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portafoglio — Italiano
                </a>
              </div>
            )}
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3.5 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="mt-16 md:mt-24 hidden sm:flex flex-col items-center gap-3 text-[#747474] transition hover:text-[#B58A62]"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
            {t("hero.scrollIndicator")}
          </span>
          <div className="scroll-indicator">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

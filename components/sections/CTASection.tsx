"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getContact } from "@/lib/data";

export function CTASection() {
  const { t, locale } = useLanguage();
  const localePath = (href: string) => `/${locale}${href}`;
  const contact = getContact();

  return (
    <section className="relative py-24 md:py-40 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(181,138,98,0.04),transparent)]" />

      <div className="container-x relative z-10 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-8 scroll-reveal">
          {t("cta.sectionLabel")}
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F2] tracking-tight mb-6 scroll-reveal">
          {t("cta.title")}
        </h2>

        <p className="max-w-xl mx-auto text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-12 scroll-reveal">
          {t("cta.subtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 scroll-reveal">
          <Link
            href={localePath("/request-quote")}
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B58A62] bg-[#B58A62] px-8 py-3.5 text-sm font-semibold text-[#0B0B0B] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-[#B58A62]"
          >
            {t("cta.action")}
          </Link>
          <Link
            href={localePath("/contact")}
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3.5 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("cta.secondaryAction")}
          </Link>
        </div>

        {/* Email fallback */}
        <p className="mt-8 text-xs text-[#747474] scroll-reveal">
          {t("cta.email")}:{" "}
          <a href={`mailto:${contact.email}`} className="text-[#B58A62] hover:underline">
            {contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}

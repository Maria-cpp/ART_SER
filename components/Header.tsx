"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/clients", key: "nav.clients" },
  { href: "/certifications", key: "nav.certifications" },
  { href: "/products", key: "sidebar.products" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/government", key: "nav.government" },
  { href: "/manufacturing", key: "nav.manufacturing" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/suppliers", key: "nav.suppliers" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3">
          <AnimatedLogo />
          <div className="hidden sm:flex flex-col items-start">
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold leading-tight text-foreground">
              {t("hero.slogan")}
            </p>
            <div className="w-6 h-[1.5px] bg-[#ef5e00] mt-1" />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link href="/request-quote" className="btn-accent hidden md:inline-flex">
            {t("nav.requestQuote")}
          </Link>
          <button
            type="button"
            className="rounded-md border border-border p-2 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-surface lg:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-2">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground border-b border-border/50 last:border-0"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="btn-accent mt-3"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

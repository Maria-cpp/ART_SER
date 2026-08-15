"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

const NAV_ITEMS = [
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/contact", key: "nav.contact" },
];

const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/manufacturing", key: "nav.manufacturing" },
  { href: "/government", key: "nav.government" },
  { href: "/clients", key: "nav.clients" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <AnimatedLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-aluminium transition-colors duration-normal hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right side: language + CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/request-quote"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-all duration-normal hover:shadow-glow hover:translate-y-[-1px]"
          >
            {t("nav.requestQuote")}
          </Link>
          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border/30 bg-background lg:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-2">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-aluminium border-b border-border/20 last:border-0 transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCompany, getContact, getCategories } from "@/lib/data";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v5h3v-5h2l.5-3H14v-1.5c0-.3.2-.5.5-.5Z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10v6M8 7.5v.01M11.5 16v-3.2c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8V16" />
    </>
  ),
  youtube: (
    <>
      <rect x="3.5" y="6.5" width="17" height="11" rx="3" />
      <path d="M10.5 9.8v4.4l3.8-2.2-3.8-2.2Z" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: (
    <path d="M21 3L1 11l7.5 2.5M21 3l-5 18-7.5-7.5M21 3L8.5 13.5m0 0V20l3.2-3.5" />
  )
};

const COMPANY_LINKS = [
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/clients", key: "nav.clients" },
  { href: "/certifications", key: "nav.certifications" },
  { href: "/gallery", key: "nav.gallery" }
];

const LEGAL_LINKS = [
  { key: "footer.cookiePolicy" },
  { key: "footer.legalInfo" },
  { key: "footer.privacy" },
  { key: "footer.salesConditions" },
  { key: "footer.codeOfConduct" },
  { key: "footer.accessibility" }
];

export function Footer() {
  const { t, localized } = useLanguage();
  const company = getCompany();
  const contact = getContact();
  const categories = getCategories();
  const year = new Date().getFullYear();
  const [expanded, setExpanded] = useState(false);

  const socialEntries = Object.entries(contact.social ?? {}).filter(([k]) => SOCIAL_ICONS[k]);

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container-x py-5">
        {/* Always visible: Brand + Mission | Follow Us + Expand */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          {/* Left: Brand + mission */}
          <div className="flex-1 min-w-0">
            <span className="text-lg font-extrabold">{company.name}</span>
            <p className="mt-1 text-xs opacity-90 leading-relaxed max-w-xl">
              {localized(company.mission)}
            </p>
          </div>

          {/* Right: Follow us + expand */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold whitespace-nowrap">{t("contact.followUs")}:</span>
              {socialEntries.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-current opacity-90 transition hover:opacity-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    {SOCIAL_ICONS[platform]}
                  </svg>
                </a>
              ))}
            </div>

            {/* Expand/collapse button */}
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-current opacity-80 transition hover:opacity-100"
              aria-label={expanded ? "Collapse footer" : "Expand footer"}
            >
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable section */}
        <div
          className={`overflow-hidden transition-all duration-400 ${
            expanded ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          {/* Columns */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 border-t border-current/20 pt-6">
            {/* Our products */}
            <div>
              <h3 className="mb-2 text-sm font-bold">{t("footer.ourProducts")}</h3>
              <ul className="space-y-1">
                {categories
                  .filter((c) => c.id !== "all-products")
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={c.href} className="text-sm opacity-90 transition hover:opacity-100">
                        {localized(c.name)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Our company */}
            <div>
              <h3 className="mb-2 text-sm font-bold">{t("footer.ourCompany")}</h3>
              <ul className="space-y-1">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm opacity-90 transition hover:opacity-100">
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-2 text-sm font-bold">{t("contact.title")}</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/contact" className="text-sm opacity-90 transition hover:opacity-100">
                    {t("footer.contactArtser")}
                  </Link>
                </li>
                <li className="text-sm opacity-90">{contact.email}</li>
                <li className="text-sm opacity-90" dir="ltr">{contact.phone}</li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-4 border-t border-current/20 pt-3 flex flex-col gap-2 text-xs sm:text-[11px] opacity-80 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>&copy; {year} {company.name}.</span>
              <span>{t("footer.cookieSettings")}</span>
              {LEGAL_LINKS.map((l) => (
                <Link key={l.key} href="#" className="transition hover:opacity-100">
                  {t(l.key)}
                </Link>
              ))}
            </div>
            <span className="font-semibold tracking-wide">{t("footer.rights")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

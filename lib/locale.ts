import type { Metadata } from "next";
import { type Locale, translate, LOCALES } from "@/lib/i18n";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://artser.it";

export const PUBLIC_PAGES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/products",
  "/contact",
  "/request-quote",
  "/clients",
  "/certifications",
  "/gallery",
  "/government",
  "/jv-projects",
  "/manufacturing",
  "/suppliers",
];

export function pageMetadata(locale: Locale, titleKey: string, descKey: string, path: string): Metadata {
  const t = (key: string) => translate(locale, key);
  return {
    title: t(titleKey),
    description: t(descKey),
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    },
  };
}

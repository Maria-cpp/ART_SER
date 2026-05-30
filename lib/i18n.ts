// Internationalization config + helpers.
// UI strings live in /translations/<locale>.json (flat dot-namespaced keys).
// Translatable CONTENT in /data is stored as objects keyed by locale; read it with localized().

import en from "@/translations/en.json";
import it from "@/translations/it.json";
import ar from "@/translations/ar.json";
import ur from "@/translations/ur.json";

export type Locale = "en" | "it" | "ar" | "ur";
export type Direction = "ltr" | "rtl";

export const LOCALES: Locale[] = ["en", "it", "ar", "ur"];
export const RTL_LOCALES: Locale[] = ["ar", "ur"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "artser.lang";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  ar: "العربية",
  ur: "اردو"
};

export type Dictionary = Record<string, string>;

export const dictionaries: Record<Locale, Dictionary> = {
  en: en as Dictionary,
  it: it as Dictionary,
  ar: ar as Dictionary,
  ur: ur as Dictionary
};

export function isLocale(value: string | null): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function directionFor(locale: Locale): Direction {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

/** Translate a UI key for a locale, falling back to English then the key itself. */
export function translate(locale: Locale, key: string): string {
  return dictionaries[locale]?.[key] ?? dictionaries[DEFAULT_LOCALE]?.[key] ?? key;
}

/** A field of content that may be a plain string or a per-locale object. */
export type Localized = string | Partial<Record<Locale, string>>;

/** Read a localized content field, falling back to English then any present value. */
export function localized(field: Localized | undefined, locale: Locale): string {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[locale] ?? field[DEFAULT_LOCALE] ?? Object.values(field)[0] ?? "";
}

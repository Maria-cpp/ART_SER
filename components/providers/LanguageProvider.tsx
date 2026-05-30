"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import {
  Locale,
  Direction,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  directionFor,
  translate,
  localized as localizedHelper,
  Localized
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  /** Translate a UI string key. */
  t: (key: string) => string;
  /** Read a localized content field from /data. */
  localized: (field: Localized | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(LOCALE_STORAGE_KEY) : null;
    if (isLocale(stored)) setLocaleState(stored);
  }, []);

  // Reflect lang + dir on <html> and persist.
  useEffect(() => {
    const dir = directionFor(locale);
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", dir);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: directionFor(locale),
      setLocale,
      t: (key: string) => translate(locale, key),
      localized: (field: Localized | undefined) => localizedHelper(field, locale)
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

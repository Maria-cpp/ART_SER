"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Locale,
  Direction,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  directionFor,
  translate,
  localized as localizedHelper,
  Localized
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  localized: (field: Localized | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);
  const router = useRouter();
  const pathname = usePathname();

  // Persist locale to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // Navigate to the same page with the new locale prefix
      const segments = pathname.split("/");
      // Check if first segment is a valid locale
      if (segments.length >= 2 && LOCALES.includes(segments[1] as Locale)) {
        segments[1] = next;
      } else {
        segments.splice(1, 0, next);
      }
      router.push(segments.join("/") || `/${next}`);
    },
    [pathname, router]
  );

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

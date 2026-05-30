"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-muted">|</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={l === locale}
            className={`rounded px-1.5 py-0.5 transition ${
              l === locale ? "font-semibold text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}

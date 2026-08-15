"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      {/* Desktop: inline buttons */}
      <div className="hidden sm:flex items-center gap-1 text-sm" role="group" aria-label="Language">
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

      {/* Mobile: compact dropdown */}
      <div className="relative sm:hidden" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 rounded-lg border border-border/60 px-2 py-1.5 text-xs font-semibold text-accent transition hover:border-accent/60"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          {locale.toUpperCase()}
        </button>
        {open && (
          <div className="absolute end-0 top-full mt-1 z-50 min-w-[140px] rounded-xl border border-border/40 bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  l === locale
                    ? "bg-accent/10 font-semibold text-accent"
                    : "text-foreground hover:bg-surface-alt"
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

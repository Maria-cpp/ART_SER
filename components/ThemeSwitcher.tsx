"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { THEMES } from "@/lib/themes";

function PaletteIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.39-.61-.39-1 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z" />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = THEMES.find((tm) => tm.id === theme);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-foreground hover:bg-surface-alt"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.theme")}
        title={current?.name}
      >
        <PaletteIcon className="h-5 w-5" />
        {/* Current theme color swatch */}
        <span
          className="inline-block h-4 w-4 rounded-full border border-border shadow-sm"
          style={{ backgroundColor: current?.swatch }}
        />
        <span aria-hidden className="text-xs">▼</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-60 overflow-hidden rounded-md border border-border bg-surface shadow-lg"
        >
          {THEMES.map((tm) => (
            <li key={tm.id}>
              <button
                type="button"
                role="option"
                aria-selected={tm.id === theme}
                onClick={() => {
                  setTheme(tm.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm hover:bg-surface-alt ${
                  tm.id === theme ? "bg-surface-alt font-semibold" : ""
                }`}
              >
                <span
                  className="inline-block h-4 w-4 shrink-0 rounded-full border border-border"
                  style={{ backgroundColor: tm.swatch }}
                />
                <span className="flex-1">{tm.name}</span>
                {tm.id === theme && <span className="text-accent" aria-hidden>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

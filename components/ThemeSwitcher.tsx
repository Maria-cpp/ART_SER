"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { THEMES, ThemeMeta } from "@/lib/themes";

/* ---------- Mini layout preview (shown on hover) ---------- */
function ThemePreview({ theme }: { theme: ThemeMeta }) {
  const [bg, surface, accent, fg] = theme.palette;
  return (
    <div
      className="absolute bottom-full mb-3 start-1/2 -translate-x-1/2 w-44 rounded-lg overflow-hidden shadow-2xl border border-white/10 opacity-0 scale-90 pointer-events-none group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300 origin-bottom z-[60]"
      style={{ backgroundColor: bg }}
    >
      {/* Fake header */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b" style={{ borderColor: `${fg}15` }}>
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${fg}30` }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${fg}30` }} />
        <div className="ms-auto h-1 w-8 rounded-full" style={{ backgroundColor: `${fg}20` }} />
      </div>
      {/* Fake content */}
      <div className="p-2.5 space-y-2">
        <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: `${fg}30` }} />
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${fg}15` }} />
        <div className="h-1.5 w-2/3 rounded-full" style={{ backgroundColor: `${fg}15` }} />
        {/* Fake cards row */}
        <div className="flex gap-1.5 pt-1">
          <div className="flex-1 h-8 rounded" style={{ backgroundColor: surface }} />
          <div className="flex-1 h-8 rounded" style={{ backgroundColor: surface }} />
          <div className="flex-1 h-8 rounded" style={{ backgroundColor: surface }} />
        </div>
        {/* Fake button */}
        <div className="h-3 w-16 rounded-sm mx-auto" style={{ backgroundColor: accent }} />
      </div>
    </div>
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
      {/* Trigger button — palette icon with animated accent ring */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="theme-trigger group relative flex items-center justify-center h-9 w-9 rounded-full border border-border/60 text-foreground transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_15px_-3px] hover:shadow-accent/25"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.theme")}
        title={current?.name}
      >
        {/* Animated ring */}
        <span className="absolute inset-0 rounded-full border-2 border-accent/0 group-hover:border-accent/40 transition-all duration-500 group-hover:scale-110" />
        {/* Palette icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12"
          aria-hidden
        >
          <path d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.39-.61-.39-1 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z" />
          <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="theme-dropdown absolute end-0 z-50 mt-3 w-64 rounded-2xl border border-border/40 bg-surface/80 p-2 shadow-2xl backdrop-blur-xl"
          style={{
            animation: "themeDropIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {/* Header */}
          <div className="px-3 pt-1 pb-2 mb-1 border-b border-border/30">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
              {t("common.theme")}
            </span>
          </div>

          {THEMES.map((tm, idx) => {
            const isActive = tm.id === theme;
            const [bg, surface, accent, fg] = tm.palette;

            return (
              <div key={tm.id} className="group/item relative">
                <ThemePreview theme={tm} />
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setTheme(tm.id);
                    setOpen(false);
                  }}
                  className={`theme-option relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-all duration-200 ${
                    isActive
                      ? "bg-accent/10 ring-1 ring-accent/30"
                      : "hover:bg-surface-alt/80"
                  }`}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  {/* Color capsule — shows all 4 palette colors */}
                  <div className="relative flex h-7 w-14 shrink-0 overflow-hidden rounded-full border border-border/40 shadow-sm transition-transform duration-200 group-hover/item:scale-110">
                    <span className="flex-1" style={{ backgroundColor: bg }} />
                    <span className="flex-1" style={{ backgroundColor: surface }} />
                    <span className="flex-1" style={{ backgroundColor: accent }} />
                    <span className="flex-1" style={{ backgroundColor: fg }} />
                    {/* Glass overlay on capsule */}
                    <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                  </div>

                  {/* Theme name with accent underline on active */}
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {tm.name}
                    {isActive && (
                      <span className="block h-0.5 w-full mt-0.5 rounded-full bg-accent/60" />
                    )}
                  </span>

                  {/* Active check */}
                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

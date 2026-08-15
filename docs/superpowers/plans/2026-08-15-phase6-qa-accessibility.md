# Phase 6: QA & Accessibility — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the ARTSER website fully accessible (WCAG AA), keyboard-navigable, screen-reader-friendly, and QA-verified across all browsers, devices, languages, and 3D interaction modes, completing the final phase of the premium website upgrade.

**Architecture:** Accessibility is layered in from the root layout outward: a skip-to-content link in layout.tsx, visible focus states via globals.css, ARIA attributes on all interactive components (Header, Sidebar, LanguageSwitcher, ThemeSwitcher, 3D canvases), semantic HTML upgrades (main landmark already exists, add nav/region roles), improved form validation with localized messages, and expanded prefers-reduced-motion coverage. Mobile navigation gets touch-target sizing and proper focus trapping. A final Definition of Done checklist document captures all 24 verification items.

**Tech Stack:** HTML5 semantics, ARIA attributes, CSS `:focus-visible`, `prefers-reduced-motion`, React `useRef`/`useEffect` for focus management, existing i18n `t()` for localized validation messages

---

### Task 1: Add Skip-to-Content Link
**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add skip link to layout.tsx**

In `app/layout.tsx`, add a skip link as the first child of `<body>`, just before `<DoorIntro />`:

```tsx
<body suppressHydrationWarning>
  <a
    href="#main-content"
    className="skip-to-content"
  >
    Skip to content
  </a>
  <DoorIntro />
```

- [ ] **Step 2: Add id="main-content" to main element**

In `app/layout.tsx`, change the `<main>` tag:

```tsx
<main id="main-content" className="flex-1">{children}</main>
```

- [ ] **Step 3: Add skip-to-content CSS to globals.css**

Add at the end of the `@layer base` block in `app/globals.css`:

```css
  .skip-to-content {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    padding: 0.75rem 1.5rem;
    background: rgb(var(--color-accent));
    color: rgb(var(--color-accent-foreground));
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 0 0 0.5rem 0.5rem;
    text-decoration: none;
    transition: top 0.2s ease;
  }

  .skip-to-content:focus {
    top: 0;
    outline: none;
  }
```

---

### Task 2: Add Global Focus-Visible Styles
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add focus-visible base styles**

Add after the skip-to-content styles, still inside `@layer base`:

```css
  /* Visible focus ring for keyboard navigation */
  *:focus-visible {
    outline: 2px solid rgb(var(--color-accent));
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Remove default outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Specific focus styles for buttons and links */
  a:focus-visible,
  button:focus-visible,
  [role="button"]:focus-visible,
  select:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid rgb(var(--color-accent));
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgb(var(--color-accent) / 0.15);
  }

  /* Rounded focus ring for pill-shaped elements */
  .btn-accent:focus-visible,
  .btn-neon:focus-visible,
  .btn-outline:focus-visible,
  .theme-btn:focus-visible,
  .carousel-3d-btn:focus-visible,
  .carousel-3d-dot:focus-visible {
    outline: 2px solid rgb(var(--color-accent));
    outline-offset: 3px;
    border-radius: 9999px;
  }

  /* Card focus state */
  .card:focus-visible,
  .glass-card:focus-visible,
  .flip-card:focus-visible {
    outline: 2px solid rgb(var(--color-accent));
    outline-offset: 2px;
    border-color: rgb(var(--color-accent) / 0.5);
  }
```

---

### Task 3: Expand Reduced Motion Support
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add comprehensive reduced-motion rules**

Add a new section after the existing `/* Reduced motion */` blocks, before the `/* RESPONSIVE STYLES */` section:

```css
/* ============================================
   COMPREHENSIVE REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .floating {
    animation: none !important;
  }

  .hero-gradient-text {
    animation: none !important;
    background-size: 100% auto !important;
  }

  .animate-blink {
    animation: none !important;
    opacity: 1 !important;
  }

  .scroll-indicator {
    animation: none !important;
  }

  .scroll-reveal,
  .scroll-reveal-left,
  .scroll-reveal-scale {
    opacity: 1 !important;
    transform: none !important;
  }

  .stagger-children > * {
    opacity: 1 !important;
    transform: none !important;
  }

  .supplier-track,
  .marquee-track {
    animation: none !important;
  }

  .flip-card:hover .flip-card-inner,
  .flip-card:active .flip-card-inner,
  .flip-card:focus-within .flip-card-inner {
    transition-duration: 0.01ms !important;
  }

  .card:hover {
    transform: none !important;
  }

  .btn-accent:hover,
  .btn-neon:hover,
  .btn-outline:hover {
    transform: none !important;
  }

  main {
    animation: none !important;
  }

  .construction-3d-bg {
    display: none !important;
  }
}
```

---

### Task 4: Improve Header Accessibility and Mobile Nav
**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Replace the entire Header component**

Replace the full content of `components/Header.tsx`:

```tsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/clients", key: "nav.clients" },
  { href: "/certifications", key: "nav.certifications" },
  { href: "/products", key: "sidebar.products" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/government", key: "nav.government" },
  { href: "/manufacturing", key: "nav.manufacturing" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/suppliers", key: "nav.suppliers" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && mobileOpen) {
      setMobileOpen(false);
      toggleBtnRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus first link when mobile nav opens
  useEffect(() => {
    if (mobileOpen && mobileNavRef.current) {
      const firstLink = mobileNavRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [mobileOpen]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
    >
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6 max-w-full overflow-hidden">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label={`${t("brand.name")} - ${t("nav.home")}`}
        >
          <AnimatedLogo />
          <div className="hidden sm:flex flex-col items-start">
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold leading-tight text-foreground">
              {t("hero.slogan")}
            </p>
            <div className="w-6 h-[1.5px] bg-[#ef5e00] mt-1" aria-hidden="true" />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link
            href="/request-quote"
            className="btn-accent hidden md:inline-flex min-h-[44px] min-w-[44px] items-center"
          >
            {t("nav.requestQuote")}
          </Link>
          <button
            ref={toggleBtnRef}
            type="button"
            className="rounded-md border border-border p-2 lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t("common.menu") + " - close" : t("common.menu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true">{mobileOpen ? "\u2715" : "\u2630"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          role="navigation"
          aria-label={t("common.menu")}
          className="border-t border-border bg-surface lg:hidden max-h-[70vh] overflow-y-auto"
        >
          <div className="flex flex-col px-4 py-2">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-foreground border-b border-border/50 last:border-0 min-h-[44px] flex items-center"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="btn-accent mt-3 min-h-[44px]"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
```

---

### Task 5: Improve Sidebar Accessibility
**Files:**
- Modify: `components/Sidebar.tsx`

- [ ] **Step 1: Add nav role and aria-label to sidebar**

In `components/Sidebar.tsx`, change the `<aside>` opening tag:

```tsx
    <aside
      role="complementary"
      aria-label="Site navigation"
      className={`sidebar hidden lg:flex flex-col flex-shrink-0 border-e border-border bg-surface h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
```

- [ ] **Step 2: Add aria-label to the nav element**

Change the `<nav>` inside Sidebar:

```tsx
      <nav className="flex-1 px-2 pb-6" aria-label="Sidebar navigation">
```

- [ ] **Step 3: Add aria-hidden to all decorative SVG icons in sidebar**

For every SVG icon in the `NAV_GROUPS` array (each `<svg>` element), add `aria-hidden="true"`. For example, the Home icon becomes:

```tsx
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
```

Repeat `aria-hidden="true"` for all five SVG icons in the `NAV_GROUPS` array (Company, Products, Projects, Resources icons).

- [ ] **Step 4: Add keyboard interaction to collapse toggle chevron SVG**

Add `aria-hidden="true"` to the collapse toggle SVG and the group expand chevron SVG:

```tsx
          <svg
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
```

And the group expand chevron:

```tsx
                  <svg
                    className={`h-4 w-4 text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
```

---

### Task 6: Improve Language Switcher Accessibility
**Files:**
- Modify: `components/LanguageSwitcher.tsx`

- [ ] **Step 1: Add keyboard Escape handling and ARIA improvements**

Replace the full content of `components/LanguageSwitcher.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Desktop: inline buttons */}
      <div
        className="hidden sm:flex items-center gap-1 text-sm"
        role="radiogroup"
        aria-label="Language"
      >
        {LOCALES.map((l, i) => (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-1 text-muted" aria-hidden="true">|</span>}
            <button
              type="button"
              onClick={() => setLocale(l)}
              role="radio"
              aria-checked={l === locale}
              className={`rounded px-1.5 py-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center transition ${
                l === locale ? "font-semibold text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {LOCALE_LABELS[l]}
            </button>
          </span>
        ))}
      </div>

      {/* Mobile: compact dropdown */}
      <div className="relative sm:hidden" ref={ref} onKeyDown={handleKeyDown}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1 rounded-lg border border-border/60 px-2 py-1.5 text-xs font-semibold text-accent transition hover:border-accent/60 min-h-[44px] min-w-[44px] justify-center"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Language: ${LOCALE_LABELS[locale]}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          {locale.toUpperCase()}
        </button>
        {open && (
          <div
            role="listbox"
            aria-label="Select language"
            className="absolute end-0 top-full mt-1 z-50 min-w-[140px] rounded-xl border border-border/40 bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition min-h-[44px] ${
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
```

---

### Task 7: Improve ThemeSwitcher Accessibility
**Files:**
- Modify: `components/ThemeSwitcher.tsx`

- [ ] **Step 1: Add Escape key handling**

In `components/ThemeSwitcher.tsx`, add a `useCallback` import and Escape handler. After the existing `useEffect` for click-outside, add:

```tsx
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  }, [open]);
```

Add `useCallback` to the import line:

```tsx
import { useState, useRef, useEffect, useCallback } from "react";
```

- [ ] **Step 2: Add onKeyDown to the wrapper div**

Change the wrapper div to include the keydown handler:

```tsx
    <div className="relative" ref={ref} onKeyDown={handleKeyDown}>
```

- [ ] **Step 3: Ensure trigger button has minimum touch target**

Add `min-h-[44px] min-w-[44px]` to the trigger button class:

```tsx
        className="theme-trigger group relative flex items-center justify-center h-11 w-11 rounded-full border border-border/60 text-foreground transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_15px_-3px] hover:shadow-accent/25 min-h-[44px] min-w-[44px]"
```

---

### Task 8: Add ARIA to 3D Canvas and Construction Background
**Files:**
- Modify: `components/Construction3DBackground.tsx`

- [ ] **Step 1: Add ARIA attributes to the 3D canvas**

In `components/Construction3DBackground.tsx`, find the return statement with the `<canvas>` element and add ARIA attributes:

```tsx
  return (
    <div className="construction-3d-bg" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        role="img"
        aria-label="Decorative 3D construction background"
      />
    </div>
  );
```

Note: The parent div has `aria-hidden="true"` because this is purely decorative.

---

### Task 9: Add ARIA to DoorIntro Animation
**Files:**
- Modify: `components/DoorIntro.tsx`

- [ ] **Step 1: Add aria-hidden to DoorIntro overlay**

In `components/DoorIntro.tsx`, add `aria-hidden="true"` and `role="presentation"` to the outer div:

```tsx
    <div className="fixed inset-0 z-[9999] flex" aria-hidden="true" role="presentation">
```

---

### Task 10: Improve Footer Accessibility
**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Add contentinfo role and ARIA to footer**

In `components/Footer.tsx`, update the `<footer>` tag:

```tsx
    <footer role="contentinfo" className="bg-accent text-accent-foreground">
```

- [ ] **Step 2: Add aria-hidden to decorative SVGs**

For the expand/collapse chevron SVG, add `aria-hidden="true"`:

```tsx
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
```

- [ ] **Step 3: Add aria-hidden to social icon SVGs**

Each social icon SVG already has `aria-hidden` but verify the social links have proper labels. Update the social link `aria-label` to be more descriptive:

```tsx
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} on ${platform}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-current opacity-90 transition hover:opacity-100 min-h-[44px] min-w-[44px]"
                >
```

- [ ] **Step 4: Add navigation landmark to footer links**

Wrap the expandable columns section in a `<nav>`:

```tsx
          {/* Columns */}
          <nav aria-label="Footer navigation" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 border-t border-current/20 pt-6">
```

Change the closing `</div>` for that section to `</nav>`.

---

### Task 11: Improve Section Component Semantics
**Files:**
- Modify: `components/Section.tsx`

- [ ] **Step 1: Add proper section semantics with aria-labelledby**

Replace the content of `components/Section.tsx`:

```tsx
import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
}

/** Shared section wrapper with consistent spacing, optional heading, and scroll-reveal. */
export function Section({ title, subtitle, children, className = "", alt = false, id }: SectionProps) {
  const headingId = id ? `${id}-heading` : title ? `section-${title.toLowerCase().replace(/\s+/g, "-")}-heading` : undefined;

  return (
    <section
      className={`${alt ? "bg-surface-alt" : ""} relative py-8 md:py-16 ${className}`}
      aria-labelledby={headingId}
      id={id}
    >
      {/* Accent glow divider at top */}
      <div className="glow-line absolute top-0 inset-x-0" aria-hidden="true" />

      <div className="container-x">
        {(title || subtitle) && (
          <header className="mb-6 md:mb-10 max-w-2xl scroll-reveal">
            {title && <h2 id={headingId} className="text-3xl font-bold tracking-tight text-accent">{title}</h2>}
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </header>
        )}
        <div className="scroll-reveal">
          {children}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 12: Add Validation Translation Keys
**Files:**
- Modify: `translations/en.json`
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Add validation keys to en.json**

Add these keys to `translations/en.json` (before the closing `}`):

```json
  "validation.required": "This field is required",
  "validation.email": "Please enter a valid email address",
  "validation.phone": "Please enter a valid phone number",
  "validation.minLength": "Must be at least {min} characters",
  "validation.success": "Form submitted successfully",
  "validation.error": "There was an error. Please try again.",
  "a11y.skipToContent": "Skip to content",
  "a11y.menuOpen": "Open menu",
  "a11y.menuClose": "Close menu",
  "a11y.expandFooter": "Expand footer",
  "a11y.collapseFooter": "Collapse footer",
  "a11y.expandSidebar": "Expand sidebar",
  "a11y.collapseSidebar": "Collapse sidebar",
  "a11y.decorative3d": "Decorative 3D construction background",
  "a11y.languageSelect": "Select language",
  "a11y.themeSelect": "Select theme"
```

- [ ] **Step 2: Add validation keys to it.json**

Add these keys to `translations/it.json`:

```json
  "validation.required": "Questo campo e obbligatorio",
  "validation.email": "Inserisci un indirizzo email valido",
  "validation.phone": "Inserisci un numero di telefono valido",
  "validation.minLength": "Deve contenere almeno {min} caratteri",
  "validation.success": "Modulo inviato con successo",
  "validation.error": "Si e verificato un errore. Riprova.",
  "a11y.skipToContent": "Vai al contenuto",
  "a11y.menuOpen": "Apri menu",
  "a11y.menuClose": "Chiudi menu",
  "a11y.expandFooter": "Espandi piede di pagina",
  "a11y.collapseFooter": "Comprimi piede di pagina",
  "a11y.expandSidebar": "Espandi barra laterale",
  "a11y.collapseSidebar": "Comprimi barra laterale",
  "a11y.decorative3d": "Sfondo 3D decorativo di costruzione",
  "a11y.languageSelect": "Seleziona lingua",
  "a11y.themeSelect": "Seleziona tema"
```

- [ ] **Step 3: Add validation keys to ar.json**

Add these keys to `translations/ar.json`:

```json
  "validation.required": "\u0647\u0630\u0627 \u0627\u0644\u062d\u0642\u0644 \u0645\u0637\u0644\u0648\u0628",
  "validation.email": "\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u0627\u0644\u062d",
  "validation.phone": "\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0631\u0642\u0645 \u0647\u0627\u062a\u0641 \u0635\u0627\u0644\u062d",
  "validation.minLength": "\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 {min} \u062d\u0631\u0641\u064b\u0627",
  "validation.success": "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0628\u0646\u062c\u0627\u062d",
  "validation.error": "\u062d\u062f\u062b \u062e\u0637\u0623. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.",
  "a11y.skipToContent": "\u0627\u0646\u062a\u0642\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u062a\u0648\u0649",
  "a11y.menuOpen": "\u0641\u062a\u062d \u0627\u0644\u0642\u0627\u0626\u0645\u0629",
  "a11y.menuClose": "\u0625\u063a\u0644\u0627\u0642 \u0627\u0644\u0642\u0627\u0626\u0645\u0629",
  "a11y.expandFooter": "\u062a\u0648\u0633\u064a\u0639 \u0627\u0644\u062a\u0630\u064a\u064a\u0644",
  "a11y.collapseFooter": "\u0637\u064a \u0627\u0644\u062a\u0630\u064a\u064a\u0644",
  "a11y.expandSidebar": "\u062a\u0648\u0633\u064a\u0639 \u0627\u0644\u0634\u0631\u064a\u0637 \u0627\u0644\u062c\u0627\u0646\u0628\u064a",
  "a11y.collapseSidebar": "\u0637\u064a \u0627\u0644\u0634\u0631\u064a\u0637 \u0627\u0644\u062c\u0627\u0646\u0628\u064a",
  "a11y.decorative3d": "\u062e\u0644\u0641\u064a\u0629 \u0628\u0646\u0627\u0621 \u062b\u0644\u0627\u062b\u064a\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062f \u0644\u0644\u0632\u064a\u0646\u0629",
  "a11y.languageSelect": "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0644\u063a\u0629",
  "a11y.themeSelect": "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0633\u0645\u0629"
```

- [ ] **Step 4: Add validation keys to ur.json**

Add these keys to `translations/ur.json`:

```json
  "validation.required": "\u06cc\u06c1 \u0641\u06cc\u0644\u0688 \u0636\u0631\u0648\u0631\u06cc \u06c1\u06d2",
  "validation.email": "\u0628\u0631\u0627\u0626\u06d2 \u0645\u06c1\u0631\u0628\u0627\u0646\u06cc \u0627\u06cc\u06a9 \u062f\u0631\u0633\u062a \u0627\u06cc\u0645\u06cc\u0644 \u067e\u062a\u06c1 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
  "validation.phone": "\u0628\u0631\u0627\u0626\u06d2 \u0645\u06c1\u0631\u0628\u0627\u0646\u06cc \u0627\u06cc\u06a9 \u062f\u0631\u0633\u062a \u0641\u0648\u0646 \u0646\u0645\u0628\u0631 \u062f\u0631\u062c \u06a9\u0631\u06cc\u06ba",
  "validation.minLength": "\u06a9\u0645 \u0627\u0632 \u06a9\u0645 {min} \u062d\u0631\u0648\u0641 \u06c1\u0648\u0646\u06d2 \u0686\u0627\u06c1\u06cc\u06ba",
  "validation.success": "\u0641\u0627\u0631\u0645 \u06a9\u0627\u0645\u06cc\u0627\u0628\u06cc \u0633\u06d2 \u062c\u0645\u0639 \u06c1\u0648 \u06af\u06cc\u0627",
  "validation.error": "\u0627\u06cc\u06a9 \u062e\u0631\u0627\u0628\u06cc \u06c1\u0648\u0626\u06cc\u06d4 \u0628\u0631\u0627\u0626\u06d2 \u0645\u06c1\u0631\u0628\u0627\u0646\u06cc \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634 \u06a9\u0631\u06cc\u06ba\u06d4",
  "a11y.skipToContent": "\u0645\u0648\u0627\u062f \u067e\u0631 \u062c\u0627\u0626\u06cc\u06ba",
  "a11y.menuOpen": "\u0645\u06cc\u0646\u0648 \u06a9\u06be\u0648\u0644\u06cc\u06ba",
  "a11y.menuClose": "\u0645\u06cc\u0646\u0648 \u0628\u0646\u062f \u06a9\u0631\u06cc\u06ba",
  "a11y.expandFooter": "\u0641\u0648\u0679\u0631 \u067e\u06be\u06cc\u0644\u0627\u0626\u06cc\u06ba",
  "a11y.collapseFooter": "\u0641\u0648\u0679\u0631 \u0633\u06a9\u06cc\u0691\u06cc\u06ba",
  "a11y.expandSidebar": "\u0633\u0627\u0626\u0688 \u0628\u0627\u0631 \u067e\u06be\u06cc\u0644\u0627\u0626\u06cc\u06ba",
  "a11y.collapseSidebar": "\u0633\u0627\u0626\u0688 \u0628\u0627\u0631 \u0633\u06a9\u06cc\u0691\u06cc\u06ba",
  "a11y.decorative3d": "\u0633\u062c\u0627\u0648\u0679\u06cc \u062a\u0639\u0645\u06cc\u0631\u0627\u062a\u06cc 3D \u067e\u0633 \u0645\u0646\u0638\u0631",
  "a11y.languageSelect": "\u0632\u0628\u0627\u0646 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba",
  "a11y.themeSelect": "\u062a\u06be\u06cc\u0645 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba"
```

---

### Task 13: Improve Request Quote Form Accessibility
**Files:**
- Modify: `app/request-quote/page.tsx`

- [ ] **Step 1: Replace the request quote page with accessible form**

Replace the full content of `app/request-quote/page.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServices } from "@/lib/data";

type State = "idle" | "submitting" | "ok" | "error";

interface FieldError {
  name?: string;
  email?: string;
}

export default function RequestQuotePage() {
  const { t, localized } = useLanguage();
  const services = getServices();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<FieldError>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const firstErrorRef = useRef<HTMLInputElement>(null);

  // Focus the status message when state changes to ok or error
  useEffect(() => {
    if ((state === "ok" || state === "error") && statusRef.current) {
      statusRef.current.focus();
    }
  }, [state]);

  function validate(form: FormData): FieldError {
    const errs: FieldError = {};
    const name = form.get("name") as string;
    const email = form.get("email") as string;

    if (!name || name.trim().length < 2) {
      errs.name = t("validation.required");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t("validation.email");
    }
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fieldErrors = validate(form);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Focus the first field with an error
      const firstErrorField = e.currentTarget.querySelector(
        fieldErrors.name ? '[name="name"]' : '[name="email"]'
      ) as HTMLInputElement;
      firstErrorField?.focus();
      return;
    }

    setErrors({});
    setState("submitting");
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  const field = "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent min-h-[44px]";
  const fieldError = "w-full rounded-md border border-red-500 bg-surface px-3 py-2.5 text-sm text-foreground outline-none focus:border-red-500 min-h-[44px]";

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.requestQuote" }]} />
      </div>
      <Section title={t("quote.title")} subtitle={t("quote.subtitle")} id="request-quote">
        <form onSubmit={onSubmit} className="max-w-2xl space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="quote-name" className="mb-1 block text-sm text-muted">
                {t("quote.name")} <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="quote-name"
                name="name"
                required
                className={errors.name ? fieldError : field}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "quote-name-error" : undefined}
                ref={firstErrorRef}
              />
              {errors.name && (
                <p id="quote-name-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="quote-company" className="mb-1 block text-sm text-muted">
                {t("quote.company")}
              </label>
              <input id="quote-company" name="company" className={field} />
            </div>
            <div>
              <label htmlFor="quote-email" className="mb-1 block text-sm text-muted">
                {t("quote.email")} <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="quote-email"
                name="email"
                type="email"
                required
                className={errors.email ? fieldError : field}
                dir="ltr"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "quote-email-error" : undefined}
              />
              {errors.email && (
                <p id="quote-email-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="quote-phone" className="mb-1 block text-sm text-muted">
                {t("quote.phone")}
              </label>
              <input id="quote-phone" name="phone" type="tel" className={field} dir="ltr" />
            </div>
          </div>
          <div>
            <label htmlFor="quote-service" className="mb-1 block text-sm text-muted">
              {t("quote.service")}
            </label>
            <select id="quote-service" name="service" className={field}>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{localized(s.title)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quote-message" className="mb-1 block text-sm text-muted">
              {t("quote.message")}
            </label>
            <textarea id="quote-message" name="message" rows={5} className={field} />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="btn-accent disabled:opacity-50 min-h-[44px]"
              aria-busy={state === "submitting"}
            >
              {state === "submitting" ? t("common.loading") : t("quote.submit")}
            </button>
            <div
              ref={statusRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="outline-none"
            >
              {state === "ok" && <span className="text-sm text-green-600">{t("quote.success")}</span>}
              {state === "error" && <span className="text-sm text-red-500">{t("quote.error")}</span>}
            </div>
          </div>
        </form>
      </Section>
    </>
  );
}
```

---

### Task 14: Improve Contact Page Accessibility
**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Add proper semantics and ARIA to contact page**

Replace the full content of `app/contact/page.tsx`:

```tsx
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getContact } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactPage() {
  const { t, localized } = useLanguage();
  const contact = getContact();
  useScrollReveal();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.contact" }]} />
      </div>
      <Section title={t("contact.title")} subtitle={t("contact.subtitle")} id="contact">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-foreground">{t("contact.headquarters")}</h3>
            <address className="not-italic">
              <p className="text-muted">{contact.headquarters.address}</p>
              <p className="mt-2">
                <a href={`mailto:${contact.email}`} className="text-muted hover:text-accent transition">
                  {contact.email}
                </a>
              </p>
              <p dir="ltr">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-muted hover:text-accent transition">
                  {contact.phone}
                </a>
              </p>
            </address>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">{t("contact.offices")}</h3>
            <ul className="space-y-4" role="list">
              {contact.offices.map((o) => (
                <li key={o.city} className="card">
                  <p className="font-semibold text-foreground">{localized(o.label)}</p>
                  <address className="not-italic">
                    <p className="text-sm text-muted">{o.address}</p>
                    <p className="text-sm" dir="ltr">
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="text-muted hover:text-accent transition">
                        {o.phone}
                      </a>
                    </p>
                  </address>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={`${t("contact.headquarters")} - ${contact.headquarters.address}`}
              src={contact.mapEmbed}
              className="h-full min-h-[250px] md:min-h-[320px] w-full"
              loading="lazy"
              aria-label={`Map showing ${contact.headquarters.address}`}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
```

---

### Task 15: Add Image Alt Text Audit and Fixes
**Files:**
- Modify: `app/page.tsx` (home page)
- Modify: `app/gallery/page.tsx`
- Modify: `app/clients/page.tsx`
- Modify: `app/certifications/page.tsx`

- [ ] **Step 1: Audit and fix alt text on home page images**

Search for any `<img>` or `<Image>` tags missing alt text. For every `next/image` or `<img>` usage, ensure a descriptive `alt` attribute is present. If the image is decorative, use `alt=""` and `aria-hidden="true"`.

For hero slideshow images in `app/page.tsx`, ensure each image has:
```tsx
<Image
  src={img.src}
  alt={img.alt || "ARTSER construction project showcase"}
  ...
/>
```

For decorative background images, use:
```tsx
<Image
  src={bgSrc}
  alt=""
  aria-hidden="true"
  ...
/>
```

- [ ] **Step 2: Fix gallery page image alt texts**

In `app/gallery/page.tsx`, ensure gallery images have descriptive alt text derived from their data:

```tsx
<Image
  src={item.src}
  alt={localized(item.caption) || `Gallery image - ${item.category}`}
  ...
/>
```

- [ ] **Step 3: Fix client logos alt text**

In `app/clients/page.tsx`, ensure client logos use the client name as alt text:

```tsx
<Image
  src={client.logo}
  alt={`${localized(client.name)} logo`}
  ...
/>
```

- [ ] **Step 4: Fix certification images alt text**

In `app/certifications/page.tsx`, ensure certification images use descriptive alt:

```tsx
<Image
  src={cert.image}
  alt={`${localized(cert.title)} certification`}
  ...
/>
```

---

### Task 16: Ensure Flip Cards Are Keyboard Accessible
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add keyboard focus support for flip cards**

Add to `app/globals.css`, after the existing flip card touch support section:

```css
/* Keyboard focus support for flip cards */
.flip-card:focus-within .flip-card-inner {
  transform: rotateY(180deg);
  box-shadow: 0 12px 32px rgb(var(--color-accent) / 0.2), 0 4px 16px rgb(0 0 0 / 0.12);
}

[dir="rtl"] .flip-card:focus-within .flip-card-inner {
  transform: rotateY(-180deg);
}
```

- [ ] **Step 2: Add tabindex and role to flip card usage**

Wherever flip cards are rendered in the codebase, ensure they have `tabIndex={0}` and `role="button"` on the `.flip-card` element, and `aria-label` describing the card content:

```tsx
<div className="flip-card" tabIndex={0} role="button" aria-label={`View details for ${title}`}>
```

---

### Task 17: Add ARIA Live Region for Dynamic Content
**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add a global aria-live announcer region**

In `app/layout.tsx`, add a visually-hidden live region inside the body, after the main content div but before closing `</LanguageProvider>`:

```tsx
              </div>
            </div>
            {/* Screen reader announcements */}
            <div
              id="sr-announcements"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            />
          </LanguageProvider>
```

---

### Task 18: Add sr-only Utility Class
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add sr-only utility to globals.css**

Add inside the `@layer components` block:

```css
  /* Screen reader only — visually hidden but accessible */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
```

Note: Tailwind typically provides this, but adding it explicitly ensures it works even if Tailwind purges it.

---

### Task 19: Commit Accessibility Changes
**Files:** All modified files from Tasks 1-18

- [ ] **Step 1: Stage and commit all changes**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add app/layout.tsx app/globals.css components/Header.tsx components/Sidebar.tsx components/LanguageSwitcher.tsx components/ThemeSwitcher.tsx components/Construction3DBackground.tsx components/DoorIntro.tsx components/Footer.tsx components/Section.tsx app/request-quote/page.tsx app/contact/page.tsx translations/en.json translations/it.json translations/ar.json translations/ur.json
git commit -m "feat: add comprehensive accessibility — skip link, focus states, ARIA, semantic HTML, form validation, reduced motion, touch targets"
```

---

### Task 20: Create Definition of Done Checklist
**Files:**
- Create: `docs/qa/definition-of-done.md`

- [ ] **Step 1: Create the QA checklist file**

Create `docs/qa/definition-of-done.md` with the following content:

```markdown
# ARTSER Website — Definition of Done Checklist

This checklist covers all 24 verification items for the ARTSER website upgrade.
Each item must be verified before the site is considered production-ready.

---

## Visual & Design

- [ ] **1. All pages render correctly in the single "artser" dark premium theme**
  - Background: #0B0B0B, Accent: #B58A62, Text: #F5F5F2
  - Verify: home, about, services, portfolio, government, manufacturing, jv-projects, clients, gallery, certifications, products, products/[category], request-quote, contact, suppliers

- [ ] **2. 3D elements render and are interactive**
  - Hero 3D scene loads and responds to mouse/touch
  - Material section 3D renders properly
  - Construction 3D background is visible at correct opacity
  - WebGL fallback displays when WebGL is unavailable

- [ ] **3. All animations respect prefers-reduced-motion**
  - Door intro skips or fades instantly
  - Scroll reveals appear without animation
  - Floating/gradient animations are disabled
  - 3D background is hidden
  - Carousel transitions are instant
  - Page intro overlays are hidden

- [ ] **4. Consistent typography and spacing across all pages**
  - Headings use Playfair Display
  - Body uses Inter
  - Arabic/Urdu use Noto fonts
  - Spacing is consistent between sections

## Accessibility

- [ ] **5. Skip-to-content link present and functional**
  - Visible on Tab press
  - Focuses main content area

- [ ] **6. All interactive elements keyboard-navigable**
  - Tab through header nav, language switcher, theme switcher
  - Tab through sidebar navigation
  - Tab through all form fields
  - Tab through footer links
  - Escape closes dropdowns/menus

- [ ] **7. Visible focus states on all interactive elements**
  - 2px accent-colored outline with offset
  - Cards, buttons, links, inputs all show focus ring
  - Focus ring uses :focus-visible (not :focus)

- [ ] **8. ARIA attributes correctly applied**
  - Landmark roles: banner, contentinfo, navigation, complementary
  - aria-expanded on menus and accordions
  - aria-label on icon buttons
  - aria-hidden on decorative elements (SVGs, 3D canvas, door intro)
  - aria-live on form status messages
  - aria-invalid and aria-describedby on form errors

- [ ] **9. Sufficient contrast ratios (WCAG AA)**
  - Text on background: minimum 4.5:1
  - Large text on background: minimum 3:1
  - Interactive element borders: minimum 3:1
  - Test with browser devtools contrast checker

- [ ] **10. Alt text on all images**
  - Product images: descriptive alt
  - Client logos: "[Client name] logo"
  - Certification images: "[Cert name] certification"
  - Decorative images: alt="" with aria-hidden="true"
  - Gallery images: caption or category-based alt

- [ ] **11. Forms are fully accessible**
  - Labels linked to inputs via htmlFor/id
  - Required fields marked with aria-required or required
  - Error messages use role="alert" and aria-describedby
  - Status messages use role="status" and aria-live
  - Focus moves to first error on validation failure
  - Focus moves to success/error message after submission
  - All inputs have minimum 44x44px touch target

## Internationalization

- [ ] **12. All 4 languages render correctly**
  - EN (LTR): all text displays, no missing keys
  - IT (LTR): all text displays, no missing keys
  - AR (RTL): layout mirrors, text wraps correctly
  - UR (RTL): layout mirrors, text wraps correctly

- [ ] **13. RTL layout correct for Arabic and Urdu**
  - Navigation mirrors
  - Sidebar renders on correct side
  - Cards, grids mirror
  - Forms align correctly
  - Icons that should flip do flip (flip-rtl class)
  - Logical properties used (ms/me/ps/pe/start/end)

- [ ] **14. No hardcoded UI strings**
  - All visible text uses t() from LanguageProvider
  - Validation messages are localized
  - ARIA labels use translated strings where user-facing

- [ ] **15. Metadata is localized**
  - Page titles reflect current language
  - Meta descriptions localized
  - hreflang tags present

## Performance

- [ ] **16. Core Web Vitals targets met**
  - LCP < 2.5s on desktop, < 4s on mobile
  - FID/INP < 200ms
  - CLS < 0.1

- [ ] **17. Images optimized**
  - next/image used everywhere
  - Proper sizes/srcset attributes
  - Priority flag on hero/above-fold images
  - Lazy loading on below-fold images

- [ ] **18. 3D content lazy-loaded**
  - Three.js only imports when needed
  - 3D background deferred until after initial paint
  - Device-tier detection works (reduced 3D on low-end)

- [ ] **19. Fonts self-hosted via next/font**
  - No external font CDN requests
  - Font display: swap
  - Zero CLS from font loading

## Browser & Device Testing

- [ ] **20. Desktop browsers verified**
  - Chrome (latest): all features work
  - Edge (latest): all features work
  - Safari (latest): all features work
  - Firefox (latest): all features work

- [ ] **21. Mobile browsers verified**
  - iOS Safari: layout correct, touch works, 3D works or falls back
  - Android Chrome: layout correct, touch works, 3D works or falls back

- [ ] **22. Device range verified**
  - High-end desktop: full 3D, all animations
  - Mid-range laptop: 3D renders, acceptable performance
  - Low/mid-range Android: graceful degradation, no crashes
  - iPhone: proper viewport, safe area insets
  - Tablet: responsive layout correct

## 3D UX

- [ ] **23. 3D interactions work correctly**
  - Mouse rotation on desktop
  - Touch rotation on mobile
  - Scroll-triggered animations
  - Camera transitions are smooth
  - Models load without errors
  - Fallback renders when WebGL unavailable
  - Reduced motion disables 3D animations
  - Slow network: loading state shown

## SEO

- [ ] **24. SEO implementation complete**
  - Structured data: Organization, LocalBusiness, WebSite, Service
  - Sitemap generated
  - robots.txt configured
  - Canonical URLs set
  - Open Graph tags present
  - hreflang alternates for all 4 languages

---

## Sign-off

| Reviewer | Date | Status |
|----------|------|--------|
|          |      |        |
|          |      |        |
```

---

### Task 21: Final Commit
**Files:** All remaining files

- [ ] **Step 1: Stage and commit the QA checklist**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add docs/qa/definition-of-done.md
git commit -m "docs: add Definition of Done QA checklist with 24 verification items"
```

- [ ] **Step 2: Verify build passes**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run build
```

Fix any TypeScript or build errors that arise.

- [ ] **Step 3: Final commit if build fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build errors from Phase 6 accessibility changes"
```

# Phase 1: UX/UI Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-theme system with a single premium ARTSER palette (dark graphite + aluminium + bronze accent), establish design system tokens (spacing, radius, shadows, animation, z-index), set up the new component directory structure, and simplify navigation to a minimal architectural layout.

**Architecture:** The current 5-theme CSS variable system in globals.css will be consolidated into a single `[data-theme="artser"]` block using the upgrade spec's color direction (#0B0B0B base, #F5F5F2 light, #B8B8B8 aluminium, #747474 concrete, #B58A62 bronze accent). ThemeProvider and ThemeSwitcher will be simplified to use this single theme. The Sidebar component will be removed from the layout in favor of a streamlined top navigation. New design tokens will be added to tailwind.config.ts and globals.css for consistent spacing, shadows, radii, and animation durations across all future phases.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3, CSS custom properties

---

### Task 1: Create Design Tokens File

**Files:**
- Create: `lib/tokens.ts`

- [ ] **Step 1: Create the design tokens module**

```typescript
// File: lib/tokens.ts

/** ARTSER Design System Tokens
 *  Single source of truth for spacing, radii, shadows, z-index, animation, and breakpoints.
 *  These are exported for use in JS/TS. CSS equivalents are defined in globals.css and tailwind.config.ts.
 */

// ── Spacing (px) ──
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const;

// ── Border Radius ──
export const radius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
} as const;

// ── Shadows ──
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.15)",
  md: "0 4px 12px rgba(0, 0, 0, 0.2)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.25)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.3)",
  glow: "0 0 30px -5px rgba(181, 138, 98, 0.35)",
  "glow-lg": "0 0 50px -10px rgba(181, 138, 98, 0.45)",
} as const;

// ── Z-Index Scale ──
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

// ── Animation Durations (ms) ──
export const duration = {
  fast: 200,
  normal: 400,
  slow: 700,
  cinematic: 1200,
  cinematicLong: 1600,
} as const;

// ── Easings ──
export const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  spring: "cubic-bezier(0.16, 1, 0.3, 1)",
  smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

// ── Container Widths ──
export const container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;

// ── ARTSER Color Palette (hex) ──
export const palette = {
  base: "#0B0B0B",
  surface: "#141414",
  surfaceAlt: "#1E1E1E",
  foreground: "#F5F5F2",
  muted: "#747474",
  aluminium: "#B8B8B8",
  accent: "#B58A62",
  accentForeground: "#0B0B0B",
  border: "#2A2A2A",
} as const;
```

---

### Task 2: Update Theme Registry to Single ARTSER Theme

**Files:**
- Modify: `lib/themes.ts`

- [ ] **Step 1: Replace the entire contents of lib/themes.ts**

Replace the full file contents with:

```typescript
// Theme registry — consolidated to a single premium ARTSER theme.
// The multi-theme system has been replaced per the UX upgrade spec (section 29).

export type ThemeId = "artser";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  palette: [string, string, string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    id: "artser",
    name: "ARTSER",
    palette: ["#0B0B0B", "#141414", "#B58A62", "#F5F5F2"],
  },
];

export const DEFAULT_THEME: ThemeId = "artser";

export const THEME_STORAGE_KEY = "artser.theme";

export function isThemeId(value: string | null): value is ThemeId {
  return value === "artser";
}
```

---

### Task 3: Simplify ThemeProvider

**Files:**
- Modify: `components/providers/ThemeProvider.tsx`

- [ ] **Step 1: Replace the full file with a simplified single-theme provider**

```typescript
"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { ThemeId, DEFAULT_THEME } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always apply the single ARTSER theme on mount.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    window.localStorage.setItem("artser.theme", DEFAULT_THEME);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: DEFAULT_THEME }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

---

### Task 4: Replace globals.css Theme Blocks with Single ARTSER Palette

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the :root fallback palette and ALL five [data-theme] blocks (lines 13-189 approximately) with the single ARTSER palette**

Remove everything from the `:root {` block through the end of the `[data-theme="crane"] body::after` block (line 189) and replace with:

```css
:root {
  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-serif: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-arabic: "Noto Sans Arabic", "Noto Naskh Arabic", "Geeza Pro", "Segoe UI", Tahoma, sans-serif;
  --font-urdu: "Noto Nastaliq Urdu", "Noto Sans Arabic", "Geeza Pro", "Segoe UI", Tahoma, sans-serif;

  /* Fallback — matches artser theme */
  --color-background: 11 11 11;
  --color-surface: 20 20 20;
  --color-surface-alt: 30 30 30;
  --color-foreground: 245 245 242;
  --color-muted: 116 116 116;
  --color-accent: 181 138 98;
  --color-accent-foreground: 11 11 11;
  --color-border: 42 42 42;

  /* Aluminium token — used in specific components */
  --color-aluminium: 184 184 184;

  /* Glass & glow — dark premium */
  --glass-blur: 16px;
  --glass-bg: rgba(20, 20, 20, 0.6);
  --glass-border: rgba(181, 138, 98, 0.12);
  --accent-glow: rgba(181, 138, 98, 0.35);
  --neon-shadow: 0 4px 20px rgba(181, 138, 98, 0.2);

  /* Design system tokens — animation */
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 700ms;
  --duration-cinematic: 1200ms;
  --duration-cinematic-long: 1600ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* Design system tokens — shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.25);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 30px -5px rgba(181, 138, 98, 0.35);
  --shadow-glow-lg: 0 0 50px -10px rgba(181, 138, 98, 0.45);

  /* Design system tokens — radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Design system tokens — z-index */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 20;
  --z-sticky: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-toast: 60;
  --z-tooltip: 70;
}

/* ============================================
   ARTSER — Single Premium Theme
   Black + Aluminium + Glass + Concrete + Bronze
   ============================================ */
[data-theme="artser"] {
  --color-background: 11 11 11;
  --color-surface: 20 20 20;
  --color-surface-alt: 30 30 30;
  --color-foreground: 245 245 242;
  --color-muted: 116 116 116;
  --color-accent: 181 138 98;
  --color-accent-foreground: 11 11 11;
  --color-border: 42 42 42;
  --color-aluminium: 184 184 184;
  --glass-blur: 16px;
  --glass-bg: rgba(20, 20, 20, 0.6);
  --glass-border: rgba(181, 138, 98, 0.12);
  --accent-glow: rgba(181, 138, 98, 0.35);
  --neon-shadow: 0 4px 20px rgba(181, 138, 98, 0.2);
}
```

- [ ] **Step 2: Remove ALL theme-specific component overrides**

Delete the following CSS blocks entirely (they reference the old themes):
- `[data-theme="obsidian"] .card` through `[data-theme="obsidian"] body::before` (lines ~462-502)
- `[data-theme="government"] .card` through `[data-theme="government"] header` (lines ~508-521)
- `[data-theme="luxury"] .card` through `[data-theme="luxury"] header` (lines ~527-544)
- `[data-theme="architectural"] .card` through `[data-theme="architectural"] header` (lines ~550-567)
- `[data-theme="crane"] .card` through `[data-theme="crane"] header` (lines ~138-155, already removed in step 1)

Replace ALL of them with a single ARTSER override block:

```css
/* ============================================
   ARTSER THEME — Component Overrides
   ============================================ */

[data-theme="artser"] .card {
  background: rgba(20, 20, 20, 0.7);
  border-color: rgba(181, 138, 98, 0.1);
}
[data-theme="artser"] .card:hover {
  border-color: rgba(181, 138, 98, 0.35);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 40px -10px rgba(181, 138, 98, 0.2);
}

[data-theme="artser"] .btn-accent {
  box-shadow: 0 4px 20px -4px rgba(181, 138, 98, 0.4);
}
[data-theme="artser"] .btn-accent:hover {
  box-shadow:
    0 8px 35px -4px rgba(181, 138, 98, 0.5),
    0 0 20px rgba(181, 138, 98, 0.2);
}

[data-theme="artser"] header.sticky {
  background: rgba(11, 11, 11, 0.85) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(181, 138, 98, 0.12) !important;
}

[data-theme="artser"] footer {
  border-top: 1px solid rgba(181, 138, 98, 0.08);
}
```

---

### Task 5: Update Google Fonts Import for New Typography

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the Google Fonts import at line 1**

Replace:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
```

With:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
```

- [ ] **Step 2: Update heading font-family in base styles**

Replace:
```css
  h1, h2, h3, h4 {
    font-family: var(--font-serif);
    letter-spacing: -0.01em;
  }
```

With:
```css
  h1, h2, h3, h4 {
    font-family: var(--font-sans);
    letter-spacing: -0.02em;
    font-weight: 700;
  }
```

- [ ] **Step 3: Add Urdu-specific font rule below the Arabic rule**

After:
```css
  html[lang="ar"],
  html[lang="ur"] {
    font-family: var(--font-arabic);
  }
```

Replace with:
```css
  html[lang="ar"] {
    font-family: var(--font-arabic);
  }

  html[lang="ur"] {
    font-family: var(--font-urdu);
  }
```

---

### Task 6: Update tailwind.config.ts with New Tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the entire tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--color-accent-foreground) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        aluminium: "rgb(var(--color-aluminium) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
        urdu: ["var(--font-urdu)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
        "glow-lg": "var(--shadow-glow-lg)",
      },
      zIndex: {
        raised: "10",
        dropdown: "20",
        sticky: "30",
        overlay: "40",
        modal: "50",
        toast: "60",
        tooltip: "70",
      },
      transitionDuration: {
        fast: "200ms",
        normal: "400ms",
        slow: "700ms",
        cinematic: "1200ms",
        "cinematic-long": "1600ms",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      animation: {
        blink: "blink 0.8s step-end infinite",
        float: "float 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### Task 7: Create Component Directory Structure

**Files:**
- Create: `components/layout/.gitkeep`
- Create: `components/hero/.gitkeep`
- Create: `components/3d/.gitkeep`
- Create: `components/sections/.gitkeep`
- Create: `components/ui/.gitkeep`

- [ ] **Step 1: Create the new component directories**

```bash
mkdir -p "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/layout"
mkdir -p "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/hero"
mkdir -p "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/3d"
mkdir -p "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/sections"
mkdir -p "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/ui"
```

- [ ] **Step 2: Create .gitkeep files so empty dirs are tracked**

```bash
touch "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/hero/.gitkeep"
touch "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/3d/.gitkeep"
touch "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/sections/.gitkeep"
```

---

### Task 8: Create Button UI Component

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create the Button component**

```typescript
// File: components/ui/Button.tsx
"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-glow hover:shadow-glow-lg hover:translate-y-[-2px] active:translate-y-0",
  outline:
    "border-2 border-border text-foreground hover:border-accent hover:text-accent hover:shadow-glow",
  ghost:
    "text-muted hover:text-foreground hover:bg-surface-alt",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wider",
  md: "px-6 py-3 text-sm tracking-wider",
  lg: "px-8 py-4 text-sm tracking-widest",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full font-semibold uppercase transition-all duration-normal ease-spring ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

---

### Task 9: Create RevealText UI Component

**Files:**
- Create: `components/ui/RevealText.tsx`

- [ ] **Step 1: Create the RevealText component**

```typescript
// File: components/ui/RevealText.tsx
"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  /** Direction the text slides from */
  direction?: "up" | "left" | "right";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Additional class names */
  className?: string;
  /** HTML tag to render */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
}

export function RevealText({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: "translateY(30px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate(0, 0)" : transforms[direction],
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
```

---

### Task 10: Create SectionHeading UI Component

**Files:**
- Create: `components/ui/SectionHeading.tsx`

- [ ] **Step 1: Create the SectionHeading component**

```typescript
// File: components/ui/SectionHeading.tsx
"use client";

import { RevealText } from "@/components/ui/RevealText";

interface SectionHeadingProps {
  /** Small uppercase label above the heading (e.g. "SERVICES") */
  label?: string;
  /** Main heading text */
  title: string;
  /** Optional supporting paragraph */
  subtitle?: string;
  /** Alignment */
  align?: "start" | "center";
  /** Additional class names on the wrapper */
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "start",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {label && (
        <RevealText as="span" delay={0}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {label}
          </span>
        </RevealText>
      )}
      <RevealText as="h2" delay={100}>
        <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </span>
      </RevealText>
      {subtitle && (
        <RevealText as="p" delay={200}>
          <span className="max-w-2xl text-base text-muted sm:text-lg leading-relaxed">
            {subtitle}
          </span>
        </RevealText>
      )}
      <RevealText delay={250}>
        <div className="h-[2px] w-12 bg-accent" />
      </RevealText>
    </div>
  );
}
```

---

### Task 11: Create ui/index.ts Barrel Export

**Files:**
- Create: `components/ui/index.ts`

- [ ] **Step 1: Create barrel export for ui components**

```typescript
// File: components/ui/index.ts
export { Button } from "./Button";
export { RevealText } from "./RevealText";
export { SectionHeading } from "./SectionHeading";
```

---

### Task 12: Simplify Header — Remove ThemeSwitcher, Simplify Nav

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Replace the entire Header.tsx with the simplified navigation**

```typescript
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

const NAV_ITEMS = [
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/contact", key: "nav.contact" },
];

const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/manufacturing", key: "nav.manufacturing" },
  { href: "/government", key: "nav.government" },
  { href: "/clients", key: "nav.clients" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <AnimatedLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-aluminium transition-colors duration-normal hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right side: language + CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/request-quote"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-all duration-normal hover:shadow-glow hover:translate-y-[-1px]"
          >
            {t("nav.requestQuote")}
          </Link>
          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border/30 bg-background lg:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-2">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-aluminium border-b border-border/20 last:border-0 transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground"
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

### Task 13: Remove Sidebar from Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Remove the Sidebar import**

Replace:
```typescript
import { Sidebar } from "@/components/Sidebar";
```

With nothing (delete the line).

- [ ] **Step 2: Remove the Sidebar from the JSX and simplify the layout**

Replace:
```tsx
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 flex-col min-w-0">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </div>
            </div>
```

With:
```tsx
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
```

- [ ] **Step 3: Update the default data-theme on the html element**

Replace:
```tsx
    <html lang="en" dir="ltr" data-theme="crane" suppressHydrationWarning>
```

With:
```tsx
    <html lang="en" dir="ltr" data-theme="artser" suppressHydrationWarning>
```

---

### Task 14: Move LanguageSwitcher to layout/ Directory

**Files:**
- Create: `components/layout/LanguageSwitcher.tsx`
- Modify: `components/LanguageSwitcher.tsx`

- [ ] **Step 1: Copy LanguageSwitcher to the layout directory**

Copy the file `components/LanguageSwitcher.tsx` to `components/layout/LanguageSwitcher.tsx` with identical content.

```bash
cp "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/LanguageSwitcher.tsx" "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser/components/layout/LanguageSwitcher.tsx"
```

- [ ] **Step 2: Make the old LanguageSwitcher a re-export for backward compatibility**

Replace the entire contents of `components/LanguageSwitcher.tsx` with:

```typescript
// Re-export from new location for backward compatibility.
export { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
```

---

### Task 15: Add prefers-reduced-motion Support

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add reduced motion media query at the end of globals.css**

Append to the end of the file:

```css
/* ============================================
   REDUCED MOTION — Accessibility
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

  .scroll-reveal,
  .scroll-reveal-left,
  .scroll-reveal-scale {
    opacity: 1 !important;
    transform: none !important;
  }

  .stagger-children > * {
    opacity: 1 !important;
    transform: none !important;
    transition-delay: 0ms !important;
  }

  .floating {
    animation: none !important;
  }
}
```

---

### Task 16: Remove ThemeSwitcher References and Clean Up

**Files:**
- Modify: `components/ThemeSwitcher.tsx`

- [ ] **Step 1: Replace ThemeSwitcher with a no-op for backward compatibility**

Replace the entire contents of `components/ThemeSwitcher.tsx` with:

```typescript
"use client";

/**
 * ThemeSwitcher is deprecated — the ARTSER site now uses a single premium theme.
 * This empty component exists only for backward compatibility with any remaining imports.
 * It renders nothing.
 */
export function ThemeSwitcher() {
  return null;
}
```

---

### Task 17: Remove Theme Switcher Animations from globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove the theme switcher animation keyframes**

Find and delete the THEME SWITCHER ANIMATIONS section:

```css
/* ============================================
   THEME SWITCHER ANIMATIONS
   ============================================ */

@keyframes themeDropIn {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.theme-option {
  animation: themeItemSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes themeItemSlide {
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

- [ ] **Step 2: Remove the .theme-switcher and .theme-btn component classes**

Find and delete these blocks from the `@layer components` section:

```css
  /* ---- Theme Switcher ---- */
  .theme-switcher {
    display: flex;
    gap: 0.5rem;
    background: rgb(var(--color-surface-alt));
    padding: 0.3rem;
    border-radius: 50px;
    border: 1px solid var(--glass-border);
  }

  .theme-btn {
    padding: 0.5rem 1rem;
    border-radius: 50px;
    border: none;
    background: transparent;
    color: rgb(var(--color-muted));
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }

  .theme-btn.active {
    background: rgb(var(--color-accent));
    color: rgb(var(--color-accent-foreground));
    box-shadow: var(--neon-shadow);
  }
```

---

### Task 18: Verify Build Succeeds

**Files:**
- No files modified

- [ ] **Step 1: Run TypeScript type check**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npx tsc --noEmit
```

- [ ] **Step 2: Run the Next.js build to verify no errors**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npm run build
```

- [ ] **Step 3: Fix any TypeScript or build errors found in steps 1-2**

Common issues to watch for:
- Any component still importing `setTheme` from `useTheme()` (the simplified provider no longer exposes it)
- Any component referencing `ThemeId` types that are no longer valid (e.g. checking for `"obsidian"` or `"crane"`)
- Any file importing from `@/components/ThemeSwitcher` that expects the old interface

Search for all references:
```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && grep -rn "setTheme\|useTheme" --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".next"
```

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && grep -rn '"obsidian"\|"government"\|"luxury"\|"architectural"\|"crane"' --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".next"
```

For each file found that uses `setTheme` or references old theme IDs, update accordingly (remove the setTheme destructuring, replace old theme IDs with "artser").

- [ ] **Step 4: Commit all Phase 1 changes**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && git add -A && git commit -m "feat: Phase 1 UX/UI Foundation — single ARTSER theme, design tokens, simplified nav

- Replace 5-theme system with single premium ARTSER palette (graphite + bronze)
- Add design system tokens (spacing, radius, shadows, z-index, animation)
- Add Noto Sans Arabic and Noto Nastaliq Urdu fonts
- Create component directory structure (layout/, hero/, 3d/, sections/, ui/)
- Create Button, RevealText, SectionHeading UI components
- Simplify Header: remove ThemeSwitcher, streamline nav items
- Remove Sidebar from layout
- Add prefers-reduced-motion accessibility support
- Remove all old theme-specific CSS overrides

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

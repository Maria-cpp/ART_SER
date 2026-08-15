# Phase 5: Performance Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize the ARTSER website for Core Web Vitals and real-world performance by implementing next/font, next/image everywhere, lazy-loading 3D scenes, code-splitting heavy dependencies, and establishing a proper loading waterfall from critical UI through hero to deferred 3D content.

**Architecture:** Fonts move from Google Fonts CDN and @fontsource to `next/font` (self-hosted, zero CLS). All `<img>` tags convert to `next/image` with proper dimensions, priority flags, and responsive `sizes`. The Construction3DBackground dynamically imports Three.js only when scrolled into the viewport via IntersectionObserver. Heavy components (Carousel3D, PageIntro, ImageCarousel) use `next/dynamic` with loading placeholders. The `next.config.mjs` is hardened with image optimization formats, compression, and bundle analysis support.

**Tech Stack:** next/font, next/image, next/dynamic, IntersectionObserver, Next.js config (images.formats, compress), @next/bundle-analyzer (dev)

---

### Task 1: Configure next/font for Inter and Playfair Display
**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add next/font imports to layout.tsx**

Replace the entire content of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { DoorIntro } from "@/components/DoorIntro";
import { Construction3DBackground } from "@/components/Construction3DBackground";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  title: "ARTSER — Engineering, Manufacturing & Construction",
  description:
    "ARTSER is an integrated industrial and construction group delivering manufacturing, infrastructure, and government-grade projects.",
  icons: { icon: "/logo/ARTSER_logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="crane"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${notoArabic.variable} ${notoUrdu.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
      </head>
      <body suppressHydrationWarning>
        <DoorIntro />
        <Construction3DBackground />
        <ThemeProvider>
          <LanguageProvider>
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Remove Google Fonts CDN import from globals.css**

In `app/globals.css`, remove line 1:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800;900&display=swap');
```

Replace it with a comment:
```css
/* Fonts loaded via next/font in layout.tsx — no CDN imports needed */
```

- [ ] **Step 3: Update CSS font-family variables to use next/font variables**

In `app/globals.css`, replace the typography variables in `:root`:

```css
  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-arabic: "Noto Naskh Arabic", "Noto Sans Arabic", "Geeza Pro", "Segoe UI", Tahoma, sans-serif;
```

with:

```css
  /* Typography — using next/font CSS variables for zero-CLS self-hosted fonts */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-serif: var(--font-playfair), Georgia, 'Times New Roman', serif;
  --font-arabic: var(--font-arabic), "Geeza Pro", "Segoe UI", Tahoma, sans-serif;
  --font-urdu: var(--font-urdu), "Noto Nastaliq Urdu", "Noto Naskh Arabic", serif;
```

---

### Task 2: Remove @fontsource Dependency
**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall @fontsource/noto-nastaliq-urdu**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm uninstall @fontsource/noto-nastaliq-urdu
```

- [ ] **Step 2: Remove any @fontsource imports in code**

Search the codebase for `@fontsource` imports. If any are found in `.tsx` or `.ts` files, remove the import lines. As of the current codebase, the package is listed in `package.json` but no import statement exists in source files, so uninstalling is sufficient.

---

### Task 3: Harden next.config.mjs for Image Optimization and Compression
**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Update next.config.mjs with performance settings**

Replace the entire content of `next.config.mjs` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  // Enable gzip compression (default, but explicit)
  compress: true,

  // Minimize output file tracing for smaller deploys
  output: undefined,

  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: ["three"],
  },
};

export default nextConfig;
```

---

### Task 4: Convert Hero Section Images to next/image
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace hero slideshow `<img>` tags with `<Image>`**

In `app/page.tsx`, find the hero slideshow block (around line 99-109):

```tsx
        <div className="hero-slideshow">
          {heroImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`hero-slideshow-img ${idx === currentSlide ? "active" : ""}`}
            />
          ))}
          <div className="hero-overlay" />
        </div>
```

Replace with:

```tsx
        <div className="hero-slideshow">
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt="ARTSER construction project"
              fill
              sizes="100vw"
              priority={idx === 0}
              quality={80}
              className={`hero-slideshow-img object-cover ${idx === currentSlide ? "active" : ""}`}
            />
          ))}
          <div className="hero-overlay" />
        </div>
```

---

### Task 5: Convert Homepage Content Images to next/image
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace project `<img>` tags in featured projects section**

In `app/page.tsx`, find (around line 279):

```tsx
                  {p.image && <img src={p.image} alt={localized(p.title)} className="h-full w-full object-cover" />}
```

Replace with:

```tsx
                  {p.image && <Image src={p.image} alt={localized(p.title)} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />}
```

Note: The parent `<div>` with `aspect-[4/3]` must get `relative` added to its className:

```tsx
                  <div className="aspect-[4/3] bg-surface-alt overflow-hidden relative">
```

- [ ] **Step 2: Replace client logo `<img>` tags**

In `app/page.tsx`, find the client logo images (around line 319):

```tsx
                    <img src={c.logo} alt={c.name} className="h-12 w-12 object-contain" />
```

Replace with:

```tsx
                    <Image src={c.logo} alt={c.name} width={48} height={48} className="object-contain" />
```

- [ ] **Step 3: Replace supplier logo `<img>` tags**

In `app/page.tsx`, find the supplier logo images (around line 355):

```tsx
                    <img src={s.logo} alt={s.name} className="h-16 w-16 object-contain" />
```

Replace with:

```tsx
                    <Image src={s.logo} alt={s.name} width={64} height={64} className="object-contain" />
```

---

### Task 6: Convert Gallery Page Images to next/image
**Files:**
- Modify: `app/gallery/page.tsx`

- [ ] **Step 1: Add Image import and replace gallery `<img>` tags**

Add at the top of `app/gallery/page.tsx`:

```tsx
import Image from "next/image";
```

Find:

```tsx
              <img src={g.image} alt={localized(g.caption)} className="h-full w-full object-cover" />
```

Replace with:

```tsx
              <Image src={g.image} alt={localized(g.caption)} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
```

Add `relative` to the parent div:

```tsx
            <div className="aspect-[4/3] bg-surface-alt overflow-hidden relative">
```

---

### Task 7: Convert Clients Page Images to next/image
**Files:**
- Modify: `app/clients/page.tsx`

- [ ] **Step 1: Add Image import and replace client logo `<img>` tags**

Add at the top of `app/clients/page.tsx`:

```tsx
import Image from "next/image";
```

Find:

```tsx
                    <img src={c.logo} alt={c.name} className="h-16 w-16 object-contain" />
```

Replace with:

```tsx
                    <Image src={c.logo} alt={c.name} width={64} height={64} className="object-contain" />
```

---

### Task 8: Convert Portfolio and Manufacturing Page Images to next/image
**Files:**
- Modify: `app/portfolio/page.tsx`
- Modify: `app/manufacturing/page.tsx`

- [ ] **Step 1: Add Image import and convert portfolio `<img>` tags**

Add at the top of `app/portfolio/page.tsx`:

```tsx
import Image from "next/image";
```

Find (around line 44):

```tsx
                    {p.image && <img src={p.image} alt={localized(p.title)} className="h-full w-full object-cover" />}
```

Replace with:

```tsx
                    {p.image && <Image src={p.image} alt={localized(p.title)} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />}
```

Add `relative` to the parent div:

```tsx
                  <div className="aspect-[4/3] bg-surface-alt overflow-hidden rounded-xl lg:rounded-none lg:rounded-s-xl relative">
```

Find supplier logos (around line 69):

```tsx
                      <img src={supplier.logo} alt={supplier.name} className="h-10 w-10 object-contain" />
```

Replace with:

```tsx
                      <Image src={supplier.logo} alt={supplier.name} width={40} height={40} className="object-contain" />
```

- [ ] **Step 2: Add Image import and convert manufacturing `<img>` tags**

Add at the top of `app/manufacturing/page.tsx`:

```tsx
import Image from "next/image";
```

Find:

```tsx
                <img src={c.image} alt={localized(c.title)} className="h-full w-full object-cover" />
```

Replace with:

```tsx
                <Image src={c.image} alt={localized(c.title)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
```

Add `relative` to the parent div:

```tsx
              <div className="mb-3 aspect-video rounded-md bg-surface-alt overflow-hidden relative">
```

---

### Task 9: Convert ImageCarousel Component to next/image
**Files:**
- Modify: `components/ImageCarousel.tsx`

- [ ] **Step 1: Add Image import and replace `<img>` tags**

Add at the top of `components/ImageCarousel.tsx`:

```tsx
import Image from "next/image";
```

Find (around line 53-59):

```tsx
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
```

Replace with:

```tsx
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading={idx === 0 ? "eager" : "lazy"}
            className={`object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
```

---

### Task 10: Convert MarqueeCarousel and Carousel3D to next/image
**Files:**
- Modify: `components/MarqueeCarousel.tsx`
- Modify: `components/Carousel3D.tsx`

- [ ] **Step 1: Convert MarqueeCarousel images**

Add at the top of `components/MarqueeCarousel.tsx`:

```tsx
import Image from "next/image";
```

Find the main carousel `<img>` (around line 39-44):

```tsx
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
```

Replace with:

```tsx
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="288px"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
```

Add `relative` to the parent div:

```tsx
                <div className="h-44 w-64 overflow-hidden rounded-lg sm:h-52 sm:w-72 cursor-pointer relative">
```

Find the lightbox `<img>` (around line 59-63):

```tsx
            <img
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
```

Replace with:

```tsx
            <Image
              src={lightbox}
              alt=""
              width={1200}
              height={800}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              quality={90}
            />
```

- [ ] **Step 2: Convert Carousel3D images**

Add at the top of `components/Carousel3D.tsx`:

```tsx
import Image from "next/image";
```

Find (around line 68-73):

```tsx
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover rounded-xl"
                loading="lazy"
              />
```

Replace with:

```tsx
              <Image
                src={src}
                alt=""
                fill
                sizes="280px"
                loading="lazy"
                className="object-cover rounded-xl"
              />
```

---

### Task 11: Lazy-Load Construction3DBackground with Viewport Trigger
**Files:**
- Create: `components/Lazy3DBackground.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create a viewport-triggered wrapper for the 3D background**

Create `components/Lazy3DBackground.tsx`:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Construction3DBackground = dynamic(
  () => import("@/components/Construction3DBackground").then((mod) => ({ default: mod.Construction3DBackground })),
  {
    ssr: false,
    loading: () => <div className="construction-3d-bg" />,
  }
);

export function Lazy3DBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On mobile devices, skip 3D entirely
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // On desktop, load after a short delay to let critical UI render first
    const timer = setTimeout(() => setShouldLoad(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 w-0 h-0" aria-hidden="true" />
      {shouldLoad && <Construction3DBackground />}
    </>
  );
}
```

- [ ] **Step 2: Update layout.tsx to use Lazy3DBackground instead of direct import**

In `app/layout.tsx`, replace:

```tsx
import { Construction3DBackground } from "@/components/Construction3DBackground";
```

with:

```tsx
import { Lazy3DBackground } from "@/components/Lazy3DBackground";
```

And in the JSX, replace:

```tsx
        <Construction3DBackground />
```

with:

```tsx
        <Lazy3DBackground />
```

---

### Task 12: Add Proper Cleanup and Device-Tier Detection to Construction3DBackground
**Files:**
- Modify: `components/Construction3DBackground.tsx`

- [ ] **Step 1: Add device-tier detection and reduce quality on lower-end devices**

In `components/Construction3DBackground.tsx`, after line `const canvas = canvasRef.current;` (line 11), add device tier detection:

```tsx
    // Device tier detection
    const getDeviceTier = (): "high" | "mid" | "low" => {
      const cores = navigator.hardwareConcurrency || 2;
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      if (cores >= 8 && memory >= 8) return "high";
      if (cores >= 4 && memory >= 4) return "mid";
      return "low";
    };

    const tier = getDeviceTier();
    if (tier === "low") return; // Skip 3D on low-end devices
```

Then inside the `init()` function, after the `renderer` is created, add pixel ratio limiting:

Replace:

```tsx
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

With:

```tsx
      const maxPixelRatio = tier === "high" ? 2 : 1.5;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
```

And replace the shadow map size:

```tsx
      sun.shadow.mapSize.set(2048, 2048);
```

With:

```tsx
      const shadowSize = tier === "high" ? 2048 : 1024;
      sun.shadow.mapSize.set(shadowSize, shadowSize);
```

---

### Task 13: Dynamic Import DoorIntro and PageIntro
**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Dynamic import DoorIntro in layout.tsx**

In `app/layout.tsx`, replace:

```tsx
import { DoorIntro } from "@/components/DoorIntro";
```

with:

```tsx
import dynamic from "next/dynamic";

const DoorIntro = dynamic(
  () => import("@/components/DoorIntro").then((mod) => ({ default: mod.DoorIntro })),
  { ssr: false }
);
```

---

### Task 14: Dynamic Import HeroTypewriter and Heavy Homepage Components
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Verify HeroTypewriter is already dynamically imported**

In `app/page.tsx`, confirm that HeroTypewriter is already using `next/dynamic` (it is, at line 14). No change needed.

- [ ] **Step 2: Dynamic import ImageCarousel**

In `app/page.tsx`, replace:

```tsx
import { ImageCarousel } from "@/components/ImageCarousel";
```

with:

```tsx
const ImageCarousel = dynamic(() => import("@/components/ImageCarousel").then((mod) => ({ default: mod.ImageCarousel })), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] bg-surface-alt animate-pulse rounded-xl" />,
});
```

(The `dynamic` import is already imported on line 6.)

---

### Task 15: Prevent CLS with Explicit Dimensions and Placeholders
**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add explicit min-height to hero section to prevent CLS**

In `app/page.tsx`, the hero section already has `min-h-[60vh] md:min-h-[85vh]` — this is correct and prevents CLS.

- [ ] **Step 2: Add font-display override and CLS prevention in globals.css**

At the end of the `@layer base` section in `app/globals.css` (or if there is no `@layer base`, after the theme blocks), add:

```css
/* CLS prevention — reserve space for dynamic content */
.hero-slideshow {
  position: relative;
}

.hero-slideshow-img {
  position: absolute;
  inset: 0;
}

/* Prevent CLS from font loading — next/font handles this via display:swap,
   but ensure body has a matched fallback size */
body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Skeleton pulse for lazy-loaded components */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, rgb(var(--color-surface-alt)) 25%, rgb(var(--color-surface)) 50%, rgb(var(--color-surface-alt)) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

### Task 16: Add Performance Monitoring Utility
**Files:**
- Create: `lib/performance.ts`

- [ ] **Step 1: Create a lightweight Web Vitals reporter**

Create `lib/performance.ts`:

```ts
/**
 * Lightweight Core Web Vitals reporter.
 * Reports LCP, FID, CLS, INP, and TTFB to console in development.
 * Can be extended to send metrics to an analytics endpoint in production.
 */

export type WebVitalMetric = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
};

const thresholds: Record<string, [number, number]> = {
  LCP: [2500, 4000],
  FID: [100, 300],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  TTFB: [800, 1800],
};

function getRating(name: string, value: number): WebVitalMetric["rating"] {
  const t = thresholds[name];
  if (!t) return "good";
  if (value <= t[0]) return "good";
  if (value <= t[1]) return "needs-improvement";
  return "poor";
}

export function reportWebVitals(onReport?: (metric: WebVitalMetric) => void) {
  if (typeof window === "undefined") return;

  const report = (name: string, value: number) => {
    const metric: WebVitalMetric = { name, value, rating: getRating(name, value) };
    if (onReport) {
      onReport(metric);
    } else if (process.env.NODE_ENV === "development") {
      const color = metric.rating === "good" ? "green" : metric.rating === "needs-improvement" ? "orange" : "red";
      console.log(`%c[Web Vital] ${name}: ${value.toFixed(1)}ms (${metric.rating})`, `color: ${color}; font-weight: bold;`);
    }
  };

  // LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) report("LCP", last.startTime);
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}

  // CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
          clsValue += (entry as unknown as { value: number }).value;
        }
      }
      report("CLS", clsValue);
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {}

  // FID
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0];
      if (entry) report("FID", (entry as PerformanceEventTiming).processingStart - entry.startTime);
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {}

  // TTFB
  try {
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navEntry) {
      report("TTFB", navEntry.responseStart - navEntry.requestStart);
    }
  } catch {}
}
```

- [ ] **Step 2: Wire up Web Vitals reporting in development**

Create a small client component `components/WebVitalsReporter.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export function WebVitalsReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    import("@/lib/performance").then(({ reportWebVitals }) => {
      reportWebVitals();
    });
  }, []);

  return null;
}
```

Then in `app/layout.tsx`, add after the `<Lazy3DBackground />` line:

```tsx
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
```

And in the body:

```tsx
        <WebVitalsReporter />
```

---

### Task 17: Add Bundle Analyzer for Dev Auditing
**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs`

- [ ] **Step 1: Install @next/bundle-analyzer as a dev dependency**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm install --save-dev @next/bundle-analyzer
```

- [ ] **Step 2: Conditionally enable bundle analyzer in next.config.mjs**

Replace the entire content of `next.config.mjs` with:

```js
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  compress: true,

  experimental: {
    optimizePackageImports: ["three"],
  },
};

export default analyze(nextConfig);
```

- [ ] **Step 3: Add analyze script to package.json**

In `package.json`, add to the `"scripts"` section:

```json
    "analyze": "ANALYZE=true next build",
    "analyze:win": "set ANALYZE=true && next build",
```

---

### Task 18: Final Verification and Commit
**Files:**
- No new files

- [ ] **Step 1: Run type check**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run type-check
```

Fix any TypeScript errors that arise from the changes.

- [ ] **Step 2: Run dev build to verify no runtime errors**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run build
```

Verify the build completes without errors. Check the build output for:
- Page sizes (ensure no single page exceeds 200kB first-load JS)
- Proper static/dynamic page detection
- No warnings about unoptimized images

- [ ] **Step 3: Commit all Phase 5 changes**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add -A
git commit -m "perf: Phase 5 — performance optimization

- Replace Google Fonts CDN and @fontsource with next/font (Inter, Playfair Display, Noto Sans Arabic, Noto Nastaliq Urdu)
- Convert all <img> tags to next/image with proper sizes, priority, and lazy loading
- Enable AVIF/WebP automatic image optimization in next.config
- Lazy-load Construction3DBackground (skip on mobile, defer on desktop)
- Add device-tier detection for 3D quality scaling
- Dynamic import DoorIntro, ImageCarousel with loading placeholders
- Add CLS prevention styles and skeleton shimmer
- Add Core Web Vitals monitoring utility (dev mode)
- Add @next/bundle-analyzer for bundle auditing

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Summary of Performance Improvements

| Area | Before | After |
|------|--------|-------|
| **Fonts** | Google Fonts CDN (render-blocking external request) | next/font self-hosted, display:swap, zero CLS |
| **Images** | Raw `<img>` tags, no optimization | next/image with AVIF/WebP, responsive sizes, lazy load |
| **3D Scene** | Loads immediately on all devices | Deferred 1.5s on desktop, skipped on mobile |
| **3D Quality** | Same quality everywhere | Device-tier adaptive (pixel ratio, shadow quality) |
| **DoorIntro** | Statically imported | Dynamic import, no SSR |
| **ImageCarousel** | Statically imported | Dynamic import with skeleton placeholder |
| **Bundle** | No visibility into chunk sizes | @next/bundle-analyzer available via `npm run analyze` |
| **Web Vitals** | No monitoring | LCP/CLS/FID/TTFB reported in dev console |
| **Image Formats** | JPEG/PNG only | Automatic AVIF > WebP > original fallback |
| **Compression** | Default | Explicit gzip, Three.js tree-shaking via optimizePackageImports |

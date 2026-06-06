# 3D Effects & Crane Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a construction orange theme with crane decorations, a full-screen sliding door intro animation, a 3D rotating carousel for product pages, and 6 unique page-load animations for each product category.

**Architecture:** Pure CSS transforms + React state — zero external dependencies. All animations use CSS `perspective`, `rotateY`, `translateZ`, and `@keyframes`. Theme colors flow through existing CSS variable system. SessionStorage prevents animation replays within a session.

**Tech Stack:** Next.js 15, React 19, TypeScript, TailwindCSS 3, CSS 3D transforms

---

## File Structure

### New Files

| File | Responsibility |
|---|---|
| `components/DoorIntro.tsx` | Full-screen sliding door intro overlay for home page |
| `components/Carousel3D.tsx` | 3D rotating carousel component (replaces MarqueeCarousel on product pages) |
| `components/PageIntro.tsx` | Shared wrapper for page-specific intro animations |
| `components/page-intros/WindowsIntro.tsx` | Windows page: glass panes swing open |
| `components/page-intros/DoorsIntro.tsx` | Doors page: double doors slide apart |
| `components/page-intros/SlidingFoldingIntro.tsx` | Sliding & folding page: accordion-fold panels |
| `components/page-intros/FacadesIntro.tsx` | Facades page: grid panels drop into place |
| `components/page-intros/ConservatoriesIntro.tsx` | Conservatories page: glass frame assembles from corners |
| `components/page-intros/SmartBuildingsIntro.tsx` | Smart buildings page: buildings rise from bottom |

### Modified Files

| File | Change |
|---|---|
| `lib/themes.ts` | Add `"crane"` to ThemeId, add THEMES entry |
| `app/globals.css` | Add crane theme block, door intro keyframes, 3D carousel styles, page intro keyframes |
| `app/layout.tsx` | Import and render `DoorIntro` |
| `app/products/[category]/page.tsx` | Replace `MarqueeCarousel` with `Carousel3D`, wrap with `PageIntro` |

---

## Task 1: Add Crane Theme to Theme Registry

**Files:**
- Modify: `lib/themes.ts:4` (ThemeId type), `lib/themes.ts:14-35` (THEMES array)

- [ ] **Step 1: Update ThemeId type**

In `lib/themes.ts`, change line 4 from:
```typescript
export type ThemeId = "obsidian" | "government" | "luxury" | "architectural";
```
to:
```typescript
export type ThemeId = "obsidian" | "government" | "luxury" | "architectural" | "crane";
```

- [ ] **Step 2: Add crane entry to THEMES array**

In `lib/themes.ts`, add after the `architectural` entry (before the closing `];` on line 35):
```typescript
  {
    id: "crane",
    name: "Construction",
    palette: ["#fafafa", "#ffffff", "#E8651A", "#1a1a1a"],
  },
```

- [ ] **Step 3: Verify the theme switcher picks it up**

Run: `npm run dev`
Open http://localhost:3000, click the theme switcher. "Construction" should appear as a 5th option. Selecting it won't have visual effect yet (CSS variables defined in next task).

- [ ] **Step 4: Commit**

```bash
git add lib/themes.ts
git commit -m "feat: add crane (Construction) theme to theme registry"
```

---

## Task 2: Add Crane Theme CSS Variables & Decorations

**Files:**
- Modify: `app/globals.css` (add after the architectural theme block, around line 115)

- [ ] **Step 1: Add `[data-theme="crane"]` CSS variable block**

In `app/globals.css`, add after the `[data-theme="architectural"]` block (after line 115):

```css
/* ============================================
   THEME 5 — Construction Crane
   Clean white, construction orange, warm accents
   ============================================ */
[data-theme="crane"] {
  --color-background: 250 250 250;
  --color-surface: 255 255 255;
  --color-surface-alt: 245 240 235;
  --color-foreground: 26 26 26;
  --color-muted: 122 112 103;
  --color-accent: 232 101 26;
  --color-accent-foreground: 255 255 255;
  --color-border: 224 214 204;
  --glass-blur: 14px;
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(232, 101, 26, 0.18);
  --accent-glow: rgba(232, 101, 26, 0.25);
  --neon-shadow: 0 4px 18px rgba(232, 101, 26, 0.18);
}
```

- [ ] **Step 2: Add crane theme-specific overrides**

Add immediately after the variable block:

```css
/* Crane theme — component overrides */
[data-theme="crane"] .card {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(232, 101, 26, 0.12);
}
[data-theme="crane"] .card:hover {
  border-color: rgba(232, 101, 26, 0.4);
  box-shadow:
    0 20px 40px rgba(26, 26, 26, 0.06),
    0 0 30px -10px rgba(232, 101, 26, 0.2);
}

[data-theme="crane"] .btn-accent {
  box-shadow: 0 4px 18px -4px rgba(232, 101, 26, 0.4);
}

[data-theme="crane"] header {
  border-bottom-color: rgba(232, 101, 26, 0.15) !important;
}

/* Crane silhouette decoration */
[data-theme="crane"] body::before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 500px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' fill='%23E8651A'%3E%3Crect x='190' y='80' width='20' height='420'/%3E%3Crect x='50' y='60' width='300' height='20'/%3E%3Crect x='50' y='60' width='8' height='40'/%3E%3Cpolygon points='200,80 210,80 350,60 350,80'/%3E%3Cpolygon points='190,80 200,80 50,60 50,80'/%3E%3Crect x='180' y='400' width='40' height='100'/%3E%3Crect x='160' y='480' width='80' height='20'/%3E%3Crect x='345' y='60' width='6' height='60'/%3E%3Crect x='330' y='120' width='36' height='8'/%3E%3Cline x1='200' y1='80' x2='348' y2='60' stroke='%23E8651A' stroke-width='3'/%3E%3Cline x1='200' y1='80' x2='53' y2='60' stroke='%23E8651A' stroke-width='3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}

[data-theme="crane"] body::after {
  content: "";
  position: fixed;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 400px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' fill='%23E8651A'%3E%3Crect x='140' y='50' width='18' height='350'/%3E%3Crect x='30' y='35' width='240' height='16'/%3E%3Cpolygon points='149,50 158,50 270,35 270,51'/%3E%3Cpolygon points='140,50 149,50 30,35 30,51'/%3E%3Crect x='130' y='330' width='38' height='70'/%3E%3Crect x='115' y='385' width='68' height='15'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: contain;
  transform: scaleX(-1);
}
```

- [ ] **Step 3: Verify the crane theme visually**

Run: `npm run dev`
Select "Construction" in the theme switcher. Verify:
- Orange accent color on buttons, links, card borders
- White/light background
- Subtle crane silhouettes in top-right and bottom-left corners
- Cards, buttons, header all styled consistently

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add crane theme CSS variables, overrides, and crane decorations"
```

---

## Task 3: Build Full-Screen Door Intro Component

**Files:**
- Create: `components/DoorIntro.tsx`

- [ ] **Step 1: Create the DoorIntro component**

Create `components/DoorIntro.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SESSION_KEY = "artser.doorIntroPlayed";

export function DoorIntro() {
  const [show, setShow] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
    // Small delay before animation starts so the doors are visible first
    const startTimer = setTimeout(() => setAnimating(true), 600);
    // Remove overlay after animation completes
    const endTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2600);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Left door */}
      <div
        className={`door-intro-panel door-intro-left flex-1 flex items-center justify-end ${
          animating ? "door-intro-open-left" : ""
        }`}
      >
        {/* Vertical panel lines */}
        <div className="absolute inset-y-0 end-[30%] w-px bg-foreground/5" />
        <div className="absolute inset-y-0 end-[60%] w-px bg-foreground/5" />
      </div>

      {/* Right door */}
      <div
        className={`door-intro-panel door-intro-right flex-1 flex items-center justify-start ${
          animating ? "door-intro-open-right" : ""
        }`}
      >
        {/* Vertical panel lines */}
        <div className="absolute inset-y-0 start-[30%] w-px bg-foreground/5" />
        <div className="absolute inset-y-0 start-[60%] w-px bg-foreground/5" />
      </div>

      {/* Center logo */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/logo/ART_SER_logo.png"
          alt="ARTSER"
          width={200}
          height={72}
          priority
          className="h-auto w-auto max-h-16"
        />
      </div>

      {/* Center shadow line */}
      <div
        className={`absolute inset-y-0 left-1/2 z-[5] w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/20 to-transparent transition-opacity duration-300 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
```

- [ ] **Step 2: Add door intro CSS keyframes to globals.css**

In `app/globals.css`, add before the `/* ============================================ RESPONSIVE STYLES` section (before line 795):

```css
/* ============================================
   DOOR INTRO ANIMATION
   ============================================ */

.door-intro-panel {
  position: relative;
  background: rgb(var(--color-surface));
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  will-change: transform;
}

.door-intro-open-left {
  animation: doorSlideLeft 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.door-intro-open-right {
  animation: doorSlideRight 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes doorSlideLeft {
  0% {
    transform: perspective(1200px) translateX(0) rotateY(0deg);
  }
  100% {
    transform: perspective(1200px) translateX(-105%) rotateY(25deg);
  }
}

@keyframes doorSlideRight {
  0% {
    transform: perspective(1200px) translateX(0) rotateY(0deg);
  }
  100% {
    transform: perspective(1200px) translateX(105%) rotateY(-25deg);
  }
}

/* Reduced motion: skip 3D, just fade */
@media (prefers-reduced-motion: reduce) {
  .door-intro-open-left,
  .door-intro-open-right {
    animation: doorFadeOut 0.5s ease forwards;
  }

  @keyframes doorFadeOut {
    to { opacity: 0; }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/DoorIntro.tsx app/globals.css
git commit -m "feat: add full-screen door intro component and animation CSS"
```

---

## Task 4: Wire DoorIntro into Root Layout

**Files:**
- Modify: `app/layout.tsx:1-37`

- [ ] **Step 1: Import DoorIntro and add it to layout**

In `app/layout.tsx`, add the import after line 6:
```typescript
import { DoorIntro } from "@/components/DoorIntro";
```

Then inside the `<body>` tag, add `<DoorIntro />` as the first child (before `<ThemeProvider>`). The updated body becomes:

```tsx
      <body suppressHydrationWarning>
        <DoorIntro />
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
```

Note: `DoorIntro` is placed outside `ThemeProvider` to render on top of everything. It uses CSS variables directly which are already set via `data-theme` on `<html>`.

- [ ] **Step 2: Verify door intro plays on site load**

Run: `npm run dev`
Open http://localhost:3000 in a new incognito/private window. Verify:
- Two door panels appear covering the full screen with ARTSER logo centered
- After ~0.5s, doors slide apart with 3D perspective
- Homepage reveals beneath
- Refresh the page — intro should NOT replay (sessionStorage)
- Close incognito and reopen — intro plays again

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire DoorIntro into root layout"
```

---

## Task 5: Build 3D Carousel Component

**Files:**
- Create: `components/Carousel3D.tsx`

- [ ] **Step 1: Create the Carousel3D component**

Create `components/Carousel3D.tsx`:

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Carousel3DProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel3D({ images, autoPlay = true, interval = 4000 }: Carousel3DProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const count = images.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + count) % count), [count]);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const isRtl = document.documentElement.dir === "rtl";
    if (Math.abs(diff) > 50) {
      if ((diff > 0 && !isRtl) || (diff < 0 && isRtl)) next();
      else prev();
    }
  };

  if (count === 0) return null;

  const angle = 360 / count;
  // Radius calculated to fit cards nicely
  const radius = count <= 3 ? 220 : count <= 5 ? 280 : 320;

  return (
    <>
      <div
        className="carousel-3d-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-3d-track"
          style={{
            transform: `rotateY(${-current * angle}deg)`,
          }}
        >
          {images.map((src, idx) => {
            const isActive = idx === current;
            return (
              <div
                key={src}
                className={`carousel-3d-item ${isActive ? "carousel-3d-item-active" : ""}`}
                style={{
                  transform: `rotateY(${idx * angle}deg) translateZ(${radius}px)`,
                }}
                onClick={() => setLightbox(src)}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Nav buttons */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              className="carousel-3d-btn carousel-3d-btn-start"
              aria-label="Previous"
            >
              <svg className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="carousel-3d-btn carousel-3d-btn-end"
              aria-label="Next"
            >
              <svg className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="carousel-3d-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`carousel-3d-dot ${idx === current ? "carousel-3d-dot-active" : ""}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Add 3D carousel CSS to globals.css**

In `app/globals.css`, add after the door intro CSS (before the responsive styles section):

```css
/* ============================================
   3D CAROUSEL
   ============================================ */

.carousel-3d-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  perspective: 1000px;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .carousel-3d-wrapper {
    height: 360px;
  }
}

.carousel-3d-track {
  position: relative;
  width: 240px;
  height: 180px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 640px) {
  .carousel-3d-track {
    width: 320px;
    height: 220px;
  }
}

.carousel-3d-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.5;
  transform-origin: center;
  transition: opacity 0.6s ease, box-shadow 0.4s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.carousel-3d-item-active {
  opacity: 1;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 0 20px -5px var(--accent-glow);
}

.carousel-3d-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid rgb(var(--color-border));
  background: rgb(var(--color-surface));
  color: rgb(var(--color-foreground));
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-3d-btn:hover {
  border-color: rgb(var(--color-accent));
  color: rgb(var(--color-accent));
  box-shadow: 0 0 15px -3px var(--accent-glow);
}

.carousel-3d-btn-start {
  inset-inline-start: 0.5rem;
}

.carousel-3d-btn-end {
  inset-inline-end: 0.5rem;
}

.carousel-3d-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-3d-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: none;
  background: rgb(var(--color-muted) / 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-3d-dot-active {
  background: rgb(var(--color-accent));
  width: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 8px var(--accent-glow);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .carousel-3d-track {
    transition-duration: 0.1s;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Carousel3D.tsx app/globals.css
git commit -m "feat: add 3D rotating carousel component and CSS"
```

---

## Task 6: Build PageIntro Wrapper Component

**Files:**
- Create: `components/PageIntro.tsx`

- [ ] **Step 1: Create the PageIntro component**

Create `components/PageIntro.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

export type PageIntroVariant =
  | "windows"
  | "doors"
  | "sliding-folding"
  | "facades"
  | "conservatories"
  | "smart-buildings";

interface PageIntroProps {
  variant: PageIntroVariant;
  children: React.ReactNode;
}

const SESSION_PREFIX = "artser.pageIntro.";

export function PageIntro({ variant, children }: PageIntroProps) {
  const [show, setShow] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const key = SESSION_PREFIX + variant;
    if (sessionStorage.getItem(key)) return;
    setShow(true);
    const startTimer = setTimeout(() => setAnimating(true), 400);
    const endTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(key, "1");
    }, 2400);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [variant]);

  return (
    <>
      {show && (
        <div className={`page-intro-overlay ${animating ? "page-intro-animating" : ""}`}>
          <PageIntroContent variant={variant} animating={animating} />
        </div>
      )}
      {children}
    </>
  );
}

function PageIntroContent({ variant, animating }: { variant: PageIntroVariant; animating: boolean }) {
  switch (variant) {
    case "windows":
      return <WindowsIntroContent animating={animating} />;
    case "doors":
      return <DoorsIntroContent animating={animating} />;
    case "sliding-folding":
      return <SlidingFoldingIntroContent animating={animating} />;
    case "facades":
      return <FacadesIntroContent animating={animating} />;
    case "conservatories":
      return <ConservatoriesIntroContent animating={animating} />;
    case "smart-buildings":
      return <SmartBuildingsIntroContent animating={animating} />;
  }
}

/* ---- Windows: glass panes swing open ---- */
function WindowsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      {/* Window frame */}
      <div className="pi-window-frame">
        {/* Left pane */}
        <div className={`pi-window-pane pi-window-pane-left ${animating ? "pi-window-open-left" : ""}`}>
          <div className="pi-window-glass" />
          <div className="pi-window-handle-left" />
        </div>
        {/* Right pane */}
        <div className={`pi-window-pane pi-window-pane-right ${animating ? "pi-window-open-right" : ""}`}>
          <div className="pi-window-glass" />
          <div className="pi-window-handle-right" />
        </div>
        {/* Center bar */}
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-foreground/20" />
      </div>
    </div>
  );
}

/* ---- Doors: double doors slide apart ---- */
function DoorsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-doors-frame">
        <div className={`pi-door-panel pi-door-left ${animating ? "pi-door-open-left" : ""}`}>
          <div className="pi-door-inset" />
          <div className="pi-door-handle-left" />
        </div>
        <div className={`pi-door-panel pi-door-right ${animating ? "pi-door-open-right" : ""}`}>
          <div className="pi-door-inset" />
          <div className="pi-door-handle-right" />
        </div>
      </div>
    </div>
  );
}

/* ---- Sliding & Folding: accordion panels ---- */
function SlidingFoldingIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-accordion-frame">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`pi-accordion-panel ${animating ? "pi-accordion-fold" : ""}`}
            style={{ animationDelay: animating ? `${i * 120}ms` : "0ms" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- Facades: grid panels drop in ---- */
function FacadesIntroContent({ animating }: { animating: boolean }) {
  const panels = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="page-intro-center">
      <div className="pi-facade-grid">
        {panels.map((i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const delay = (row * 4 + col) * 80;
          return (
            <div
              key={i}
              className={`pi-facade-panel ${animating ? "pi-facade-drop" : ""}`}
              style={{ animationDelay: `${delay}ms` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---- Conservatories: glass frame from corners ---- */
function ConservatoriesIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-conservatory-frame">
        <div className={`pi-conservatory-roof ${animating ? "pi-conservatory-assemble" : ""}`} />
        <div className={`pi-conservatory-left ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "150ms" }} />
        <div className={`pi-conservatory-right ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "150ms" }} />
        <div className={`pi-conservatory-base ${animating ? "pi-conservatory-assemble" : ""}`} style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

/* ---- Smart Buildings: rising buildings ---- */
function SmartBuildingsIntroContent({ animating }: { animating: boolean }) {
  return (
    <div className="page-intro-center">
      <div className="pi-buildings-row">
        {/* Short building */}
        <div className={`pi-building pi-building-short ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "0ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
        {/* Medium building */}
        <div className={`pi-building pi-building-medium ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "200ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
        {/* Tall building */}
        <div className={`pi-building pi-building-tall ${animating ? "pi-building-rise" : ""}`} style={{ animationDelay: "400ms" }}>
          <div className="pi-building-windows">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <div key={i} className="pi-building-window" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add page intro overlay base CSS to globals.css**

In `app/globals.css`, add after the 3D carousel CSS:

```css
/* ============================================
   PAGE INTRO OVERLAY (shared)
   ============================================ */

.page-intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--color-background));
  transition: opacity 0.4s ease;
}

.page-intro-overlay.page-intro-animating {
  /* Fade out after animation completes */
  animation: pageIntroFadeOut 0.4s ease 1.6s forwards;
}

@keyframes pageIntroFadeOut {
  to {
    opacity: 0;
    pointer-events: none;
  }
}

.page-intro-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-intro-overlay {
    display: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add components/PageIntro.tsx app/globals.css
git commit -m "feat: add PageIntro wrapper component with all 6 variant renderers"
```

---

## Task 7: Add Page Intro Animation CSS — Windows & Doors

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add windows animation CSS**

In `app/globals.css`, add after the page intro overlay CSS:

```css
/* ============================================
   PAGE INTRO — WINDOWS (panes swing open)
   ============================================ */

.pi-window-frame {
  position: relative;
  width: 320px;
  height: 280px;
  border: 6px solid rgb(var(--color-foreground) / 0.2);
  border-radius: 8px;
  overflow: hidden;
  perspective: 800px;
}

@media (min-width: 640px) {
  .pi-window-frame {
    width: 440px;
    height: 360px;
  }
}

.pi-window-pane {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transform-origin: left center;
  transition: transform 1.2s cubic-bezier(0.65, 0, 0.35, 1);
}

.pi-window-pane-left {
  left: 0;
  transform-origin: left center;
}

.pi-window-pane-right {
  right: 0;
  transform-origin: right center;
}

.pi-window-glass {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgb(var(--color-accent) / 0.08), rgb(var(--color-accent) / 0.03));
  border: 2px solid rgb(var(--color-foreground) / 0.1);
}

.pi-window-handle-left {
  position: absolute;
  top: 50%;
  right: 12px;
  width: 6px;
  height: 30px;
  border-radius: 3px;
  background: rgb(var(--color-foreground) / 0.25);
  transform: translateY(-50%);
}

.pi-window-handle-right {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 6px;
  height: 30px;
  border-radius: 3px;
  background: rgb(var(--color-foreground) / 0.25);
  transform: translateY(-50%);
}

.pi-window-open-left {
  animation: windowSwingLeft 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.pi-window-open-right {
  animation: windowSwingRight 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes windowSwingLeft {
  to { transform: perspective(800px) rotateY(-120deg); }
}

@keyframes windowSwingRight {
  to { transform: perspective(800px) rotateY(120deg); }
}

/* ============================================
   PAGE INTRO — DOORS (double doors slide apart)
   ============================================ */

.pi-doors-frame {
  position: relative;
  width: 280px;
  height: 360px;
  perspective: 1000px;
  display: flex;
}

@media (min-width: 640px) {
  .pi-doors-frame {
    width: 360px;
    height: 440px;
  }
}

.pi-door-panel {
  position: relative;
  flex: 1;
  background: rgb(var(--color-surface));
  border: 3px solid rgb(var(--color-foreground) / 0.15);
}

.pi-door-left {
  border-radius: 4px 0 0 4px;
  transform-origin: left center;
}

.pi-door-right {
  border-radius: 0 4px 4px 0;
  transform-origin: right center;
}

.pi-door-inset {
  position: absolute;
  inset: 15%;
  border: 2px solid rgb(var(--color-foreground) / 0.08);
  border-radius: 2px;
}

.pi-door-handle-left {
  position: absolute;
  top: 50%;
  right: 12px;
  width: 8px;
  height: 24px;
  border-radius: 4px;
  background: rgb(var(--color-accent) / 0.5);
  transform: translateY(-50%);
}

.pi-door-handle-right {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 8px;
  height: 24px;
  border-radius: 4px;
  background: rgb(var(--color-accent) / 0.5);
  transform: translateY(-50%);
}

.pi-door-open-left {
  animation: piDoorSlideLeft 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.pi-door-open-right {
  animation: piDoorSlideRight 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes piDoorSlideLeft {
  to { transform: perspective(1000px) translateX(-120%) rotateY(30deg); }
}

@keyframes piDoorSlideRight {
  to { transform: perspective(1000px) translateX(120%) rotateY(-30deg); }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add windows and doors page intro animation CSS"
```

---

## Task 8: Add Page Intro Animation CSS — Sliding-Folding & Facades

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add sliding-folding and facades animation CSS**

In `app/globals.css`, add after the doors animation CSS:

```css
/* ============================================
   PAGE INTRO — SLIDING & FOLDING (accordion)
   ============================================ */

.pi-accordion-frame {
  display: flex;
  width: 400px;
  height: 320px;
  perspective: 800px;
}

@media (min-width: 640px) {
  .pi-accordion-frame {
    width: 520px;
    height: 400px;
  }
}

.pi-accordion-panel {
  flex: 1;
  background: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-foreground) / 0.1);
  transform-origin: right center;
}

.pi-accordion-panel:first-child {
  border-radius: 6px 0 0 6px;
}

.pi-accordion-panel:last-child {
  border-radius: 0 6px 6px 0;
}

.pi-accordion-fold {
  animation: accordionFold 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes accordionFold {
  0% {
    transform: perspective(800px) rotateY(0deg);
    opacity: 1;
  }
  70% {
    transform: perspective(800px) rotateY(-85deg);
    opacity: 0.6;
  }
  100% {
    transform: perspective(800px) rotateY(-90deg) translateX(100%);
    opacity: 0;
  }
}

[dir="rtl"] .pi-accordion-panel {
  transform-origin: left center;
}

[dir="rtl"] .pi-accordion-fold {
  animation-name: accordionFoldRtl;
}

@keyframes accordionFoldRtl {
  0% {
    transform: perspective(800px) rotateY(0deg);
    opacity: 1;
  }
  70% {
    transform: perspective(800px) rotateY(85deg);
    opacity: 0.6;
  }
  100% {
    transform: perspective(800px) rotateY(90deg) translateX(-100%);
    opacity: 0;
  }
}

/* ============================================
   PAGE INTRO — FACADES (grid panels drop in)
   ============================================ */

.pi-facade-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 320px;
  height: 260px;
}

@media (min-width: 640px) {
  .pi-facade-grid {
    width: 440px;
    height: 340px;
    gap: 8px;
  }
}

.pi-facade-panel {
  background: rgb(var(--color-surface));
  border: 2px solid rgb(var(--color-accent) / 0.2);
  border-radius: 4px;
  opacity: 0;
  transform: translateY(-60px);
}

.pi-facade-drop {
  animation: facadeDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes facadeDrop {
  0% {
    opacity: 0;
    transform: translateY(-60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add sliding-folding and facades page intro animation CSS"
```

---

## Task 9: Add Page Intro Animation CSS — Conservatories & Smart Buildings

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add conservatories and smart buildings animation CSS**

In `app/globals.css`, add after the facades CSS:

```css
/* ============================================
   PAGE INTRO — CONSERVATORIES (frame assembles)
   ============================================ */

.pi-conservatory-frame {
  position: relative;
  width: 340px;
  height: 300px;
}

@media (min-width: 640px) {
  .pi-conservatory-frame {
    width: 460px;
    height: 380px;
  }
}

.pi-conservatory-roof {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-40px);
  width: 0;
  height: 0;
  border-left: 170px solid transparent;
  border-right: 170px solid transparent;
  border-bottom: 80px solid rgb(var(--color-accent) / 0.15);
  opacity: 0;
}

@media (min-width: 640px) {
  .pi-conservatory-roof {
    border-left-width: 230px;
    border-right-width: 230px;
    border-bottom-width: 100px;
  }
}

.pi-conservatory-left {
  position: absolute;
  top: 40px;
  left: 0;
  width: 6px;
  height: 260px;
  background: rgb(var(--color-accent) / 0.25);
  border-radius: 3px;
  opacity: 0;
  transform: translateX(-40px);
}

@media (min-width: 640px) {
  .pi-conservatory-left {
    height: 280px;
  }
}

.pi-conservatory-right {
  position: absolute;
  top: 40px;
  right: 0;
  width: 6px;
  height: 260px;
  background: rgb(var(--color-accent) / 0.25);
  border-radius: 3px;
  opacity: 0;
  transform: translateX(40px);
}

@media (min-width: 640px) {
  .pi-conservatory-right {
    height: 280px;
  }
}

.pi-conservatory-base {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgb(var(--color-accent) / 0.25);
  border-radius: 3px;
  opacity: 0;
  transform: translateY(20px);
}

.pi-conservatory-assemble {
  animation: conservatoryAssemble 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes conservatoryAssemble {
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.pi-conservatory-roof.pi-conservatory-assemble {
  animation: conservatoryRoofAssemble 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes conservatoryRoofAssemble {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* ============================================
   PAGE INTRO — SMART BUILDINGS (rise from bottom)
   ============================================ */

.pi-buildings-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
  height: 400px;
  padding-bottom: 20px;
}

@media (min-width: 640px) {
  .pi-buildings-row {
    gap: 24px;
    height: 450px;
  }
}

.pi-building {
  position: relative;
  background: rgb(var(--color-foreground) / 0.08);
  border: 2px solid rgb(var(--color-accent) / 0.25);
  border-radius: 4px 4px 0 0;
  transform: translateY(110%);
}

.pi-building-short {
  width: 80px;
  height: 160px;
}

.pi-building-medium {
  width: 90px;
  height: 240px;
}

.pi-building-tall {
  width: 75px;
  height: 320px;
}

@media (min-width: 640px) {
  .pi-building-short {
    width: 110px;
    height: 200px;
  }
  .pi-building-medium {
    width: 120px;
    height: 300px;
  }
  .pi-building-tall {
    width: 100px;
    height: 380px;
  }
}

.pi-building-windows {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 10px 8px;
}

.pi-building-window {
  aspect-ratio: 1;
  background: rgb(var(--color-accent) / 0.2);
  border-radius: 2px;
}

.pi-building-rise {
  animation: buildingRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes buildingRise {
  0% {
    transform: translateY(110%);
  }
  100% {
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add conservatories and smart buildings page intro animation CSS"
```

---

## Task 10: Integrate 3D Carousel & Page Intros into Product Category Page

**Files:**
- Modify: `app/products/[category]/page.tsx:1-191`

- [ ] **Step 1: Update imports**

In `app/products/[category]/page.tsx`, replace the MarqueeCarousel import (line 8):

```typescript
import { MarqueeCarousel } from "@/components/MarqueeCarousel";
```

with:

```typescript
import { Carousel3D } from "@/components/Carousel3D";
import { PageIntro, PageIntroVariant } from "@/components/PageIntro";
```

- [ ] **Step 2: Add variant mapping constant**

Add after the `CATEGORY_KEY_MAP` constant (after line 18):

```typescript
const CATEGORY_INTRO_MAP: Record<string, PageIntroVariant> = {
  windows: "windows",
  doors: "doors",
  "sliding-folding": "sliding-folding",
  facades: "facades",
  conservatories: "conservatories",
  "smart-buildings": "smart-buildings",
};
```

- [ ] **Step 3: Wrap page content with PageIntro**

In the return statement, wrap the outer `<div className="pb-16">` (line 57) with `PageIntro`. Change:

```tsx
    return (
    <div className="pb-16">
```

to:

```tsx
    const introVariant = CATEGORY_INTRO_MAP[slug];

    return (
    <PageIntro variant={introVariant || "doors"}>
    <div className="pb-16">
```

And add the closing `</PageIntro>` at the very end before the final `);`:

```tsx
    </div>
    </PageIntro>
    );
```

- [ ] **Step 4: Replace MarqueeCarousel with Carousel3D**

Replace the MarqueeCarousel usage (lines 81-88):

```tsx
      {productData && productData.images.length > 0 && (
        <div className="container-x mt-10">
          <MarqueeCarousel
            images={productData.images}
            speed={productData.images.length > 6 ? 35 : 25}
          />
        </div>
      )}
```

with:

```tsx
      {productData && productData.images.length > 0 && (
        <div className="container-x mt-10">
          <Carousel3D images={productData.images} />
        </div>
      )}
```

- [ ] **Step 5: Verify all product category pages work**

Run: `npm run dev`
Navigate to each product category page and verify:
- 3D carousel shows and rotates through images
- Page intro animation plays on first visit
- Refreshing doesn't replay the animation (sessionStorage)
- Swipe/buttons/dots work on the carousel
- RTL mode works (switch to Arabic)

- [ ] **Step 6: Commit**

```bash
git add app/products/[category]/page.tsx
git commit -m "feat: integrate 3D carousel and page intros into product category pages"
```

---

## Task 11: Type Check & Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript type check**

Run: `npm run type-check`
Expected: No errors. If there are errors, fix them.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Full manual verification**

Test these scenarios:
1. Open site in incognito — door intro plays, then homepage loads
2. Navigate to Products > Windows — window panes swing open, 3D carousel works
3. Navigate to Products > Doors — door opening animation, 3D carousel works
4. Navigate to Products > Sliding & Folding — accordion fold animation
5. Navigate to Products > Facades — grid panels drop in
6. Navigate to Products > Conservatories — glass frame assembles
7. Navigate to Products > Smart Buildings — 3 buildings rise up
8. Switch to "Construction" theme — orange accent, crane silhouettes visible
9. Switch to Arabic — RTL carousel and animations work correctly
10. Reload any product page — intro does NOT replay

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address type-check and build issues"
```

(Only if fixes were needed.)

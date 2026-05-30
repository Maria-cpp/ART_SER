# Sidebar Collapse, Nav Reorder, Hero Background Slideshow & Logo

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapsible sidebar with new nav order, hero section with image slideshow background and ART_SER_logo.png replacing text, JV Projects tab removed.

**Architecture:** Modify Sidebar.tsx to add a collapse/expand toggle button that shrinks it to icon-only mode. Reorder nav groups to Home > Company > Products > Projects (minus JV) > Resources. Update home page hero to use a full-bleed image slideshow with crossfade transitions behind the content, and replace the "ART SER" text with the logo image.

**Tech Stack:** Next.js 15, React 19, TailwindCSS 3, CSS animations

---

### Task 1: Sidebar Collapse/Expand Toggle

**Files:**
- Modify: `components/Sidebar.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add collapsed state and toggle button to Sidebar.tsx**

Replace the full `components/Sidebar.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface NavGroup {
  labelKey: string;
  icon: React.ReactNode;
  items: { href: string; labelKey: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    labelKey: "nav.home",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
    items: [],
  },
  {
    labelKey: "sidebar.company",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: [
      { href: "/about", labelKey: "nav.about" },
      { href: "/services", labelKey: "nav.services" },
      { href: "/clients", labelKey: "nav.clients" },
      { href: "/certifications", labelKey: "nav.certifications" },
    ],
  },
  {
    labelKey: "sidebar.products",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    items: [
      { href: "/products/windows", labelKey: "products.windows.title" },
      { href: "/products/doors", labelKey: "products.doors.title" },
      { href: "/products/sliding-folding", labelKey: "products.sliding.title" },
      { href: "/products/facades", labelKey: "products.facades.title" },
      { href: "/products/conservatories", labelKey: "products.conservatories.title" },
      { href: "/products/smart-buildings", labelKey: "products.smart.title" },
    ],
  },
  {
    labelKey: "sidebar.projects",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    items: [
      { href: "/portfolio", labelKey: "nav.portfolio" },
      { href: "/government", labelKey: "nav.government" },
      { href: "/manufacturing", labelKey: "nav.manufacturing" },
    ],
  },
  {
    labelKey: "sidebar.resources",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    items: [
      { href: "/gallery", labelKey: "nav.gallery" },
      { href: "/request-quote", labelKey: "nav.requestQuote" },
      { href: "/contact", labelKey: "nav.contact" },
    ],
  },
];

export function Sidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_GROUPS.forEach((g) => {
      if (g.items.length === 0) return;
      const hasActive = g.items.some((item) => pathname.startsWith(item.href));
      initial[g.labelKey] = hasActive;
    });
    return initial;
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`sidebar hidden lg:flex flex-col flex-shrink-0 border-e border-border bg-surface h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse toggle */}
      <div className={`flex items-center px-2 pt-3 pb-1 ${collapsed ? "justify-center" : "justify-end pe-3"}`}>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Search bar — only when expanded */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-muted">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>{t("products.searchCompare")}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 pb-6">
        {NAV_GROUPS.map((group) => {
          const isExpanded = expandedGroups[group.labelKey] ?? false;

          /* Home — single link, no children */
          if (group.items.length === 0) {
            const isActive = pathname === "/";
            return (
              <div key={group.labelKey} className="mb-1">
                <Link
                  href="/"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition hover:bg-surface-alt ${
                    isActive ? "text-accent" : "text-foreground"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? t(group.labelKey) : undefined}
                >
                  {group.icon}
                  {!collapsed && <span>{t(group.labelKey)}</span>}
                </Link>
              </div>
            );
          }

          return (
            <div key={group.labelKey} className="mb-1">
              <button
                type="button"
                onClick={() => {
                  if (collapsed) {
                    setCollapsed(false);
                    setExpandedGroups((prev) => ({ ...prev, [group.labelKey]: true }));
                  } else {
                    toggleGroup(group.labelKey);
                  }
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-alt ${
                  collapsed ? "justify-center" : "justify-between"
                }`}
                aria-expanded={isExpanded}
                title={collapsed ? t(group.labelKey) : undefined}
              >
                <span className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                  {group.icon}
                  {!collapsed && <span>{t(group.labelKey)}</span>}
                </span>
                {!collapsed && (
                  <svg
                    className={`h-4 w-4 text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </button>

              {isExpanded && !collapsed && (
                <div className="ms-2 border-s border-border">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-e-lg py-2 ps-4 pe-3 text-sm transition
                          ${isActive
                            ? "bg-accent/10 text-accent font-medium border-s-2 border-accent -ms-px"
                            : "text-muted hover:text-foreground hover:bg-surface-alt"
                          }`}
                      >
                        {t(item.labelKey)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Verify sidebar renders and toggle works**

Run: `npm run dev`
Open http://localhost:3000 and verify sidebar shows collapse/expand button, groups are reordered (Home, Company, Products, Projects, Resources), JV Projects is removed.

- [ ] **Step 3: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: collapsible sidebar with reordered nav, remove JV Projects"
```

---

### Task 2: Replace Hero "ART SER" Text with Logo Image

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace company name text with logo image**

In `app/page.tsx`, add `import Image from "next/image";` at the top imports.

Replace this block (around line 41-43):
```tsx
<p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent scroll-reveal">
  {company.name}
</p>
```

With:
```tsx
<div className="mb-6 scroll-reveal">
  <Image
    src="/ART_SER_logo.png"
    alt={company.name}
    width={280}
    height={100}
    className="mx-auto h-auto w-auto max-h-24"
    priority
  />
</div>
```

- [ ] **Step 2: Verify logo renders on home page**

Open http://localhost:3000 — the 3D ART SER logo image should appear instead of plain text.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace hero ART SER text with logo image"
```

---

### Task 3: Hero Background Image Slideshow

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add slideshow CSS to globals.css**

Add at the end of `app/globals.css`:

```css
/* Hero background slideshow */
.hero-slideshow {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-slideshow-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.hero-slideshow-img.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgb(var(--color-background) / 0.7) 0%,
    rgb(var(--color-background) / 0.85) 100%
  );
  z-index: 1;
}
```

- [ ] **Step 2: Add slideshow state and images to hero in page.tsx**

In `app/page.tsx`, add `useEffect` to the React import and `useCallback` if needed.

Add a state + interval for cycling images. The user will provide images to `/public/hero/` — use placeholder paths for now:

```tsx
import { useState, useEffect } from "react"; // add to existing import

// Inside HomePage component, before the return:
const heroImages = [
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
];
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  if (heroImages.length <= 1) return;
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, [heroImages.length]);
```

Replace the hero `<section>` opening and the radial glow div:

```tsx
<section className="relative overflow-hidden">
  {/* Background slideshow */}
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

Remove the old radial glow `<div>` block entirely.

Update the container div to add `relative z-10` so content sits above the overlay:

```tsx
<div className="container-x relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
```

- [ ] **Step 3: Create hero images directory**

```bash
mkdir -p public/hero
```

Place placeholder images or real images provided by the user at `public/hero/slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`.

- [ ] **Step 4: Verify slideshow works**

Open http://localhost:3000 — images should crossfade every 5 seconds behind the hero content with a dark overlay keeping text readable.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: hero background image slideshow with crossfade"
```

---

### Task 4: Update Mobile Nav and Header to Match New Order

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Update MOBILE_NAV array to match new order, remove JV Projects**

In `components/Header.tsx`, replace the `MOBILE_NAV` array:

```tsx
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
```

- [ ] **Step 2: Verify mobile nav**

Open http://localhost:3000 on mobile viewport — JV Projects should be gone, order should be Home, Company items, Products, Projects (no JV), Resources.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: update mobile nav order, remove JV Projects"
```

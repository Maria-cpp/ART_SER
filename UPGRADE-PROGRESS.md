# ARTSER Website Upgrade — Progress Tracker

> **Last updated:** 2026-08-16
> **Plans:** `docs/superpowers/plans/2026-08-15-upgrade-master-index.md`

---

## Overall Progress

| Phase | Status | Tasks | Commit |
|-------|--------|-------|--------|
| **1. UX/UI Foundation** | DONE | 18/18 | `2e6d48c` |
| **2. Homepage Redesign** | DONE | 21/21 | `8cfc337` |
| **3. 3D & Animation Integration** | DONE | 24/24 | — |
| **4. Multilingual & SEO** | DONE | 19/19 | — |
| **5. Performance Optimization** | PENDING | 0/18 | — |
| **6. QA & Accessibility** | PENDING | 0/21 | — |

---

## Phase 1: UX/UI Foundation — COMPLETED

**Commit:** `2e6d48c` on `main`

**What was done:**
1. Created `lib/tokens.ts` — design system tokens (spacing, radius, shadows, z-index, animation durations, easings, palette)
2. Replaced `lib/themes.ts` — consolidated 5 themes into single "artser" theme
3. Simplified `components/providers/ThemeProvider.tsx` — always applies "artser", no more setTheme
4. Replaced all theme blocks in `app/globals.css` — single ARTSER palette (#0B0B0B base, #B58A62 bronze accent, #F5F5F2 foreground), added CSS design tokens
5. Updated fonts — added Noto Sans Arabic + Noto Nastaliq Urdu, removed Playfair Display, headings now sans-serif
6. Separated Arabic/Urdu font rules in CSS
7. Replaced `tailwind.config.ts` — added aluminium color, urdu font, border-radius/shadow/z-index/transition-duration tokens
8. Created component directories: `components/layout/`, `hero/`, `3d/`, `sections/`, `ui/`
9. Created `components/ui/Button.tsx` (primary/outline/ghost variants)
10. Created `components/ui/RevealText.tsx` (IntersectionObserver reveal animation)
11. Created `components/ui/SectionHeading.tsx` (label + title + subtitle + accent bar)
12. Created `components/ui/index.ts` barrel export
13. Simplified `components/Header.tsx` — removed ThemeSwitcher, streamlined to SERVICES|PROJECTS|ABOUT|PRODUCTS|CONTACT
14. Removed Sidebar from `app/layout.tsx`, set `data-theme="artser"`
15. Moved LanguageSwitcher to `components/layout/LanguageSwitcher.tsx` with re-export
16. Added `prefers-reduced-motion` CSS for accessibility
17. Replaced `components/ThemeSwitcher.tsx` with no-op stub
18. Removed all theme-switcher CSS (animations, classes, responsive rules)
19. Build verified — `tsc --noEmit` and `npm run build` pass clean

---

## Phase 2: Homepage Redesign — COMPLETED

**Commit:** `8cfc337` on `main`

---

## Phase 3: 3D & Animation Integration — COMPLETED

**What was done:**
1. Installed @react-three/fiber, @react-three/drei, gsap
2. Created WebGL detection utility (`lib/webgl.ts`)
3. Created WebGLFallback component (`components/3d/WebGLFallback.tsx`)
4. Created shared Scene wrapper with error boundary + Suspense (`components/3d/Scene.tsx`)
5. Created aluminium material utilities (`components/3d/materials.ts`)
6. Created AluminiumProfile explodable 3D component (`components/3d/AluminiumProfile.tsx`)
7. Created WindowSystem 3D component (`components/3d/WindowSystem.tsx`)
8. Created GSAP ScrollTrigger hooks (`lib/useGSAPScroll.ts`)
9. Created mouse tracking hook (`lib/useMousePosition.ts`)
10. Created HeroScene with mouse interaction + scroll camera (`components/3d/HeroScene.tsx`)
11. Created MaterialScene with scroll-driven exploded view (`components/3d/MaterialScene.tsx`)
12. Created ProfileToArchitectureScene scroll sequence (`components/3d/ProfileToArchitectureScene.tsx`)
13. Updated HeroSection with 3D background integration
14. Updated MaterialSection with 3D profile + step progression
15. Created ProfileToArchitectureSection (sticky scroll 3D experience)
16. Added profile-to-architecture translation keys (all 4 languages)
17. Removed old Construction3DBackground from layout.tsx and portfolio/page.tsx
18. Updated page.tsx with ProfileToArchitectureSection
19. Created 3D barrel export (`components/3d/index.ts`)
20. Updated sections barrel export
21. Added R3F type declarations (`types/r3f.d.ts`)
22. Removed `.construction-3d-bg` CSS
23. Verified TypeScript + build pass clean
24. Deleted `components/Construction3DBackground.tsx`

---

## Phase 4: Multilingual & SEO — COMPLETED

**What was done:**
1. Created shared locale constants (`lib/locale.ts`) with `pageMetadata` helper
2. Added meta translation keys to all 4 language files (27 keys × 4 languages)
3. Created middleware for locale detection (cookie → Accept-Language → default)
4. Stripped root layout to minimal shell
5. Created locale layout with `generateMetadata()`, structured data (Organization + LocalBusiness)
6. Updated LanguageProvider to accept `initialLocale` and navigate on locale change
7. Updated Header with locale-prefixed nav links
8. Updated Footer with locale-prefixed links
9. Updated Breadcrumbs with locale-prefixed links
10. Updated DoorIntro to detect locale-prefixed home paths
11. Converted root page to locale redirect
12. Moved all 14 public pages under `[locale]/` dynamic segment
13. Created dynamic sitemap (`app/sitemap.ts`) for all pages × 4 locales
14. Created robots.ts pointing to sitemap
15. Added per-page `generateMetadata` with hreflang alternates for all 13 subpages
16. Fixed internal links in 5 section components
17. Created `pageMetadata` helper for consistent per-page SEO
18. Build verified — TypeScript and Next.js build pass clean
19. URL-based locale routing live: `/en/`, `/it/`, `/ar/`, `/ur/`

---

## Execution Approach

Using **Subagent-Driven Development**: fresh subagent per task, spec compliance review, code quality review. Mechanical tasks use haiku model, integration tasks use sonnet, architecture/review tasks use opus.

# ARTSER Website Full UX/UI + 3D Upgrade — Master Plan Index

> **Source specification:** `upgrade.md` (60 sections)
>
> **Date:** 2026-08-15
>
> **Total scope:** ~9,220 lines of implementation plans across 6 phases, ~124 tasks

---

## Execution Order

Phases MUST be executed in order. Each phase depends on the previous phase's output.

| Phase | Plan File | Tasks | Lines | Spec Sections Covered |
|-------|-----------|-------|-------|----------------------|
| **1** | [phase1-ux-ui-foundation.md](./2026-08-15-phase1-ux-ui-foundation.md) | 18 | 1,159 | 2, 28, 29, 40, 49, 50 |
| **2** | [phase2-homepage-redesign.md](./2026-08-15-phase2-homepage-redesign.md) | 21 | 1,716 | 7-18, 31, 46 |
| **3** | [phase3-3d-integration.md](./2026-08-15-phase3-3d-integration.md) | 24 | 2,099 | 3, 4, 5, 6, 8-9, 10, 14, 33, 35-37, 41-43 |
| **4** | [phase4-multilingual-seo.md](./2026-08-15-phase4-multilingual-seo.md) | 22 | 1,725 | 20-27, 38, 39 |
| **5** | [phase5-performance-optimization.md](./2026-08-15-phase5-performance-optimization.md) | 18 | 1,037 | 35, 36, 42, 51 |
| **6** | [phase6-qa-accessibility.md](./2026-08-15-phase6-qa-accessibility.md) | 21 | 1,484 | 34, 44, 45, 52-54, 60 |
| | **TOTAL** | **124** | **9,220** | **All 60 sections** |

---

## Phase Summaries

### Phase 1: UX/UI Foundation (18 tasks)
Replaces the 5-theme system with a single premium "artser" theme (dark graphite + bronze accent + off-white text). Establishes design tokens (spacing, animation durations, easings, shadows, z-index). Sets up typography (Inter + Arabic + Urdu fonts). Creates component directory structure. Builds reusable UI primitives (Button, RevealText, SectionHeading). Redesigns navigation to minimal ARTSER | SERVICES | PROJECTS | ABOUT | PRODUCTS | CONTACT. Removes sidebar. Adds prefers-reduced-motion CSS.

### Phase 2: Homepage Redesign (21 tasks)
Rebuilds the homepage as a visual narrative with 9 sections: Hero (dark gradient, premium headline), Material/Engineering (5-step flow), Services (interactive hover cards), Selected Projects (cinematic full-width), Engineering Process (8-step grid), Company Story (26+ years timeline with counter), Partners/Suppliers (visual ecosystem), Products/Systems (technical cards), Contact CTA ("LET'S BUILD SOMETHING."). Adds all translation keys in 4 languages with professional Italian architectural terminology.

### Phase 3: 3D & Animation Integration (24 tasks)
Installs React Three Fiber, Drei, and GSAP. Creates WebGL detection + fallback system. Builds procedural 3D scenes: HeroScene (aluminium window with mouse parallax + scroll zoom), MaterialScene (explodable aluminium profile), ProfileToArchitectureScene (7-stage scroll-driven manufacturing sequence). GSAP ScrollTrigger orchestrates scroll-driven animations. Removes old Construction3DBackground. Each scene is independently loadable with static fallback.

### Phase 4: Multilingual & SEO (22 tasks)
Upgrades all translations to professional quality: native Italian architectural terminology, Modern Standard Arabic, professional Urdu, clean business English. Implements Next.js Metadata API for localized SEO (title, description, OG, Twitter). Adds hreflang tags, sitemap, robots.txt. Adds JSON-LD structured data (Organization, LocalBusiness, WebSite, Service). Redesigns language switcher. Audits RTL layout across all components.

### Phase 5: Performance Optimization (18 tasks)
Migrates to next/font (self-hosted, zero CLS). Converts all images to next/image with proper sizing/priority/loading. Configures AVIF/WebP optimization. Lazy-loads 3D scenes with intersection observer. Implements device-tier detection for mobile 3D reduction. Dynamic imports for heavy components. Bundle analysis. CLS prevention. Core Web Vitals monitoring.

### Phase 6: QA & Accessibility (21 tasks)
Adds skip-to-content link, visible focus states, comprehensive reduced-motion support. ARIA labels on all interactive elements (3D canvases, mobile menu, language switcher, social links). Focus trapping in mobile nav. Form accessibility (validation, error focus, aria-invalid, localized error messages). Image alt text audit. Keyboard accessibility for flip cards. Screen-reader announcer region. Final Definition of Done checklist covering all 24 acceptance criteria from the spec.

---

## Spec Section Coverage Map

| Spec Section | Phase |
|-------------|-------|
| 1. Project Objective | All |
| 2. Design Direction | 1 |
| 3. Technology Stack | 3 |
| 4. Animation Stack | 3 |
| 5. Smooth Scrolling | 3 |
| 6. Architecture | 3 |
| 7. Homepage Experience | 2 |
| 8. Hero Section | 2, 3 |
| 9. 3D Philosophy | 3 |
| 10. Material/Engineering | 2, 3 |
| 11. Services Section | 2 |
| 12. Project Showcase | 2 |
| 13. Engineering Process | 2 |
| 14. Profile to Architecture | 3 |
| 15. Company Story | 2 |
| 16. Supplier/Partner | 2 |
| 17. Products/Systems | 2 |
| 18. Contact/Conversion | 2 |
| 19. Navigation | 1 |
| 20. Multilingual Support | 4 |
| 21. Italian Language | 4 |
| 22. Italian QA | 4 |
| 23. English Language | 4 |
| 24. Arabic Language | 4 |
| 25. Urdu Language | 4 |
| 26. RTL Architecture | 4 |
| 27. Language Switching | 4 |
| 28. Typography | 1 |
| 29. Colour Direction | 1 |
| 30. Image Direction | 5 |
| 31. Micro-Interactions | 2 |
| 32. Cursor | 2 |
| 33. Motion Principles | 3 |
| 34. Accessibility | 1, 6 |
| 35. Performance | 3, 5 |
| 36. Responsive 3D | 3, 5 |
| 37. WebGL Fallback | 3 |
| 38. SEO | 4 |
| 39. Structured Data | 4 |
| 40. Component Architecture | 1 |
| 41. 3D Component Architecture | 3 |
| 42. Loading Strategy | 3, 5 |
| 43. Error Handling | 3 |
| 44. Mobile Navigation | 6 |
| 45. Forms | 6 |
| 46. Content Guidelines | 2 |
| 47. UX Principle | 2 |
| 48. Conversion Strategy | 2 |
| 49. Design System | 1 |
| 50. Animation Tokens | 1 |
| 51. Performance Budget | 5 |
| 52. Testing | 6 |
| 53. Language QA | 6 |
| 54. 3D UX Testing | 6 |
| 55. Development Phases | This index |
| 56. Priority Order | This index |
| 57. Final Stack | 3 |
| 58. Final Creative Direction | All |
| 59. Golden Rule | All |
| 60. Definition of Done | 6 |

---

## How to Execute

Each plan includes this header:

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task.

**Recommended approach:** Execute one phase at a time using subagent-driven development. Complete all tasks in a phase, verify the build passes, then move to the next phase.

# 3D Effects & Crane Theme — Design Spec

**Date:** 2026-06-06
**Branch:** `3deffects`
**Approach:** Pure CSS/Tailwind (no libraries)

---

## 1. Orange Crane Theme

**Theme ID:** `crane`
**Switcher name:** "Construction"

### Palette

| Variable | Value | RGB Triple |
|---|---|---|
| background | `#FAFAFA` | `250 250 250` |
| surface | `#FFFFFF` | `255 255 255` |
| surface-alt | `#F5F0EB` | `245 240 235` |
| foreground | `#1A1A1A` | `26 26 26` |
| muted | `#7A7067` | `122 112 103` |
| accent | `#E8651A` | `232 101 26` |
| accent-foreground | `#FFFFFF` | `255 255 255` |
| border | `#E0D6CC` | `224 214 204` |

### Glass/Glow

- `--glass-blur`: 14px
- `--glass-bg`: `rgba(255, 255, 255, 0.65)`
- `--glass-border`: `rgba(232, 101, 26, 0.18)`
- `--accent-glow`: `rgba(232, 101, 26, 0.25)`
- `--neon-shadow`: `0 4px 18px rgba(232, 101, 26, 0.18)`

### Crane Decoration

SVG crane silhouettes rendered as body `::before` pseudo-element background. White/light-gray cranes at ~5% opacity in corners. Subtle, non-distracting.

### Files Changed

- `lib/themes.ts` — add `"crane"` to `ThemeId` union, add entry to `THEMES` array
- `app/globals.css` — add `[data-theme="crane"]` block, crane-specific card/header/button overrides, crane SVG background via pseudo-element

---

## 2. Full-Screen Door Intro (Home Page)

### Behavior

On initial site load, a full-screen overlay covers the page with two door panels (left and right) and the ARTSER logo centered at the split. After ~0.5s pause, doors slide apart in 3D perspective — left door swings left, right door swings right — revealing the homepage. Total ~2 seconds. Overlay removed from DOM after completion.

### 3D Effect

Each door panel uses `perspective` with slight `rotateY` as it slides:
- Left door: rotates slightly clockwise while translating left
- Right door: rotates slightly counterclockwise while translating right

### Visual Details

- Door panels use theme `surface` color with subtle vertical panel lines
- ARTSER logo centered at the split
- Drop shadow between doors as they open
- Plays **once per session** via `sessionStorage` flag

### Implementation

- **New component:** `components/DoorIntro.tsx` (client component)
- Rendered in `app/layout.tsx`, conditionally based on sessionStorage
- CSS keyframes in `globals.css` for door slide + rotation
- Component unmounts itself after animation completes via `onAnimationEnd`

---

## 3. 3D Carousel (Product Pages)

### Replaces

`MarqueeCarousel` on product category pages (`app/products/[category]/page.tsx`)

### How It Works

Images arranged in a circular formation using CSS `transform-style: preserve-3d`:
- Container has `perspective: 1000px`
- Each image positioned with `rotateY(N * angle) translateZ(radius)` where `angle = 360 / totalImages`
- Rotation driven by React state, transitioning container's `rotateY`
- Active card: full opacity, scale 1
- Adjacent cards: reduced opacity (~0.6), scale ~0.85

### Navigation

- Left/right arrow buttons
- Touch swipe (drag)
- Dot indicators
- Optional auto-play with configurable interval

### Props Interface

```typescript
interface Carousel3DProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number; // ms, default 4000
}
```

### RTL Support

Swipe direction and rotation direction mirror for RTL languages.

### Implementation

- **New component:** `components/Carousel3D.tsx` (client component)
- Replace `MarqueeCarousel` usage in `app/products/[category]/page.tsx`
- CSS added to `globals.css`

---

## 4. Page-Specific Load Animations (Product Pages)

### Shared Pattern

Reusable wrapper component with per-variant rendering. Each plays once on page load (~1.5-2s), then fades out. Uses `sessionStorage` per page so animation plays once per session per category.

### Architecture

- **Wrapper:** `components/PageIntro.tsx` — accepts `variant` prop, handles sessionStorage, mount/unmount lifecycle
- **Variants:** Individual components in `components/page-intros/` folder
- CSS keyframes in `globals.css`
- Each product category page wraps content with `<PageIntro variant="...">`

### 6 Variants

#### 4.1 `windows`
Window frame (rectangular outline) appears centered. Two glass panes swing open outward with `rotateY` perspective — left pane rotates -120deg, right pane rotates 120deg — revealing page behind.

#### 4.2 `doors`
Double door panels slide apart left/right with 3D perspective rotation. Styled as product doors with thinner frames than the home intro.

#### 4.3 `sliding-folding`
4-5 vertical panels start covering the screen. Panels accordion-fold and stack to the right side. Each panel folds with `rotateY` in sequence with staggered delays (~100ms apart).

#### 4.4 `facades`
4x3 grid of rectangular panels drop into place from above with staggered timing (top-left first, bottom-right last). Assembles a facade pattern, then the whole grid fades out.

#### 4.5 `conservatories`
Glass panel outlines slide in from all 4 corners toward center, forming a conservatory frame shape (peaked roof outline + side panels). Hold briefly, then fade out.

#### 4.6 `smart-buildings`
3 building silhouettes (rectangles with window cutouts) rise from the bottom at staggered heights. Short building on left, medium in center, tall on right. Hold briefly, then fade out.

### Timing

- All animations: ~1.5-2s total
- Brief hold at completion (~0.3s) before fade-out (~0.3s)
- Total overlay time: ~2-2.5s per page

---

## 5. File Summary

### New Files

| File | Purpose |
|---|---|
| `components/DoorIntro.tsx` | Full-screen door intro for home page |
| `components/Carousel3D.tsx` | 3D rotating carousel |
| `components/PageIntro.tsx` | Shared page intro wrapper |
| `components/page-intros/WindowsIntro.tsx` | Windows page animation |
| `components/page-intros/DoorsIntro.tsx` | Doors page animation |
| `components/page-intros/SlidingFoldingIntro.tsx` | Sliding & folding animation |
| `components/page-intros/FacadesIntro.tsx` | Facades page animation |
| `components/page-intros/ConservatoriesIntro.tsx` | Conservatories animation |
| `components/page-intros/SmartBuildingsIntro.tsx` | Smart buildings animation |

### Modified Files

| File | Change |
|---|---|
| `lib/themes.ts` | Add `crane` theme ID and metadata |
| `app/globals.css` | Add crane theme block, door intro keyframes, 3D carousel styles, all 6 page intro keyframes |
| `app/layout.tsx` | Render `DoorIntro` component |
| `app/products/[category]/page.tsx` | Replace `MarqueeCarousel` with `Carousel3D`, wrap with `PageIntro` |

---

## 6. Constraints

- Zero external dependencies — pure CSS transforms + React state
- All animations respect theme colors via CSS variables
- RTL support for carousel direction and door animations
- Mobile-friendly: touch swipe for carousel, reduced animation for `prefers-reduced-motion`
- SessionStorage prevents replay on navigation within same session

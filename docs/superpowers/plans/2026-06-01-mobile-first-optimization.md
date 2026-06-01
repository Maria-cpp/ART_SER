# Mobile-First Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the ARTSER website fully mobile-friendly with priority on smooth scrolling, easy navigation, and usable touch interactions on phones (320px–430px viewports).

**Architecture:** This is a CSS/layout refactoring pass across existing components. No new components are created — we fix responsive gaps in existing files. Flip cards get touch support via CSS `:active`/focus states since hover doesn't work on mobile. All changes use Tailwind responsive prefixes (mobile-first) and targeted CSS in `globals.css`.

**Tech Stack:** TailwindCSS responsive utilities, CSS media queries, existing Next.js components

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/Section.tsx` | Modify | Reduce vertical padding on mobile |
| `components/Header.tsx` | Modify | Improve mobile menu UX (grouped nav, smoother interaction) |
| `components/Footer.tsx` | Modify | Stack brand/social row on mobile, fix text sizing |
| `components/ThemeSwitcher.tsx` | Modify | Constrain dropdown width on small screens |
| `components/ImageCarousel.tsx` | Modify | Increase touch targets, add swipe support |
| `app/page.tsx` | Modify | Reduce hero height, tighten gaps on mobile |
| `app/about/page.tsx` | Modify | Stack experience highlight box on mobile |
| `app/contact/page.tsx` | Modify | Reduce map height on mobile |
| `app/globals.css` | Modify | Add flip-card touch support, small-screen rules, touch-friendly adjustments |

---

### Task 1: Section Padding — Reduce Vertical Space on Mobile

**Files:**
- Modify: `components/Section.tsx:14`

Mobile screens waste too much vertical space with `py-16` (4rem = 64px top AND bottom). On a 667px iPhone SE viewport, that's 19% of the screen just in padding for one section.

- [ ] **Step 1: Make section padding responsive**

In `components/Section.tsx`, change line 14 from:

```tsx
<section className={`${alt ? "bg-surface-alt" : ""} relative py-16 ${className}`}>
```

to:

```tsx
<section className={`${alt ? "bg-surface-alt" : ""} relative py-8 md:py-16 ${className}`}>
```

Also reduce the header margin-bottom on mobile. Change line 20 from:

```tsx
<header className="mb-10 max-w-2xl scroll-reveal">
```

to:

```tsx
<header className="mb-6 md:mb-10 max-w-2xl scroll-reveal">
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

Open Chrome DevTools → toggle device toolbar → iPhone SE (375×667). Scroll through the home page. Sections should feel tighter, less wasted space between content blocks. Compare with desktop (1280px+) where spacing should remain at `py-16`.

- [ ] **Step 3: Commit**

```bash
git add components/Section.tsx
git commit -m "fix: reduce section padding on mobile for better scroll density"
```

---

### Task 2: Hero Section — Mobile-Optimized Height and Spacing

**Files:**
- Modify: `app/page.tsx:111`, `app/page.tsx:129`, `app/page.tsx:172-184`, `app/page.tsx:197`

The hero is `min-h-[85vh]` which on a phone with a browser chrome eats 85% of viewport — users must scroll significantly before seeing any real content. Also, the scroll indicator wastes vertical space on mobile.

- [ ] **Step 1: Reduce hero height on mobile**

In `app/page.tsx`, change line 111 from:

```tsx
<div className="container-x relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
```

to:

```tsx
<div className="container-x relative z-10 flex min-h-[60vh] md:min-h-[85vh] flex-col items-center justify-center py-10 md:py-20 text-center">
```

- [ ] **Step 2: Reduce hero subtitle spacing on mobile**

Change line 125 from:

```tsx
<p className="mt-8 max-w-2xl text-lg text-muted scroll-reveal">
```

to:

```tsx
<p className="mt-4 md:mt-8 max-w-2xl text-base md:text-lg text-muted scroll-reveal">
```

- [ ] **Step 3: Reduce hero button group spacing on mobile**

Change line 129 from:

```tsx
<div className="mt-10 flex flex-wrap items-center justify-center gap-4 scroll-reveal">
```

to:

```tsx
<div className="mt-6 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4 scroll-reveal">
```

- [ ] **Step 4: Hide scroll indicator on mobile (saves space, users know to scroll)**

Change line 172 from:

```tsx
<button
  onClick={scrollToContent}
  className="mt-16 flex flex-col items-center gap-2 text-muted transition hover:text-accent"
>
```

to:

```tsx
<button
  onClick={scrollToContent}
  className="mt-8 md:mt-16 hidden sm:flex flex-col items-center gap-2 text-muted transition hover:text-accent"
>
```

- [ ] **Step 5: Tighten products showcase heading spacing on mobile**

Change line 194 from:

```tsx
<h2 className="mx-auto mb-12 max-w-2xl text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl scroll-reveal">
```

to:

```tsx
<h2 className="mx-auto mb-6 md:mb-12 max-w-2xl text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl scroll-reveal">
```

- [ ] **Step 6: Visual verification**

Run: `npm run dev`

On iPhone SE (375×667): Hero should take ~60% of viewport. Content should be visible without excessive scrolling. Scroll indicator should be hidden on phones. On desktop: everything looks the same as before.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "fix: optimize hero section height and spacing for mobile viewports"
```

---

### Task 3: Flip Cards — Touch Support for Mobile

**Files:**
- Modify: `app/globals.css` (flip card section, lines ~867-919)

Flip cards rely on `:hover` to reveal the back side. On touchscreens, hover doesn't work reliably. We need `:active` and focus-within support so tapping/holding flips the card.

- [ ] **Step 1: Add touch-friendly flip card CSS**

In `app/globals.css`, after the existing `.flip-card:hover .flip-card-inner` rule (line 883-886), add:

```css
/* Touch support: flip on tap/hold for touch devices */
@media (hover: none) {
  .flip-card:active .flip-card-inner,
  .flip-card:focus-within .flip-card-inner {
    transform: rotateY(180deg);
    box-shadow: 0 12px 32px rgb(var(--color-accent) / 0.2), 0 4px 16px rgb(0 0 0 / 0.12);
  }

  [dir="rtl"] .flip-card:active .flip-card-inner,
  [dir="rtl"] .flip-card:focus-within .flip-card-inner {
    transform: rotateY(-180deg);
  }
}
```

- [ ] **Step 2: Add tabindex to flip cards that are not already links**

In `app/page.tsx`, the services flip cards (line 227) are plain `<div>` elements and can't receive focus. Change line 227 from:

```tsx
<div key={s.id} className="flip-card h-52">
```

to:

```tsx
<div key={s.id} className="flip-card h-52" tabIndex={0} role="button">
```

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

In Chrome DevTools, enable touch simulation (toggle device toolbar). Tap on a service flip card — it should flip. Tap elsewhere — it should flip back. Client and supplier cards (which are `<a>` tags) should already work via `:active`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "fix: add touch-friendly flip card support for mobile devices"
```

---

### Task 4: Footer — Stack Layout on Mobile

**Files:**
- Modify: `components/Footer.tsx:65`, `components/Footer.tsx:75-76`, `components/Footer.tsx:178`

The footer's top row uses `flex justify-between` which keeps brand and social icons side-by-side. On phones <640px, this crams everything.

- [ ] **Step 1: Make the top row stack on mobile**

In `components/Footer.tsx`, change line 65 from:

```tsx
<div className="flex items-start justify-between gap-6">
```

to:

```tsx
<div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
```

- [ ] **Step 2: Make the social/expand row wrap on mobile**

Change line 75 from:

```tsx
<div className="flex items-center gap-4 shrink-0">
```

to:

```tsx
<div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
```

- [ ] **Step 3: Fix bottom bar text size for readability**

Change line 178 from:

```tsx
<div className="mt-4 border-t border-current/20 pt-3 flex flex-col gap-2 text-[11px] opacity-80 md:flex-row md:items-center md:justify-between">
```

to:

```tsx
<div className="mt-4 border-t border-current/20 pt-3 flex flex-col gap-2 text-xs sm:text-[11px] opacity-80 md:flex-row md:items-center md:justify-between">
```

- [ ] **Step 4: Visual verification**

Run: `npm run dev`

On iPhone SE: Footer brand and social icons should stack vertically. Text should be readable. On tablet/desktop: layout remains side-by-side.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx
git commit -m "fix: stack footer layout on mobile for better readability"
```

---

### Task 5: Theme Switcher — Prevent Dropdown Overflow on Mobile

**Files:**
- Modify: `components/ThemeSwitcher.tsx:92-93`

The theme dropdown is `w-64` (256px). On a 320px phone with some padding, it overflows off-screen.

- [ ] **Step 1: Constrain dropdown width on small screens**

In `components/ThemeSwitcher.tsx`, change line 92-93 from:

```tsx
          className="theme-dropdown absolute end-0 z-50 mt-3 w-64 rounded-2xl border border-border/40 bg-surface/80 p-2 shadow-2xl backdrop-blur-xl"
```

to:

```tsx
          className="theme-dropdown absolute end-0 z-50 mt-3 w-[calc(100vw-2rem)] sm:w-64 rounded-2xl border border-border/40 bg-surface/80 p-2 shadow-2xl backdrop-blur-xl"
```

This makes the dropdown nearly full-width on phones (with 1rem margin each side) and fixed `w-64` on larger screens.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

On iPhone SE: tap theme button. Dropdown should fit within the screen without horizontal scrolling. On desktop: dropdown remains `w-64` anchored to the right.

- [ ] **Step 3: Commit**

```bash
git add components/ThemeSwitcher.tsx
git commit -m "fix: prevent theme dropdown overflow on small mobile screens"
```

---

### Task 6: Image Carousel — Larger Touch Targets + Swipe Support

**Files:**
- Modify: `components/ImageCarousel.tsx:46-63`, `components/ImageCarousel.tsx:65-76`

Carousel prev/next buttons are `h-8 w-8` (32px). Apple's HIG recommends 44px minimum for touch targets. Also, nav dots are `h-1.5` which is nearly impossible to tap accurately.

- [ ] **Step 1: Increase button touch targets on mobile**

In `components/ImageCarousel.tsx`, change lines 47-48 (the prev button) from:

```tsx
            className="absolute start-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
```

to:

```tsx
            className="absolute start-2 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
```

And change lines 56-57 (the next button) the same way:

```tsx
            className="absolute end-2 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
```

- [ ] **Step 2: Increase nav dot touch targets**

Change line 70-73 from:

```tsx
                className={`h-1.5 rounded-full transition-all ${
                  idx === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
```

to:

```tsx
                className={`h-2 sm:h-1.5 rounded-full transition-all ${
                  idx === current ? "w-6 sm:w-5 bg-white" : "w-2 sm:w-1.5 bg-white/50"
                }`}
```

- [ ] **Step 3: Add basic swipe support**

Add touch event handlers to the carousel container. In `components/ImageCarousel.tsx`, add a ref and touch handlers before the return statement (after the `if (images.length === 0)` check):

```tsx
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };
```

Add `useRef` to the import at line 3:

```tsx
import { useState, useEffect, useCallback, useRef } from "react";
```

Then add the touch handlers to the carousel wrapper div. Change line 31 from:

```tsx
      <div className={`${aspectClass} relative`}>
```

to:

```tsx
      <div
        className={`${aspectClass} relative`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
```

- [ ] **Step 4: Visual verification**

Run: `npm run dev`

On mobile simulation: Swipe left/right on a project carousel image. It should advance/go back. Prev/next buttons should be visibly larger. Nav dots should be easier to tap.

- [ ] **Step 5: Commit**

```bash
git add components/ImageCarousel.tsx
git commit -m "fix: larger touch targets and swipe support for image carousel on mobile"
```

---

### Task 7: About Page — Stack Experience Highlight on Mobile

**Files:**
- Modify: `app/about/page.tsx:140`

The experience highlight box uses `flex items-center gap-5` which keeps the "26+" badge and text side-by-side. On narrow phones, this crams the text.

- [ ] **Step 1: Make experience highlight stack on mobile**

In `app/about/page.tsx`, change line 140 from:

```tsx
            <div className="flex items-center gap-5">
```

to:

```tsx
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-start">
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

On iPhone SE: The "26+" badge should appear above the text, centered. On tablet+: side-by-side as before.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "fix: stack experience highlight on mobile for better readability"
```

---

### Task 8: Contact Page — Reduce Map Height on Mobile

**Files:**
- Modify: `app/contact/page.tsx:41`

The map iframe has `min-h-[320px]` which on a 320px-wide phone is a tall block that dominates the page.

- [ ] **Step 1: Reduce map minimum height on mobile**

In `app/contact/page.tsx`, change line 41 from:

```tsx
            className="h-full min-h-[320px] w-full"
```

to:

```tsx
            className="h-full min-h-[250px] md:min-h-[320px] w-full"
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

On iPhone SE: Map should be 250px tall instead of 320px. On desktop: unchanged.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "fix: reduce map height on mobile contact page"
```

---

### Task 9: Home Page Grids — Tighten Gaps on Mobile

**Files:**
- Modify: `app/page.tsx:197`, `app/page.tsx:213`, `app/page.tsx:225`, `app/page.tsx:284`, `app/page.tsx:320`

Several grids on the home page use `gap-6` (1.5rem) which is generous on mobile screens where container padding already takes 3rem (px-6 * 2). Reducing to `gap-4` on mobile saves 0.5rem per gap.

- [ ] **Step 1: Tighten product showcase grid gap**

Change line 197 from:

```tsx
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7 stagger-children">
```

to:

```tsx
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-7 stagger-children">
```

- [ ] **Step 2: Tighten stats grid gap**

Change line 213 from:

```tsx
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 stagger-children">
```

to:

```tsx
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 stagger-children">
```

- [ ] **Step 3: Tighten services flip card grid gap**

Change line 225 from:

```tsx
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
```

to:

```tsx
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
```

- [ ] **Step 4: Tighten clients grid gap**

Change line 284 from:

```tsx
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 stagger-children">
```

to:

```tsx
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 stagger-children">
```

- [ ] **Step 5: Tighten suppliers grid gap**

Change line 320 from:

```tsx
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger-children">
```

to:

```tsx
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger-children">
```

- [ ] **Step 6: Visual verification**

Run: `npm run dev`

On iPhone SE: Grids should feel less cramped. Cards have more breathing room relative to container width. On desktop: gaps remain the same.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "fix: tighten grid gaps on mobile for better content density"
```

---

### Task 10: Global CSS — Small-Screen Refinements

**Files:**
- Modify: `app/globals.css` (after existing responsive section, line ~810)

Add targeted CSS for phones under 640px: reduce card padding further, improve touch responsiveness.

- [ ] **Step 1: Add small-screen media query rules**

In `app/globals.css`, after the existing `@media (max-width: 768px)` block (after line 810), add:

```css
@media (max-width: 640px) {
  .card {
    padding: 1rem;
  }

  /* Ensure flip cards respond to tap on touch */
  .flip-card {
    -webkit-tap-highlight-color: transparent;
  }

  /* Reduce hero overlay gradient for better readability on small screens */
  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgb(var(--color-background) / 0.45) 0%,
      rgb(var(--color-background) / 0.65) 100%
    );
  }
}
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

On iPhone SE: Cards should have tighter padding (1rem vs 1.5rem). Hero text should be more readable with slightly stronger overlay. No tap highlight flash on flip cards.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "fix: add small-screen CSS refinements for mobile UX"
```

---

### Task 11: Header Mobile Menu — Improved UX

**Files:**
- Modify: `components/Header.tsx:59-81`

The mobile menu shows 12 flat nav items plus a CTA — a long unstyled list. Add visual grouping separators and ensure the menu doesn't overflow the viewport.

- [ ] **Step 1: Add max-height scrolling to mobile menu**

In `components/Header.tsx`, change lines 60-61 from:

```tsx
        <nav className="border-t border-border bg-surface lg:hidden">
          <div className="flex flex-col px-4 py-3">
```

to:

```tsx
        <nav className="border-t border-border bg-surface lg:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-2">
```

This ensures the menu is scrollable if the viewport is short (landscape phones), and won't push the page content out of view.

- [ ] **Step 2: Visual verification**

Run: `npm run dev`

On iPhone SE landscape (568×320): Open hamburger menu. All 12 items + CTA should be scrollable within 70% of viewport height. Menu should not push page content down off-screen.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "fix: add scrollable mobile menu with max height for small viewports"
```

---

### Task 12: Final Cross-Device Verification

This is a manual testing pass, not a code change.

- [ ] **Step 1: Run dev server**

Run: `npm run dev`

- [ ] **Step 2: Test on simulated devices in Chrome DevTools**

Test each of these viewports:
- iPhone SE (375×667) — smallest common phone
- iPhone 14 (390×844) — standard modern phone
- Galaxy S21 (360×800) — Android standard
- iPad Mini (768×1024) — tablet
- Desktop (1280×800) — verify nothing broke

For each viewport, check:
1. Home page: Hero fits nicely, scroll to content is fast, product grid looks good, flip cards work with tap
2. About page: Experience box stacks on mobile, timeline reads well
3. Contact page: Map doesn't dominate
4. Footer: Stacks nicely, text is readable
5. Theme switcher: Dropdown fits within viewport
6. Image carousel: Can swipe, buttons are tappable
7. RTL (Arabic): Switch language and verify all the above in RTL

- [ ] **Step 3: Run production build to verify no errors**

Run: `npm run build`

Expected: Build succeeds with no errors.

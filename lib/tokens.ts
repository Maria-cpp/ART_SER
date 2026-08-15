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

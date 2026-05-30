// Theme registry. Each theme maps to a `[data-theme="id"]` block in app/globals.css.
// To add a theme: add an entry here AND a matching CSS block in globals.css.

export type ThemeId = "obsidian" | "government" | "luxury" | "architectural";

export interface ThemeMeta {
  id: ThemeId;
  /** Display name shown in the switcher (English; localize in UI if desired). */
  name: string;
  /** Small swatch shown in the switcher — any CSS color. */
  swatch: string;
}

export const THEMES: ThemeMeta[] = [
  { id: "obsidian", name: "Obsidian Industrial", swatch: "#0a0a0a" },
  { id: "government", name: "Corporate Government", swatch: "#0f2747" },
  { id: "luxury", name: "Minimal Luxury", swatch: "#1a1a1a" },
  { id: "architectural", name: "Modern Architectural", swatch: "#2f3437" }
];

export const DEFAULT_THEME: ThemeId = "government";

export const THEME_STORAGE_KEY = "artser.theme";

export function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

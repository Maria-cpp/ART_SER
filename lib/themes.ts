// Theme registry. Each theme maps to a `[data-theme="id"]` block in app/globals.css.
// To add a theme: add an entry here AND a matching CSS block in globals.css.

export type ThemeId = "obsidian" | "government" | "luxury" | "architectural";

export interface ThemeMeta {
  id: ThemeId;
  /** Display name shown in the switcher (English; localize in UI if desired). */
  name: string;
  /** Color palette swatches — [bg, surface, accent, foreground] */
  palette: [string, string, string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    palette: ["#0a0a0a", "#171717", "#ca9f4a", "#ededed"],
  },
  {
    id: "government",
    name: "Corporate",
    palette: ["#f8fafc", "#ffffff", "#1e408a", "#0f172a"],
  },
  {
    id: "luxury",
    name: "Luxury",
    palette: ["#fafaf9", "#ffffff", "#b79662", "#1a1a1a"],
  },
  {
    id: "architectural",
    name: "Architectural",
    palette: ["#edeeef", "#fafafb", "#107a57", "#21252a"],
  },
];

export const DEFAULT_THEME: ThemeId = "obsidian";

export const THEME_STORAGE_KEY = "artser.theme";

export function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

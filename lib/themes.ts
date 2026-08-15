// Theme registry — consolidated to a single premium ARTSER theme.
// The multi-theme system has been replaced per the UX upgrade spec (section 29).

export type ThemeId = "artser";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  palette: [string, string, string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    id: "artser",
    name: "ARTSER",
    palette: ["#0B0B0B", "#141414", "#B58A62", "#F5F5F2"],
  },
];

export const DEFAULT_THEME: ThemeId = "artser";

export const THEME_STORAGE_KEY = "artser.theme";

export function isThemeId(value: string | null): value is ThemeId {
  return value === "artser";
}

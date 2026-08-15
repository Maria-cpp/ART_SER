"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { ThemeId, DEFAULT_THEME } from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always apply the single ARTSER theme on mount.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    window.localStorage.setItem("artser.theme", DEFAULT_THEME);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: DEFAULT_THEME }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="artser" className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <LanguageProvider initialLocale="en">
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

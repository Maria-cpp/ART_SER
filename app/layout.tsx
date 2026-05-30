import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ARTSER — Engineering, Manufacturing & Construction",
  description:
    "ARTSER is an integrated industrial and construction group delivering manufacturing, infrastructure, and government-grade projects.",
  icons: { icon: "/logo.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="obsidian" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DoorIntro } from "@/components/DoorIntro";
import { Construction3DBackground } from "@/components/Construction3DBackground";

export const metadata: Metadata = {
  title: "ARTSER — Engineering, Manufacturing & Construction",
  description:
    "ARTSER is an integrated industrial and construction group delivering manufacturing, infrastructure, and government-grade projects.",
  icons: { icon: "/logo/ARTSER_logo.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="artser" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
      </head>
      <body suppressHydrationWarning>
        <DoorIntro />
        <Construction3DBackground />
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

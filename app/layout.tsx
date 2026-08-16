import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://artser.it"),
  icons: { icon: "/logo/ARTSER_logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

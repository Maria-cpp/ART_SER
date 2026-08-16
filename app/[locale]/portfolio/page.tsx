import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import PortfolioContent from "./PortfolioContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.portfolio.title", "meta.portfolio.description", "/portfolio");
}

export default function Page() {
  return <PortfolioContent />;
}

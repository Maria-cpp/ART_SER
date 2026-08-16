import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import RequestQuoteContent from "./RequestQuoteContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.quote.title", "meta.quote.description", "/request-quote");
}

export default function Page() {
  return <RequestQuoteContent />;
}

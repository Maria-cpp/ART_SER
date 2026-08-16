import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import GovernmentContent from "./GovernmentContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.government.title", "meta.government.description", "/government");
}

export default function Page() {
  return <GovernmentContent />;
}

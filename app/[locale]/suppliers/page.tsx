import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import SuppliersContent from "./SuppliersContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.suppliers.title", "meta.suppliers.description", "/suppliers");
}

export default function Page() {
  return <SuppliersContent />;
}

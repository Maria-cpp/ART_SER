import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import ManufacturingContent from "./ManufacturingContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.manufacturing.title", "meta.manufacturing.description", "/manufacturing");
}

export default function Page() {
  return <ManufacturingContent />;
}

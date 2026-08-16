import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import JvProjectsContent from "./JvProjectsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.jv.title", "meta.jv.description", "/jv-projects");
}

export default function Page() {
  return <JvProjectsContent />;
}

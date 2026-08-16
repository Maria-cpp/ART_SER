import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import CertificationsContent from "./CertificationsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.certifications.title", "meta.certifications.description", "/certifications");
}

export default function Page() {
  return <CertificationsContent />;
}

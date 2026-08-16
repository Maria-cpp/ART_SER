import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import GalleryContent from "./GalleryContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.gallery.title", "meta.gallery.description", "/gallery");
}

export default function Page() {
  return <GalleryContent />;
}

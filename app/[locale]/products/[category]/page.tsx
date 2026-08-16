import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import ProductCategoryContent from "./ProductCategoryContent";

const CATEGORY_META_MAP: Record<string, { titleKey: string; descKey: string }> = {
  windows: { titleKey: "products.windows.title", descKey: "products.windows.description" },
  doors: { titleKey: "products.doors.title", descKey: "products.doors.description" },
  "sliding-folding": { titleKey: "products.sliding.title", descKey: "products.sliding.description" },
  facades: { titleKey: "products.facades.title", descKey: "products.facades.description" },
  conservatories: { titleKey: "products.conservatories.title", descKey: "products.conservatories.description" },
  "smart-buildings": { titleKey: "products.smart.title", descKey: "products.smart.description" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  const meta = CATEGORY_META_MAP[category];
  if (!meta) return {};
  return pageMetadata(locale as Locale, meta.titleKey, meta.descKey, `/products/${category}`);
}

export default function ProductCategoryPage() {
  return <ProductCategoryContent />;
}

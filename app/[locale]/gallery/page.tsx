"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getGallery } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function GalleryPage() {
  const { t, localized } = useLanguage();
  const items = getGallery();
  useScrollReveal();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.gallery" }]} />
      </div>
      <Section title={t("gallery.title")} subtitle={t("gallery.subtitle")}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((g) => (
          <figure key={g.id} className="overflow-hidden rounded-lg border border-border">
            <div className="aspect-[4/3] bg-surface-alt overflow-hidden">
              <img src={g.image} alt={localized(g.caption)} className="h-full w-full object-cover" />
            </div>
            <figcaption className="bg-surface px-3 py-2 text-sm text-muted">{localized(g.caption)}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
    </>
  );
}

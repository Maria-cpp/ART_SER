"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getManufacturing } from "@/lib/data";

export default function ManufacturingPage() {
  const { t, localized } = useLanguage();
  const data = getManufacturing();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "sidebar.projects", href: "/portfolio" }, { label: "nav.manufacturing" }]} />
      </div>
      <Section title={t("manufacturing.title")} subtitle={t("manufacturing.subtitle")}>
      <p className="mb-10 max-w-3xl text-foreground">{localized(data.intro)}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.capabilities.map((c) => (
          <div key={c.id} className="card">
            <h3 className="text-lg font-semibold text-foreground">{localized(c.title)}</h3>
            <p className="mt-2 text-sm text-muted">{localized(c.description)}</p>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}

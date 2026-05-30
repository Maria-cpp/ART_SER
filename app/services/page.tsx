"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServices } from "@/lib/data";

export default function ServicesPage() {
  const { t, localized } = useLanguage();
  const services = getServices();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.services" }]} />
      </div>
      <Section title={t("services.title")} subtitle={t("services.subtitle")}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="card">
            <h3 className="text-lg font-semibold text-foreground">{localized(s.title)}</h3>
            <p className="mt-2 text-sm text-muted">{localized(s.description)}</p>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}

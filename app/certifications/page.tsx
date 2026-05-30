"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCertifications } from "@/lib/data";

export default function CertificationsPage() {
  const { t, localized } = useLanguage();
  const items = getCertifications();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.certifications" }]} />
      </div>
      <Section title={t("certifications.title")} subtitle={t("certifications.subtitle")}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <div key={c.id} className="card text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded bg-surface-alt" />
            <h3 className="font-semibold text-foreground">{c.name}</h3>
            <p className="mt-1 text-sm text-muted">{localized(c.description)}</p>
            <p className="mt-2 text-xs text-muted">{c.issuer} · {c.year}</p>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}

"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getClients } from "@/lib/data";

export default function ClientsPage() {
  const { t, localized } = useLanguage();
  const clients = getClients();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.clients" }]} />
      </div>
      <Section title={t("clients.title")} subtitle={t("clients.subtitle")}>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((c) => (
          <div key={c.id} className="card text-center">
            <div className="mx-auto mb-3 h-12 w-24 rounded bg-surface-alt" />
            <h3 className="font-semibold text-foreground">{c.name}</h3>
            <p className="text-sm text-muted">{localized(c.sector)}</p>
          </div>
        ))}
      </div>
    </Section>
    </>
  );
}

"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getGovProjects } from "@/lib/data";

export default function GovernmentPage() {
  const { t, localized } = useLanguage();
  const items = getGovProjects();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "sidebar.projects", href: "/portfolio" }, { label: "nav.government" }]} />
      </div>
      <Section title={t("government.title")} subtitle={t("government.subtitle")}>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <article key={p.id} className="card">
            {p.image && (
              <div className="mb-3 aspect-video rounded-md bg-surface-alt overflow-hidden">
                <img src={p.image} alt={localized(p.title)} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{localized(p.title)}</h3>
            <p className="mt-1 text-sm text-muted">{p.location} · {p.year}</p>
            <p className="mt-2 text-sm text-muted">{localized(p.summary)}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">{t("common.authority")}</p>
            <p className="text-sm text-muted">{localized(p.authority)}</p>
          </article>
        ))}
      </div>
    </Section>
    </>
  );
}

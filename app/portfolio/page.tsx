"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProjects } from "@/lib/data";

export default function PortfolioPage() {
  const { t, localized } = useLanguage();
  const projects = getProjects();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: "breadcrumb.home", href: "/" },
          { label: "nav.portfolio" },
        ]} />
      </div>
      <Section title={t("portfolio.title")} subtitle={t("portfolio.subtitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-md bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">{localized(p.category)}</span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{localized(p.title)}</h3>
              <p className="mt-1 text-sm text-muted">{p.location} · {p.year}</p>
              <p className="mt-2 text-sm text-muted">{localized(p.summary)}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

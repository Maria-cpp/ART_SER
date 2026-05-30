"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCompany, getTeam } from "@/lib/data";

export default function AboutPage() {
  const { t, localized } = useLanguage();
  const company = getCompany();
  const team = getTeam();

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.about" }]} />
      </div>
      <Section title={t("about.title")} subtitle={localized(company.tagline)}>
        <p className="max-w-3xl text-foreground">{localized(company.story)}</p>
      </Section>

      <Section alt>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-accent">{t("about.mission")}</h3>
            <p className="mt-2 text-muted">{localized(company.mission)}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-accent">{t("about.vision")}</h3>
            <p className="mt-2 text-muted">{localized(company.vision)}</p>
          </div>
        </div>
      </Section>

      <Section title={t("about.team")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.id} className="card">
              <div className="mb-4 h-24 w-24 rounded-full bg-surface-alt" />
              <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm font-medium text-accent">{localized(m.role)}</p>
              <p className="mt-2 text-sm text-muted">{localized(m.bio)}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

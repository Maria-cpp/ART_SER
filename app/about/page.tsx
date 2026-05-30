"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCompany } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function AboutPage() {
  const { t, localized } = useLanguage();
  const company = getCompany();
  useScrollReveal();

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

      {/* Professional Journey */}
      {company.journey && (
        <Section title={t("about.journey")} subtitle={t("about.journeySubtitle")}>
          {/* Timeline */}
          <div className="max-w-4xl space-y-8">
            {/* Beginnings */}
            <div className="relative ps-8 border-s-2 border-accent/20">
              <div className="absolute start-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-accent" />
              <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">2001 — 2015</p>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                <a
                  href="https://www.dalboscoengineering.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  Dal Bosco Serramenti srl
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </h4>
              <p className="text-sm leading-relaxed text-muted">{localized(company.journey.beginnings)}</p>
            </div>

            {/* Independence */}
            <div className="relative ps-8 border-s-2 border-accent/20">
              <div className="absolute start-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-accent" />
              <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">2015 — {new Date().getFullYear()}</p>
              <h4 className="text-lg font-semibold text-foreground mb-2">ART SER DI SHEHEZAD TARIQ</h4>
              <p className="text-sm leading-relaxed text-muted">{localized(company.journey.independence)}</p>
            </div>
          </div>

          {/* Specializations & Qualifications */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card border border-border">
              <h3 className="text-lg font-semibold text-accent mb-4">{t("about.specializations")}</h3>
              <ul className="space-y-3">
                {company.journey.specializations.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {localized(spec)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border border-border">
              <h3 className="text-lg font-semibold text-accent mb-4">{t("about.qualifications")}</h3>
              <ul className="space-y-3">
                {company.journey.qualifications.map((qual, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {localized(qual)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Collaborations */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-accent mb-4">{t("about.collaborations")}</h3>
            <p className="text-sm leading-relaxed text-muted mb-8">{localized(company.journey.collaborations)}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {company.journey.partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-surface p-6 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-white p-2 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    {partner.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors">
                    {t("suppliers.visitWebsite")}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Experience highlight */}
          <div className="mt-10 rounded-xl border-2 border-accent/30 bg-accent/5 p-6">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-accent text-white font-bold text-3xl shadow-lg shadow-accent/20">
                26+
              </div>
              <p className="text-base leading-relaxed text-foreground font-medium">{localized(company.journey.experience)}</p>
            </div>
          </div>
        </Section>
      )}

    </>
  );
}

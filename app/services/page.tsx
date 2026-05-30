"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServices } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ServicesPage() {
  const { t, localized } = useLanguage();
  const services = getServices();
  useScrollReveal();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.services" }]} />
      </div>
      <Section title={t("services.title")} subtitle={t("services.subtitle")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s) => (
            <div key={s.id} className="flip-card h-56">
              <div className="flip-card-inner">
                {/* Front — title only */}
                <div className="flip-card-front flex flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{localized(s.title)}</h3>
                </div>
                {/* Back — description */}
                <div className="flip-card-back flex flex-col items-center justify-center gap-3 bg-accent/10 p-6 text-center">
                  <h3 className="text-base font-bold text-accent">{localized(s.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted">{localized(s.description)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getClients } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ClientsPage() {
  const { t, localized } = useLanguage();
  const clients = getClients();
  useScrollReveal();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.clients" }]} />
      </div>
      <Section title={t("clients.title")} subtitle={t("clients.subtitle")}>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 stagger-children">
          {clients.map((c) => (
            <a
              key={c.id}
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flip-card h-56"
            >
              <div className="flip-card-inner">
                {/* Front — logo + name */}
                <div className="flip-card-front flex flex-col items-center justify-center gap-4 bg-surface p-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-2">
                    <img src={c.logo} alt={c.name} className="h-16 w-16 object-contain" />
                  </div>
                  <span className="text-sm font-bold text-foreground text-center leading-tight">{c.name}</span>
                </div>
                {/* Back — details */}
                <div className="flip-card-back flex flex-col items-center justify-center gap-3 bg-accent/10 p-5">
                  <span className="text-lg font-bold text-accent text-center">{c.name}</span>
                  <span className="text-sm text-muted">{localized(c.sector)}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-2">
                    {t("suppliers.visitWebsite")}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

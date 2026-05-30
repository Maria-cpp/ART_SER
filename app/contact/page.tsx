"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getContact } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactPage() {
  const { t, localized } = useLanguage();
  const contact = getContact();
  useScrollReveal();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.contact" }]} />
      </div>
      <Section title={t("contact.title")} subtitle={t("contact.subtitle")}>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">{t("contact.headquarters")}</h3>
          <p className="text-muted">{contact.headquarters.address}</p>
          <p className="mt-2 text-muted">{contact.email}</p>
          <p className="text-muted" dir="ltr">{contact.phone}</p>

          <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">{t("contact.offices")}</h3>
          <ul className="space-y-4">
            {contact.offices.map((o) => (
              <li key={o.city} className="card">
                <p className="font-semibold text-foreground">{localized(o.label)}</p>
                <p className="text-sm text-muted">{o.address}</p>
                <p className="text-sm text-muted" dir="ltr">{o.phone}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            title="map"
            src={contact.mapEmbed}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSuppliers } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function SuppliersPage() {
  const { t, localized } = useLanguage();
  const suppliers = getSuppliers();
  useScrollReveal();

  // Group suppliers by type
  const aluminium = suppliers.filter((s) => s.id !== "sup-004" && s.id !== "sup-005");
  const pvc = suppliers.filter((s) => s.id === "sup-004");
  const shutters = suppliers.filter((s) => s.id === "sup-005");

  const groups = [
    { label: t("suppliers.aluminium"), items: aluminium },
    { label: t("suppliers.pvc"), items: pvc },
    { label: t("suppliers.shutters"), items: shutters },
  ];

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.suppliers" }]} />
      </div>
      <Section title={t("suppliers.title")} subtitle={t("suppliers.subtitle")}>
        {groups.map((group) => (
          <div key={group.label} className="mb-14 last:mb-0">
            <h3 className="mb-6 text-xl font-semibold text-accent">{group.label}</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {group.items.map((supplier) => (
                <article key={supplier.id} className="card flex flex-col">
                  {/* Header with logo placeholder and name */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-bold text-lg">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{supplier.name}</h4>
                      <p className="text-xs text-muted">{supplier.country} · {localized(supplier.type)}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted flex-1">
                    {localized(supplier.description)}
                  </p>

                  {/* Products */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                      {t("suppliers.products")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.products.map((product) => (
                        <span
                          key={product}
                          className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs text-muted"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Website link */}
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
                  >
                    {t("suppliers.visitWebsite")}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}

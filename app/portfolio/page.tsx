"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Construction3DBackground } from "@/components/Construction3DBackground";
import { getProjects, getSuppliers } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function PortfolioPage() {
  const { t, localized } = useLanguage();
  const projects = getProjects();
  const suppliers = getSuppliers();
  useScrollReveal();

  const aluminium = suppliers.filter((s) => s.id !== "sup-004" && s.id !== "sup-005");
  const pvc = suppliers.filter((s) => s.id === "sup-004");
  const shutters = suppliers.filter((s) => s.id === "sup-005");

  const supplierGroups = [
    { label: t("suppliers.aluminium"), items: aluminium },
    { label: t("suppliers.pvc"), items: pvc },
    { label: t("suppliers.shutters"), items: shutters },
  ];
  return (
    <>
      <Construction3DBackground />
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: "breadcrumb.home", href: "/" },
          { label: "nav.portfolio" },
        ]} />
      </div>
      <Section title={t("portfolio.title")} subtitle={t("portfolio.subtitle")}>
        <div className="space-y-10">
          {projects.map((p) => (
            <article key={p.id} className="card grid gap-6 lg:grid-cols-2 p-0 overflow-hidden">
              <div className="lg:p-0">
                {p.images && p.images.length > 1 ? (
                  <ImageCarousel images={p.images} aspectClass="aspect-[4/3]" />
                ) : (
                  <div className="aspect-[4/3] bg-surface-alt overflow-hidden rounded-xl lg:rounded-none lg:rounded-s-xl">
                    {p.image && <img src={p.image} alt={localized(p.title)} className="h-full w-full object-cover" />}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 lg:py-8 lg:pe-8 lg:ps-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">{localized(p.category)}</span>
                <h3 className="mt-2 text-xl font-bold text-foreground lg:text-2xl">{localized(p.title)}</h3>
                <p className="mt-1 text-sm text-muted">{p.location} · {p.year}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{localized(p.summary)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Suppliers Section */}
      <Section title={t("suppliers.title")} subtitle={t("suppliers.subtitle")}>
        {supplierGroups.map((group) => (
          <div key={group.label} className="mb-14 last:mb-0">
            <h3 className="mb-6 text-xl font-semibold text-accent">{group.label}</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {group.items.map((supplier) => (
                <article key={supplier.id} className="card flex flex-col">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                      <img src={supplier.logo} alt={supplier.name} className="h-10 w-10 object-contain" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{supplier.name}</h4>
                      <p className="text-xs text-muted">{supplier.country} · {localized(supplier.type)}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted flex-1">
                    {localized(supplier.description)}
                  </p>
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

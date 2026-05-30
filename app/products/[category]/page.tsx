"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategories, getProjects } from "@/lib/data";

const CATEGORY_KEY_MAP: Record<string, string> = {
  windows: "products.windows",
  doors: "products.doors",
  "sliding-folding": "products.sliding",
  facades: "products.facades",
  conservatories: "products.conservatories",
  "smart-buildings": "products.smart",
};

export default function ProductCategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const { t, localized } = useLanguage();

  const categories = getCategories();
  const category = categories.find((c) => c.id === slug);
  const projects = getProjects();

  const keyPrefix = CATEGORY_KEY_MAP[slug];

  if (!category || !keyPrefix) {
    return (
      <div className="container-x py-10">
        <Breadcrumbs
          items={[
            { label: "breadcrumb.home", href: "/" },
            { label: "breadcrumb.products", href: "/products" },
            { label: slug, isKey: false },
          ]}
        />
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
      </div>
    );
  }

  const title = t(`${keyPrefix}.title`);
  const description = t(`${keyPrefix}.description`);

  const otherCategories = categories.filter(
    (c) => c.id !== slug && c.id !== "all-products"
  );

  return (
    <div className="pb-16">
      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "breadcrumb.home", href: "/" },
            { label: "breadcrumb.products", href: "/products" },
            { label: title, isKey: false },
          ]}
        />
      </div>

      <section className="relative">
        <div className="aspect-[21/9] w-full bg-surface-alt flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center gap-4 text-muted">
            <CategoryIcon name={category.icon} className="h-24 w-24 opacity-20" />
          </div>
          <div className="product-hero-overlay absolute inset-0" />
        </div>
      </section>

      <div className="container-x -mt-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:underline">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {t("products.searchCompare")}
            </button>
          </div>
        </div>
      </div>

      <div className="container-x mt-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {t("home.projectsTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-md bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {localized(p.category)}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {localized(p.title)}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {p.location} &middot; {p.year}
              </p>
              <p className="mt-2 text-sm text-muted">{localized(p.summary)}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="container-x mt-16">
        <h2 className="mb-6 text-lg font-bold text-foreground">
          {t("sidebar.products")}
        </h2>
        <div className="flex flex-wrap gap-3">
          {otherCategories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              <CategoryIcon name={c.icon} className="h-4 w-4" />
              {localized(c.name)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

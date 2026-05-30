"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ImageCarousel } from "@/components/ImageCarousel";
import { getCategories, getProductCategory } from "@/lib/data";

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
  const { t, localized, locale } = useLanguage();

  const categories = getCategories();
  const category = categories.find((c) => c.id === slug);
  const productData = getProductCategory(slug);

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

  const featuresForLocale = (features: { en: string[]; it: string[]; ar: string[]; ur: string[] }) => {
    return features[locale as keyof typeof features] || features.en;
  };

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

      {/* Hero carousel */}
      <div className="container-x mt-6">
        {productData && <ImageCarousel images={productData.images} aspectClass="aspect-[16/7]" />}
      </div>

      {/* Title & description */}
      <div className="container-x mt-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </div>

      {/* Subcategories */}
      {productData && productData.subcategories.length > 0 && (
        <div className="container-x mt-14">
          <div className="space-y-10">
            {productData.subcategories.map((sub, idx) => (
              <article
                key={sub.id}
                className={`grid gap-8 rounded-2xl border border-border bg-surface p-6 md:p-8 lg:grid-cols-2 ${
                  idx % 2 === 1 ? "lg:direction-reverse" : ""
                }`}
              >
                {/* Text side */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {localized(sub.title)}
                  </h2>
                  <p className="mt-1 text-sm font-medium tracking-wide text-accent">
                    {localized(sub.tagline)}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">
                    {localized(sub.description)}
                  </p>

                  {/* Features */}
                  <div className="mt-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                      {t("products.keyFeatures")}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {featuresForLocale(sub.features).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable for */}
                  {sub.suitableFor && (
                    <div className="mt-5">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                        {t("products.suitableFor")}
                      </h3>
                      <p className="mt-2 text-sm text-muted">
                        {localized(sub.suitableFor)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Visual side */}
                <div className="flex items-center justify-center rounded-xl bg-accent/5 p-8">
                  <div className="text-center">
                    <CategoryIcon name={category.icon} className="mx-auto h-20 w-20 text-accent opacity-30" />
                    <p className="mt-4 text-lg font-semibold text-accent">{localized(sub.title)}</p>
                    <p className="mt-1 text-sm text-muted italic">{localized(sub.tagline)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="container-x mt-14">
        <div className="rounded-2xl bg-accent/10 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-foreground">
            {t("products.requestQuote")}
          </h2>
          <p className="mt-3 text-muted">{t("hero.subtitle")}</p>
          <Link href="/request-quote" className="btn-accent mt-6 inline-flex">
            {t("nav.requestQuote")}
          </Link>
        </div>
      </div>

      {/* Other product categories */}
      <div className="container-x mt-14">
        <h2 className="mb-6 text-lg font-bold text-foreground">
          {t("products.otherProducts")}
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

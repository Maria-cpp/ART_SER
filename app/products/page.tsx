"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategories } from "@/lib/data";

export default function ProductsPage() {
  const { t, localized } = useLanguage();
  const categories = getCategories().filter((c) => c.id !== "all-products");

  return (
    <div className="container-x py-10">
      <Breadcrumbs
        items={[
          { label: "breadcrumb.home", href: "/" },
          { label: "breadcrumb.products" },
        ]}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-accent">{t("products.title")}</h1>
        <p className="mt-3 text-muted">{t("products.subtitle")}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const keyMap: Record<string, string> = {
            windows: "products.windows.description",
            doors: "products.doors.description",
            "sliding-folding": "products.sliding.description",
            facades: "products.facades.description",
            conservatories: "products.conservatories.description",
            "smart-buildings": "products.smart.description",
          };
          const descKey = keyMap[c.id] || "";
          return (
            <Link
              key={c.id}
              href={c.href}
              className="card group flex items-start gap-4"
            >
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:scale-110">
                <CategoryIcon name={c.icon} className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition">
                  {localized(c.name)}
                </h2>
                {descKey && (
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {t(descKey)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

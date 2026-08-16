"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCategories } from "@/lib/data";

const PRODUCT_MATERIALS: Record<string, { application: string; material: string }> = {
  windows: { application: "Residential / Commercial", material: "Aluminium" },
  doors: { application: "Residential / Commercial", material: "Aluminium" },
  "sliding-folding": { application: "Residential / Commercial", material: "Aluminium" },
  facades: { application: "Commercial / Industrial", material: "Aluminium / Glass" },
  conservatories: { application: "Residential", material: "Aluminium / Glass" },
  "smart-buildings": { application: "Commercial", material: "Aluminium / Integrated Systems" },
};

export function ProductsSection() {
  const { t, localized } = useLanguage();
  const categories = getCategories().filter((c) => c.id !== "all-products");

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("products.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("products.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("products.homeSubtitle")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {categories.map((c) => {
            const meta = PRODUCT_MATERIALS[c.id] || { application: "—", material: "Aluminium" };

            return (
              <Link
                key={c.id}
                href={c.href}
                className="group relative border border-[#2A2A2A] bg-[#141414]/50 p-6 md:p-8 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#141414]"
              >
                {/* Product name */}
                <h3 className="text-base md:text-lg font-bold text-[#F5F5F2] mb-4 group-hover:text-[#B58A62] transition-colors duration-300">
                  {localized(c.name)}
                </h3>

                {/* Technical details */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-2">
                    <span className="text-[#747474] uppercase tracking-wider">{t("products.application")}</span>
                    <span className="text-[#B8B8B8]">{meta.application}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-2">
                    <span className="text-[#747474] uppercase tracking-wider">{t("products.material")}</span>
                    <span className="text-[#B8B8B8]">{meta.material}</span>
                  </div>
                </div>

                {/* View details link */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#B58A62] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t("products.viewDetails")} &rarr;
                  </span>
                </div>

                {/* Accent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#B58A62] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>

        <div className="mt-12 scroll-reveal">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("common.viewAll") || "View all"}
          </Link>
        </div>
      </div>
    </section>
  );
}

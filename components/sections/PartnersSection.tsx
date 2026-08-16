"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSuppliers } from "@/lib/data";

export function PartnersSection() {
  const { t } = useLanguage();
  const suppliers = getSuppliers();

  // Group suppliers by type
  const aluminium = suppliers.filter((s) => {
    const typeEn = typeof s.type === "object" && s.type !== null ? (s.type as Record<string, string>).en : "";
    return typeEn?.includes("Aluminium");
  });
  const pvc = suppliers.filter((s) => {
    const typeEn = typeof s.type === "object" && s.type !== null ? (s.type as Record<string, string>).en : "";
    return typeEn?.includes("PVC");
  });
  const protection = suppliers.filter((s) => {
    const typeEn = typeof s.type === "object" && s.type !== null ? (s.type as Record<string, string>).en : "";
    return !typeEn?.includes("Aluminium") && !typeEn?.includes("PVC");
  });

  const groups = [
    { label: t("partners.categoryAluminium"), items: aluminium },
    { label: t("partners.categoryPVC"), items: pvc },
    { label: t("partners.categoryProtection"), items: protection },
  ].filter((g) => g.items.length > 0);

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("partners.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("partners.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("partners.subtitle")}
        </p>

        {/* ARTSER center node */}
        <div className="mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-3 border border-[#B58A62]/40 bg-[#B58A62]/5 px-6 py-3">
            <div className="h-3 w-3 rounded-full bg-[#B58A62]" />
            <span className="text-xs font-bold text-[#B58A62] uppercase tracking-[0.2em]">
              {t("partners.artserLabel")}
            </span>
          </div>
        </div>

        {/* Supplier groups */}
        <div className="space-y-12 stagger-children">
          {groups.map((group) => (
            <div key={group.label}>
              {/* Group label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-[#2A2A2A]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#747474] font-medium shrink-0">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-[#2A2A2A]" />
              </div>

              {/* Supplier logos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {group.items.map((s) => (
                  <a
                    key={s.id}
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 border border-[#2A2A2A] bg-[#0B0B0B]/50 p-6 transition-all duration-300 hover:border-[#B58A62]/40"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-white p-2">
                      <img src={s.logo} alt={s.name} className="h-12 w-12 object-contain" />
                    </div>
                    <span className="text-xs font-medium text-[#F5F5F2] text-center">{s.name}</span>
                    <span className="text-[10px] text-[#747474]">{s.country}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

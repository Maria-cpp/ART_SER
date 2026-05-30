"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCertifications } from "@/lib/data";

export default function CertificationsPage() {
  const { t, localized } = useLanguage();
  const items = getCertifications();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.certifications" }]} />
      </div>
      <Section title={t("certifications.title")} subtitle={t("certifications.subtitle")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div key={c.id} className="card text-center group">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(c.image);
                  setSelectedName(c.name);
                }}
                className="relative mx-auto mb-4 w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface-alt cursor-pointer"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
              <h3 className="font-semibold text-foreground text-sm leading-tight">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">{localized(c.description)}</p>
              <p className="mt-2 text-xs text-muted">{c.issuer} &middot; {c.year}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground shadow-lg hover:bg-accent hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt={selectedName}
              width={1200}
              height={900}
              className="rounded-lg object-contain max-h-[85vh]"
              sizes="90vw"
            />
            <p className="mt-3 text-center text-sm text-white/80 font-medium">{selectedName}</p>
          </div>
        </div>
      )}
    </>
  );
}

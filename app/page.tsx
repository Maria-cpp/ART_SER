"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ImageCarousel } from "@/components/ImageCarousel";
import { getCompany, getServices, getProjects, getClients, getCategories, getSuppliers } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

const HeroTypewriter = dynamic(() => import("@/components/HeroTypewriter"), {
  ssr: false,
  loading: () => <div className="min-h-[1.2em]" />,
});

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  factory: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l4 3V10l4 3V6h8v14" />
      <path d="M14 10h.01M18 10h.01M14 14h.01M18 14h.01" />
    </svg>
  ),
  building: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
      <path d="M9 9v.01M9 13v.01M9 17v.01" />
    </svg>
  ),
  wrench: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  compass: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  road: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h4M16 19h4M5 5l2 14M19 5l-2 14" />
      <path d="M12 5v2M12 11v2M12 17v2" />
    </svg>
  ),
  clipboard: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

function ServiceIcon({ name }: { name: string }) {
  return SERVICE_ICONS[name] ?? SERVICE_ICONS.wrench;
}

export default function HomePage() {
  const { t, localized, locale } = useLanguage();
  const company = getCompany();
  const services = getServices().slice(0, 6);
  const projects = getProjects().slice(0, 3);
  const clients = getClients();
  const categories = getCategories();
  const suppliers = getSuppliers();

  useScrollReveal();

  const scrollToContent = () => {
    document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" });
  };

  const heroImages = [
    "/hero/IMG_20230501_154302.jpg",
    "/hero/20220131_160138.jpg",
    "/hero/IMG_20221111_150227.jpg",
    "/hero/IMG_20230708_122420.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background slideshow */}
        <div className="hero-slideshow">
          {heroImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`hero-slideshow-img ${idx === currentSlide ? "active" : ""}`}
            />
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="container-x relative z-10 flex min-h-[60vh] md:min-h-[85vh] flex-col items-center justify-center py-10 md:py-20 text-center">
          <div className="mb-6 scroll-reveal">
            <Image
              src="/ART_SER_logo.png"
              alt={company.name}
              width={280}
              height={100}
              className="mx-auto h-auto w-auto max-h-24"
              priority
            />
          </div>

          <HeroTypewriter />

          <p className="mt-4 md:mt-8 max-w-2xl text-base md:text-lg text-foreground/80 scroll-reveal">
            {t("hero.subtitle")}
          </p>

          <div className="mt-6 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4 scroll-reveal">
            <div className="relative">
              <button
                onClick={() => setPortfolioOpen((o) => !o)}
                className="btn-accent inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                {t("hero.downloadPortfolio")}
              </button>
              {portfolioOpen && (
                <div className="absolute start-0 top-full mt-2 z-20 min-w-[220px] rounded-lg border border-border bg-surface p-2 shadow-xl">
                  <a
                    href="/ART_SER_Portfolio_EN.pdf"
                    download="ART_SER_Portfolio_EN.pdf"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                    onClick={() => setPortfolioOpen(false)}
                  >
                    <svg className="h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Portfolio — English
                  </a>
                  <a
                    href="/ART_SER_Portafoglio_IT.pdf"
                    download="ART_SER_Portafoglio_IT.pdf"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground transition hover:bg-accent/10 hover:text-accent"
                    onClick={() => setPortfolioOpen(false)}
                  >
                    <svg className="h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Portafoglio — Italiano
                  </a>
                </div>
              )}
            </div>
            <Link href="/portfolio" className="btn-outline">
              {t("hero.secondaryCta")}
            </Link>
          </div>

          <button
            onClick={scrollToContent}
            className="mt-8 md:mt-16 hidden sm:flex flex-col items-center gap-2 text-muted transition hover:text-accent"
          >
            <span className="text-xs tracking-widest uppercase">
              {t("hero.scrollToExplore")}
            </span>
            <div className="scroll-indicator">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      <div id="content-start" />

      {/* Founder / About ARTSER */}
      {company.journey && <Section title={t("home.founderTitle")} subtitle={t("home.founderSubtitle")} alt>
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          {/* Left: Journey summary */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {t("home.founderSince")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {t("home.founderBased")}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{localized(company.journey.beginnings)}</p>
            <p className="text-sm leading-relaxed text-muted">{localized(company.journey.independence)}</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              {t("home.founderLearnMore")}
              <svg className="h-3.5 w-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Right: Specializations + experience badge */}
          <div>
            <ul className="space-y-2.5 mb-5">
              {company.journey.specializations.slice(0, 4).map((spec, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {localized(spec)}
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-white font-bold text-xl shadow-md shadow-accent/20">
                  26+
                </div>
                <p className="text-sm leading-relaxed text-foreground font-medium">{localized(company.journey.experience)}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>}

      {/* Services — flip cards */}
      <Section title={t("home.servicesTitle")}>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s) => (
            <div key={s.id} className="flip-card h-52" tabIndex={0} role="button">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{localized(s.title)}</h3>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center gap-2 bg-accent/10 p-5 text-center">
                  <h3 className="text-sm font-bold text-accent">{localized(s.title)}</h3>
                  <p className="text-xs leading-relaxed text-muted">{localized(s.description)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>

      {/* Featured projects */}
      <Section title={t("home.projectsTitle")}>
        <div className="space-y-8 stagger-children">
          {projects.map((p) => (
            <article key={p.id} className="card grid gap-6 lg:grid-cols-2 p-0 overflow-hidden">
              <div>
                {p.images && p.images.length > 1 ? (
                  <ImageCarousel images={p.images} aspectClass="aspect-[4/3]" />
                ) : (
                  <div className="aspect-[4/3] bg-surface-alt overflow-hidden">
                    {p.image && <img src={p.image} alt={localized(p.title)} className="h-full w-full object-cover" />}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 lg:py-8 lg:pe-8 lg:ps-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {localized(p.category)}
                </span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{localized(p.title)}</h3>
                <p className="mt-1 text-sm text-muted">{p.location} &middot; {p.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-4">{localized(p.summary)}</p>
                <Link href="/portfolio" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  {t("common.readMore")}
                  <svg className="h-3 w-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/portfolio" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>

      {/* Clients — flip cards */}
      <Section title={t("home.clientsTitle")}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 stagger-children">
          {clients.map((c) => (
            <a
              key={c.id}
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flip-card h-52"
            >
              <div className="flip-card-inner">
                {/* Front — logo + name */}
                <div className="flip-card-front flex flex-col items-center justify-center gap-3 bg-surface p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2">
                    <img src={c.logo} alt={c.name} className="h-12 w-12 object-contain" />
                  </div>
                  <span className="text-sm font-bold text-foreground text-center leading-tight">{c.name}</span>
                </div>
                {/* Back — details */}
                <div className="flip-card-back flex flex-col items-center justify-center gap-3 bg-accent/10 p-5">
                  <span className="text-base font-bold text-accent text-center">{c.name}</span>
                  <span className="text-xs text-muted">{localized(c.sector)}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                    {t("suppliers.visitWebsite")}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Suppliers — flip cards */}
      <Section title={t("home.suppliersTitle")} subtitle={t("home.suppliersSubtitle")}>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger-children">
          {suppliers.map((s) => (
            <a
              key={s.id}
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flip-card h-64"
            >
              <div className="flip-card-inner">
                {/* Front — logo + name */}
                <div className="flip-card-front flex flex-col items-center justify-center gap-4 bg-surface p-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-2">
                    <img src={s.logo} alt={s.name} className="h-16 w-16 object-contain" />
                  </div>
                  <span className="text-sm font-bold text-foreground text-center">{s.name}</span>
                  <span className="text-xs text-muted">{s.country}</span>
                </div>
                {/* Back — details */}
                <div className="flip-card-back flex flex-col items-center justify-center gap-3 bg-accent/10 p-5">
                  <span className="text-base font-bold text-accent text-center">{s.name}</span>
                  <span className="text-xs text-muted text-center">{localized(s.type)}</span>
                  <p className="text-xs text-muted text-center line-clamp-4">{localized(s.description)}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-1">
                    {t("suppliers.visitWebsite")}
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/suppliers" className="btn-outline">{t("suppliers.viewAll")}</Link>
        </div>
      </Section>

      {/* Products showcase */}
      <Section title={t("home.productsShowcaseTitle")} alt>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-7 stagger-children">
          {categories.map((c) => (
            <Link key={c.id} href={c.href} className="group flex flex-col items-center gap-3">
              <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-accent/20">
                <CategoryIcon name={c.icon} className="h-10 w-10" />
              </span>
              <span className="text-center text-sm font-medium text-foreground">{localized(c.name)}</span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/products" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>
    </>
  );
}

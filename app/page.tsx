"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCompany, getServices, getProjects, getClients, getCategories, getSuppliers } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";

const HeroTypewriter = dynamic(() => import("@/components/HeroTypewriter"), {
  ssr: false,
  loading: () => <div className="min-h-[1.2em]" />,
});

export default function HomePage() {
  const { t, localized } = useLanguage();
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
    "/hero/slide-1.jpg",
    "/hero/slide-2.jpg",
    "/hero/slide-3.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

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

        <div className="container-x relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
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

          <p className="mt-8 max-w-2xl text-lg text-muted scroll-reveal">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 scroll-reveal">
            <a
              href="/portfolio.pdf"
              download
              className="btn-accent inline-flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              {t("hero.downloadPortfolio")}
            </a>
            <Link href="/portfolio" className="btn-outline">
              {t("hero.secondaryCta")}
            </Link>
          </div>

          <button
            onClick={scrollToContent}
            className="mt-16 flex flex-col items-center gap-2 text-muted transition hover:text-accent"
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

      {/* Products showcase */}
      <section className="py-16 relative">
        <div className="glow-line absolute top-0 inset-x-0" />
        <div className="container-x">
          <h2 className="mx-auto mb-12 max-w-2xl text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl scroll-reveal">
            {t("home.productsShowcaseTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7 stagger-children">
            {categories.map((c) => (
              <Link key={c.id} href={c.href} className="group flex flex-col items-center gap-3">
                <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-accent/20">
                  <CategoryIcon name={c.icon} className="h-10 w-10" />
                </span>
                <span className="text-center text-sm font-medium text-foreground">{localized(c.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section title={t("home.statsTitle")}>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 stagger-children">
          {company.stats.map((s, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-3xl font-extrabold text-accent">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{localized(s.label)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services — flip cards */}
      <Section title={t("home.servicesTitle")} alt>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s) => (
            <div key={s.id} className="flip-card h-52">
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
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
        <div className="grid gap-6 md:grid-cols-3 stagger-children">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-lg bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {localized(p.category)}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{localized(p.title)}</h3>
              <p className="mt-1 text-sm text-muted">{p.location} &middot; {p.year}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/portfolio" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>

      {/* Clients — flip cards */}
      <Section title={t("home.clientsTitle")} alt>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 stagger-children">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger-children">
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
    </>
  );
}

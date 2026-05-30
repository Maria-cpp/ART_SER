"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCompany, getServices, getProjects, getClients, getCategories } from "@/lib/data";

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

  const scrollToContent = () => {
    document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-surface-alt overflow-hidden">
        <div className="container-x flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            {company.name}
          </p>

          <HeroTypewriter />

          <p className="mt-8 max-w-2xl text-lg text-muted">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
      <section className="py-16">
        <div className="container-x">
          <h2 className="mx-auto mb-12 max-w-2xl text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl">
            {t("home.productsShowcaseTitle")}
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((c) => (
              <Link key={c.id} href={c.href} className="group flex flex-col items-center gap-3">
                <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg">
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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {company.stats.map((s, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-3xl font-extrabold text-accent">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{localized(s.label)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section title={t("home.servicesTitle")} alt>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="card">
              <h3 className="text-lg font-semibold text-foreground">{localized(s.title)}</h3>
              <p className="mt-2 text-sm text-muted">{localized(s.description)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>

      {/* Featured projects */}
      <Section title={t("home.projectsTitle")}>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-md bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {localized(p.category)}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{localized(p.title)}</h3>
              <p className="mt-1 text-sm text-muted">{p.location} · {p.year}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/portfolio" className="btn-outline">{t("common.viewAll")}</Link>
        </div>
      </Section>

      {/* Clients */}
      <Section title={t("home.clientsTitle")} alt>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {clients.map((c) => (
            <div key={c.id} className="flex items-center justify-center rounded-md border border-border bg-surface p-4 text-center text-sm font-medium text-muted">
              {c.name}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

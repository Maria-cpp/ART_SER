"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServices } from "@/lib/data";

type State = "idle" | "submitting" | "ok" | "error";

export default function RequestQuotePage() {
  const { t, localized } = useLanguage();
  const services = getServices();
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  const field = "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent";

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: "breadcrumb.home", href: "/" }, { label: "nav.requestQuote" }]} />
      </div>
      <Section title={t("quote.title")} subtitle={t("quote.subtitle")}>
      <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm text-muted">{t("quote.name")}</span>
            <input name="name" required className={field} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">{t("quote.company")}</span>
            <input name="company" className={field} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">{t("quote.email")}</span>
            <input name="email" type="email" required className={field} dir="ltr" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">{t("quote.phone")}</span>
            <input name="phone" className={field} dir="ltr" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">{t("quote.service")}</span>
          <select name="service" className={field}>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{localized(s.title)}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">{t("quote.message")}</span>
          <textarea name="message" rows={5} className={field} />
        </label>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={state === "submitting"} className="btn-accent disabled:opacity-50">
            {t("quote.submit")}
          </button>
          {state === "ok" && <span className="text-sm text-green-600">{t("quote.success")}</span>}
          {state === "error" && <span className="text-sm text-red-500">{t("quote.error")}</span>}
        </div>
      </form>
    </Section>
    </>
  );
}

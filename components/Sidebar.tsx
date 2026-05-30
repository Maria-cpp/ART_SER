"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface NavGroup {
  labelKey: string;
  items: { href: string; labelKey: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    labelKey: "sidebar.products",
    items: [
      { href: "/products/windows", labelKey: "products.windows.title" },
      { href: "/products/doors", labelKey: "products.doors.title" },
      { href: "/products/sliding-folding", labelKey: "products.sliding.title" },
      { href: "/products/facades", labelKey: "products.facades.title" },
      { href: "/products/conservatories", labelKey: "products.conservatories.title" },
      { href: "/products/smart-buildings", labelKey: "products.smart.title" },
    ],
  },
  {
    labelKey: "sidebar.company",
    items: [
      { href: "/about", labelKey: "nav.about" },
      { href: "/services", labelKey: "nav.services" },
      { href: "/clients", labelKey: "nav.clients" },
      { href: "/certifications", labelKey: "nav.certifications" },
    ],
  },
  {
    labelKey: "sidebar.projects",
    items: [
      { href: "/portfolio", labelKey: "nav.portfolio" },
      { href: "/jv-projects", labelKey: "nav.jvProjects" },
      { href: "/government", labelKey: "nav.government" },
      { href: "/manufacturing", labelKey: "nav.manufacturing" },
    ],
  },
  {
    labelKey: "sidebar.resources",
    items: [
      { href: "/gallery", labelKey: "nav.gallery" },
      { href: "/request-quote", labelKey: "nav.requestQuote" },
      { href: "/contact", labelKey: "nav.contact" },
    ],
  },
];

export function Sidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_GROUPS.forEach((g) => {
      const hasActive = g.items.some((item) => pathname.startsWith(item.href));
      initial[g.labelKey] = hasActive;
    });
    return initial;
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="sidebar hidden lg:flex flex-col w-64 flex-shrink-0 border-e border-border bg-surface h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-muted">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>{t("products.searchCompare")}</span>
        </div>
      </div>

      <nav className="flex-1 px-2 pb-6">
        {NAV_GROUPS.map((group) => {
          const isExpanded = expandedGroups[group.labelKey] ?? false;
          return (
            <div key={group.labelKey} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.labelKey)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
                aria-expanded={isExpanded}
              >
                <span>{t(group.labelKey)}</span>
                <svg
                  className={`h-4 w-4 text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {isExpanded && (
                <div className="ms-2 border-s border-border">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-e-lg py-2 ps-4 pe-3 text-sm transition
                          ${isActive
                            ? "bg-accent/10 text-accent font-medium border-s-2 border-accent -ms-px"
                            : "text-muted hover:text-foreground hover:bg-surface-alt"
                          }`}
                      >
                        {t(item.labelKey)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

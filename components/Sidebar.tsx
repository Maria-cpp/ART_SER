"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface NavGroup {
  labelKey: string;
  icon: React.ReactNode;
  items: { href: string; labelKey: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    labelKey: "nav.home",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
    items: [],
  },
  {
    labelKey: "sidebar.company",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    items: [
      { href: "/about", labelKey: "nav.about" },
      { href: "/services", labelKey: "nav.services" },
      { href: "/clients", labelKey: "nav.clients" },
      { href: "/certifications", labelKey: "nav.certifications" },
    ],
  },
  {
    labelKey: "sidebar.products",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
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
    labelKey: "sidebar.projects",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    items: [
      { href: "/portfolio", labelKey: "nav.portfolio" },
      { href: "/government", labelKey: "nav.government" },
      { href: "/manufacturing", labelKey: "nav.manufacturing" },
    ],
  },
  {
    labelKey: "sidebar.resources",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
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
  const [collapsed, setCollapsed] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_GROUPS.forEach((g) => {
      if (g.items.length === 0) return;
      const hasActive = g.items.some((item) => pathname.startsWith(item.href));
      initial[g.labelKey] = hasActive;
    });
    return initial;
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`sidebar hidden lg:flex flex-col flex-shrink-0 border-e border-border bg-surface h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse toggle */}
      <div className={`flex items-center px-2 pt-3 pb-1 ${collapsed ? "justify-center" : "justify-end pe-3"}`}>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-lg p-1.5 text-muted transition hover:bg-surface-alt hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Search bar — only when expanded */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-muted">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>{t("products.searchCompare")}</span>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 pb-6">
        {NAV_GROUPS.map((group) => {
          const isExpanded = expandedGroups[group.labelKey] ?? false;

          /* Home — single link, no children */
          if (group.items.length === 0) {
            const isActive = pathname === "/";
            return (
              <div key={group.labelKey} className="mb-1">
                <Link
                  href="/"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition hover:bg-surface-alt ${
                    isActive ? "text-accent" : "text-foreground"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? t(group.labelKey) : undefined}
                >
                  {group.icon}
                  {!collapsed && <span>{t(group.labelKey)}</span>}
                </Link>
              </div>
            );
          }

          return (
            <div key={group.labelKey} className="mb-1">
              <button
                type="button"
                onClick={() => {
                  if (collapsed) {
                    setCollapsed(false);
                    setExpandedGroups((prev) => ({ ...prev, [group.labelKey]: true }));
                  } else {
                    toggleGroup(group.labelKey);
                  }
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-alt ${
                  collapsed ? "justify-center" : "justify-between"
                }`}
                aria-expanded={isExpanded}
                title={collapsed ? t(group.labelKey) : undefined}
              >
                <span className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                  {group.icon}
                  {!collapsed && <span>{t(group.labelKey)}</span>}
                </span>
                {!collapsed && (
                  <svg
                    className={`h-4 w-4 text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </button>

              {isExpanded && !collapsed && (
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

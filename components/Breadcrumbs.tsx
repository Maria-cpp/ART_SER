"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export interface Crumb {
  label: string;
  href?: string;
  isKey?: boolean;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((crumb, i) => {
          const label = crumb.isKey !== false ? t(crumb.label) : crumb.label;
          const isLast = i === items.length - 1;

          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-border mx-1 select-none" aria-hidden>
                  &rsaquo;
                </span>
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition hover:text-accent"
                >
                  {label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground font-medium" : ""}>
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

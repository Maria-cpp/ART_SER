import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

/** Shared section wrapper with consistent spacing and optional heading. */
export function Section({ title, subtitle, children, className = "", alt = false }: SectionProps) {
  return (
    <section className={`${alt ? "bg-surface-alt" : ""} py-16 ${className}`}>
      <div className="container-x">
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {title && <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>}
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

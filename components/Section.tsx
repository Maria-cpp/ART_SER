import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

/** Shared section wrapper with consistent spacing, optional heading, and scroll-reveal. */
export function Section({ title, subtitle, children, className = "", alt = false }: SectionProps) {
  return (
    <section className={`${alt ? "bg-surface-alt" : ""} relative py-16 ${className}`}>
      {/* Accent glow divider at top */}
      <div className="glow-line absolute top-0 inset-x-0" />

      <div className="container-x">
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl scroll-reveal">
            {title && <h2 className="text-3xl font-bold tracking-tight text-accent">{title}</h2>}
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </header>
        )}
        <div className="scroll-reveal">
          {children}
        </div>
      </div>
    </section>
  );
}

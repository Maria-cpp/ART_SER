"use client";

import { RevealText } from "@/components/ui/RevealText";

interface SectionHeadingProps {
  /** Small uppercase label above the heading (e.g. "SERVICES") */
  label?: string;
  /** Main heading text */
  title: string;
  /** Optional supporting paragraph */
  subtitle?: string;
  /** Alignment */
  align?: "start" | "center";
  /** Additional class names on the wrapper */
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "start",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {label && (
        <RevealText as="span" delay={0}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {label}
          </span>
        </RevealText>
      )}
      <RevealText as="h2" delay={100}>
        <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </span>
      </RevealText>
      {subtitle && (
        <RevealText as="p" delay={200}>
          <span className="max-w-2xl text-base text-muted sm:text-lg leading-relaxed">
            {subtitle}
          </span>
        </RevealText>
      )}
      <RevealText delay={250}>
        <div className="h-[2px] w-12 bg-accent" />
      </RevealText>
    </div>
  );
}

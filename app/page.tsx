"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  HeroSection,
  MaterialSection,
  ServicesSection,
  ProjectsSection,
  ProcessSection,
  StorySection,
  PartnersSection,
  ProductsSection,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      {/* 01 — HERO */}
      <HeroSection />

      <div id="content-start" />

      {/* 02 — MATERIAL / ENGINEERING */}
      <MaterialSection />

      {/* 03 — SERVICES */}
      <ServicesSection />

      {/* 04 — SELECTED PROJECTS */}
      <ProjectsSection />

      {/* 05 — ENGINEERING PROCESS */}
      <ProcessSection />

      {/* 06 — COMPANY STORY */}
      <StorySection />

      {/* 07 — PARTNERS / SUPPLIERS */}
      <PartnersSection />

      {/* 08 — PRODUCTS / SYSTEMS */}
      <ProductsSection />

      {/* 09 — CONTACT / CTA */}
      <CTASection />
    </>
  );
}

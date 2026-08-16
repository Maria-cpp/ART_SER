# Phase 4: Multilingual Routing & SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from client-side-only locale switching to URL-based locale routing (`/en/`, `/it/`, `/ar/`, `/ur/`) with full SEO infrastructure (hreflang, OpenGraph, structured data, sitemap, robots.txt).

**Architecture:** Next.js middleware detects locale from cookie/Accept-Language and redirects bare paths to `/<locale>/path`. A `[locale]` dynamic segment wraps all public pages. `LanguageProvider` receives locale from the route param. Each page exports `generateMetadata()` for locale-aware SEO.

**Tech Stack:** Next.js 15 App Router, TypeScript, middleware API, `generateMetadata()`, `MetadataRoute.Sitemap`, JSON-LD structured data.

---

## File Structure

### New files
| File | Responsibility |
|------|---------------|
| `middleware.ts` | Locale detection, redirect bare paths to `/<locale>/path`, skip admin/api/static |
| `lib/locale.ts` | Shared locale constants (`BASE_URL`, `PAGES` list) for sitemap and metadata |
| `app/[locale]/layout.tsx` | Locale layout — sets lang/dir, wraps providers, Header/Footer, structured data JSON-LD, `generateMetadata()` |
| `app/[locale]/page.tsx` | Homepage (moved from `app/page.tsx`) |
| `app/[locale]/about/page.tsx` | About page (moved) |
| `app/[locale]/services/page.tsx` | Services page (moved) |
| `app/[locale]/portfolio/page.tsx` | Portfolio page (moved) |
| `app/[locale]/products/page.tsx` | Products page (moved) |
| `app/[locale]/products/[category]/page.tsx` | Product category page (moved) |
| `app/[locale]/contact/page.tsx` | Contact page (moved) |
| `app/[locale]/request-quote/page.tsx` | Quote page (moved) |
| `app/[locale]/clients/page.tsx` | Clients page (moved) |
| `app/[locale]/certifications/page.tsx` | Certifications page (moved) |
| `app/[locale]/gallery/page.tsx` | Gallery page (moved) |
| `app/[locale]/government/page.tsx` | Government page (moved) |
| `app/[locale]/jv-projects/page.tsx` | JV Projects page (moved) |
| `app/[locale]/manufacturing/page.tsx` | Manufacturing page (moved) |
| `app/[locale]/suppliers/page.tsx` | Suppliers page (moved) |
| `app/sitemap.ts` | Dynamic sitemap generation |
| `app/robots.ts` | Robots config |

### Modified files
| File | Changes |
|------|---------|
| `app/layout.tsx` | Strip to minimal shell (no providers, no Header/Footer) |
| `app/page.tsx` | Becomes root redirect to `/<locale>/` |
| `components/providers/LanguageProvider.tsx` | Accept `initialLocale` prop, remove localStorage hydration |
| `components/layout/LanguageSwitcher.tsx` | Navigate via `router.push()` instead of `setLocale()` |
| `components/Header.tsx` | Prefix nav links with `/${locale}` |
| `components/Footer.tsx` | Prefix nav links with `/${locale}` |
| `components/Breadcrumbs.tsx` | Prefix `href` with `/${locale}` |
| `components/DoorIntro.tsx` | Update home check from `"/"` to `"/${locale}"` pattern |
| `translations/en.json` | Add `meta.*` keys |
| `translations/it.json` | Add `meta.*` keys |
| `translations/ar.json` | Add `meta.*` keys |
| `translations/ur.json` | Add `meta.*` keys |

---

### Task 1: Add shared locale constants

**Files:**
- Create: `lib/locale.ts`

- [ ] **Step 1: Create `lib/locale.ts`**

```ts
import type { Metadata } from "next";
import { type Locale, translate, LOCALES } from "@/lib/i18n";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://artser.it";

export const PUBLIC_PAGES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/products",
  "/contact",
  "/request-quote",
  "/clients",
  "/certifications",
  "/gallery",
  "/government",
  "/jv-projects",
  "/manufacturing",
  "/suppliers",
];

export function pageMetadata(locale: Locale, titleKey: string, descKey: string, path: string): Metadata {
  const t = (key: string) => translate(locale, key);
  return {
    title: t(titleKey),
    description: t(descKey),
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/locale.ts
git commit -m "feat: add shared locale constants for sitemap and metadata"
```

---

### Task 2: Add meta translation keys to all 4 language files

**Files:**
- Modify: `translations/en.json`
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Add meta keys to `translations/en.json`**

Add these keys at the end of the JSON object (before the closing `}`):

```json
  "meta.title": "ARTSER — Architectural Aluminium Engineering",
  "meta.description": "Engineering, manufacturing and installation of architectural aluminium systems. 26+ years of Italian craftsmanship.",
  "meta.about.title": "About ARTSER",
  "meta.about.description": "Over 26 years of experience in aluminium windows, doors, and architectural systems. Based in Verona, Italy.",
  "meta.services.title": "Services",
  "meta.services.description": "Professional aluminium, PVC, and serramenti services for commercial and industrial projects.",
  "meta.portfolio.title": "Portfolio",
  "meta.portfolio.description": "A selection of architectural aluminium projects delivered by ARTSER across Italy.",
  "meta.contact.title": "Contact",
  "meta.contact.description": "Get in touch with ARTSER for aluminium engineering, manufacturing, and installation services.",
  "meta.products.title": "Products & Systems",
  "meta.products.description": "Premium architectural aluminium and PVC systems — windows, doors, facades, sliding systems, and more.",
  "meta.clients.title": "Clients",
  "meta.clients.description": "Organizations and companies that trust ARTSER for their aluminium and serramenti needs.",
  "meta.certifications.title": "Certifications",
  "meta.certifications.description": "ARTSER's professional certifications and safety accreditations.",
  "meta.gallery.title": "Gallery",
  "meta.gallery.description": "Inside ARTSER's projects, workshops, and installations.",
  "meta.government.title": "Government & Commercial Projects",
  "meta.government.description": "Public-sector and commercial aluminium projects delivered to strict regulatory standards.",
  "meta.jv.title": "Joint Venture Projects",
  "meta.jv.description": "Aluminium and serramenti projects delivered in partnership with leading organizations.",
  "meta.manufacturing.title": "Manufacturing & Production",
  "meta.manufacturing.description": "Precision aluminium fabrication with certified quality processes and CNC machining.",
  "meta.suppliers.title": "Suppliers & Partners",
  "meta.suppliers.description": "ARTSER partners with Europe's leading aluminium, PVC, and sun protection manufacturers.",
  "meta.quote.title": "Request a Quote",
  "meta.quote.description": "Tell us about your project and receive a detailed quotation from ARTSER."
```

- [ ] **Step 2: Add meta keys to `translations/it.json`**

```json
  "meta.title": "ARTSER — Ingegneria Architettonica in Alluminio",
  "meta.description": "Ingegneria, produzione e installazione di sistemi architettonici in alluminio. Oltre 26 anni di artigianato italiano.",
  "meta.about.title": "Chi Siamo",
  "meta.about.description": "Oltre 26 anni di esperienza in finestre, porte e sistemi architettonici in alluminio. Sede a Verona, Italia.",
  "meta.services.title": "Servizi",
  "meta.services.description": "Servizi professionali in alluminio, PVC e serramenti per progetti commerciali e industriali.",
  "meta.portfolio.title": "Portfolio",
  "meta.portfolio.description": "Una selezione di progetti architettonici in alluminio realizzati da ARTSER in tutta Italia.",
  "meta.contact.title": "Contatti",
  "meta.contact.description": "Contatta ARTSER per servizi di ingegneria, produzione e installazione in alluminio.",
  "meta.products.title": "Prodotti e Sistemi",
  "meta.products.description": "Sistemi architettonici premium in alluminio e PVC — finestre, porte, facciate, sistemi scorrevoli e altro.",
  "meta.clients.title": "Clienti",
  "meta.clients.description": "Organizzazioni e aziende che si affidano ad ARTSER per le loro esigenze in alluminio e serramenti.",
  "meta.certifications.title": "Certificazioni",
  "meta.certifications.description": "Certificazioni professionali e accreditamenti di sicurezza di ARTSER.",
  "meta.gallery.title": "Galleria",
  "meta.gallery.description": "All'interno dei progetti, laboratori e installazioni di ARTSER.",
  "meta.government.title": "Progetti Governativi e Commerciali",
  "meta.government.description": "Progetti in alluminio per il settore pubblico e commerciale realizzati secondo rigorosi standard normativi.",
  "meta.jv.title": "Progetti in Joint Venture",
  "meta.jv.description": "Progetti in alluminio e serramenti realizzati in collaborazione con organizzazioni di primo piano.",
  "meta.manufacturing.title": "Produzione e Fabbricazione",
  "meta.manufacturing.description": "Fabbricazione di precisione in alluminio con processi di qualità certificati e lavorazione CNC.",
  "meta.suppliers.title": "Fornitori e Partner",
  "meta.suppliers.description": "ARTSER collabora con i principali produttori europei di alluminio, PVC e sistemi di protezione solare.",
  "meta.quote.title": "Richiedi un Preventivo",
  "meta.quote.description": "Raccontaci il tuo progetto e ricevi un preventivo dettagliato da ARTSER."
```

- [ ] **Step 3: Add meta keys to `translations/ar.json`**

```json
  "meta.title": "ARTSER — هندسة الألمنيوم المعمارية",
  "meta.description": "هندسة وتصنيع وتركيب أنظمة الألمنيوم المعمارية. أكثر من 26 عاماً من الحرفية الإيطالية.",
  "meta.about.title": "من نحن",
  "meta.about.description": "أكثر من 26 عاماً من الخبرة في نوافذ وأبواب وأنظمة الألمنيوم المعمارية. مقرنا في فيرونا، إيطاليا.",
  "meta.services.title": "الخدمات",
  "meta.services.description": "خدمات احترافية في الألمنيوم والـ PVC والسيراميتي للمشاريع التجارية والصناعية.",
  "meta.portfolio.title": "أعمالنا",
  "meta.portfolio.description": "مجموعة مختارة من مشاريع الألمنيوم المعمارية التي نفذتها ARTSER في أنحاء إيطاليا.",
  "meta.contact.title": "اتصل بنا",
  "meta.contact.description": "تواصل مع ARTSER لخدمات هندسة وتصنيع وتركيب الألمنيوم.",
  "meta.products.title": "المنتجات والأنظمة",
  "meta.products.description": "أنظمة معمارية متميزة من الألمنيوم والـ PVC — نوافذ وأبواب وواجهات وأنظمة منزلقة والمزيد.",
  "meta.clients.title": "عملاؤنا",
  "meta.clients.description": "المؤسسات والشركات التي تثق في ARTSER لاحتياجاتها في الألمنيوم والسيراميتي.",
  "meta.certifications.title": "الشهادات",
  "meta.certifications.description": "الشهادات المهنية واعتمادات السلامة الخاصة بـ ARTSER.",
  "meta.gallery.title": "معرض الصور",
  "meta.gallery.description": "نظرة داخل مشاريع ARTSER وورش العمل والتركيبات.",
  "meta.government.title": "المشاريع الحكومية والتجارية",
  "meta.government.description": "مشاريع ألمنيوم للقطاع العام والتجاري منفذة وفق معايير تنظيمية صارمة.",
  "meta.jv.title": "مشاريع مشتركة",
  "meta.jv.description": "مشاريع ألمنيوم وسيراميتي منفذة بالشراكة مع مؤسسات رائدة.",
  "meta.manufacturing.title": "التصنيع والإنتاج",
  "meta.manufacturing.description": "تصنيع دقيق للألمنيوم بعمليات جودة معتمدة وتشغيل CNC.",
  "meta.suppliers.title": "الموردون والشركاء",
  "meta.suppliers.description": "تتعاون ARTSER مع كبار المصنعين الأوروبيين للألمنيوم والـ PVC وأنظمة الحماية من الشمس.",
  "meta.quote.title": "طلب عرض أسعار",
  "meta.quote.description": "أخبرنا عن مشروعك واحصل على عرض أسعار مفصل من ARTSER."
```

- [ ] **Step 4: Add meta keys to `translations/ur.json`**

```json
  "meta.title": "ARTSER — آرکیٹیکچرل ایلومینیم انجینئرنگ",
  "meta.description": "آرکیٹیکچرل ایلومینیم سسٹمز کی انجینئرنگ، مینوفیکچرنگ اور تنصیب۔ 26 سال سے زائد اطالوی کاریگری۔",
  "meta.about.title": "ہمارے بارے میں",
  "meta.about.description": "ایلومینیم کھڑکیوں، دروازوں اور آرکیٹیکچرل سسٹمز میں 26 سال سے زائد کا تجربہ۔ ویرونا، اٹلی میں مقیم۔",
  "meta.services.title": "خدمات",
  "meta.services.description": "تجارتی اور صنعتی منصوبوں کے لیے پیشہ ورانہ ایلومینیم، PVC اور سیرامینٹی خدمات۔",
  "meta.portfolio.title": "پورٹ فولیو",
  "meta.portfolio.description": "ARTSER کے ذریعے پورے اٹلی میں مکمل کیے گئے آرکیٹیکچرل ایلومینیم منصوبوں کا انتخاب۔",
  "meta.contact.title": "رابطہ کریں",
  "meta.contact.description": "ایلومینیم انجینئرنگ، مینوفیکچرنگ اور تنصیب کی خدمات کے لیے ARTSER سے رابطہ کریں۔",
  "meta.products.title": "مصنوعات اور سسٹمز",
  "meta.products.description": "پریمیم آرکیٹیکچرل ایلومینیم اور PVC سسٹمز — کھڑکیاں، دروازے، فساڈز، سلائیڈنگ سسٹمز اور مزید۔",
  "meta.clients.title": "ہمارے گاہک",
  "meta.clients.description": "وہ تنظیمیں اور کمپنیاں جو اپنی ایلومینیم اور سیرامینٹی ضروریات کے لیے ARTSER پر اعتماد کرتی ہیں۔",
  "meta.certifications.title": "سرٹیفیکیشنز",
  "meta.certifications.description": "ARTSER کی پیشہ ورانہ سرٹیفیکیشنز اور حفاظتی اعتبارنامے۔",
  "meta.gallery.title": "گیلری",
  "meta.gallery.description": "ARTSER کے منصوبوں، ورکشاپس اور تنصیبات کے اندر۔",
  "meta.government.title": "سرکاری اور تجارتی منصوبے",
  "meta.government.description": "سخت ریگولیٹری معیارات کے مطابق عوامی شعبے اور تجارتی ایلومینیم منصوبے۔",
  "meta.jv.title": "مشترکہ منصوبے",
  "meta.jv.description": "معروف تنظیموں کے ساتھ شراکت میں مکمل کیے گئے ایلومینیم اور سیرامینٹی منصوبے۔",
  "meta.manufacturing.title": "مینوفیکچرنگ اور پیداوار",
  "meta.manufacturing.description": "تصدیق شدہ معیاری عمل اور CNC مشینی کے ساتھ درست ایلومینیم فیبریکیشن۔",
  "meta.suppliers.title": "سپلائرز اور پارٹنرز",
  "meta.suppliers.description": "ARTSER یورپ کے معروف ایلومینیم، PVC اور سن پروٹیکشن مینوفیکچررز کے ساتھ شراکت دار ہے۔",
  "meta.quote.title": "کوٹیشن کی درخواست",
  "meta.quote.description": "ہمیں اپنے منصوبے کے بارے میں بتائیں اور ARTSER سے تفصیلی کوٹیشن حاصل کریں۔"
```

- [ ] **Step 5: Commit**

```bash
git add translations/en.json translations/it.json translations/ar.json translations/ur.json
git commit -m "feat: add meta translation keys for all 4 languages (SEO metadata)"
```

---

### Task 3: Create middleware for locale detection and redirects

**Files:**
- Create: `middleware.ts` (project root)

- [ ] **Step 1: Create `middleware.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

const LOCALE_COOKIE = "artser-locale";

function getLocaleFromHeaders(request: NextRequest): string {
  // Check cookie first (persisted from previous visit)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  // Parse Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((part) => {
        const [lang] = part.trim().split(";");
        return lang.trim().toLowerCase();
      });
    for (const lang of preferred) {
      // Check exact match first (e.g., "it", "ar")
      if (isLocale(lang)) return lang;
      // Check prefix match (e.g., "en-US" → "en", "it-IT" → "it")
      const prefix = lang.split("-")[0];
      if (isLocale(prefix)) return prefix;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API, admin, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") // static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a valid locale
  const segments = pathname.split("/");
  const firstSegment = segments[1]; // e.g., "en" from "/en/about"

  if (isLocale(firstSegment)) {
    // Valid locale prefix — set cookie and continue
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    return response;
  }

  // No locale prefix — redirect to /<locale>/path
  const locale = getLocaleFromHeaders(request);
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = newPath;

  const response = NextResponse.redirect(url, 307);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: add locale detection middleware with cookie persistence"
```

---

### Task 4: Strip root layout to minimal shell

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://artser.it"),
  icons: { icon: "/logo/ARTSER_logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: strip root layout to minimal shell for locale routing"
```

---

### Task 5: Create locale layout with metadata and structured data

**Files:**
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create `app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DoorIntro } from "@/components/DoorIntro";
import { LOCALES, type Locale, directionFor, translate } from "@/lib/i18n";
import { BASE_URL } from "@/lib/locale";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};

  const t = (key: string) => translate(locale as Locale, key);

  return {
    title: {
      default: t("meta.title"),
      template: "%s | ARTSER",
    },
    description: t("meta.description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      siteName: "ARTSER",
      locale: locale,
      type: "website",
      images: [{ url: "/logo/ARTSER_logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

function StructuredData({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ART SER",
        legalName: "ART SER DI SHEHEZAD TARIQ",
        url: BASE_URL,
        logo: `${BASE_URL}/logo/ARTSER_logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+3903482402248",
          email: "art_ser@outlook.it",
          contactType: "customer service",
        },
        sameAs: [
          "https://www.instagram.com/ts_khaan",
          "https://www.facebook.com/share/1QTyovYnxS/",
        ],
      },
      {
        "@type": "LocalBusiness",
        name: "ART SER",
        description: t("meta.description"),
        url: BASE_URL,
        telephone: "+3903482402248",
        email: "art_ser@outlook.it",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via XX Settembre 86",
          addressLocality: "San Martino Buon Albergo",
          addressRegion: "VR",
          postalCode: "37036",
          addressCountry: "IT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.4175,
          longitude: 11.0964,
        },
        image: `${BASE_URL}/logo/ARTSER_logo.png`,
        priceRange: "$$",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dir = directionFor(validLocale);

  return (
    <>
      <StructuredData locale={validLocale} />
      <div lang={validLocale} dir={dir} data-theme="artser">
        <ThemeProvider>
          <LanguageProvider initialLocale={validLocale}>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <DoorIntro />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: add locale layout with generateMetadata, structured data, and providers"
```

---

### Task 6: Update LanguageProvider to accept `initialLocale` prop

**Files:**
- Modify: `components/providers/LanguageProvider.tsx`

- [ ] **Step 1: Update LanguageProvider**

Replace the entire file with:

```tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Locale,
  Direction,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  directionFor,
  translate,
  localized as localizedHelper,
  Localized
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  localized: (field: Localized | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);
  const router = useRouter();
  const pathname = usePathname();

  // Persist locale to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // Navigate to the same page with the new locale prefix
      const segments = pathname.split("/");
      // Check if first segment is a valid locale
      if (segments.length >= 2 && LOCALES.includes(segments[1] as Locale)) {
        segments[1] = next;
      } else {
        segments.splice(1, 0, next);
      }
      router.push(segments.join("/") || `/${next}`);
    },
    [pathname, router]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: directionFor(locale),
      setLocale,
      t: (key: string) => translate(locale, key),
      localized: (field: Localized | undefined) => localizedHelper(field, locale)
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/providers/LanguageProvider.tsx
git commit -m "refactor: update LanguageProvider to accept initialLocale and navigate on locale change"
```

---

### Task 7: Update LanguageSwitcher to use navigation

**Files:**
- Modify: `components/layout/LanguageSwitcher.tsx`

- [ ] **Step 1: Update LanguageSwitcher**

The `setLocale` from the provider now handles navigation, so the LanguageSwitcher already works correctly — calling `setLocale(l)` will trigger `router.push()`. No code changes needed to the LanguageSwitcher itself.

Verify by reading the file — the `onClick={() => setLocale(l)}` calls in both desktop and mobile variants already delegate to the provider.

- [ ] **Step 2: Skip — no changes needed**

---

### Task 8: Update Header to use locale-prefixed links

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Update Header.tsx**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

const NAV_ITEMS = [
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/contact", key: "nav.contact" },
];

const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/about", key: "nav.about" },
  { href: "/products", key: "sidebar.products" },
  { href: "/manufacturing", key: "nav.manufacturing" },
  { href: "/government", key: "nav.government" },
  { href: "/clients", key: "nav.clients" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t, locale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const localePath = (href: string) => `/${locale}${href === "/" ? "" : href}`;

  return (
    <header className="sticky top-0 z-sticky border-b border-border/40 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href={localePath("/")} className="flex items-center gap-3 shrink-0">
          <AnimatedLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={localePath(item.href)}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-aluminium transition-colors duration-normal hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right side: language + CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={localePath("/request-quote")}
            className="hidden md:inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-all duration-normal hover:shadow-glow hover:translate-y-[-1px]"
          >
            {t("nav.requestQuote")}
          </Link>
          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border/30 bg-background lg:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col px-4 py-2">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={localePath(item.href)}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-aluminium border-b border-border/20 last:border-0 transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href={localePath("/request-quote")}
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wider text-accent-foreground"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: prefix all Header nav links with current locale"
```

---

### Task 9: Update Footer to use locale-prefixed links

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Add locale prefix to Footer links**

In `components/Footer.tsx`, make the following changes:

1. Add `locale` to the destructured `useLanguage()`:

Change:
```tsx
const { t, localized } = useLanguage();
```
To:
```tsx
const { t, localized, locale } = useLanguage();
```

2. Add a `localePath` helper after the existing variable declarations:

After `const [expanded, setExpanded] = useState(false);` add:
```tsx
const localePath = (href: string) => `/${locale}${href}`;
```

3. Update product category links — change:
```tsx
<Link href={c.href} className="text-sm opacity-90 transition hover:opacity-100">
```
To:
```tsx
<Link href={localePath(c.href)} className="text-sm opacity-90 transition hover:opacity-100">
```

4. Update company links — change:
```tsx
<Link href={l.href} className="text-sm opacity-90 transition hover:opacity-100">
```
To:
```tsx
<Link href={localePath(l.href)} className="text-sm opacity-90 transition hover:opacity-100">
```

5. Update contact link — change:
```tsx
<Link href="/contact" className="text-sm opacity-90 transition hover:opacity-100">
```
To:
```tsx
<Link href={localePath("/contact")} className="text-sm opacity-90 transition hover:opacity-100">
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: prefix all Footer nav links with current locale"
```

---

### Task 10: Update Breadcrumbs to use locale-prefixed links

**Files:**
- Modify: `components/Breadcrumbs.tsx`

- [ ] **Step 1: Update Breadcrumbs.tsx**

Replace the entire file with:

```tsx
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
  const { t, locale } = useLanguage();
  const localePath = (href: string) => `/${locale}${href}`;

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
                  href={localePath(crumb.href)}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Breadcrumbs.tsx
git commit -m "feat: prefix Breadcrumb links with current locale"
```

---

### Task 11: Update DoorIntro to detect locale-prefixed home path

**Files:**
- Modify: `components/DoorIntro.tsx`

- [ ] **Step 1: Update DoorIntro home detection**

In `components/DoorIntro.tsx`, change the home detection logic.

Change:
```tsx
const isHome = pathname === "/";
```
To:
```tsx
const isHome = /^\/[a-z]{2}\/?$/.test(pathname);
```

This matches `/en`, `/it/`, `/ar`, `/ur/` — all locale-prefixed home paths.

- [ ] **Step 2: Commit**

```bash
git add components/DoorIntro.tsx
git commit -m "fix: update DoorIntro to detect locale-prefixed home paths"
```

---

### Task 12: Convert root `app/page.tsx` to redirect

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with redirect**

Replace the entire file with:

```tsx
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: convert root page to locale redirect"
```

---

### Task 13: Move all page files to `[locale]/` directory

**Files:**
- Move: `app/page.tsx` content → `app/[locale]/page.tsx` (homepage)
- Move: all 14 page directories into `app/[locale]/`

- [ ] **Step 1: Create the `[locale]` directory structure and move pages**

```bash
cd "C:\Users\ArwenTech\OneDrive\Desktop\Work\Project Folders\TSKC\art_ser\art_ser"

# Create [locale] directory (should already exist from Task 5)
mkdir -p "app/[locale]"

# Move each page directory into [locale]
# Note: homepage page.tsx was already handled in Task 12 (root becomes redirect)
# We need to create the [locale] homepage separately

# Move subpage directories
for dir in about services portfolio products contact request-quote clients certifications gallery government jv-projects manufacturing suppliers; do
  mv "app/$dir" "app/[locale]/$dir"
done
```

- [ ] **Step 2: Create `app/[locale]/page.tsx` (homepage)**

```tsx
"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  HeroSection,
  MaterialSection,
  ProfileToArchitectureSection,
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

      {/* 02b — FROM PROFILE TO ARCHITECTURE */}
      <ProfileToArchitectureSection />

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
```

- [ ] **Step 3: Update internal links in moved pages**

The page components use `Breadcrumbs` with `href: "/"` for home links. These need to be updated to just `"/"` — the Breadcrumbs component (updated in Task 10) already handles locale prefixing automatically.

Check each moved page for hardcoded internal `<Link href="/...">` that bypass the Breadcrumbs component:

- `app/[locale]/products/[category]/page.tsx` has `<Link href="/request-quote">` and `<Link href={c.href}>` — these need locale prefix.
- `app/[locale]/portfolio/page.tsx` — supplier links are external (`href={supplier.website}`), no changes needed.

In `app/[locale]/products/[category]/page.tsx`, add locale awareness:

After the existing import of `useLanguage`, the component already gets `locale` via `const { t, localized, locale } = useLanguage();`.

Add a helper inside the component:
```tsx
const localePath = (href: string) => `/${locale}${href}`;
```

Then update:
- `<Link href="/request-quote"` → `<Link href={localePath("/request-quote")}`
- `<Link href={c.href}` → `<Link href={localePath(c.href)}`
- `href: "/products"` in breadcrumbs — already handled by Breadcrumbs component

- [ ] **Step 4: Commit**

```bash
git add app/[locale] app/page.tsx
git commit -m "feat: move all public pages under [locale] dynamic segment"
```

---

### Task 14: Create dynamic sitemap

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { BASE_URL, PUBLIC_PAGES } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PUBLIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add dynamic sitemap with all pages × 4 locales"
```

---

### Task 15: Create robots.ts

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create `app/robots.ts`**

```ts
import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/locale";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add app/robots.ts
git commit -m "feat: add robots.ts pointing to sitemap"
```

---

### Task 16: Add per-page `generateMetadata` to key pages

**Files:**
- Modify: `app/[locale]/about/page.tsx`
- Modify: `app/[locale]/services/page.tsx`
- Modify: `app/[locale]/portfolio/page.tsx`
- Modify: `app/[locale]/contact/page.tsx`
- Modify: `app/[locale]/products/page.tsx`
- Modify: `app/[locale]/request-quote/page.tsx`
- Modify: `app/[locale]/clients/page.tsx`
- Modify: `app/[locale]/certifications/page.tsx`
- Modify: `app/[locale]/gallery/page.tsx`
- Modify: `app/[locale]/government/page.tsx`
- Modify: `app/[locale]/jv-projects/page.tsx`
- Modify: `app/[locale]/manufacturing/page.tsx`
- Modify: `app/[locale]/suppliers/page.tsx`

Each page is a `"use client"` component, so `generateMetadata` (a server function) cannot be exported from them directly. Instead, we need to add a separate metadata export. Since these are `"use client"` pages, the approach is to create a wrapper or convert pages to have both server and client parts.

The simplest approach: since `generateMetadata` is a server-only function, and these pages all start with `"use client"`, we need to split each page into a server wrapper that exports metadata and renders the client component.

However, this would require creating 13 separate wrapper files, which is significant refactoring. A cleaner Next.js 15 approach: `generateMetadata` can be exported from a `"use client"` file — Next.js strips it during the server build. **Actually, this is incorrect — `generateMetadata` is server-only and cannot be exported from a `"use client"` module.**

The correct approach is to split each page: keep the `"use client"` content as a separate component, and make the `page.tsx` a server component that exports `generateMetadata` and renders the client component.

The `pageMetadata` helper was already created in `lib/locale.ts` in Task 1.

- [ ] **Step 1: Refactor about page (pattern for all pages)**

Rename `app/[locale]/about/page.tsx` content to a client component, create server wrapper.

Create `app/[locale]/about/AboutContent.tsx` — move the current `page.tsx` content there (keep `"use client"` and `export default function AboutPage()`).

Replace `app/[locale]/about/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { type Locale, LOCALES } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import AboutContent from "./AboutContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "meta.about.title", "meta.about.description", "/about");
}

export default function AboutPage() {
  return <AboutContent />;
}
```

- [ ] **Step 2: Repeat for all other pages**

Apply the same pattern to each page. For each page:
1. Move current `page.tsx` content → `<PageName>Content.tsx` (keep `"use client"`)
2. Replace `page.tsx` with server wrapper exporting `generateMetadata` + rendering content component

| Page | Content file | Meta keys |
|------|-------------|-----------|
| services | `ServicesContent.tsx` | `meta.services.title`, `meta.services.description`, `/services` |
| portfolio | `PortfolioContent.tsx` | `meta.portfolio.title`, `meta.portfolio.description`, `/portfolio` |
| contact | `ContactContent.tsx` | `meta.contact.title`, `meta.contact.description`, `/contact` |
| products | `ProductsContent.tsx` | `meta.products.title`, `meta.products.description`, `/products` |
| request-quote | `RequestQuoteContent.tsx` | `meta.quote.title`, `meta.quote.description`, `/request-quote` |
| clients | `ClientsContent.tsx` | `meta.clients.title`, `meta.clients.description`, `/clients` |
| certifications | `CertificationsContent.tsx` | `meta.certifications.title`, `meta.certifications.description`, `/certifications` |
| gallery | `GalleryContent.tsx` | `meta.gallery.title`, `meta.gallery.description`, `/gallery` |
| government | `GovernmentContent.tsx` | `meta.government.title`, `meta.government.description`, `/government` |
| jv-projects | `JvProjectsContent.tsx` | `meta.jv.title`, `meta.jv.description`, `/jv-projects` |
| manufacturing | `ManufacturingContent.tsx` | `meta.manufacturing.title`, `meta.manufacturing.description`, `/manufacturing` |
| suppliers | `SuppliersContent.tsx` | `meta.suppliers.title`, `meta.suppliers.description`, `/suppliers` |

Each server wrapper `page.tsx` follows the exact same pattern as the about page in Step 2, substituting the content component import, meta keys, and path.

The `products/[category]/page.tsx` is special — it needs dynamic metadata based on the category slug. Move content to `ProductCategoryContent.tsx`, and:

```tsx
import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/locale";
import ProductCategoryContent from "./ProductCategoryContent";

const CATEGORY_META_MAP: Record<string, { titleKey: string; descKey: string }> = {
  windows: { titleKey: "products.windows.title", descKey: "products.windows.description" },
  doors: { titleKey: "products.doors.title", descKey: "products.doors.description" },
  "sliding-folding": { titleKey: "products.sliding.title", descKey: "products.sliding.description" },
  facades: { titleKey: "products.facades.title", descKey: "products.facades.description" },
  conservatories: { titleKey: "products.conservatories.title", descKey: "products.conservatories.description" },
  "smart-buildings": { titleKey: "products.smart.title", descKey: "products.smart.description" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  const meta = CATEGORY_META_MAP[category];
  if (!meta) return {};
  return pageMetadata(locale as Locale, meta.titleKey, meta.descKey, `/products/${category}`);
}

export default function ProductCategoryPage() {
  return <ProductCategoryContent />;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]
git commit -m "feat: add per-page generateMetadata with locale-aware SEO for all pages"
```

---

### Task 17: Fix internal links in section components

**Files:**
- Review and fix: `components/sections/ServicesSection.tsx`
- Review and fix: `components/sections/ProjectsSection.tsx`
- Review and fix: `components/sections/ProductsSection.tsx`
- Review and fix: `components/sections/CTASection.tsx`

- [ ] **Step 1: Audit section components for hardcoded internal links**

Search all section components for `<Link href="/` patterns and add locale prefixing.

Any section component that uses `<Link>` with internal paths needs to get `locale` from `useLanguage()` and prefix the path.

Common pattern to apply in each affected component:

```tsx
const { t, localized, locale } = useLanguage();
const localePath = (href: string) => `/${locale}${href}`;
```

Then change `href="/services"` → `href={localePath("/services")}`, etc.

Components to check:
- `ServicesSection.tsx` — likely has "Learn more" link to `/services`
- `ProjectsSection.tsx` — likely has "View all projects" link to `/portfolio`
- `ProductsSection.tsx` — likely has product category links
- `CTASection.tsx` — likely has `/request-quote` and `/contact` links
- `PartnersSection.tsx` — may have `/suppliers` link
- `StorySection.tsx` — may have `/about` link

Read each file, identify internal `<Link>` hrefs, add `locale` to destructured `useLanguage()`, add `localePath` helper, prefix all internal links.

- [ ] **Step 2: Commit**

```bash
git add components/sections/
git commit -m "feat: prefix all section component internal links with locale"
```

---

### Task 18: Build verification and fix

**Files:**
- None (verification task)

- [ ] **Step 1: Run TypeScript check**

```bash
cd "C:\Users\ArwenTech\OneDrive\Desktop\Work\Project Folders\TSKC\art_ser\art_ser"
npx tsc --noEmit
```

Expected: No errors. If errors occur, fix them.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds. Fix any errors.

- [ ] **Step 3: Run dev server and test**

```bash
npm run dev
```

Test manually:
1. Visit `http://localhost:3000` — should redirect to `/en`
2. Visit `http://localhost:3000/en` — homepage renders
3. Visit `http://localhost:3000/it` — homepage in Italian
4. Visit `http://localhost:3000/ar` — homepage in Arabic, RTL layout
5. Click language switcher — navigates to `/<locale>/current-page`
6. Click nav links — all prefixed with locale
7. Visit `http://localhost:3000/services` (no locale) — redirects to `/en/services`
8. Visit `http://localhost:3000/admin` — admin page loads (no locale prefix)
9. Visit `http://localhost:3000/sitemap.xml` — sitemap renders
10. Visit `http://localhost:3000/robots.txt` — robots config renders
11. View page source — check for `hreflang` links, OpenGraph tags, JSON-LD structured data

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues from locale routing migration"
```

---

### Task 19: Final commit — update UPGRADE-PROGRESS.md

**Files:**
- Modify: `UPGRADE-PROGRESS.md`

- [ ] **Step 1: Update progress tracker**

Update the Phase 4 row in the table:
```
| **4. Multilingual & SEO** | DONE | 19/19 | — |
```

Add Phase 4 details section:

```markdown
## Phase 4: Multilingual & SEO — COMPLETED

**What was done:**
1. Created shared locale constants (`lib/locale.ts`)
2. Added meta translation keys to all 4 language files (26 keys × 4 languages)
3. Created middleware for locale detection (cookie → Accept-Language → default)
4. Stripped root layout to minimal shell
5. Created locale layout with `generateMetadata()`, structured data (Organization + LocalBusiness)
6. Updated LanguageProvider to accept `initialLocale` and navigate on locale change
7. Updated Header with locale-prefixed nav links
8. Updated Footer with locale-prefixed links
9. Updated Breadcrumbs with locale-prefixed links
10. Updated DoorIntro to detect locale-prefixed home paths
11. Converted root page to locale redirect
12. Moved all 14 public pages under `[locale]/` dynamic segment
13. Created dynamic sitemap (`app/sitemap.ts`) for all pages × 4 locales
14. Created robots.ts pointing to sitemap
15. Added per-page `generateMetadata` with hreflang alternates for all 13 subpages
16. Fixed internal links in section components
17. Created `pageMetadata` helper for consistent per-page SEO
18. Build verified — TypeScript and Next.js build pass clean
19. URL-based locale routing live: `/en/`, `/it/`, `/ar/`, `/ur/`
```

- [ ] **Step 2: Commit**

```bash
git add UPGRADE-PROGRESS.md
git commit -m "docs: mark Phase 4 Multilingual & SEO as complete"
```

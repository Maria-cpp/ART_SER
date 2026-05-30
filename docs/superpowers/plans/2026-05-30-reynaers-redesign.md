# ARTSER Reynaers-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the ARTSER website with a Reynaers-inspired left sidebar layout, breadcrumbs on every page, dedicated product category pages, a typewriter-animated multilingual hero greeting (like ali-ch.dev), and premium 3D corporate styling.

**Architecture:** Replace the top header nav with a persistent left sidebar containing grouped/nested navigation. Add a Breadcrumbs component used on every page. Create individual `/products/[category]` pages. Rebuild the homepage hero with a continuously cycling typewriter animation across 4 languages plus "Download Portfolio" and "Scroll to Explore" buttons. Keep the existing theme system, i18n, and JSON CMS intact.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS 3, existing JSON CMS, existing theme/i18n providers.

---

## File Structure

### New files to create:
- `components/Sidebar.tsx` — Left sidebar navigation with grouped/nested items, collapsible on mobile
- `components/Breadcrumbs.tsx` — Breadcrumb trail component (Home > Products > Windows)
- `components/HeroTypewriter.tsx` — Typewriter cycling greeting in 4 languages with gradient text
- `app/products/page.tsx` — Products index page (lists all categories)
- `app/products/[category]/page.tsx` — Individual product category page (like Reynaers /products/windows)
- `public/portfolio.pdf` — Placeholder PDF for "Download Portfolio" button

### Files to modify:
- `app/layout.tsx` — Replace Header with Sidebar in layout structure
- `app/globals.css` — Add sidebar layout styles, typewriter animation, 3D card effects, gradient text
- `app/page.tsx` — Rebuild hero with HeroTypewriter + Download Portfolio + Scroll to Explore buttons
- `components/Header.tsx` — Slim down to a thin top bar (logo + language/theme switchers only)
- `components/Section.tsx` — Add optional breadcrumbs prop
- `translations/en.json` — Add new keys for sidebar groups, breadcrumbs, product pages, hero buttons
- `translations/it.json` — Same new keys in Italian
- `translations/ar.json` — Same new keys in Arabic
- `translations/ur.json` — Same new keys in Urdu
- `data/categories.json` — Update hrefs from `/portfolio` to `/products/<id>`
- `tailwind.config.ts` — Add animation utilities for typewriter

### Files to keep unchanged:
- `components/AnimatedLogo.tsx` — 3D spinning cube stays in header
- `components/providers/LanguageProvider.tsx` — No changes needed
- `components/providers/ThemeProvider.tsx` — No changes needed
- `lib/i18n.ts` — No changes needed
- `lib/data.ts` — Minor addition for product page data loading
- All `/data/*.json` content files — Existing content preserved

---

## Task 1: Update Translations (All 4 Languages)

**Files:**
- Modify: `translations/en.json`
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Add new keys to `translations/en.json`**

Add these keys to the existing JSON (keep all existing keys, append these):

```json
{
  "sidebar.products": "Products",
  "sidebar.company": "Company",
  "sidebar.projects": "Projects",
  "sidebar.resources": "Resources",
  "sidebar.contact": "Contact Us",
  "breadcrumb.home": "Home",
  "breadcrumb.products": "Products",
  "hero.greeting": "Welcome to ARTSER",
  "hero.downloadPortfolio": "Download Portfolio",
  "hero.scrollToExplore": "Scroll to explore",
  "products.title": "Products",
  "products.subtitle": "Discover our innovative and sustainable aluminium solutions.",
  "products.searchCompare": "Search and compare products",
  "products.windows.title": "Windows",
  "products.windows.description": "No better choice for your next project than our versatile aluminium windows. Optimal functionality meets excellent design, safety and energy efficiency in these trustworthy systems. Combine your desired opening type with one of our many profile designs.",
  "products.doors.title": "Doors",
  "products.doors.description": "Premium aluminium door systems combining security, thermal performance and elegant design for residential and commercial applications.",
  "products.sliding.title": "Sliding & Folding",
  "products.sliding.description": "Maximise your living space with our sliding and folding door systems. Seamless transitions between indoor and outdoor spaces with superior thermal performance.",
  "products.facades.title": "Facades",
  "products.facades.description": "Architectural aluminium facade systems for striking building envelopes. Curtain walls and structural glazing engineered for performance and aesthetics.",
  "products.conservatories.title": "Conservatories & Skylights",
  "products.conservatories.description": "Bring natural light into your space with our conservatory and skylight solutions. Engineered for thermal comfort and weather resistance.",
  "products.smart.title": "Smart Buildings",
  "products.smart.description": "Intelligent building solutions integrating automation, ventilation and solar control for energy-efficient and comfortable environments."
}
```

- [ ] **Step 2: Add new keys to `translations/it.json`**

```json
{
  "sidebar.products": "Prodotti",
  "sidebar.company": "Azienda",
  "sidebar.projects": "Progetti",
  "sidebar.resources": "Risorse",
  "sidebar.contact": "Contattaci",
  "breadcrumb.home": "Home",
  "breadcrumb.products": "Prodotti",
  "hero.greeting": "Benvenuti in Artigiano Serramenti",
  "hero.downloadPortfolio": "Scarica il Portfolio",
  "hero.scrollToExplore": "Scorri per esplorare",
  "products.title": "Prodotti",
  "products.subtitle": "Scopri le nostre soluzioni innovative e sostenibili in alluminio.",
  "products.searchCompare": "Cerca e confronta prodotti",
  "products.windows.title": "Finestre",
  "products.windows.description": "Nessuna scelta migliore per il vostro prossimo progetto delle nostre versatili finestre in alluminio. Funzionalità ottimale incontra design eccellente, sicurezza ed efficienza energetica.",
  "products.doors.title": "Porte",
  "products.doors.description": "Sistemi di porte in alluminio premium che combinano sicurezza, prestazioni termiche e design elegante per applicazioni residenziali e commerciali.",
  "products.sliding.title": "Scorrevoli e Pieghevoli",
  "products.sliding.description": "Massimizzate il vostro spazio abitativo con i nostri sistemi scorrevoli e pieghevoli. Transizioni fluide tra spazi interni ed esterni con prestazioni termiche superiori.",
  "products.facades.title": "Facciate",
  "products.facades.description": "Sistemi di facciate in alluminio architettonico per involucri edilizi d'impatto. Facciate continue e vetrate strutturali progettate per prestazioni ed estetica.",
  "products.conservatories.title": "Verande e Lucernari",
  "products.conservatories.description": "Portate la luce naturale nei vostri spazi con le nostre soluzioni per verande e lucernari. Progettate per il comfort termico e la resistenza alle intemperie.",
  "products.smart.title": "Edifici Intelligenti",
  "products.smart.description": "Soluzioni intelligenti per edifici che integrano automazione, ventilazione e controllo solare per ambienti efficienti e confortevoli."
}
```

- [ ] **Step 3: Add new keys to `translations/ar.json`**

```json
{
  "sidebar.products": "المنتجات",
  "sidebar.company": "الشركة",
  "sidebar.projects": "المشاريع",
  "sidebar.resources": "الموارد",
  "sidebar.contact": "اتصل بنا",
  "breadcrumb.home": "الرئيسية",
  "breadcrumb.products": "المنتجات",
  "hero.greeting": "مرحبًا بكم في آرت سر",
  "hero.downloadPortfolio": "تحميل الملف التعريفي",
  "hero.scrollToExplore": "مرر للاستكشاف",
  "products.title": "المنتجات",
  "products.subtitle": "اكتشف حلولنا المبتكرة والمستدامة من الألمنيوم.",
  "products.searchCompare": "ابحث وقارن المنتجات",
  "products.windows.title": "النوافذ",
  "products.windows.description": "لا يوجد خيار أفضل لمشروعك القادم من نوافذنا المتعددة الاستخدامات من الألمنيوم. الوظائف المثلى تلتقي بالتصميم الممتاز والسلامة وكفاءة الطاقة.",
  "products.doors.title": "الأبواب",
  "products.doors.description": "أنظمة أبواب الألمنيوم المتميزة التي تجمع بين الأمان والأداء الحراري والتصميم الأنيق للتطبيقات السكنية والتجارية.",
  "products.sliding.title": "الأنظمة المنزلقة والقابلة للطي",
  "products.sliding.description": "وسّع مساحة معيشتك مع أنظمة الأبواب المنزلقة والقابلة للطي. انتقالات سلسة بين المساحات الداخلية والخارجية مع أداء حراري متفوق.",
  "products.facades.title": "الواجهات",
  "products.facades.description": "أنظمة واجهات الألمنيوم المعمارية لأغلفة المباني المميزة. جدران ستائرية وزجاج هيكلي مصمم للأداء والجمال.",
  "products.conservatories.title": "البيوت الزجاجية والمناور",
  "products.conservatories.description": "أدخل الضوء الطبيعي إلى مساحتك مع حلولنا للبيوت الزجاجية والمناور. مصممة للراحة الحرارية ومقاومة الطقس.",
  "products.smart.title": "المباني الذكية",
  "products.smart.description": "حلول المباني الذكية التي تدمج الأتمتة والتهوية والتحكم الشمسي لبيئات موفرة للطاقة ومريحة."
}
```

- [ ] **Step 4: Add new keys to `translations/ur.json`**

```json
{
  "sidebar.products": "مصنوعات",
  "sidebar.company": "کمپنی",
  "sidebar.projects": "منصوبے",
  "sidebar.resources": "وسائل",
  "sidebar.contact": "رابطہ کریں",
  "breadcrumb.home": "ہوم",
  "breadcrumb.products": "مصنوعات",
  "hero.greeting": "آرٹ سر میں خوش آمدید",
  "hero.downloadPortfolio": "پورٹ فولیو ڈاؤن لوڈ کریں",
  "hero.scrollToExplore": "دریافت کرنے کے لیے سکرول کریں",
  "products.title": "مصنوعات",
  "products.subtitle": "ہماری جدید اور پائیدار ایلومینیم مصنوعات دریافت کریں۔",
  "products.searchCompare": "مصنوعات تلاش اور موازنہ کریں",
  "products.windows.title": "کھڑکیاں",
  "products.windows.description": "آپ کے اگلے منصوبے کے لیے ہماری ورسٹائل ایلومینیم کھڑکیوں سے بہتر کوئی انتخاب نہیں۔ بہترین فعالیت عمدہ ڈیزائن، حفاظت اور توانائی کی کارکردگی سے ملتی ہے۔",
  "products.doors.title": "دروازے",
  "products.doors.description": "پریمیم ایلومینیم دروازوں کے نظام جو سیکورٹی، تھرمل کارکردگی اور خوبصورت ڈیزائن کو یکجا کرتے ہیں۔",
  "products.sliding.title": "سلائیڈنگ و فولڈنگ",
  "products.sliding.description": "ہمارے سلائیڈنگ اور فولڈنگ دروازوں کے نظام سے اپنی رہائشی جگہ کو زیادہ سے زیادہ بنائیں۔",
  "products.facades.title": "فیساد",
  "products.facades.description": "شاندار عمارتی خول کے لیے آرکیٹیکچرل ایلومینیم فیساد سسٹمز۔",
  "products.conservatories.title": "کنزرویٹریز و اسکائی لائٹس",
  "products.conservatories.description": "ہماری کنزرویٹری اور اسکائی لائٹ حل کے ساتھ اپنی جگہ میں قدرتی روشنی لائیں۔",
  "products.smart.title": "اسمارٹ بلڈنگز",
  "products.smart.description": "ذہین عمارتی حل جو آٹومیشن، وینٹیلیشن اور سولر کنٹرول کو یکجا کرتے ہیں۔"
}
```

- [ ] **Step 5: Commit**

```bash
git add translations/en.json translations/it.json translations/ar.json translations/ur.json
git commit -m "feat: add translation keys for sidebar, breadcrumbs, products pages, hero"
```

---

## Task 2: Update Categories Data — Product Page Routes

**Files:**
- Modify: `data/categories.json`

- [ ] **Step 1: Update category hrefs to individual product pages**

Replace the contents of `data/categories.json`:

```json
{
  "items": [
    {
      "id": "windows",
      "icon": "window",
      "href": "/products/windows",
      "name": { "en": "Windows", "it": "Finestre", "ar": "النوافذ", "ur": "کھڑکیاں" }
    },
    {
      "id": "doors",
      "icon": "door",
      "href": "/products/doors",
      "name": { "en": "Doors", "it": "Porte", "ar": "الأبواب", "ur": "دروازے" }
    },
    {
      "id": "sliding-folding",
      "icon": "sliding",
      "href": "/products/sliding-folding",
      "name": { "en": "Sliding & Folding", "it": "Scorrevoli e pieghevoli", "ar": "الأنظمة المنزلقة والقابلة للطي", "ur": "سلائیڈنگ و فولڈنگ" }
    },
    {
      "id": "facades",
      "icon": "facade",
      "href": "/products/facades",
      "name": { "en": "Facades", "it": "Facciate", "ar": "الواجهات", "ur": "فیساد" }
    },
    {
      "id": "conservatories",
      "icon": "conservatory",
      "href": "/products/conservatories",
      "name": { "en": "Conservatories & Skylights", "it": "Verande e lucernari", "ar": "البيوت الزجاجية والمناور", "ur": "کنزرویٹریز و اسکائی لائٹس" }
    },
    {
      "id": "smart-buildings",
      "icon": "smart",
      "href": "/products/smart-buildings",
      "name": { "en": "Smart Buildings", "it": "Edifici intelligenti", "ar": "المباني الذكية", "ur": "اسمارٹ بلڈنگز" }
    },
    {
      "id": "all-products",
      "icon": "all",
      "href": "/products",
      "name": { "en": "All products", "it": "Tutti i prodotti", "ar": "كل المنتجات", "ur": "تمام مصنوعات" }
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add data/categories.json
git commit -m "feat: update category hrefs to dedicated product pages"
```

---

## Task 3: Create Breadcrumbs Component

**Files:**
- Create: `components/Breadcrumbs.tsx`

- [ ] **Step 1: Create the Breadcrumbs component**

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export interface Crumb {
  label: string;    // translation key or literal text
  href?: string;    // if omitted, rendered as plain text (current page)
  isKey?: boolean;  // if true, label is a t() key; if false/undefined, literal text
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Breadcrumbs.tsx
git commit -m "feat: add Breadcrumbs component"
```

---

## Task 4: Create Left Sidebar Navigation

**Files:**
- Create: `components/Sidebar.tsx`

- [ ] **Step 1: Create the Sidebar component with grouped/nested navigation**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCategories } from "@/lib/data";

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
    // Auto-expand group that contains current page
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
      {/* Search (decorative for now) */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-muted">
          <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>{t("products.searchCompare")}</span>
        </div>
      </div>

      {/* Nav groups */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: add left Sidebar component with grouped nested navigation"
```

---

## Task 5: Slim Down Header — Top Bar Only

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Rewrite Header as a thin top bar**

The header keeps: AnimatedLogo + "ARTSER" on the left, language/theme switchers + request quote on the right, mobile hamburger that opens sidebar as overlay. Remove all desktop nav links (they move to the sidebar). Remove the "More" dropdown entirely.

Replace the full content of `components/Header.tsx`:

```tsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const AnimatedLogo = dynamic(() => import("@/components/AnimatedLogo"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

// Nav items for mobile overlay only
const MOBILE_NAV = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "sidebar.products" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
  { href: "/clients", key: "nav.clients" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/certifications", key: "nav.certifications" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <AnimatedLogo />
        </Link>

        {/* Right: Switchers + CTA */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link href="/request-quote" className="btn-accent hidden md:inline-flex">
            {t("nav.requestQuote")}
          </Link>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded-md border border-border p-2 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <nav className="border-t border-border bg-surface lg:hidden">
          <div className="flex flex-col px-4 py-3">
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground border-b border-border/50 last:border-0"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="btn-accent mt-3"
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
git commit -m "feat: slim Header to top bar only, nav moves to sidebar"
```

---

## Task 6: Update Root Layout — Sidebar + Main Content Area

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add Sidebar to the layout structure**

Replace the full content of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ARTSER — Engineering, Manufacturing & Construction",
  description:
    "ARTSER is an integrated industrial and construction group delivering manufacturing, infrastructure, and government-grade projects.",
  icons: { icon: "/logo.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="government" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add Sidebar to root layout alongside main content"
```

---

## Task 7: Create HeroTypewriter Component

**Files:**
- Create: `components/HeroTypewriter.tsx`

- [ ] **Step 1: Create the typewriter cycling animation component**

This component cycles through greetings in 4 languages with a typewriter effect and gradient text (inspired by ali-ch.dev). The greeting text is typed out character by character, pauses, then erases and moves to the next language. Runs continuously forever.

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";

interface Greeting {
  text: string;
  dir: "ltr" | "rtl";
}

const GREETINGS: Greeting[] = [
  { text: "Welcome to ARTSER", dir: "ltr" },
  { text: "Benvenuti in Artigiano Serramenti", dir: "ltr" },
  { text: "مرحبًا بكم في آرت سر", dir: "rtl" },
  { text: "آرٹ سر میں خوش آمدید", dir: "rtl" },
];

const TYPE_SPEED = 60;      // ms per character when typing
const DELETE_SPEED = 35;    // ms per character when deleting
const PAUSE_AFTER_TYPE = 2000;  // ms to hold the full text
const PAUSE_AFTER_DELETE = 400; // ms before typing next

export default function HeroTypewriter() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentGreeting = GREETINGS[greetingIndex];

  const tick = useCallback(() => {
    const fullText = currentGreeting.text;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < fullText.length) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        return TYPE_SPEED;
      } else {
        // Fully typed — pause then start deleting
        setIsDeleting(true);
        return PAUSE_AFTER_TYPE;
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
        return DELETE_SPEED;
      } else {
        // Fully deleted — move to next greeting
        setIsDeleting(false);
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        return PAUSE_AFTER_DELETE;
      }
    }
  }, [displayedText, isDeleting, currentGreeting, greetingIndex]);

  useEffect(() => {
    const delay = tick();
    const timer = setTimeout(() => {
      // Force re-render to call tick again
      setDisplayedText((prev) => prev); // no-op to trigger effect
    }, delay);

    return () => clearTimeout(timer);
  });

  // Re-trigger effect on every state change (displayedText, isDeleting, greetingIndex)
  useEffect(() => {
    const delay = tick();
    const timer = setTimeout(() => {
      const fullText = GREETINGS[greetingIndex].text;
      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, greetingIndex]);

  return (
    <h1
      dir={currentGreeting.dir}
      className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl min-h-[1.2em]"
    >
      <span className="hero-gradient-text">{displayedText}</span>
      <span className="hero-cursor animate-blink">|</span>
    </h1>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroTypewriter.tsx
git commit -m "feat: add HeroTypewriter component with gradient cycling animation"
```

---

## Task 8: Update CSS — Gradient Text, Typewriter Cursor, 3D Cards, Sidebar

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add new styles to `app/globals.css`**

Append the following blocks after the existing `@layer components { ... }` closing brace:

```css
/* ---- Hero Gradient Text ---- */
.hero-gradient-text {
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)) 0%,
    rgb(var(--color-foreground)) 50%,
    rgb(var(--color-accent)) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* ---- Typewriter Cursor Blink ---- */
.hero-cursor {
  color: rgb(var(--color-accent));
  font-weight: 300;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 0.8s step-end infinite;
}

/* ---- 3D Card Hover Effects ---- */
.card-3d {
  @apply rounded-xl border border-border bg-surface shadow-sm transition-all duration-300;
  transform: perspective(800px) rotateX(0deg) rotateY(0deg);
}

.card-3d:hover {
  @apply shadow-xl border-accent/30;
  transform: perspective(800px) rotateX(1deg) rotateY(-1deg) translateY(-4px);
}

/* ---- Scroll Indicator ---- */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator {
  animation: scrollBounce 2s ease-in-out infinite;
}

/* ---- Sidebar Styles ---- */
.sidebar {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--color-border)) transparent;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-border));
  border-radius: 2px;
}

/* ---- Product Hero Overlay ---- */
.product-hero-overlay {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgb(var(--color-background) / 0.6) 60%,
    rgb(var(--color-background) / 0.95) 100%
  );
}
```

- [ ] **Step 2: Update `tailwind.config.ts` — add blink animation**

In `tailwind.config.ts`, inside `theme.extend`, add the `animation` and `keyframes` entries alongside the existing `colors` block:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--color-accent-foreground) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"]
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: { "2xl": "1280px" }
      },
      animation: {
        blink: "blink 0.8s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    }
  },
  plugins: []
};

export default config;
```

- [ ] **Step 3: Also update the `.card` class in globals.css to use 3D styling**

In `app/globals.css`, find the existing `.card` definition inside `@layer components` and replace it:

```css
  .card {
    @apply rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-300;
    transform: perspective(800px) rotateX(0deg) rotateY(0deg);
  }
  .card:hover {
    @apply shadow-xl border-accent/30;
    transform: perspective(800px) rotateX(1deg) rotateY(-1deg) translateY(-4px);
  }
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add gradient text, typewriter cursor, 3D card effects, sidebar styles"
```

---

## Task 9: Rebuild Homepage Hero

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update the homepage with HeroTypewriter + Download Portfolio + Scroll to Explore**

Replace the full content of `app/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
          {/* Subtitle above greeting */}
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            {company.name}
          </p>

          {/* Typewriter greeting */}
          <HeroTypewriter />

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg text-muted">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
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

          {/* Scroll to explore */}
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

      {/* Content anchor */}
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
```

- [ ] **Step 2: Create a placeholder portfolio PDF**

```bash
echo "Placeholder — replace with actual ARTSER portfolio PDF" > public/portfolio.pdf
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx public/portfolio.pdf
git commit -m "feat: rebuild homepage hero with typewriter, download portfolio, scroll to explore"
```

---

## Task 10: Create Products Index Page

**Files:**
- Create: `app/products/page.tsx`

- [ ] **Step 1: Create the products landing page**

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategories } from "@/lib/data";

export default function ProductsPage() {
  const { t, localized } = useLanguage();
  const categories = getCategories().filter((c) => c.id !== "all-products");

  return (
    <div className="container-x py-10">
      <Breadcrumbs
        items={[
          { label: "breadcrumb.home", href: "/" },
          { label: "breadcrumb.products" },
        ]}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("products.title")}</h1>
        <p className="mt-3 text-muted">{t("products.subtitle")}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="card group flex items-start gap-4"
          >
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:scale-110">
              <CategoryIcon name={c.icon} className="h-7 w-7" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition">
                {localized(c.name)}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {t(`products.${c.id === "sliding-folding" ? "sliding" : c.id === "smart-buildings" ? "smart" : c.id}.description`).slice(0, 120)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/products/page.tsx
git commit -m "feat: add products index page with category cards and breadcrumbs"
```

---

## Task 11: Create Individual Product Category Pages

**Files:**
- Create: `app/products/[category]/page.tsx`

- [ ] **Step 1: Create the dynamic product category page (Reynaers-style layout)**

This page shows: breadcrumbs, hero image area, product title and description, and a grid of related projects filtered by category. Mirrors the Reynaers `/products/windows` layout.

```tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategories, getProjects } from "@/lib/data";

// Map category slugs to translation key prefixes
const CATEGORY_KEY_MAP: Record<string, string> = {
  windows: "products.windows",
  doors: "products.doors",
  "sliding-folding": "products.sliding",
  facades: "products.facades",
  conservatories: "products.conservatories",
  "smart-buildings": "products.smart",
};

export default function ProductCategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const { t, localized } = useLanguage();

  const categories = getCategories();
  const category = categories.find((c) => c.id === slug);
  const projects = getProjects();

  const keyPrefix = CATEGORY_KEY_MAP[slug];

  if (!category || !keyPrefix) {
    return (
      <div className="container-x py-10">
        <Breadcrumbs
          items={[
            { label: "breadcrumb.home", href: "/" },
            { label: "breadcrumb.products", href: "/products" },
            { label: slug, isKey: false },
          ]}
        />
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
      </div>
    );
  }

  const categoryName = localized(category.name);
  const title = t(`${keyPrefix}.title`);
  const description = t(`${keyPrefix}.description`);

  // Subcategories: show other product categories for cross-navigation
  const otherCategories = categories.filter(
    (c) => c.id !== slug && c.id !== "all-products"
  );

  return (
    <div className="pb-16">
      {/* Breadcrumbs */}
      <div className="container-x pt-6">
        <Breadcrumbs
          items={[
            { label: "breadcrumb.home", href: "/" },
            { label: "breadcrumb.products", href: "/products" },
            { label: title, isKey: false },
          ]}
        />
      </div>

      {/* Hero section — Reynaers style with large image area */}
      <section className="relative">
        <div className="aspect-[21/9] w-full bg-surface-alt flex items-center justify-center overflow-hidden">
          {/* Placeholder for product hero image */}
          <div className="flex flex-col items-center gap-4 text-muted">
            <CategoryIcon name={category.icon} className="h-24 w-24 opacity-20" />
          </div>
          {/* Gradient overlay */}
          <div className="product-hero-overlay absolute inset-0" />
        </div>
      </section>

      {/* Title + Description — Reynaers style */}
      <div className="container-x -mt-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {description}
          </p>
          {/* Search and compare link */}
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:underline">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {t("products.searchCompare")}
            </button>
          </div>
        </div>
      </div>

      {/* Related products / sub-items grid */}
      <div className="container-x mt-16">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {t("home.projectsTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-md bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {localized(p.category)}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {localized(p.title)}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {p.location} &middot; {p.year}
              </p>
              <p className="mt-2 text-sm text-muted">{localized(p.summary)}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Cross-navigation: Other categories */}
      <div className="container-x mt-16">
        <h2 className="mb-6 text-lg font-bold text-foreground">
          {t("sidebar.products")}
        </h2>
        <div className="flex flex-wrap gap-3">
          {otherCategories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              <CategoryIcon name={c.icon} className="h-4 w-4" />
              {localized(c.name)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/products/[category]/page.tsx
git commit -m "feat: add dynamic product category pages with Reynaers-style layout"
```

---

## Task 12: Add Breadcrumbs to All Existing Pages

**Files:**
- Modify: `app/portfolio/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/clients/page.tsx`
- Modify: `app/gallery/page.tsx`
- Modify: `app/certifications/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/request-quote/page.tsx`
- Modify: `app/jv-projects/page.tsx`
- Modify: `app/government/page.tsx`
- Modify: `app/manufacturing/page.tsx`

- [ ] **Step 1: Add breadcrumbs import and component to each page**

For every page file listed above, add the import at the top alongside existing imports:

```tsx
import { Breadcrumbs } from "@/components/Breadcrumbs";
```

Then add the Breadcrumbs component as the first child inside the main wrapper (either inside `<Section>` before the content, or before the first `<Section>`).

Each page gets these breadcrumb items:

**`app/portfolio/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.portfolio" },
]} />
```

**`app/about/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.about" },
]} />
```

**`app/services/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.services" },
]} />
```

**`app/clients/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.clients" },
]} />
```

**`app/gallery/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.gallery" },
]} />
```

**`app/certifications/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.certifications" },
]} />
```

**`app/contact/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.contact" },
]} />
```

**`app/request-quote/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "nav.requestQuote" },
]} />
```

**`app/jv-projects/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "sidebar.projects", href: "/portfolio" },
  { label: "nav.jvProjects" },
]} />
```

**`app/government/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "sidebar.projects", href: "/portfolio" },
  { label: "nav.government" },
]} />
```

**`app/manufacturing/page.tsx`:**
```tsx
<Breadcrumbs items={[
  { label: "breadcrumb.home", href: "/" },
  { label: "sidebar.projects", href: "/portfolio" },
  { label: "nav.manufacturing" },
]} />
```

For pages that use the `<Section>` component as their root wrapper, the Breadcrumbs should be placed inside a `container-x` div before the Section, or the Section component should be modified. The simplest approach: wrap each page's content in a fragment, add breadcrumbs before the first Section in a `<div className="container-x pt-6">` wrapper.

Example for `portfolio/page.tsx`:

```tsx
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProjects } from "@/lib/data";

export default function PortfolioPage() {
  const { t, localized } = useLanguage();
  const projects = getProjects();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: "breadcrumb.home", href: "/" },
          { label: "nav.portfolio" },
        ]} />
      </div>
      <Section title={t("portfolio.title")} subtitle={t("portfolio.subtitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <div className="mb-3 aspect-video rounded-md bg-surface-alt" />
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">{localized(p.category)}</span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{localized(p.title)}</h3>
              <p className="mt-1 text-sm text-muted">{p.location} · {p.year}</p>
              <p className="mt-2 text-sm text-muted">{localized(p.summary)}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
```

Follow this same pattern for all 11 pages.

- [ ] **Step 2: Commit**

```bash
git add app/portfolio/page.tsx app/about/page.tsx app/services/page.tsx app/clients/page.tsx app/gallery/page.tsx app/certifications/page.tsx app/contact/page.tsx app/request-quote/page.tsx app/jv-projects/page.tsx app/government/page.tsx app/manufacturing/page.tsx
git commit -m "feat: add breadcrumbs to all existing pages"
```

---

## Task 13: Update Hero Greeting Translations in Translation Files

**Files:**
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Update the `hero.welcome` keys to use localized brand names**

In `translations/it.json`, change:
```json
"hero.welcome": "Benvenuti in Artigiano Serramenti"
```

In `translations/ar.json`, change:
```json
"hero.welcome": "مرحبًا بكم في آرت سر"
```

In `translations/ur.json`, change:
```json
"hero.welcome": "آرٹ سر میں خوش آمدید"
```

Note: The existing `hero.welcome` values already had `ARTSER` in them. These updates replace `ARTSER` with the localized names. The `HeroTypewriter` component uses its own hardcoded greetings array (which already has the correct values from Task 7), so these translation keys serve as fallbacks for non-JS contexts and consistency.

- [ ] **Step 2: Commit**

```bash
git add translations/it.json translations/ar.json translations/ur.json
git commit -m "feat: update hero.welcome with localized brand names"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run the dev server and check for compilation errors**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000 with no compilation errors.

- [ ] **Step 2: Verify all pages load**

Visit each of these URLs and confirm they render without errors:
- http://localhost:3000 (homepage with typewriter hero)
- http://localhost:3000/products (products index)
- http://localhost:3000/products/windows (individual product page)
- http://localhost:3000/products/doors
- http://localhost:3000/about (with breadcrumbs)
- http://localhost:3000/services (with breadcrumbs)
- http://localhost:3000/portfolio (with breadcrumbs)

- [ ] **Step 3: Verify sidebar navigation**

Confirm:
- Sidebar is visible on desktop (lg breakpoint and above)
- Sidebar groups expand/collapse
- Active page is highlighted with accent color
- Sidebar is hidden on mobile, hamburger shows mobile nav overlay

- [ ] **Step 4: Verify breadcrumbs on every page**

Confirm breadcrumbs show on every page with correct hierarchy (e.g. Home > Products > Windows).

- [ ] **Step 5: Verify typewriter animation**

Confirm the hero greeting cycles continuously: English → Italian → Arabic → Urdu → English → ...

- [ ] **Step 6: Verify language switching**

Switch between all 4 languages and confirm:
- Sidebar labels translate
- Breadcrumb labels translate
- Product page content translates
- Brand name in header stays "ARTSER" in English always

- [ ] **Step 7: Run type check**

```bash
npm run type-check
```

Expected: No TypeScript errors.

- [ ] **Step 8: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address any issues found during final verification"
```

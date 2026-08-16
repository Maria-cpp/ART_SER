# Phase 4: Multilingual Routing & SEO — Design Spec

> **Date:** 2026-08-16
> **Phase:** 4 of 6
> **Prerequisite:** Phases 1–3 complete (UX/UI Foundation, Homepage Redesign, 3D & Animation)

---

## 1. Objective

Migrate from client-side-only locale switching to URL-based locale routing with full SEO infrastructure. Every language (EN, IT, AR, UR) gets its own URL prefix, proper metadata, hreflang signals, structured data, and a dynamic sitemap. RTL components are audited for consistent logical CSS properties.

---

## 2. Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Locale routing | All locales prefixed (`/en/`, `/it/`, `/ar/`, `/ur/`) | Equal treatment of all languages, clean hreflang, no ambiguity |
| Root `/` behavior | Redirect based on `Accept-Language` header, fallback to `en` | Best UX for first-time visitors |
| Default locale | `en` (fallback only) | International-first, no unprefixed URLs |
| Structured data | Organization + LocalBusiness | Real business with physical address; Service/Product schemas deferred |
| Sitemap | Dynamic via `app/sitemap.ts` | Auto-syncs with routes, zero maintenance |
| Admin panel | Stays at `/admin` (no locale prefix) | Internal tool, not public-facing |

---

## 3. Architecture: Locale-Prefixed Routing

### 3.1 New directory structure

```
app/
  page.tsx                    ← Root redirect (detect Accept-Language → /<locale>/)
  layout.tsx                  ← Minimal: html shell, fonts, globals.css only
  sitemap.ts                  ← Dynamic sitemap for all pages × 4 locales
  robots.ts                   ← Robots config pointing to sitemap
  admin/                      ← Unchanged (no locale prefix)
    page.tsx
  api/                        ← Unchanged
    admin/
      [file]/route.ts
      route.ts
  [locale]/                   ← New dynamic segment
    layout.tsx                ← Sets lang, dir, loads translations, wraps providers
    page.tsx                  ← Homepage (moved from app/page.tsx)
    about/page.tsx            ← Moved from app/about/page.tsx
    services/page.tsx
    portfolio/page.tsx
    products/page.tsx
    products/[category]/page.tsx
    contact/page.tsx
    request-quote/page.tsx
    clients/page.tsx
    certifications/page.tsx
    gallery/page.tsx
    government/page.tsx
    jv-projects/page.tsx
    manufacturing/page.tsx
    suppliers/page.tsx
```

### 3.2 Middleware (`middleware.ts`)

- Runs on every request
- Skips: `/_next/`, `/api/`, `/admin`, static assets (`/logo/`, `/hero/`, etc.)
- Validates `[locale]` segment against `LOCALES` array
- If path has no locale prefix and is not excluded: redirect to `/<detected-locale>/path`
- Locale detection order: `localStorage` cookie → `Accept-Language` header → `en`
- Sets `x-locale` response header for downstream use

### 3.3 Root `app/page.tsx`

Becomes a server component that redirects:

```tsx
import { redirect } from 'next/navigation';
// Detect locale from headers, redirect to /<locale>/
```

### 3.4 Root `app/layout.tsx`

Stripped to minimal shell:

- `<html>` with `suppressHydrationWarning` (lang/dir set by `[locale]/layout.tsx`)
- Font imports
- `globals.css`
- `<body>` wrapping `{children}`
- No providers, no Header/Footer (those move to `[locale]/layout.tsx`)

### 3.5 `app/[locale]/layout.tsx`

- Receives `params.locale`, validates it
- Sets `<html lang>` and `<html dir>` server-side via metadata
- Wraps children in `ThemeProvider` → `LanguageProvider`
- Includes `Header`, `Footer`, `DoorIntro`
- Exports `generateMetadata()` for locale-aware SEO (see Section 4)
- Passes locale to LanguageProvider as initial value (no localStorage read needed)

### 3.6 LanguageProvider updates

- Receives `initialLocale` prop from `[locale]/layout.tsx` instead of reading localStorage
- Language switcher changes: instead of `setLocale()`, navigates to `/<newLocale>/current-path` using Next.js `useRouter()` and `usePathname()`
- Still persists choice to localStorage (used by middleware for return visits)
- `t()` and `localized()` functions unchanged

### 3.7 LanguageSwitcher updates

- Uses `usePathname()` to get current path
- Strips current locale prefix, prepends new locale
- Navigates via `router.push()` (client-side) or `<Link>` for each locale option
- Active locale visually indicated

### 3.8 Page components

Each page under `[locale]/` receives `params.locale` and can:

- Pass it to data-fetching functions
- Use it in `generateMetadata()` for per-page SEO
- Content otherwise unchanged — pages already use `useLanguage()` hook

---

## 4. SEO Metadata

### 4.1 `metadataBase`

Set in root `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://artser.it'), // production domain
};
```

### 4.2 `generateMetadata()` in `app/[locale]/layout.tsx`

Generates locale-aware metadata for every page:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = (key: string) => translate(locale, key);

  return {
    title: {
      default: t('meta.title'),
      template: `%s | ARTSER`,
    },
    description: t('meta.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'it': '/it',
        'ar': '/ar',
        'ur': '/ur',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      siteName: 'ARTSER',
      locale: locale,
      type: 'website',
      images: [{ url: '/logo/ARTSER_logo.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}
```

### 4.3 Per-page metadata

Each page exports its own `generateMetadata()` that overrides title/description with page-specific translation keys. Example for services:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = (key: string) => translate(locale, key);
  return {
    title: t('meta.services.title'),
    description: t('meta.services.description'),
  };
}
```

### 4.4 New translation keys needed

Add to all 4 translation files:

```json
{
  "meta.title": "ARTSER — Architectural Aluminium Engineering",
  "meta.description": "Engineering, manufacturing and installation of architectural aluminium systems. 26+ years of Italian craftsmanship.",
  "meta.about.title": "About ARTSER",
  "meta.about.description": "...",
  "meta.services.title": "Services",
  "meta.services.description": "...",
  "meta.portfolio.title": "Portfolio",
  "meta.portfolio.description": "...",
  "meta.contact.title": "Contact",
  "meta.contact.description": "...",
  "meta.products.title": "Products & Systems",
  "meta.products.description": "...",
  "meta.clients.title": "Clients",
  "meta.clients.description": "...",
  "meta.certifications.title": "Certifications",
  "meta.certifications.description": "...",
  "meta.gallery.title": "Gallery",
  "meta.gallery.description": "...",
  "meta.government.title": "Government Projects",
  "meta.government.description": "...",
  "meta.jv.title": "Joint Venture Projects",
  "meta.jv.description": "...",
  "meta.manufacturing.title": "Manufacturing",
  "meta.manufacturing.description": "...",
  "meta.suppliers.title": "Suppliers & Partners",
  "meta.suppliers.description": "...",
  "meta.quote.title": "Request a Quote",
  "meta.quote.description": "..."
}
```

All 13 pages × 4 languages = 52 metadata translations (title + description each).

---

## 5. Sitemap & Robots

### 5.1 `app/sitemap.ts`

Dynamic sitemap generation:

```tsx
import { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';

const BASE_URL = 'https://artser.it';

const PAGES = [
  '',           // homepage
  '/about',
  '/services',
  '/portfolio',
  '/products',
  '/contact',
  '/request-quote',
  '/clients',
  '/certifications',
  '/gallery',
  '/government',
  '/jv-projects',
  '/manufacturing',
  '/suppliers',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

### 5.2 `app/robots.ts`

```tsx
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://artser.it/sitemap.xml',
  };
}
```

---

## 6. Structured Data (JSON-LD)

### 6.1 Organization schema

Added in `app/[locale]/layout.tsx` as a `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ART SER",
  "legalName": "ART SER DI SHEHEZAD TARIQ",
  "url": "https://artser.it",
  "logo": "https://artser.it/logo/ARTSER_logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+3903482402248",
    "email": "art_ser@outlook.it",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.instagram.com/ts_khaan",
    "https://www.facebook.com/share/1QTyovYnxS/"
  ]
}
```

### 6.2 LocalBusiness schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ART SER",
  "description": "<locale-aware description>",
  "url": "https://artser.it",
  "telephone": "+3903482402248",
  "email": "art_ser@outlook.it",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via XX Settembre 86",
    "addressLocality": "San Martino Buon Albergo",
    "addressRegion": "VR",
    "postalCode": "37036",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.4175,
    "longitude": 11.0964
  },
  "image": "https://artser.it/logo/ARTSER_logo.png",
  "priceRange": "$$"
}
```

Both schemas are combined into a single `<script>` tag using `@graph`.

---

## 7. RTL Audit

### 7.1 Scope

Audit all components in:
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/layout/LanguageSwitcher.tsx`
- `components/sections/*.tsx` (all 10 section components)
- `components/hero/*.tsx`
- `components/ui/*.tsx`
- `app/[locale]/**/page.tsx` (all pages after migration)

### 7.2 Rules

Replace physical CSS with logical equivalents:

| Physical | Logical |
|----------|---------|
| `ml-` | `ms-` |
| `mr-` | `me-` |
| `pl-` | `ps-` |
| `pr-` | `pe-` |
| `left-` | `start-` |
| `right-` | `end-` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `rounded-l-` | `rounded-s-` |
| `rounded-r-` | `rounded-e-` |
| `border-l-` | `border-s-` |
| `border-r-` | `border-e-` |

Exceptions (keep physical):
- `px-` / `py-` are symmetric, no change needed
- `dir="ltr"` on phone numbers (intentional)
- Layout properties that are genuinely non-directional

### 7.3 Server-side `dir` attribute

The `[locale]/layout.tsx` sets `dir` server-side based on locale param, eliminating the flash of wrong direction that occurs with client-side-only detection.

---

## 8. Migration Strategy

### 8.1 File moves

All existing page files move from `app/<route>/page.tsx` to `app/[locale]/<route>/page.tsx`. The page content is unchanged — they already use the `useLanguage()` hook for translations.

### 8.2 Admin exclusion

`app/admin/` stays at root level (not under `[locale]/`). It's an internal tool that doesn't need localized URLs or SEO.

### 8.3 API routes exclusion

`app/api/` stays at root level. Middleware skips `/api/` paths.

### 8.4 Backwards compatibility

Old URLs without locale prefix (e.g., `/services`) are caught by middleware and redirected to `/<detected-locale>/services` with a 307 redirect.

---

## 9. Production domain

The spec assumes `https://artser.it` as the production domain. This is used in:
- `metadataBase`
- Sitemap URLs
- Structured data URLs
- Canonical links

If the domain changes, update the single `BASE_URL` constant.

---

## 10. Files changed / created

### New files
- `middleware.ts` — locale detection + redirect
- `app/[locale]/layout.tsx` — locale-aware layout with metadata + structured data
- `app/[locale]/page.tsx` — homepage (moved)
- `app/[locale]/about/page.tsx` — (moved)
- `app/[locale]/services/page.tsx` — (moved)
- `app/[locale]/portfolio/page.tsx` — (moved)
- `app/[locale]/products/page.tsx` — (moved)
- `app/[locale]/products/[category]/page.tsx` — (moved)
- `app/[locale]/contact/page.tsx` — (moved)
- `app/[locale]/request-quote/page.tsx` — (moved)
- `app/[locale]/clients/page.tsx` — (moved)
- `app/[locale]/certifications/page.tsx` — (moved)
- `app/[locale]/gallery/page.tsx` — (moved)
- `app/[locale]/government/page.tsx` — (moved)
- `app/[locale]/jv-projects/page.tsx` — (moved)
- `app/[locale]/manufacturing/page.tsx` — (moved)
- `app/[locale]/suppliers/page.tsx` — (moved)
- `app/sitemap.ts` — dynamic sitemap
- `app/robots.ts` — robots config

### Modified files
- `app/layout.tsx` — stripped to minimal shell
- `app/page.tsx` — becomes root redirect
- `components/providers/LanguageProvider.tsx` — accepts `initialLocale`, navigation-based switching
- `components/layout/LanguageSwitcher.tsx` — navigate instead of setState
- `components/Header.tsx` — nav links prefixed with locale
- `components/Footer.tsx` — links prefixed with locale
- `translations/en.json` — add `meta.*` keys
- `translations/it.json` — add `meta.*` keys
- `translations/ar.json` — add `meta.*` keys
- `translations/ur.json` — add `meta.*` keys
- Various components — RTL audit fixes (physical → logical CSS)

### Unchanged
- `app/admin/page.tsx`
- `app/api/**`
- `lib/i18n.ts` (exports already sufficient)
- `lib/data.ts`
- `data/*.json`
- `components/3d/**`
- `components/providers/ThemeProvider.tsx`

---

## 11. Out of scope

- URL-based locale for admin panel
- Service/Product structured data schemas (deferred to later)
- Server-side locale detection via IP geolocation
- Locale-specific OG images
- Translation quality review (translations already verified as professional)

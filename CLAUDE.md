# CLAUDE.md — ARTSER Website Development Guide

This file gives Claude (and Cursor/any AI coding assistant) the full context needed to develop, extend, and maintain the ARTSER corporate website. Read this before making changes.

---

## 1. Project Overview

ARTSER is a corporate / industrial company website. The site is **multilingual**, **multi-theme**, and uses a **JSON-based CMS** (no database). All content lives in flat JSON files under `/data` and `/translations`, edited either by hand or through the built-in `/admin` dashboard.

**Design direction:** Government / Corporate — premium corporate-industrial style. Clean, authoritative, content-forward.

### Stack
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (strict)
- **TailwindCSS 3** (theme via CSS variables)
- **JSON-based CMS** — no database
- **Vercel** for deployment

### Non-negotiable requirements
1. Four languages: English (`en`), Italiano (`it`), Arabic (`ar`), Urdu (`ur`).
2. Arabic and Urdu must render **full RTL**. English and Italian are LTR.
3. Four runtime-selectable themes, persisted in `localStorage`.
4. Language choice persisted in `localStorage`.
5. `/admin` panel can edit all JSON content and save via API routes.

---

## 2. Directory Structure

```
artser-website/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout — wraps Theme + Language providers
│   ├── globals.css              # Tailwind + theme CSS variables + RTL rules
│   ├── page.tsx                 # 1. Home (multilingual animated hero)
│   ├── about/page.tsx           # 2. About ARTSER
│   ├── services/page.tsx        # 3. Services
│   ├── portfolio/page.tsx       # 4. Portfolio / Projects
│   ├── jv-projects/page.tsx     # 5. JV Projects
│   ├── manufacturing/page.tsx   # 6. Manufacturing / Production
│   ├── government/page.tsx      # 7. Government / Commercial Projects
│   ├── clients/page.tsx         # 8. Clients
│   ├── gallery/page.tsx         # 9. Gallery
│   ├── certifications/page.tsx  # 10. Certifications
│   ├── request-quote/page.tsx   # 11. Request Quote
│   ├── contact/page.tsx         # 12. Contact
│   ├── admin/page.tsx           # Admin dashboard (JSON editor + forms)
│   └── api/
│       └── admin/
│           ├── [file]/route.ts  # GET/POST a single data file
│           └── route.ts         # list editable files
├── components/
│   ├── providers/
│   │   ├── ThemeProvider.tsx    # theme context + localStorage + <html data-theme>
│   │   └── LanguageProvider.tsx # language context + RTL dir + localStorage + t()
│   ├── Header.tsx               # nav + ThemeSwitcher + LanguageSwitcher
│   ├── Footer.tsx
│   ├── ThemeSwitcher.tsx
│   ├── LanguageSwitcher.tsx
│   └── Section.tsx              # shared layout primitive
├── data/                        # CONTENT (the "CMS") — edited by hand or /admin
│   ├── company.json
│   ├── services.json
│   ├── projects.json
│   ├── jv-projects.json
│   ├── government-projects.json
│   ├── gallery.json
│   ├── clients.json
│   ├── team.json
│   ├── certifications.json
│   ├── quotes.json              # submitted quote requests (written by API)
│   └── contact.json
├── translations/                # UI strings per language
│   ├── en.json
│   ├── it.json
│   ├── ar.json
│   └── ur.json
├── lib/
│   ├── themes.ts                # theme definitions + type
│   ├── i18n.ts                  # locale config, RTL map, translation loader
│   └── data.ts                  # typed JSON loaders + file registry
├── public/                      # static assets (logo, images)
├── CLAUDE.md                    # this file
├── README.md
└── config files (next, tailwind, tsconfig, postcss, eslint)
```

---

## 3. Internationalization (i18n)

- Locales and direction are defined in `lib/i18n.ts`:
  - `en` → `ltr`, `it` → `ltr`, `ar` → `rtl`, `ur` → `rtl`.
- `LanguageProvider` sets `<html lang>` and `<html dir>` on change, persists to `localStorage` key `artser.lang`, and exposes a `t(key)` helper plus the current `locale` and `dir`.
- UI strings live in `/translations/<locale>.json`. Keys are **flat dot-namespaced** strings, e.g. `nav.home`, `hero.welcome`, `cta.requestQuote`. Keep the same key set across all four files.
- **Content** (projects, services, company story, etc.) lives in `/data`. Where a content field needs translation, store it as an object keyed by locale:
  ```json
  { "title": { "en": "...", "it": "...", "ar": "...", "ur": "..." } }
  ```
  Use the helper `localized(field, locale)` from `lib/i18n.ts` to read these.
- **Adding a language:** add the locale to `LOCALES` and `RTL_LOCALES` (if RTL) in `lib/i18n.ts`, create `/translations/<locale>.json`, and add the locale key to every localized content field.

### RTL rules
- Direction is applied at `<html dir>`. Prefer Tailwind **logical** utilities (`ms-`/`me-`, `ps-`/`pe-`, `text-start`/`text-end`) over physical (`ml-`, `pl-`, `text-left`) so layouts mirror automatically.
- `globals.css` includes base RTL adjustments and loads an Arabic-friendly font stack via `--font-arabic`.

---

## 4. Theme System

- Four themes defined in `lib/themes.ts`: `obsidian` (Obsidian Industrial), `government` (Corporate Government), `luxury` (Minimal Luxury), `architectural` (Modern Architectural).
- Each theme is a set of RGB triples mapped to CSS variables (`--color-background`, `--color-surface`, `--color-foreground`, `--color-accent`, etc.) declared in `globals.css` under `[data-theme="..."]` selectors.
- `ThemeProvider` writes the chosen theme to `<html data-theme>` and persists to `localStorage` key `artser.theme`.
- Tailwind color utilities (`bg-background`, `text-accent`, `border-border`, …) resolve to these variables — so **never hardcode hex colors in components**; use the semantic utilities.
- **Adding a theme:** add an entry to `THEMES` in `lib/themes.ts`, add a matching `[data-theme="id"]{ ... }` block in `globals.css`, done. The switcher picks it up automatically.

---

## 5. Data / CMS Model

- All content is plain JSON in `/data`. Read it server-side with the typed loaders in `lib/data.ts` (e.g. `getCompany()`, `getServices()`).
- The `/admin` dashboard reads and writes these files through API routes:
  - `GET /api/admin` → list of editable files.
  - `GET /api/admin/[file]` → parsed JSON for one file.
  - `POST /api/admin/[file]` → validate + overwrite that file.
- The API **only allows files in an allowlist** (`EDITABLE_FILES` in `lib/data.ts`) to prevent path traversal.

### IMPORTANT — Vercel filesystem caveat
Vercel's serverless runtime has a **read-only filesystem** at runtime, so the file-writing API routes work in **local development** but will fail on a standard Vercel deployment. Options for production persistence (pick one when you go live):
1. Commit edits via the Git provider API (writes go through a PR/commit).
2. Move `/data` to a storage backend (Vercel Blob, S3, Upstash Redis, a headless CMS, etc.) and swap the loaders/writers.
3. Use the admin in local dev only, commit the JSON, and redeploy.

The API route includes a guard and a clear error message describing this. See `app/api/admin/[file]/route.ts`.

---

## 6. Conventions

- **Server Components by default.** Add `"use client"` only where interactivity/state is needed (providers, switchers, forms, admin).
- **No hardcoded colors** — use theme utilities.
- **No hardcoded UI strings** — use `t()` from the language context; add the key to all four translation files.
- **Logical CSS utilities** for anything directional.
- Keep content in `/data` and `/translations`; keep code in `/app`, `/components`, `/lib`.
- TypeScript strict mode — no `any` unless justified.

---

## 7. Common Tasks

- **Add a page:** create `app/<route>/page.tsx`, add a nav entry in `Header.tsx`, add `nav.<route>` to all four translation files.
- **Add content type:** create `data/<name>.json`, add a loader in `lib/data.ts`, add it to `EDITABLE_FILES`, render it in a page, and (optionally) add an admin editor section.
- **Edit content:** run `npm run dev`, open `/admin`, edit, save — or edit the JSON directly.

---

## 8. Run & Deploy

```bash
npm install
npm run dev        # http://localhost:3000   (admin at /admin)
npm run build      # production build
npm run type-check # tsc --noEmit
```

Deploy to Vercel: push to Git, import the repo in Vercel, framework auto-detected as Next.js. Mind the read-only filesystem note in §5 before relying on the admin save in production.

---

## 9. Status / TODO

This repository is a **foundation scaffold**:
- ✅ Configs, theme system, i18n + RTL, providers, header/footer, data loaders, admin + API routes, all JSON data + translations.
- 🚧 The 12 pages are **functional stubs** — they wire up data + translations and render the basic structure. Flesh out layout, sections, imagery, and animations per the design direction.
- 🚧 Replace mock data and placeholder logo/images in `/public` and `/data`.
- 🚧 Decide and wire production persistence for `/admin` (see §5).

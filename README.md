# ARTSER — Corporate Website

A premium corporate-industrial website for **ARTSER**, built with Next.js 15. Multilingual (English, Italiano, العربية, اردو) with full RTL support, four runtime-selectable themes, a JSON-based CMS, and a built-in `/admin` dashboard — no database required.

---

## Features

- **Next.js 15 App Router** + React 19 + TypeScript (strict).
- **4 languages:** English · Italiano · العربية · اردو, with **full RTL** for Arabic & Urdu. Selection persisted in `localStorage`.
- **4 themes:** Obsidian Industrial · Corporate Government · Minimal Luxury · Modern Architectural. Runtime switcher, persisted in `localStorage`.
- **JSON-based CMS:** all content in flat JSON files under `/data` and `/translations`.
- **Admin dashboard** at `/admin`: edit company info, services, projects, gallery, clients, certifications, contact, translations, and a raw JSON editor mode — saved through API routes.
- **12 pages:** Home, About, Services, Portfolio, JV Projects, Manufacturing, Government / Commercial, Clients, Gallery, Certifications, Request Quote, Contact.
- Mock data included throughout — replace with real content.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000
# → admin at http://localhost:3000/admin

# 3. Production build
npm run build && npm run start
```

Requires Node.js 18.18+ (20+ recommended).

---

## Project Structure

```
app/            App Router pages, layout, admin, API routes
components/     Header, Footer, providers, theme & language switchers
data/           JSON content (the CMS)
translations/   UI strings per language (en, it, ar, ur)
lib/            themes, i18n, typed data loaders
public/
  logo/         logo images (ART_SER_logo.png, letter PNGs)
  portfolio/    downloadable portfolio PDFs
  hero/         hero slideshow images
  ...           product & client images
```

See **CLAUDE.md** for the full architecture, conventions, and development guide.

---

## Content Editing

Two ways to edit content:

1. **Admin dashboard** — run the dev server and open `/admin`. Edit via forms or the raw JSON editor, then save.
2. **Directly** — edit the JSON files in `/data` (content) and `/translations` (UI strings).

Translation files share an identical key set across all four languages — keep them in sync when adding strings.

---

## Themes & Languages

- **Themes** are defined in `lib/themes.ts` and styled via CSS variables in `app/globals.css`. Add a theme by adding an entry + a `[data-theme="id"]` block.
- **Languages** are configured in `lib/i18n.ts`. Add one by extending `LOCALES` (and `RTL_LOCALES` if right-to-left) and adding a `translations/<locale>.json`.

Components use semantic Tailwind utilities (`bg-background`, `text-accent`, `ms-`/`me-`, …) so themes and RTL apply automatically.

---

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. Build command `next build`, output handled automatically. No env vars required for the base site.
4. Deploy.

> **⚠️ Admin save on Vercel:** Vercel's serverless filesystem is **read-only at runtime**, so the admin's "save to JSON" API works in local development but not on a default Vercel deployment. For production content editing, either edit JSON locally and commit, or wire the loaders/writers to a storage backend (Vercel Blob, S3, a headless CMS) or the Git provider API. Details in **CLAUDE.md §5**.

---

## License

Proprietary — © ARTSER. All rights reserved.

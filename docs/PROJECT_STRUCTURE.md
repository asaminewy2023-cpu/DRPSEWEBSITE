# Project Directory & File Guide

A complete walkthrough of every folder and file in the DRPSEWEBSITE monorepo.
This is a reference doc — see `docs/ARCHITECTURE.md` for data-flow/architecture
and `docs/STEPS.md` for the phased migration history.

---

## Overview

**Platform:** The official website + content management system (CMS) for the
Office of the Deputy Regional President of the South Ethiopia Regional State.

**Monorepo:** `pnpm` workspaces. Two apps and three shared packages.

```
apps/
  cms/        Payload CMS — admin UI + REST API (Next.js, port 3000)
  website/    Public site (Next.js, port 3001)
packages/
  shared/     Shared CMS HTTP client + generated Payload types (@sevp/shared)
  ui/         Shared UI chrome, contexts, locales (@sevp/ui)
  config/     Shared TypeScript configuration
docs/         Project documentation
scripts/      Setup helper scripts
```

**Ports:** CMS = `http://localhost:3000` (admin `/admin`, API `/api`),
Website = `http://localhost:3001`.

---

## Root files

### `package.json`
Root workspace manifest (`sevp-platform`).
- `"type": "module"` — all TS is ESM.
- `packageManager: pnpm@11.18.0`, Node `>=20.9.0`.
- Scripts:
  - `dev` — runs CMS and website together via `concurrently` (CMS = blue, website = green).
  - `dev:cms` / `dev:website` — run one app only.
  - `build` / `build:cms` / `build:website` — production builds (`pnpm -r`).
  - `lint`, `typecheck` — run across all workspaces.
  - `migrate:cms` / `migrate:cms:create` — Payload DB migrations.
  - `types:cms` — regenerate Payload types into `packages/shared`.

### `pnpm-workspace.yaml`
Declares workspace packages: `apps/*` and `packages/*`. Also holds
`allowBuilds` (Prisma engines, esbuild, sharp, prisma) and `patchedDependencies`
for `@payloadcms/ui` (fixes the Payload ConfigSync login crash).

### `pnpm-lock.yaml`
Lockfile for the entire monorepo. Contains the `@payloadcms/ui` patch entry;
`pnpm i` re-applies it.

### `AGENTS.md`, `CLAUDE.md`
AI-assistant instruction files. `AGENTS.md` warns that the installed Next.js is
custom and to read `node_modules/next/dist/docs/` before writing code.

### `skills-lock.json`
Lockfile for the `.agents/skills/` collection.

### `.gitignore`
Ignores `node_modules`, `.next`, `dist`, `.env` secrets, logs, build artifacts.

### `patches/@payloadcms__ui.patch`
The actual patch content referenced by `patchedDependencies` in the lockfile.

### `how host this our website project.txt`
A plain-text note about hosting the project.

---

## `apps/cms/` — Payload CMS (port 3000)

Next.js + Payload v3 app. Owns all content; exposes `/admin` and `/api/*`.

### Config & entry

- **`payload.config.ts`** — the Payload config: Postgres adapter, nodemailer
  email adapter (SMTP from env), Lexical rich-text editor, `users` as the admin
  user, `sharp` for images, and type generation output pointed at
  `packages/shared/src/payload-types.ts` (`typescript.declare: false` so the
  website without `payload` installed still typechecks).
- **`next.config.ts`** — website Next config wrapped with `withPayload`.
- **`package.json`** — `@sevp/cms`. Scripts: `dev` (port 3000), `build`, `start`,
  `lint`, `typecheck`, `payload:generate:types`, `payload:migrate`,
  `payload:migrate:create`, `seed`.
- **`.env`** — `DATABASE_URL`, `PAYLOAD_SECRET`, and SMTP email settings
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`,
  `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`). **Not committed** (in `.gitignore`).
- **`tsconfig.json`**, **`next-env.d.ts`**, **`eslint.config.mjs`** — standard
  TypeScript / Next / ESLint setup.

### `app/(payload)/` — Payload Next.js route group
- **`layout.tsx`** — mounts Payload's `RootLayout` with `handleServerFunctions`.
  **Required**; without it the admin crashes.
- **`admin/[[...segments]]/page.tsx`** — generated admin routes.
- **`admin/importMap.js`** — generated import map for admin UI.
- **`admin/[[...segments]]/not-found.tsx`** — admin 404.
- **`api/[...slug]/route.ts`** — generated REST API handlers.

### `collections/` — content models (18 total)

Each file exports a Payload `CollectionConfig`. Indexed in `collections/index.ts`.

| File | Collection | Purpose |
|---|---|---|
| `Users.ts` | users | Admin/editor accounts (auth) |
| `Media.ts` | media | Uploaded images/documents with responsive sizes |
| `NewsCategories.ts` | news-categories | Blog/news categories |
| `Tags.ts` | tags | Post tags |
| `Pages.ts` | pages | CMS-editable static pages (`about`, `cluster`, …) with hero + blocks |
| `Posts.ts` | posts | Blog/news articles (title, slug, excerpt, content, category, author, publishDate, thumbnail, status, sticky, commentStatus) |
| `Announcements.ts` | announcements | Public announcements |
| `PressReleases.ts` | press-releases | Press releases |
| `SuccessStories.ts` | success-stories | Success stories |
| `PublicNotices.ts` | public-notices | Public notices |
| `Programs.ts` | programs | Regional programs |
| `GalleryItems.ts` | gallery-items | Photo gallery items |
| `Shorts.ts` | shorts | Short posts/updates |
| `ContactMessages.ts` | contact-messages | Contact-form submissions (write-only) |
| `Documents.ts` | documents | Downloadable documents per category (annual-reports, policies, …) with `file` media + `date` + `description` |
| `Events.ts` | events | Upcoming events shown on the homepage (title, date, location, type, description) |

### `globals/` — singleton settings
- **`SiteSettings.ts`** — `site-settings`: branding (logo, site name/subtitle),
  organization title, navigation links (`navLinks`), footer (description,
  copyright, developedBy), contact info, social links.
- **`Settings.ts`** — `settings`: display options (e.g. `postBase`,
  `useTrailingSlash`, `listImageSize`).
- **`globals/index.ts`** — exports the `globals` array.

### `blocks/` — reusable content blocks
Shared Lexical/field blocks used across collections:
`CtaBlock.ts`, `HeadingBlock.ts`, `HeroBlock.ts`, `ImageBlock.ts`,
`ListBlock.ts`, `ParagraphBlock.ts`, `QuoteBlock.ts`, plus `index.ts`.

### `lib/`
- **`access.ts`** — access control helpers (incl. `restrictStatus`, which keeps
  post `status` at `pending` unless the requesting user has a publisher role).
- **`load-env.ts`** — loads env vars for seed/scripts.

### `media/`
Local placeholder media used by `seed.ts`: `dr ababayehu-*.jpg`,
`tilahun-*.jpg` (with `-400x300` / `-768x432` responsive crops) and `.txt`
placeholder "files" for documents.

### `migrations/`
Payload-generated Postgres migrations — each change ships a `.ts` + `.json`
pair, registered in `migrations/index.ts`. Covers collection additions and the
`Settings` global (e.g. `20260812_182927`, `20260813_103759_add_settings_global`).

### `seed.ts`
Runs with `pnpm --filter @sevp/cms seed`. Creates the admin user, media items,
categories, published posts, announcements, programs, events, documents, etc.
via the local Payload API.

---

## `apps/website/` — public site (port 3001)

Next.js App Router app. Presentation only — reads the CMS via `@sevp/shared`.

### Config
- **`package.json`** — `@sevp/website`. Deps: `@sevp/shared`, `@sevp/ui`,
  `next`, `react`; dev: Tailwind v4, TypeScript, ESLint.
- **`next.config.ts`** — `transpilePackages` for `@sevp/shared`/`@sevp/ui`;
  image config (`avif`/`webp`, device sizes, `minimumCacheTTL`,
  `dangerouslyAllowLocalIP`, CMS remote pattern); `headers()` adds 1-year
  immutable `Cache-Control` for `logo-modified.png`, `ababayehu-tadesse.jpeg`,
  `icon.png`, and all `.svg`.
- **`.env`** — `DATABASE_URL` (unused by site), `CMS_BASE_URL`,
  `NEXT_PUBLIC_CMS_BASE_URL`, `CMS_REVALIDATE_SECONDS=60`,
  `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`. **Not committed.**
- **`tsconfig.json`**, **`next-env.d.ts`**, **`eslint.config.mjs`**,
  **`postcss.config.mjs`** — tooling config.

### `public/` — static assets
`logo-modified.png`, `Flag_of_Southern_Ethiopia.png`,
`ababayehu-tadesse.jpeg` (hero image).

### `src/app/` — routes (App Router)
Every folder with `page.tsx` is a route. `layout.tsx` wraps everything with the
Header/Footer/chrome.

| Route | File | Description |
|---|---|---|
| `/` | `page.tsx` | Homepage (hero, stats, events, news, publications, …) |
| `/about` | `about/page.tsx` | About the office (CMS-editable via `CmsPage`) |
| `/cluster` | `cluster/page.tsx` | Cluster info |
| `/projects` | `projects/page.tsx` | Projects overview |
| `/projects/[slug]` | `projects/[slug]/page.tsx` | Project detail |
| `/programs` | `programs/page.tsx` | Regional programs |
| `/news` | `news/page.tsx` | News listing (posts, category-filtered) |
| `/blog` | `blog/page.tsx` | Blog listing |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | Blog post detail (hero image, content, related posts) |
| `/documents` | `documents/page.tsx` | Document center (category cards) |
| `/documents/[category]` | `documents/[category]/page.tsx` | Documents in a category with download buttons |
| `/media` | `media/page.tsx` | Video/photo media |
| `/gallery` | `gallery/page.tsx` | Photo gallery |
| `/announcements` | `announcements/page.tsx` | Announcement listing |
| `/announcements/[id]` | `announcements/[id]/page.tsx` | Announcement detail |
| `/public-notices` | `public-notices/page.tsx` | Public notice listing |
| `/public-notices/[id]` | `public-notices/[id]/page.tsx` | Notice detail |
| `/press-releases` | `press-releases/page.tsx` | Press release listing |
| `/press-releases/[id]` | `press-releases/[id]/page.tsx` | Press release detail |
| `/success-stories` | `success-stories/page.tsx` | Success story listing |
| `/success-stories/[id]` | `success-stories/[id]/page.tsx` | Success story detail |
| `/public-services` | `public-services/page.tsx` | Services (CMS-editable) |
| `/contact` | `contact/page.tsx` | Contact form (server action) |
| `/search` | `search/page.tsx` | Search page |
| `/privacy` | `privacy/page.tsx` | Privacy policy (static) |
| `/terms` | `terms/page.tsx` | Terms of use (static) |

**App-level special files:**
- **`layout.tsx`** — root layout: fonts (Poppins + Open Sans via `next/font`),
  preconnect to the CMS origin, GSC verification metadata, providers
  (Accessibility, Language), Header/Footer/AccessibilityToolbar, `Analytics`,
  and `CookieConsentBanner`.
- **`globals.css`** — global Tailwind v4 styles, typography rules (Poppins 600
  headings, Open Sans body, button sizing).
- **`error.tsx`, `global-error.tsx`** — error boundaries (human-friendly).
- **`loading.tsx`** — root loading fallback.
- **`not-found.tsx`** — branded 404 page.
- **`sitemap.ts`** — generates `/sitemap.xml` (static routes + CMS blog posts;
  `force-static`).
- **`icon.png`**, **`favicon.ico`** — site icon.

### `src/components/` — website components (23)
Homepage sections and shared UI:
`HeroBanner`, `Statistics`, `WelcomeMessage`, `StrategicPriorities`,
`Initiatives`, `Clusters`, `FeaturedProjects`, `Partners`, `LatestNews`,
`LatestPublications`, `QuickServices`, `UpcomingEvents` (server) +
`UpcomingEventsClient` (client icons/colors), `PhotoGallery`, `VideoGallery`,
`ShortFeed`, `BlocksRenderer`, `CmsPage`, `RichText`, `ContactForm`,
`SearchForm`, `Analytics`, `CookieConsentBanner`.

### `src/lib/`
- **`cms-data.ts`** — the website's CMS data layer. Safe helpers
  (`fetchOrNull`, `listOrEmpty`, `logCmsError`) plus typed getters for every
  collection: `getSiteSettings`, `getSettings`, `getPages`, `getPage`,
  `getPosts`, `getPostBySlug`, `getRelatedPosts`, `getAnnouncements`,
  `getPublicNotices`, `getPublicNoticeById`, `getSuccessStories`,
  `getSuccessStoryById`, `getPressReleases`, `getPressReleaseById`,
  `getAnnouncementById`, `getPrograms`, `getDocuments`, `getUpcomingEvents`,
  `getGalleryItems`, `getShorts`, plus URL/format helpers
  (`documentFileUrl`, `postImageUrl`, `postHeroImageUrl`, `postHref`,
  `categoryLabel`, `categorySlug`, `authorName`) and `submitContactMessage`.
  Uses ISR revalidation tiers (events/announcements 30s, static content 300s,
  default 60s).
- **`analytics.ts`** — consent-gated analytics utilities: `GA4_ID`,
  `CONSENT_COOKIE`, `getConsent`/`setConsent`/`hasConsent`, `trackEvent`,
  `trackSearch`, `trackDownload`, download-link detection helpers.

### `src/actions/`
- **`contact.ts`** — server action backing the contact form (submits to the CMS
  `contact-messages` API).

---

## `packages/shared/` — `@sevp/shared`

- **`src/cms.ts`** — the CMS HTTP client:
  - `CMS_BASE_URL` (from env, defaults to `http://localhost:3000`).
  - `CmsListResponse<T>` — Payload list response shape.
  - `cmsFetch<T>(path, { revalidate })` — fetch with ISR revalidation.
  - `cmsList<T>(slug, params)` — list records.
  - `cmsQuery(params)` — serializes query params to a query string.
- **`src/payload-types.ts`** — **generated** by `payload generate:types`.
  Single source of truth for every collection's TypeScript shape; imported by
  the website.
- **`src/index.ts`** — public barrel exports.
- **`package.json`**, **`tsconfig.json`** — package config.

---

## `packages/ui/` — `@sevp/ui`

Shared UI chrome and contexts for the website.

### `src/index.ts` — public exports
- `cn(...)` class-join helper.
- `formatDisplayDate(...)` date formatter (en/am).
- `LanguageProvider`, `useLanguage`, `Lang`, `Translations`.
- `AccessibilityProvider`, `useAccessibility`.
- `Header` (+ types), `Footer` (+ types), `LangSwitcher`, `AccessibilityToolbar`.

### `src/server.ts`
Exports `getT` (server-only translation reader) via the `@sevp/ui/server`
subpath so client bundles never pull in `next/headers`.

### `src/components/`
- **`Header.tsx`** — site header: logo, organization title, inline flex-wrap
  navigation (single row, no hamburger), search, `LangSwitcher`.
- **`Footer.tsx`** — site footer with quick links, contact, social, copyright.
- **`LangSwitcher.tsx`** — EN/AM language switcher (sets the `lang` cookie).
- **`AccessibilityToolbar.tsx`** — accessibility controls (font size, contrast).

### `src/lib/`
- **`LanguageContext.tsx`** — language provider + `useLanguage` (reads/writes the
  `lang` cookie; `t` translations object).
- **`AccessibilityContext.tsx`** — accessibility provider + `useAccessibility`.
- **`getT.ts`** — reads the `lang` cookie server-side and returns `en`/`am`
  translations (used by server components).
- **`locales/en.ts`**, **`locales/am.ts`** — all UI strings in English and
  Amharic (nav, hero, home, documents, search, contact, footer, cookie banner…).

### `package.json`, `tsconfig.json`
Package config for `@sevp/ui`.

---

## `packages/config/`
- **`tsconfig.base.json`** — shared TypeScript compiler options used by all
  workspaces.
- **`package.json`** — config package manifest.

---

## Other directories

### `docs/`
Project documentation:
- **`ARCHITECTURE.md`** — monorepo layout, data flow, CMS content model,
  website block rendering, env vars, ports, database, tooling.
- **`STEPS.md`** — phased migration history and remaining optional hardening
  (Docker/proxy deploy, QA cleanup).
- **`PROJECT_STRUCTURE.md`** — this file.

### `scripts/`
- **`setup.ps1`** — PowerShell setup helper.

### `.agents/skills/`
AI-assistant skill packs (Prisma CLI/API/database/compute docs). Tooling for the
dev environment, not application code.







Role			Email				Password
Super Admin		admin@southethiopia.gov.et	password123
Editor			editor@southethiopia.gov.et	password123
Reporter		reporter@southethiopia.gov.et	password123
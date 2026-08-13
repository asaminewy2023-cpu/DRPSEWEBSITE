# Recommended Steps

Status of the monorepo after the migration. Phases 1–6 and 8–10 are complete.

- **Phase 1** — foundation verified.
- **Phase 2** — website pages + contact form read/write the CMS REST API through
  `@sevp/shared`; Lexical rich text renders via `RichText` in
  `apps/website/app/components/RichText.tsx`.
- **Phase 3** — custom auth/admin/dashboard/login removed; editors use the
  Payload admin at `http://localhost:3000/admin`.
- **Phase 4** — Prisma removed from the website (deps, generated client,
  `prisma/`, `db:*` scripts, `app/lib/db.ts`).
- **Phase 5** — language/accessibility contexts, locales, `getT`, and the site
  chrome (Header/Footer/LangSwitcher/AccessibilityToolbar) moved into
  `@sevp/ui`. `getT` is exported via `@sevp/ui/server`.
- **Phase 8** — Gutenberg-style block editor in the CMS: shared `blocks/`
  definitions, a `blocks` field on `posts` / `announcements` / `programs` /
  `shorts`, and a new `pages` collection for static routes. Tables created by
  migration `20260810_225144`. Typegen uses `typescript.declare: false` so the
  website (no `payload` dep) keeps typechecking.
- **Phase 9** — the website consumes blocks: `BlocksRenderer.tsx` renders block
  JSON (reusing `RichText` for `paragraph`), `CmsPage.tsx` renders a `pages`
  collection doc (hero + blocks) with hardcoded fallback, `blog/[slug]` and
  `announcements/[id]` prefer `blocks` over rich text, and `about` / `cluster` /
  `documents` / `projects` / `public-services` are CMS-editable via
  `CmsPage({ slug, fallback })`. Verified: build green; public CMS-created page
  with hero/heading/paragraph/list renders on the site.
- **Phase 10** — audit hardening (verified):
  - Email notifications for contact submissions via `afterChange` hook
    (`CONTACT_TO_EMAIL`).
  - Graceful analytics (GA4/GSC) gated behind consent; search and download
    events tracked.
  - Real CMS search: `searchCms` + `/search` page.
  - Docker deployment (see `docs/DEPLOYMENT.md`) and credential rotation via
    seed env-password overrides.
  - Document downloads fixed (absolute media URLs, published gating).
  - Blog comments: `comments` collection + moderated public submission.
  - Newsletter: `subscribers` collection + footer subscription form.
  - Locale parity verified (en/am full key parity).

## Phase 6 — Docker, proxy & deployment (done)

- `docker/docker-compose.yml` runs postgres + cms + website + nginx.
- `docker/Dockerfile.website` / `docker/Dockerfile.cms`; `docker/nginx.conf`
  routes `/admin/*` and `/api/*` to the CMS, everything else to the website.
- `docs/DEPLOYMENT.md` documents env vars, credential rotation, and TLS-at-proxy
  notes. `docker compose config --quiet` validates cleanly.

## Phase 7 — QA & cleanup (done)

### CMS admin troubleshooting (done)

- `app/(payload)/layout.tsx` restores the Payload admin UI (`/admin/login`
  500 → 200). It mounts `RootLayout` + `handleServerFunctions`.
- `@payloadcms/ui` has a `patchedDependencies` entry (payloadcms/payload
  #17095, ConfigSync destructures undefined on login SSR) — kept in the root
  lockfile, reapplied on `pnpm i`.

### Legacy Prisma tables (done)

- The unused legacy Prisma tables (`"Post"`, `"User"`, `"Announcement"`,
  `"Program"`, `"GalleryItem"`, `"Short"`, `"ContactMessage"`) were dropped
  from Postgres. No Prisma deps or `prisma/` directories remain.

### Ongoing maintenance

- `pnpm typecheck && pnpm lint && pnpm build` (root).
- Smoke test: public pages, CMS CRUD, rich text, draft/publish visibility.
- Keep `docs/` in sync as collections evolve.
- Monitoring: `scripts/monitor.sh` + `scripts/backup.sh`, see
  `docs/MONITORING.md`.
# Recommended Steps

Status of the monorepo after the migration. Phases 1–5 are complete.

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

Remaining work is optional hardening:

## Phase 6 — Docker, proxy & deployment

1. `docker compose -f docker/docker-compose.yml up postgres` for a managed DB.
2. Finalize the Dockerfiles (the monorepo must be the build context; see
   `docs/ARCHITECTURE.md`). Use `.dockerignore` to exclude `node_modules`,
   `.next`, and `.env`.
3. The bundled `nginx.conf` routes `/admin/*` and `/api/*` to the CMS and
   everything else to the website. Terminate TLS at the proxy in production.
4. Set `PAYLOAD_SECRET` (strong, random) and a real Postgres password.

## Phase 7 — QA & cleanup

### CMS admin troubleshooting (done)

- `app/(payload)/layout.tsx` restores the Payload admin UI (`/admin/login`
  500 → 200). It mounts `RootLayout` + `handleServerFunctions`.
- `@payloadcms/ui` has a `patchedDependencies` entry (payloadcms/payload
  #17095, ConfigSync destructures undefined on login SSR) — kept in the root
  lockfile, reapplied on `pnpm i`.

- If desired, drop the unused legacy Prisma tables from Postgres
  (`"Post"`, `"User"`, `"Announcement"`, `"Program"`, `"GalleryItem"`,
  `"Short"`, `"ContactMessage"`).
- `pnpm typecheck && pnpm lint && pnpm build` (root).
- Smoke test: public pages, CMS CRUD, rich text, draft/publish visibility.
- Keep `docs/` in sync as collections evolve.

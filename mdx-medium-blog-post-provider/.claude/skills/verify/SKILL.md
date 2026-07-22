---
name: verify
description: Build, launch, and drive this Next.js blog app to verify changes at runtime
---

# Verifying changes in this app

## Build & launch (production)

```bash
cd mdx-medium-blog-post-provider
rtk proxy npx next build        # plain `rtk next build` mangles output; use proxy
rtk proxy npx next start -p 3111   # run in background; ~5s to come up
```

No `.env` is needed for read paths — the Supabase URL and anon key are
hardcoded in `src/utils/functions/supabase_client/SupabaseClient.ts`, so
article/tag/author pages and `/feed.xml` work against the live database.
API routes for AI chat/summarize (`ANTHROPIC_API_KEY`) and newsletter
(`RESEND_*`) do need env vars.

## Flows worth driving

- `/` — nav cards for every section
- `/tags`, `/tags/[slug]` — tag archive (dynamic, Supabase)
- `/authors`, `/authors/[slug]` — author archive (dynamic, Supabase)
- `/dynamic/[slug]` — server-rendered MDX article
- `/feed.xml` — RSS 2.0 (ISR, revalidate 3600 — a stale prerender may be
  served after rebuild; check `lastBuildDate`)
- `/search` — full-text search UI

`curl -s http://localhost:3111/<route>` and grep the HTML is enough for
server-rendered pages.

## Gotchas

- RTK filtering breaks `next start`/`next build`/`eslint` output — always
  use `rtk proxy npx ...` for these.
- ESLint is broken project-wide (ESLint 10 vs eslintrc-format config
  error: "Converting circular structure to JSON") — don't treat as a
  change failure. Use `rtk tsc --noEmit` for the type gate instead.
- `next start` serves the last build — rebuild after edits before
  re-probing.

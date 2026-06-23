# 🌟 Next-MDX-Blog-Starter

A production-ready technical blog starter kit built with **Next.js (App Router)**, **MDX**, **Supabase**, and **TypeScript strict mode**. SSG-first for performance and SEO, with AI-powered reader features, an in-browser code sandbox, and a full content-management toolchain.

**Live demo**: [next-mdx-blog-starter-sigma.vercel.app](https://next-mdx-blog-starter-sigma.vercel.app/)

This project was developed with the help of **Claude** (Anthropic) and **Cursor**, with design inspiration from **Lovable**.

## 📑 Table of Contents

- [Quick Start](#%EF%B8%8F-quick-start)
- [Environment Variables](#-environment-variables)
- [Architecture & Core Stack](#%EF%B8%8F-architecture--core-stack)
- [MDX Content System](#-mdx-content-system)
- [Custom MDX Components](#-custom-mdx-components)
- [Reader Experience Features](#-reader-experience-features)
- [AI Features](#-ai-features)
- [Code Sandbox](#%EF%B8%8F-code-sandbox)
- [Author Profile Pages](#-author-profile-pages)
- [Search](#-search)
- [Newsletter Subscription](#-newsletter-subscription)
- [Supabase Database](#%EF%B8%8F-supabase-database)
- [Article Manager CLI](#%EF%B8%8F-article-manager-cli)
- [Project Scripts](#-project-scripts)
- [AWS S3 Image Storage](#%EF%B8%8F-aws-s3-image-storage)
- [SEO: Sitemap & Robots](#%EF%B8%8F-seo-sitemap--robots)
- [Mobile Responsiveness](#-mobile-responsiveness)
- [Analytics](#-analytics)
- [Docker](#-docker)
- [Useful Links](#-useful-links)

## ⚙️ Quick Start

### Prerequisites
- **Node.js** 18.17.0 or later (NPM included)

### Option 1 — NPM installer (recommended)

Scaffold the blog into an empty directory:

```bash
npx create-next-mdx-blog-app .
```

The installer ([`create-next-mdx-blog-app`](https://www.npmjs.com/package/create-next-mdx-blog-app/), v2.2.3, MIT) clones the app, installs dependencies, and prints the environment setup steps.

### Option 2 — Manual clone

```bash
git clone https://github.com/CodingAbdullah/Next-MDX-Blog-Starter.git
cd Next-MDX-Blog-Starter/mdx-medium-blog-post-provider
npm install
```

### Configure and run

```bash
cp .env.example .env.local   # fill in your credentials (see table below)
npm run dev
```

## 🔐 Environment Variables

A `.env.example` file at the project root lists every key. Copy it to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```bash
# .env.local

# Supabase — dynamic blog post fetching
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Anthropic — Blog Assistant chatbot + AI Article Summarizer
ANTHROPIC_API_KEY=

# Site — public base URL (sitemap, robots.txt, summarizer origin allow-list)
NEXT_PUBLIC_SITE_URL=

# GitHub — optional, for the <GitHubGist> component
GITHUB_TOKEN=
GITHUB_USERNAME=
GIST_BASE_URL=

# Resend — newsletter signup
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
```

### Required

| Variable | Used by |
|---|---|
| `SUPABASE_URL` | Dynamic blog post fetching (Supabase client) |
| `SUPABASE_ANON_KEY` | Dynamic blog post fetching (Supabase client) |
| `ANTHROPIC_API_KEY` | Blog Assistant chatbot (`/api/chat`) and AI Article Summarizer (`/api/summarize/[slug]`) |
| `RESEND_API_KEY` | Newsletter signup — authenticates with the Resend API |
| `RESEND_AUDIENCE_ID` | Newsletter signup — the Resend Audience new subscribers are added to |

### Optional (sensible defaults)

| Variable | Used by | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitemap, robots.txt, summarizer origin allow-list | `http://localhost:3000` |
| `GITHUB_TOKEN` | `<GitHubGist>` GitHub API auth — raises rate limit from 60 to 5,000 req/hr | unauthenticated |
| `GITHUB_USERNAME` | mdxgists.net URL construction | `CodingAbdullah` |
| `GIST_BASE_URL` | mdxgists.net link base URL | `https://mdxgists.net` |

> 🔒 **Never commit `.env` files.** They are git-ignored and excluded from Docker images via `.dockerignore`. Server-only secrets (Supabase keys, Anthropic and Resend API keys, GitHub token) are read exclusively in Server Components and Route Handlers — only `NEXT_PUBLIC_SITE_URL` is exposed to the browser.

## 🏗️ Architecture & Core Stack

This starter kit is **SSG-first**: Static Site Generation is preferred everywhere, with dynamic rendering used only where required.

- **Pre-rendered pages**: Blog posts and content pages are statically generated at build time
- **Server Components first**: Supabase is queried directly from React Server Components — no custom backend APIs
- **SEO-ready**: Meta tags, structured data, and semantic HTML generated statically
- **CDN-friendly**: Static output deploys to any CDN or static host
- **Minimal client JS**: Core content rendering requires no client-side JavaScript

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript (strict mode) |
| Content | MDX, `gray-matter`, `next-mdx-remote` |
| Database | Supabase (`@supabase/supabase-js`) |
| Image storage | AWS S3 (via Next `<Image>`) |
| Styling / UI | Tailwind CSS, shadcn/ui, `lucide-react`, `class-variance-authority` |
| AI | Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/react`), `zod` |
| Code sandbox | `@codesandbox/sandpack-react` |
| Syntax highlighting | `react-syntax-highlighter` |
| Email | Resend (`resend`) |
| Notifications | `sonner` toasts |
| Theming | `next-themes` |
| Tooling | Docker, Vercel Analytics, `tsx`, `react-doctor` (`npm run doctor`) |

## 🌐 MDX Content System

This project renders blog posts from `.mdx` files in two modes, each with an included example:

- **Static MDX** — pre-rendered at build time. Route: `/sample-blog-post-page`, content: `src/markdown/ArticleContent.mdx`
- **Dynamic MDX** — rendered on the server at request time via `next-mdx-remote`'s `MDXRemote` component. Route: `/dynamic/[dynamic_blog_post]`, content: `src/markdown/DynamicArticleContent.mdx`

### Frontmatter (article metadata)

Each `.mdx` file carries metadata at the top of the file between `---` delimiters, parsed with `gray-matter`:

```yaml
---
title: string
description: string
publishedAt: string
author: string
tags: string[]
image: string
---
```

### The `mdx-components.tsx` file

`mdx-components.tsx` at the project root styles built-in HTML elements and swaps `<img>` and `<a>` for the optimized Next.js `<Image>` and `<Link>` components. See the [Next.js docs](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) for how this file convention works.

## 🧩 Custom MDX Components

Custom components for MDX content live in `src/components/customMDXComponents/`.

### CodeBlock — syntax highlighting

Highlights code blocks with `react-syntax-highlighter` (default theme: `vscDarkPlus` — [demo of available themes](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)). A **copy button** in the top-right corner writes the code to the clipboard and confirms via a sonner toast.

### GitHubGist — live gist embeds

Embed public GitHub Gists directly in MDX:

```mdx
<GitHubGist id="your-gist-id" figCaptionText="Caption shown below the gist" />
```

**How it works:**
1. `GitHubGist` (an async Server Component) calls `https://api.github.com/gists/<id>` for metadata (file name, detected language), then fetches the raw content from the returned `raw_url`. Results are cached for one hour via Next.js ISR (`next: { revalidate: 3600 }`).
2. The language is mapped to a Prism-compatible token via `GITHUB_GIST_LANGUAGE_MAP` (`src/utils/constants/GitHubGistConstants.ts`) — 70+ languages supported, with sensible fallbacks (`language.toLowerCase()`, then `text`).
3. The code renders through `GistCodeBlock` inside a scrollable container with a custom green scrollbar.

**Each gist header includes:** a language badge, a **Copy** button (with toast confirmation), and a link to the gist on [mdxgists.net](https://mdxgists.net) — a companion site for browsing and sharing MDX-ready gists. The URL is built as `<GIST_BASE_URL>/<GITHUB_USERNAME>/<gist-id>`; both values are overridable via environment variables.

**Components:**
- `GitHubGist.tsx` — async Server Component; fetching, language resolution, gist UI
- `GistCodeBlock.tsx` — syntax-highlighted code display
- `GistCopyButton.tsx` — client component; copy-to-clipboard + external link

**GitHub token (optional but recommended):** unauthenticated GitHub API requests are limited to **60/hr per IP**. Set `GITHUB_TOKEN` in `.env.local` to raise this to **5,000/hr**. Generate one at GitHub → Settings → Developer settings → Personal access tokens — the read-only `gist` scope (or no scopes for public gists) is sufficient.

> Only **public** gists are supported by default; the component can be extended for private gists with appropriate token scopes.

### MDXImage — optimized images with captions

Wraps the Next.js `<Image>` component with `<figure>`/`<figcaption>` for seamless captions, displayed in a styled container with a green glow border and hover scale effect consistent with the matrix-green design system.

## 🎨 Reader Experience Features

| Feature | Component | Behaviour |
|---|---|---|
| **Light/dark mode** | `src/components/ThemeToggle.tsx` | Header toggle between dark (default) and light themes via `next-themes` (`ThemeProvider.tsx`); persisted to `localStorage`. `ThemedToaster.tsx` keeps sonner toasts theme-matched |
| **Reading progress bar** | `src/components/ReadingProgressBar.tsx` | Thin green bar fixed to the top of article pages; passive scroll listener, `role="progressbar"` ARIA attributes |
| **Back to top** | `src/components/BackToTopButton.tsx` | Floating button appears after 400px of scroll; smooth-scrolls to top |
| **Copy link** | `src/components/CopyLinkButton.tsx` | Article-header button; copies the page URL with a brief icon-swap confirmation |
| **Social share** | `src/components/SocialShareButtons.tsx` | Pre-filled share dialogs for X (Twitter), LinkedIn, and Reddit using the article title and URL |
| **View counter** | `src/components/ViewCounter.tsx` | Live per-article view count in a Supabase `view_counts` table, incremented atomically via the `increment_view_count` RPC. Dynamic pages increment server-side; static pages call the `/api/views/[slug]` route after hydration |

## 🤖 AI Features

Both AI features use **Claude Haiku** through the Vercel AI SDK and require `ANTHROPIC_API_KEY`.

### Blog Assistant Chatbot (`/chat`)

An interactive AI chatbot optimised for readers of this technical blog.

- **Streaming responses** via `TextStreamChatTransport` and an edge API route (`src/app/api/chat/route.ts`), which converts `UIMessages` with `convertToModelMessages` and streams via `streamText`
- **Three blog-focused tools** available to the model:
  - `searchBlogTopics` — searches a curated list of topics covered by this blog (JS, TS, React, Next.js, MDX, Docker, AWS, etc.)
  - `getCodeExample` — generates a runnable code example for a concept and language
  - `explainConcept` — produces a brief or detailed technical explanation
- **Ephemeral conversations** — nothing is persisted server-side; a "New Chat" button clears the session
- **Tool calls rendered inline** in the message thread via `chat-tool-result.tsx`

Configuration lives in `src/utils/constants/AiChatConfig.ts` (model, temperature, max tokens, system prompt) and `ToolConfig.ts` (tool icons/labels/colours). UI components are under `src/components/chat/` (`chat-interface.tsx`, `chat-messages.tsx`, `chat-input.tsx`, `chat-tool-result.tsx`).

### AI Article Summarizer

A **Generate TL;DR** button above every dynamic article streams a short summary into a collapsible green panel.

- Only the article **slug** is sent over the wire — `src/app/api/summarize/[slug]/route.ts` (edge) fetches the article server-side
- Protected by an **origin allow-list** (`NEXT_PUBLIC_SITE_URL`), a **per-IP rate limit** (10/min), and a **1-hour in-memory cache** (written via `after()`)
- The client (`src/components/ArticleSummarizer.tsx`) cancels in-flight requests with `AbortController` on close/unmount
- Model and prompt configured in `src/utils/constants/AiSummaryConfig.ts`

## 🖥️ Code Sandbox

An interactive in-browser code execution environment powered by **Sandpack** at `/code-sandbox`.

- **JavaScript & TypeScript runtimes** — switch with one click; the editor reloads with a language-appropriate default snippet
- **Quick Examples** — pre-loaded snippets (Fibonacci, Async/Await, Data Structures for JS; Types & Interfaces, Generics, Classes & OOP for TS) defined in `src/utils/constants/SandboxExamples.ts`
- **Full editor** — line numbers, inline TypeScript errors, matrix-green custom theme with `JetBrains Mono`
- **Toolbar** — Run, Copy, Download, and Reset
- **Live console panel** side-by-side with the editor — execution is **entirely in-browser**; no code reaches the server

Components: `src/components/SandpackEditor.tsx` (provider, editor, toolbar, console) and `CodeSandboxFeaturesSection.tsx` (feature highlights grid).

## 👥 Author Profile Pages

A `/authors` index lists every distinct contributor pulled from the Supabase `Article` table, with per-author profile routes at `/authors/[slug]` showing their bio, avatar, and every article they've published.

## 🔍 Search

Full-text search across published articles at `/search`, powered by native Postgres `tsvector` — no external search service required.

- **Search-as-you-type** — `src/components/ArticleSearch.tsx` debounces input (300 ms), cancels stale requests with `AbortController`, caches repeated queries, and waits for at least 2 characters before querying
- **Prefix matching** — partial words match while you type (`reac` → `react`)
- **Ranked, weighted results** — scored by `ts_rank` with column weights (title > tags > description > content) and returned as lightweight summaries (the heavy `content` column is excluded)
- **Request flow** — `GET /api/search?q=…` (`src/app/api/search/route.ts`) → `searchArticles()` (`src/utils/functions/rpc/searchArticles.ts`) → the `search_articles` Postgres RPC

### One-time setup

Run **`scripts/sql/DDL/createSearchArticlesFunction.sql`** once in the Supabase SQL editor. It creates the weighted GIN index and the `search_articles` function. Search returns an error until this script is deployed.

### ⚠️ Change the hardcoded author filter

The shipped function locks results to a single author:

```sql
AND a."articleAuthorName" = 'Abdullah Muhammad.'
```

Before deploying, replace `'Abdullah Muhammad.'` with **your own author name** — it must match the `articleAuthorName` values in your `Article` table **exactly**, including any trailing punctuation. Alternatively, **delete that line entirely** to search across all authors. Re-run the script after editing.

## 📬 Newsletter Subscription

An integrated newsletter signup form powered by [Resend](https://resend.com). Visitors can subscribe from the home page or the bottom of any article; new subscribers are added to a Resend **Audience** and receive a welcome email.

### Components & routes
- `src/components/NewsletterSignup.tsx` — reusable client component with `matrix` (article pages) and `neutral` (home page) visual variants
- `src/app/api/newsletter/subscribe/route.ts` — Node-runtime POST handler; validates the email with Zod
- `src/utils/functions/newsletter/subscribeToNewsletter.ts` — adds the contact to your Audience and triggers the welcome email
- `src/utils/functions/newsletter/welcomeEmailTemplate.ts` — subject + HTML/text bodies
- `src/utils/functions/resend_client/ResendClient.ts` — server-only Resend client factory

### Setup
1. Create a Resend account at [resend.com](https://resend.com)
2. **API key** — API Keys → Create API Key with **Sending** and **Audiences** access → set `RESEND_API_KEY`
3. **Audience** — Audiences → Create Audience → copy the UUID into `RESEND_AUDIENCE_ID`
4. Restart `npm run dev` so Next.js picks up the new variables

### ⚠️ ***Important: a verified sending domain on Resend is required for email delivery to real subscribers.***

Out of the box the welcome email is sent from **`onboarding@resend.dev`**, Resend's sandbox sender, which **only delivers to the email address that owns your Resend account**.

> 🚨 ***You MUST verify your own sending domain (Resend dashboard → Domains → Add Domain, then complete the SPF/DKIM DNS records) before the newsletter can deliver welcome emails to real subscribers.*** Once verified, update the `WELCOME_EMAIL_FROM` constant in `src/utils/functions/newsletter/subscribeToNewsletter.ts` to an address on that domain (e.g. `newsletter@yourdomain.com`).

If the domain step is skipped, the contact is still added to your Audience, but the welcome email silently fails (logged server-side as `[newsletter] Resend emails.send returned an error: ...`).

## 🗄️ Supabase Database

Supabase is integrated **directly in Server Components** — no custom backend API layer. The client factory lives in `src/utils/functions/supabase_client/`.

- **CRUD functions** — `src/utils/functions/crud/` (create, read, update, delete articles)
- **RPC functions** — `src/utils/functions/rpc/` (e.g. `incrementViewCount`)
- **SQL scripts** — `scripts/sql/DDL/` (create/alter/drop tables, view-counts table, RPC function) and `scripts/sql/DML/` (insert/fetch/update/delete article statements)

**Ensure your Supabase Row Level Security policies allow the CRUD actions you need** — these are configured in the Supabase console.

Shared constants, helper functions, and TypeScript types live under `src/utils/` (`constants/`, `functions/`, `types/`). Some constants serve as placeholders for this demo application.

## ⌨️ Article Manager CLI

`scripts/action-script/article-manager.ts` manages articles in Supabase from the command line using the CRUD functions above, run via `tsx` (no TypeScript build config needed):

```bash
# Insert an article into Supabase
npx tsx article-manager.ts insert article-slug

# Delete an article
npx tsx article-manager.ts delete article-slug

# Update an article
npx tsx article-manager.ts update article-slug new-article-file

# Fetch a single article
npx tsx article-manager.ts fetch article-slug

# Fetch all articles
npx tsx article-manager.ts fetchAll
```

The **article slug** is the name of the markdown file in `src/markdown/` minus the `.mdx` extension. The `update` command's second argument follows the same convention.

## 📜 Project Scripts

The `/scripts` folder contains tooling for project and database setup:

- **`scripts/sql/`** — DDL and DML statements for initializing and populating the database
- **`scripts/powershell/`** — Windows setup plus bulk article/S3 helpers (`project_setup.ps1`, `bulk-create-articles.ps1`, `bulk-update-articles.ps1`, `bulk-s3-folder-creation.ps1`, `create-missing-mdx-files.ps1`)
- **`scripts/bash/`** — the same toolkit for Linux/macOS
- **`scripts/action-script/`** — the Article Manager CLI (above)
- **`scripts/github-gist-fetcher/`** — fetches a public gist's raw content to `src/github_gists/<gist-id>.txt`:
  ```bash
  npx tsx scripts/github-gist-fetcher/fetch-github-gist.ts <gist-id>
  ```
  > **Note:** no longer required for rendering — `<GitHubGist>` fetches live from the GitHub API. Retained for offline inspection or local caching workflows.

## 🌩️ AWS S3 Image Storage

Images referenced in `.mdx` files (via the `MDXImage` component) are served from AWS S3. The allowed external image domain is configured in `next.config.ts` — point it at your own bucket, or swap in another storage service entirely.

## 🗺️ SEO: Sitemap & Robots

- **`sitemap.xml`** — auto-generated at build time by `src/app/sitemap.ts`, covering all static routes and every dynamic article slug fetched from Supabase
- **`robots.txt`** — served from `src/app/robots.ts`, permitting all crawlers and pointing them at the sitemap

Both use `NEXT_PUBLIC_SITE_URL` as the base URL.

## 📱 Mobile Responsiveness

All components are built mobile-first with Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Key behaviours:

| Component | Mobile behaviour |
|---|---|
| `ArticleHeader` | Title scales `text-2xl` → `text-4xl`; author row stacks vertically |
| `ArticleAuthorBio` | Avatar and text stack vertically; full-width button; center-aligned text |
| `GitHubGist` | Header wraps via `flex-wrap`; code scrolls horizontally with a styled green scrollbar |
| `CodeBlock` | Copy button absolutely positioned, never interferes with code flow |
| `MDXImage` | Container scales inline; hover effect on capable devices |
| Chat & Code Sandbox | Responsive padding and height calculations across breakpoints |

The root layout exports a `viewport` configuration (Next.js `Viewport` type) for correct scaling on all mobile browsers:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

## 📊 Analytics

Vercel Analytics (`@vercel/analytics`) is integrated to track user interactions and performance metrics — kept lightweight and non-blocking.

## 🐳 Docker

A multi-stage `Dockerfile` at the project root produces a production image with environment variables injected at runtime:

```bash
docker build -t mdx-medium-blog .
```

```bash
docker run \
  -e SUPABASE_URL=your_supabase_url \
  -e SUPABASE_ANON_KEY=your_supabase_anon_key \
  -e ANTHROPIC_API_KEY=your_anthropic_api_key \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  -e GITHUB_TOKEN=your_github_token \
  -e GITHUB_USERNAME=your_github_username \
  -e GIST_BASE_URL=https://mdxgists.net \
  -e RESEND_API_KEY=your_resend_api_key \
  -e RESEND_AUDIENCE_ID=your_resend_audience_id \
  -p 3000:3000 mdx-medium-blog
```

The project also remains compatible with **Vercel** and pure **static hosting** (SSG mode).

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Lee Robinson's Next.js + MDX Tutorial Video](https://www.youtube.com/watch?v=34bRv6cQezo&ab_channel=leerob)
- [MDX Playground](https://mdxjs.com/playground/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Sandpack Documentation](https://sandpack.codesandbox.io/docs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Anthropic AI SDK Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic)
- [Resend Documentation](https://resend.com/docs)
- [Zod Documentation](https://zod.dev)

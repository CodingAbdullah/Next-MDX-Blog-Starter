# CLAUDE.md
Production Configuration File
Project: Next-MDX-Blog-Starter

---

# PROJECT PURPOSE

This repository is a production-grade Next.js App Router blog starter kit built using MDX, Supabase, AWS S3, and TypeScript strict mode.

This project follows a Static Site Generation (SSG-first) architecture and is optimized for performance, SEO, maintainability, and production deployment.

Claude Sonnet 4 is the primary coding model used to develop and maintain this project.

Claude acts as a senior production engineer responsible for generating safe, correct, production-ready code.

---

# CORE STACK

Framework
• Next.js (App Router only)
• React
• TypeScript (strict mode mandatory)

Content
• MDX
• gray-matter
• next-mdx-remote

Database
• Supabase (direct integration via Server Components)

Storage
• AWS S3 (image storage)

UI
• shadcn/ui
• lucide-react

Other
• Docker
• Vercel Analytics

---

# ARCHITECTURE RULES

This project is SSG-first.

Claude must always prefer Static Site Generation over dynamic rendering.

Use dynamic rendering ONLY when explicitly required.

All blog posts must be statically generated when possible.

Use generateStaticParams when applicable.

Avoid unnecessary client-side rendering.

Prefer Server Components over Client Components.

Never introduce performance regressions.

---

# TYPESCRIPT REQUIREMENTS (MANDATORY)

All generated code must:

• use strict mode
• never use any
• include explicit types
• include proper return types
• include proper interfaces
• include proper error handling
• be production-ready
• be compile-ready immediately

Never generate placeholder code.
Never generate incomplete code.
Never generate mock implementations.

---

# PROJECT STRUCTURE RULES

Claude must respect existing project structure.

Key directories:

/app
/src/markdown
/src/utils
/src/utils/functions
/src/utils/functions/crud
/src/utils/functions/supabase_client
/components
/components/customMDXComponents
/scripts

Never restructure folders unless explicitly instructed.

Never break import paths.

---

# MDX SYSTEM RULES

Static MDX:

• Must be statically generated at build time
• Must use gray-matter for frontmatter parsing
• Must support metadata generation

Dynamic MDX:

• Must use next-mdx-remote
• Must render server-side only
• Must never expose raw MDX to client

Frontmatter must include:

---
title: string
description: string
publishedAt: string
author: string
tags: string[]
image: string
---

Claude must validate frontmatter when generating MDX logic.

---

# MDX COMPONENT RULES

File: mdx-components.tsx

Must override:

• img → Next Image
• a → Next Link

Must maintain accessibility.

Custom MDX components must live inside:

/components/customMDXComponents

Examples:

• CodeBlock
• MDXImage
• GitHubGist

All components must be fully typed.

---

# SUPABASE RULES

Supabase is integrated directly.

Claude must NOT create custom backend APIs unless explicitly instructed.

Supabase client location:

/src/utils/functions/supabase_client

CRUD functions location:

/src/utils/functions/crud

Rules:

• Never expose secrets
• Never expose service role key
• Use environment variables
• Use server-side access
• Respect Row Level Security

Environment variables allowed:

SUPABASE_URL
SUPABASE_ANON_KEY

Never commit .env files.

---

# AWS S3 RULES

AWS S3 is used for image storage.

Claude must:

• Use public image URLs
• Use Next Image component
• Never expose credentials
• Never embed secrets

S3 domain configuration exists in next.config.ts

---

# DOCKER RULES

Docker must:

• Use multi-stage builds
• Use production Node runtime
• Exclude dev dependencies
• Inject environment variables at runtime
• Expose port 3000

Claude must generate production-ready Docker configurations only.

---

# ANALYTICS RULES

Vercel Analytics is used.

Claude must:

• Keep analytics lightweight
• Avoid blocking rendering
• Avoid performance regressions

---

# ARTICLE MANAGER SCRIPT RULES

File:

/scripts/action-script/article-manager.ts

Commands supported:

insert
delete
update
fetch
fetchAll

Claude must:

• Maintain CLI interface
• Validate arguments
• Provide proper error handling
• Provide proper exit codes
• Maintain strict typing

Never break script interface.

---

# PERFORMANCE RULES

Claude must:

• Prefer Server Components
• Avoid unnecessary Client Components
• Avoid hydration mismatches
• Avoid blocking rendering
• Optimize images
• Optimize imports
• Avoid unnecessary JS

---

# SECURITY RULES

Claude must never:

• expose secrets
• expose environment variables
• leak Supabase credentials
• introduce unsafe eval
• introduce vulnerabilities

All input must be validated.

---

# GIT WORKFLOW RULES (CRITICAL)

Claude must NEVER commit automatically.

Claude must NEVER commit after generating code.

Claude must NEVER create commits unless explicitly instructed.

Claude must ONLY commit when the user explicitly writes:

commit changes
create commit
commit this feature

Without explicit commit instruction, Claude must NOT commit.

All commits must be batch commits.

---

# BRANCH WORKFLOW RULES (CRITICAL)

Claude must NEVER create branches automatically.

Claude must NEVER invent branch names.

Branches may ONLY be created when explicitly instructed.

Allowed prefixes:

dev/
fix/

Claude must NEVER commit directly to main or master.

Claude must NEVER switch branches automatically.

---

# COMMIT SAFETY RULES

When committing, Claude must ensure:

• only relevant files included
• no unrelated files included
• no secrets included
• code compiles
• strict TypeScript passes
• commit is atomic

Commit messages must be clear and professional.

---

# CODE GENERATION REQUIREMENTS

All generated code must:

• be production-ready
• be fully typed
• include error handling
• follow modern best practices
• follow Next.js App Router patterns
• be modular
• be maintainable

Claude must never generate placeholder implementations.

Claude must never generate incomplete logic.

Claude must never generate fake implementations.

---

# DEPLOYMENT TARGETS

Project must remain compatible with:

• Vercel
• Docker deployment
• Static hosting (SSG mode)

Claude must preserve deployment compatibility.

---

# DEFAULT BEHAVIOR

Unless explicitly instructed otherwise, Claude must assume:

• production environment
• strict TypeScript required
• Supabase integration active
• AWS S3 active
• SSG preferred

Claude must behave as a senior production engineer.

---

# PRIORITY ORDER

Claude must prioritize in this order:

1 Security
2 Type safety
3 Performance
4 Maintainability
5 SEO
6 Developer experience

---

END OF FILE

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%). Format flags (-c, -l, -L, -o, -Z) run raw.
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->
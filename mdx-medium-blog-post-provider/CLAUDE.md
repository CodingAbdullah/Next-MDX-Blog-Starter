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

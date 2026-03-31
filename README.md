# 🌟 Next-MDX-Blog-Starter
## 📖 Introduction
This project is inspired by the elegant design and functionality of **Lovable**. It leverages the **Claude Sonnet 4.6** model for development, ensuring a robust and efficient coding experience.

The goal of this repository is to serve as a comprehensive starter kit for working with static and dynamic content using MDX, React, and Next.js (more specifically the App Router).

### 🚀 SSG-Compliant Architecture
This starter kit is built with **Static Site Generation (SSG)** compliance at its core, ensuring optimal performance and SEO benefits:

- **Pre-rendered Pages**: All blog posts and content pages are statically generated at build time for lightning-fast loading
- **Optimized Assets**: Images, fonts, and other assets are optimized for static delivery
- **SEO-Ready**: Meta tags, structured data, and semantic HTML are generated statically for better search engine visibility
- **CDN-Friendly**: Static output can be easily deployed to any CDN or static hosting provider
- **Zero Runtime Dependencies**: Core content rendering requires no client-side JavaScript, ensuring accessibility and performance

## ⚙️ Project Setup

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 15.x or later).
- **NPM**: Node Package Manager comes with Node.js.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/CodingAbdullah/Next-MDX-Blog-Starter.git
   cd mdx-medium-blog-post-provider
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

If you want, you can also run this project using the following command:
   ```bash
   npx create-next-mdx-blog-app .
   ```
This will instantly create and setup the starter kit project for you to work on.

## ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white) Package

### Install via NPM

```bash
npm install create-next-mdx-blog-app
```

### Quick Start with NPX

```bash
npx create-next-mdx-blog-app .
```

### Package Information

- **Package Name**: `create-next-mdx-blog-app`
- **Version**: `2.1.1`
- **License**: MIT
- **Homepage**: [https://www.npmjs.com/package/create-next-mdx-blog-app](https://www.npmjs.com/package/create-next-mdx-blog-app/)

## 🛠️ Tools
### AI Tools
- **Cursor**: An AI-powered coding assistant that enhances productivity and code quality.
- **Lovable**: A design inspiration that emphasizes user-friendly interfaces and experiences.
- **Claude Sonnet 4.6**: A model that aids in development, providing intelligent suggestions and optimizations.

### Common NPM Libraries
- **mdx**: A markdown format that allows you to write JSX in your markdown files, enabling rich content.
- **Supabase**: An open-source Firebase alternative that provides a backend as a service, including database and authentication.
- **shadcn/ui**: A collection of UI components designed for building modern web applications.
- **lucide-react**: A set of customizable icons for React applications, enhancing visual appeal.
- **gray-matter**: A library for parsing front matter from markdown files, useful for managing metadata.
- **react**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **react-syntax-highlighter**: A library for syntax highlighting in React applications, making code snippets more readable.
- **tsx**: Run TypeScript code without worrying about configuration! Run the `article-manager.ts` for manually working with published articles.
- **@codesandbox/sandpack-react**: Powers the in-browser JavaScript/TypeScript code execution environment, running code entirely client-side with no server required.
- **ai** (Vercel AI SDK): Provides streaming AI response primitives and transport utilities (`TextStreamChatTransport`, `streamText`, tool support) for building the interactive chatbot.
- **@ai-sdk/anthropic**: Anthropic provider for the Vercel AI SDK, used to connect to Claude models.
- **@ai-sdk/react**: React hooks (`useChat`) for building streaming AI chat interfaces.
- **zod**: TypeScript-first schema validation library used to define and validate AI tool parameters.
- **sonner**: Lightweight toast notification library used for user feedback across the Code Sandbox, the `CodeBlock` copy button, and the GitHub Gist copy button.

## 🌐 Static/Dynamic Rendering with MDX
This project utilizes MDX for both static and dynamic rendering of blog posts. The two MDX files included in the project serve as examples of how to structure your content.

- **Static MDX**: Pre-rendered at build time (<b>route</b>: `/app/sample-blog-post-page`, <b>article content</b>: `/markdown/ArticleContent.mdx`).
- **Dynamic MDX**: Rendered on the server at request time (<b>route</b>: `/app/dynamic`, <b>article content</b>: `/markdown/DynamicArticleContent.mdx`).

### Article Metadata
`.mdx` files can contain useful information that can be thought of as metadata for the file itself. This is called frontmatter and it is stored at the top of the file using this `---` opening and closing syntax.

A helpful package known as `gray-matter` is used to format and separate frontmatter from the article content which is useful when fetching and rendering dynamic MDX content.

Dynamic MDX content is rendered with the help of the `next-mdx-remote` package and utilizing the `MDXRemote` custom component.

## 🖼️ MDX Components File
The `mdx-components.tsx` file located in the root, integrates styling for built-in HTML elements as well as optimizing built-in elements such as `<a>` and `<img>` using the built-in components provided by Next.js (`<Image>` and `<Link>`).

For more details on what this file is and how it is utilized in a Next.js application, you can refer to the official docs <a href="https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components">here</a>.

## 🧩 Custom React Components
Custom React components are created for enhanced functionality when working with MDX. The following are located in the `customMDXComponents` directory inside the `components` directory of the project.

### Syntax Highlighting
The project includes a custom `CodeBlock` component for syntax highlighting code blocks using the `react-syntax-highlighter` package.

Default theme is set to the `vscDarkPlus` theme. Feel free to modify the theme and even add your own syntax highlighting library if you so choose.

A **copy button** is rendered in the top-right corner of every code block. Clicking it writes the code to the clipboard and triggers a sonner toast notification confirming success or failure.

You can read more about the library used in this project <a href="https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/">here.</a>

### GitHub Gists
GitHub Gists can be embedded directly in MDX files using the `<GitHubGist>` custom component. The component fetches gist content live from the **GitHub REST API** at render time and caches the result for one hour via Next.js ISR (`next: { revalidate: 3600 }`).

```mdx
<GitHubGist id="your-gist-id" figCaptionText="Caption shown below the gist" />
```

#### How it works
1. `GitHubGist` calls `https://api.github.com/gists/<id>` to retrieve metadata (file name, detected language).
2. It then fetches the raw file content from the `raw_url` returned by the API.
3. The language is mapped to a Prism-compatible token using the built-in `GITHUB_GIST_LANGUAGE_MAP` constant (70+ languages supported — see `src/utils/constants/GitHubGistConstants.ts`).
4. The code is rendered via `GistCodeBlock` (syntax-highlighted with `react-syntax-highlighter`) inside a scrollable container with a custom green scrollbar (`scrollbar-gist`).

#### mdxgists.net
Each rendered gist includes a header bar with:
- The detected **language badge**
- A **Copy** button that writes the raw content to clipboard with a sonner toast confirmation
- A **mdxgists.net** link that opens the gist on [mdxgists.net](https://mdxgists.net) — a companion site for browsing and sharing MDX-ready gists

The mdxgists.net URL is constructed as `<GIST_BASE_URL>/<GITHUB_USERNAME>/<gist-id>` using values from `GitHubGistConstants.ts`. Both values can be overridden via environment variables (see below).

#### Components
- `src/components/customMDXComponents/GitHubGist.tsx` — async Server Component; fetches from GitHub API, resolves language, builds the mdxgists.net URL, renders the full gist UI
- `src/components/customMDXComponents/GistCodeBlock.tsx` — syntax-highlighted code display using `react-syntax-highlighter`
- `src/components/customMDXComponents/GistCopyButton.tsx` — `"use client"` component; copy-to-clipboard with sonner toast + mdxgists.net external link

#### Language Detection
The `GITHUB_GIST_LANGUAGE_MAP` in `src/utils/constants/GitHubGistConstants.ts` maps GitHub's reported language names to Prism-compatible identifiers. Over 70 languages are supported out of the box including TypeScript, Python, Rust, Go, Solidity, YAML, SQL, and more. If a language is not in the map, the component falls back to `language.toLowerCase()`. If no language is detected, it falls back to `text`.

#### GitHub OAuth Token (optional but recommended)
Unauthenticated requests to the GitHub API are rate-limited to **60 requests per hour** per IP. For production use, set a `GITHUB_TOKEN` environment variable to increase this to **5,000 requests per hour**:

```bash
# .env.local
GITHUB_TOKEN=ghp_your_personal_access_token
```

To generate a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token. The token only needs the **read-only** `gist` scope (or no scopes at all for public gists).

> Only **public** gists are supported by default. The component can be modified to support private gists by adding the appropriate scopes to the token.

### MDX Images
The project comes with its own `MDXImage` component that utilizes the Next.js built-in `Image` component as well as the built-in `figure` and `figcaption` elements to integrate imaging and captions seamlessly.

Images are displayed inside a styled container with a **green glow border** and a **hover scale effect** consistent with the rest of the matrix-green design system.

## 🖥️ Code Sandbox
The project includes an interactive in-browser code execution environment powered by **Sandpack** (<b>route</b>: `/code-sandbox`).

### Features
- **JavaScript & TypeScript runtimes**: Switch between JS and TS with a single click. The editor reloads with a language-appropriate default snippet.
- **Quick Examples**: Pre-loaded snippets covering Fibonacci, Async/Await, Data Structures (JS) and Types & Interfaces, Generics, Classes & OOP (TS) — load any with one click.
- **Sandpack Editor**: Full code editor with line numbers, inline TypeScript errors, and a matrix-green custom theme (`JetBrains Mono`).
- **Toolbar**: Run, Copy to clipboard, Download file, and Reset to default — all accessible from above the editor.
- **Console Panel**: Live console output displayed side-by-side with the editor. Execution is entirely in-browser — no code reaches the server.
- **Features Section**: Highlights Secure Sandbox, Instant Execution, Easy Copy, and JS & TypeScript support.

### Components
- `src/components/SandpackEditor.tsx` — Sandpack provider, matrix-themed editor, toolbar, and console panel.
- `src/components/CodeSandboxFeaturesSection.tsx` — Feature highlights grid displayed below the editor.

## 🤖 Blog Assistant Chatbot
The project includes an interactive AI-powered chatbot optimised for readers of this technical blog (<b>route</b>: `/chat`).

### Features
- **Streaming responses**: Powered by the Vercel AI SDK (`TextStreamChatTransport`) and Anthropic's Claude Haiku model via an edge API route (`/api/chat`).
- **Blog-focused tools**: Three tools are available to the model during a conversation:
  - `searchBlogTopics` — searches a curated list of topics covered by this blog (JS, TS, React, Next.js, MDX, Docker, AWS, etc.)
  - `getCodeExample` — signals the model to generate a runnable code example for a given concept and language.
  - `explainConcept` — signals the model to produce a brief or detailed technical explanation.
- **No persistence**: Conversations are ephemeral — nothing is stored on a server or in a database. A "New Chat" button clears the session.
- **Matrix-green styling**: Consistent with the Code Sandbox, the chat UI uses the same dark/neon-green palette and `JetBrains Mono` font.
- **Tool result display**: Each tool call and its result is rendered inline in the message thread via the `ChatToolResult` component.

### Configuration
- `src/utils/constants/AiChatConfig.ts` — Model name (`claude-haiku-4-5-20251001`), temperature, max tokens, and the blog-focused system prompt.
- `src/utils/constants/ToolConfig.ts` — Icon, label, and colour mappings for each tool displayed in the UI.

### Components
- `src/components/chat/chat-interface.tsx` — Top-level client component; owns `useChat` state, "New Chat" handler, and layout.
- `src/components/chat/chat-messages.tsx` — Message thread with auto-scroll, empty state, loading indicator, and error display.
- `src/components/chat/chat-input.tsx` — Textarea + send button; supports `Enter` to send and `Shift+Enter` for newlines.
- `src/components/chat/chat-tool-result.tsx` — Renders tool call and tool result states inline in the message thread.

### API Route
`src/app/api/chat/route.ts` — Next.js edge route. Accepts the `UIMessages` array, converts it to `CoreMessages` via `convertToModelMessages`, streams a response using `streamText` with the three blog tools, and returns `result.toTextStreamResponse()`.

## 🧩 Constants, Functions, & Types
In this project, you will find custom constants, functions, and types in the `/src/utils/` directory. Certain constants serve as placeholders in this demo application.

While functions and data types are integral to the function of this web application, feel free to check them out.

## 🗄️ Supabase Database Setup
The project uses Supabase for database management. The `SupabaseClient` module is configured to interact with your Supabase instance. The instance is located in `/src/utils/functions/supabase_client`.

**Ensure that the policies of the Supabase database enable you to perform the desired CRUD actions against your tables. You can modify these in the Supabase console.**

### Environment Variables & Credentials
A `.env.example` file is provided at the root of the project listing all required environment variable keys with empty placeholders. Copy it to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required for |
|---|---|
| `SUPABASE_URL` | Dynamic blog post fetching (Supabase client) |
| `SUPABASE_ANON_KEY` | Dynamic blog post fetching (Supabase client) |
| `ANTHROPIC_API_KEY` | Blog Assistant chatbot (`/api/chat` edge route) |
| `GITHUB_TOKEN` | GitHub API authentication for `<GitHubGist>` — optional but raises rate limit from 60 to 5,000 req/hr |
| `GITHUB_USERNAME` | Your GitHub username, used to construct the mdxgists.net URL (defaults to `CodingAbdullah`) |
| `GIST_BASE_URL` | Base URL for mdxgists.net links (defaults to `https://mdxgists.net`) |

```
# .env.local
SUPABASE_URL=
SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
GITHUB_TOKEN=
GITHUB_USERNAME=
GIST_BASE_URL=
```

## 🌩️ AWS
This application utilizes the AWS S3 service for the storage of images. You can find the external URL used to access these objects in the `next.config.ts` file. Feel free to use another service or modify the URL to point to a S3 bucket of your own.

Images are used in the `.mdx` files and utilized via the custom `MDXImage` component covered earlier.

## 🐳 Docker
This application can be containerized using Docker.

To build an image, utilize the Dockerfile located in the root location of the repository and run the following commands to run this web application in a standalone container (passing in the credentials as well):

``
docker build -t mdx-medium-blog .
``

``
docker run -e SUPABASE_URL=your_supabase_url \ -e SUPABASE_ANON_KEY=your_supabase_anon_key \ -e ANTHROPIC_API_KEY=your_anthropic_api_key \ -e GITHUB_TOKEN=your_github_token \ -e GITHUB_USERNAME=your_github_username \ -e GIST_BASE_URL=https://mdxgists.net \ -p 3000:3000 mdx-medium-blog
``

## 🔄 CRUD Operations and Supabase Actions
Implementation of the CRUD operation functions is stored in the `/src/utils/functions/crud` directory. This includes functions for creating, reading, updating, and deleting articles in the Supabase database.

The `article-manager.ts` file utilizes these CRUD functions to successfully perform the desired actions.

## 📜 Scripts for Setting Up Project
The `/scripts` folder contains various scripts to help set up the project and database.

### Setup Scripts
- **SQL Scripts**: DDL and DML statements for initializing and populating the database.
- **Powershell Script**: Script for setting up project on Windows.
- **Bash Shell Script**: Script for setting up project on Linux, Mac, etc.

### GitHub Gist Fetcher
> **Note:** This script is no longer required for rendering gists in MDX. The `<GitHubGist>` component now fetches content live from the GitHub API at render time. This script is retained for offline inspection or local caching workflows.

**Location**: `/scripts/github-gist-fetcher/fetch-github-gist.ts`

**Usage**:
```bash
npx tsx scripts/github-gist-fetcher/fetch-github-gist.ts <gist-id>
```

**Features**:
- Fetches public GitHub Gist content using the GitHub API
- Exports the raw content from the fetch call to `/src/github_gists/<gist-id>.txt`
- Automatically creates the output directory if it does not exist
- Provides clear error handling and status messages

This project directly integrates Supabase in the front-end using React Server components which removes the need for custom back-end APIs.

## 🛠️ Compiling TypeScript and Testing Locally
The `article-manager.ts` file (located in `/scripts/action-script`) utilizes the `tsx` package to perform the different actions (CRUD operations) on articles stored locally.

You can use this handy script for testing MDX and article functionality locally.

The following codeblock highlights the different command prompts that can be used with this file:

    - Insert an Article into Supabase
    npx tsx article-manager.ts insert article-slug

    - Delete an Article from Supabase
    npx tsx article-manager.ts delete article-slug

    - Update an Article in Supabase
    npx tsx article-manager.ts update article-slug new-article-file

    - Fetch a Single Article from Supabase
    npx tsx article-manager.ts fetch article-slug

    - Fetch all Articles from Supabase
    npx tsx article-manager.ts fetchAll

The article slug is the name of the markdown file located in the `/src/markdown` directory minus the extension, `.mdx`.

The update statement takes in an additional parameter which is also the same thing (file name minus the `.mdx` extension located in the `/src/markdown` directory).

## 📱 Mobile Responsiveness
All components in the starter kit are built mobile-first using Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`).

Key responsive behaviours:

| Component | Mobile behaviour |
|---|---|
| `ArticleHeader` | Title scales from `text-2xl` → `text-4xl`; author row stacks vertically on small screens |
| `ArticleAuthorBio` | Avatar and text stack vertically; button goes full-width; text is center-aligned on mobile |
| `GitHubGist` | Header wraps via `flex-wrap`; code area scrolls horizontally with a styled green scrollbar |
| `CodeBlock` | Copy button is absolutely positioned and does not interfere with code flow |
| `MDXImage` | Image container scales inline; hover effect applies on capable devices |
| Chat & Code Sandbox | Responsive padding and height calculations across all breakpoints |

The root layout exports a `viewport` configuration (via Next.js `Viewport` type) ensuring correct scaling on all mobile browsers:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

## 📊 Analytics
Integrated in this setup project is Vercel Analytics (`@vercel/analytics`) to track user interactions and performance metrics of the blog.

## ⚙️ Next.js Configuration
The `next.config.ts` file is set up for working with AWS S3 and includes MDX extensions for enhanced functionality. Feel free to modify and add your own custom links to access storage and setting up other configurations.

## 🔗 Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Lee Robinson's Next.js + MDX Tutorial Video](https://www.youtube.com/watch?v=34bRv6cQezo&ab_channel=leerob)
- [MDX Playground](https://mdxjs.com/playground/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [React Syntax Highlighter Package](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Sandpack Documentation](https://sandpack.codesandbox.io/docs)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Anthropic AI SDK Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic)
- [Zod Documentation](https://zod.dev)

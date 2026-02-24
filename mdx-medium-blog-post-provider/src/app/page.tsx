import Image from "next/image";
import Link from "next/link";
import { Bot, Code2, FileText, Globe } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next MDX Blog App',
  description: 'A starter template for creating and publishing Medium style blog posts using Markdown, JSX, and Next.js',
  keywords: ['blog', 'MDX', 'Next.js', 'markdown', 'articles'],
  openGraph: {
    title: 'Create Next MDX Blog App',
    description: 'A starter template for creating and publishing Medium style blog posts using Markdown, JSX, and Next.js',
    type: 'website'
  }
};

const NAV_CARDS = [
  {
    href: '/sample-blog-post-page',
    icon: Globe,
    label: 'Sample Blog Post',
    description: 'Statically rendered MDX article pre-built at compile time.',
  },
  {
    href: '/dynamic/DynamicArticleContent',
    icon: FileText,
    label: 'Dynamic Blog Post',
    description: 'Server-rendered MDX article fetched from Supabase at request time.',
  },
  {
    href: '/code-sandbox',
    icon: Code2,
    label: 'Code Sandbox',
    description: 'In-browser JavaScript & TypeScript execution powered by Sandpack.',
  },
  {
    href: '/chat',
    icon: Bot,
    label: 'Blog Assistant',
    description: 'AI chatbot powered by the Vercel AI SDK and Anthropic Claude.',
  },
];

// Home Page
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-14 font-[family-name:var(--font-geist-sans)]">

      {/* Hero */}
      <header className="flex flex-col items-center gap-4 mb-10 sm:mb-14 text-center w-full max-w-2xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={160}
          height={34}
          priority
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Next MDX Blog Starter
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-[family-name:var(--font-geist-mono)]">
          A starter template for creating and publishing&nbsp;
          <strong>Medium-style blog posts</strong> using Markdown, JSX, and Next.js.
        </p>
      </header>

      {/* Navigation cards */}
      <main className="w-full max-w-3xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NAV_CARDS.map(({ href, icon: Icon, label, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-semibold leading-tight">{label}</span>
                  <span className="text-xs text-muted-foreground leading-snug font-[family-name:var(--font-geist-mono)]">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

    </div>
  );
}

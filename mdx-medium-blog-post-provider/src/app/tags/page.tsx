import Link from "next/link";
import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { fetchAllTags } from "@/utils/functions";
import type { TagSummary } from "@/utils/functions";

// Generate metadata for the Tags index page
export const metadata: Metadata = {
    title: "Tags | Create Next MDX Blog App",
    description: "Browse every tag used across the blog and explore all articles published under each topic.",
    keywords: ["tags", "topics", "categories", "blog", "articles"],
    openGraph: {
        title: "Tags | Create Next MDX Blog App",
        description: "Browse every tag used across the blog and explore all articles published under each topic.",
        type: "website",
    },
};

// Server-rendered — pulls every distinct tag from the Article table
export const dynamic = "force-dynamic";

export default async function TagsIndexPage(): Promise<React.JSX.Element> {
    const tags: TagSummary[] = await fetchAllTags();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow px-4 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 sm:mb-12 text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 matrix-glow text-green-700 dark:text-green-300">
                            Tags
                        </h1>
                        <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                            Explore articles by topic.
                        </p>
                    </header>

                    {tags.length === 0 ? (
                        <div className="glass-card p-6 sm:p-8 text-center">
                            <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                                No tags have been published yet.
                            </p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            {tags.map((tag) => (
                                <li key={tag.slug}>
                                    <Link
                                        href={`/tags/${tag.slug}`}
                                        className="glass-card flex items-start gap-3 p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent/30 dark:hover:shadow-[0_0_12px_rgba(0,200,0,0.15)]"
                                    >
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-green-500/30 bg-background">
                                            <Tag className="h-4 w-4 text-green-700 dark:text-green-400" aria-hidden />
                                        </span>
                                        <span className="flex flex-col gap-1 min-w-0">
                                            <span className="text-base sm:text-lg font-semibold leading-tight text-green-700 dark:text-green-300">
                                                {tag.name}
                                            </span>
                                            <span className="text-xs text-green-600/70 dark:text-green-400/70">
                                                {tag.articleCount === 1
                                                    ? "1 article"
                                                    : `${tag.articleCount} articles`}
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-10 sm:mt-12 text-center">
                        <Link
                            href="/"
                            className="text-sm sm:text-base text-green-700 dark:text-green-300 hover:underline"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

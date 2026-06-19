import Link from "next/link";
import type { Metadata } from "next";
import ArticleSearch from "@/components/ArticleSearch";

// Metadata for the search page.
export const metadata: Metadata = {
    title: "Search | Create Next MDX Blog App",
    description: "Full-text search across every published article by title, content, and tags.",
    keywords: ["search", "blog", "articles", "full-text search"],
    openGraph: {
        title: "Search | Create Next MDX Blog App",
        description: "Full-text search across every published article by title, content, and tags.",
        type: "website",
    },
};

// Static shell — the interactive search runs client-side against /api/search.
export default function SearchPage(): React.JSX.Element {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow px-4 py-8 sm:py-12">
                <div className="max-w-2xl mx-auto">
                    <header className="mb-8 text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 matrix-glow text-green-700 dark:text-green-300">
                            Search
                        </h1>
                        <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                            Find articles by title, content, or tag.
                        </p>
                    </header>

                    <ArticleSearch />

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

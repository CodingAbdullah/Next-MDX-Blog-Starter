import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Eye, Tag } from "lucide-react";
import { fetchAllTags, fetchArticlesByTag, slugifyTag } from "@/utils/functions";
import type { TagArticleSummary, TagSummary } from "@/utils/functions";

// Server-rendered — pulls everything from the Article table at request time
export const dynamic = "force-dynamic";

// Look up a single tag by slug using the distinct-tag query
// Normalizes the incoming param so "/tags/AI" and "/tags/claude%20code" resolve too
async function getTagBySlug(slug: string): Promise<TagSummary | null> {
    const normalizedSlug = slugifyTag(slug);
    const tags = await fetchAllTags();
    return tags.find((tag) => tag.slug === normalizedSlug) ?? null;
}

// Per-tag metadata
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag: tagParam } = await params;
    const tag = await getTagBySlug(decodeURIComponent(tagParam));

    if (!tag) {
        return {
            title: "Tag Not Found | Create Next MDX Blog App",
        };
    }

    return {
        title: `${tag.name} | Create Next MDX Blog App`,
        description: `Browse all articles published under the ${tag.name} tag.`,
        keywords: ["tag", tag.name, "blog", "articles"],
        openGraph: {
            title: `${tag.name} | Create Next MDX Blog App`,
            description: `Browse all articles published under the ${tag.name} tag.`,
            type: "website",
        },
    };
}

// Format an ISO date stored in Supabase
function formatPublishDate(value: string): string {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function TagArchivePage({ params }: { params: Promise<{ tag: string }> }): Promise<React.JSX.Element> {
    const { tag: tagParam } = await params;
    const tag = await getTagBySlug(decodeURIComponent(tagParam));

    if (!tag) {
        notFound();
    }

    const articles: TagArticleSummary[] = await fetchArticlesByTag(tag.slug);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow px-4 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Tag header */}
                    <header className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 text-center">
                        <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
                            <Tag className="h-6 w-6 sm:h-7 sm:w-7 text-green-700 dark:text-green-400" aria-hidden />
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold matrix-glow text-green-700 dark:text-green-300">
                                {tag.name}
                            </h1>
                        </div>
                        <p className="text-xs sm:text-sm text-green-600/70 dark:text-green-400/70">
                            {articles.length === 1
                                ? "1 published article"
                                : `${articles.length} published articles`}
                        </p>
                    </header>

                    {/* Articles list */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-700 dark:text-green-300">
                            Articles
                        </h2>

                        {articles.length === 0 ? (
                            <div className="glass-card p-6 sm:p-8 text-center">
                                <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                                    No articles have been published under this tag yet.
                                </p>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-4 sm:gap-6">
                                {articles.map((article) => (
                                    <li key={article.slug}>
                                        <Link
                                            href={`/dynamic/${article.slug}`}
                                            className="glass-card flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent/30 dark:hover:shadow-[0_0_12px_rgba(0,200,0,0.15)]"
                                        >
                                            {article.cover_image_url && (
                                                <div className="relative w-full sm:w-40 h-40 sm:h-28 shrink-0 overflow-hidden rounded-lg">
                                                    <Image
                                                        src={article.cover_image_url}
                                                        alt={article.title}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, 160px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2 min-w-0 flex-1">
                                                {article.tags && article.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {article.tags.map((articleTag) => (
                                                            <Badge
                                                                key={articleTag}
                                                                className="bg-green-50 text-green-800 border border-green-300/60 dark:bg-green-900/60 dark:text-green-100 dark:border-green-500/50"
                                                            >
                                                                {articleTag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                                <h3 className="text-base sm:text-lg font-semibold leading-tight text-green-700 dark:text-green-300">
                                                    {article.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-green-800/70 dark:text-green-200/80 line-clamp-2">
                                                    {article.description}
                                                </p>
                                                <p className="text-xs text-green-600/70 dark:text-green-400/70 flex flex-wrap items-center gap-x-2 gap-y-1">
                                                    <span>{formatPublishDate(article.date)}</span>
                                                    {article.reading_time && (
                                                        <>
                                                            <span aria-hidden>•</span>
                                                            <span className="inline-flex items-center gap-1">
                                                                <Eye className="inline h-3 w-3" />
                                                                {article.reading_time}
                                                            </span>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <div className="mt-10 sm:mt-12 text-center">
                        <Link
                            href="/tags"
                            className="text-sm sm:text-base text-green-700 dark:text-green-300 hover:underline"
                        >
                            ← All tags
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

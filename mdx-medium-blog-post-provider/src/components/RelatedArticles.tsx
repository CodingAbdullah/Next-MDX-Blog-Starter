import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { fetchRelatedArticles } from "@/utils/functions";

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

// Related Articles section — shown at the bottom of an article
// Surfaces up to 5 other articles that share at least one tag with the current one
export default async function RelatedArticles({ slug, tags }: { slug: string; tags: string[] }): Promise<React.JSX.Element | null> {
    const relatedArticles = await fetchRelatedArticles(slug, tags, 5);

    if (relatedArticles.length === 0) {
        return null;
    }

    return (
        <section className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 matrix-glow text-green-700 dark:text-green-300">
                Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedArticles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/dynamic/${article.slug}`}
                        className="glass-card flex flex-col gap-3 p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent/30 dark:hover:shadow-[0_0_12px_rgba(0,200,0,0.15)]"
                    >
                        {article.cover_image_url && (
                            <div className="relative w-full h-32 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                    src={article.cover_image_url}
                                    alt={article.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.slice(0, 3).map((articleTag) => (
                                        <Badge
                                            key={articleTag}
                                            className="bg-green-50 text-green-800 border border-green-300/60 dark:bg-green-900/60 dark:text-green-100 dark:border-green-500/50"
                                        >
                                            {articleTag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <h3 className="text-sm sm:text-base font-semibold leading-tight text-green-700 dark:text-green-300 line-clamp-2">
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
                ))}
            </div>
        </section>
    );
}

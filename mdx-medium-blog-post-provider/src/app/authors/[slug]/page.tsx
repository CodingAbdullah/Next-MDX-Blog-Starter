import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Avatar } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { fetchAllAuthors, fetchArticlesByAuthor } from "@/utils/functions";
import type { AuthorArticleSummary, AuthorProfile } from "@/utils/functions";

// Server-rendered — pulls everything from the Article table at request time
export const dynamic = "force-dynamic";

// Look up a single author by slug using the distinct-author query
async function getAuthorBySlug(slug: string): Promise<AuthorProfile | null> {
    const authors = await fetchAllAuthors();
    return authors.find((author) => author.slug === slug) ?? null;
}

// Per-author metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        return {
            title: "Author Not Found | Create Next MDX Blog App",
        };
    }

    return {
        title: `${author.name} | Create Next MDX Blog App`,
        description: author.description,
        keywords: ["author", author.name, "blog", "articles"],
        openGraph: {
            title: `${author.name} | Create Next MDX Blog App`,
            description: author.description,
            type: "profile",
            images: author.profileImageURL ? [{ url: author.profileImageURL }] : undefined,
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

export default async function AuthorProfilePage({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element> {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        notFound();
    }

    const articles: AuthorArticleSummary[] = await fetchArticlesByAuthor(author.name);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow px-4 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Author bio header */}
                    <section className="glass-card p-6 sm:p-8 mb-8 sm:mb-12">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            <Avatar className="shrink-0 border-2 border-green-500/30">
                                <Image
                                    src={author.profileImageURL}
                                    alt={author.name}
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover"
                                    priority
                                />
                            </Avatar>
                            <div className="text-center sm:text-left flex-1">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 matrix-glow text-green-700 dark:text-green-300">
                                    {author.name}
                                </h1>
                                <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80 leading-relaxed">
                                    {author.description}
                                </p>
                                <p className="mt-3 text-xs sm:text-sm text-green-600/70 dark:text-green-400/70">
                                    {articles.length === 1
                                        ? "1 published article"
                                        : `${articles.length} published articles`}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Articles list */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-700 dark:text-green-300">
                            Articles
                        </h2>

                        {articles.length === 0 ? (
                            <div className="glass-card p-6 sm:p-8 text-center">
                                <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                                    This author has not published any articles yet.
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
                                                {article.tags?.[0] && (
                                                    <Badge className="self-start bg-green-50 text-green-800 border border-green-300/60 dark:bg-green-900/60 dark:text-green-100 dark:border-green-500/50">
                                                        {article.tags[0]}
                                                    </Badge>
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
                            href="/authors"
                            className="text-sm sm:text-base text-green-700 dark:text-green-300 hover:underline"
                        >
                            ← All authors
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

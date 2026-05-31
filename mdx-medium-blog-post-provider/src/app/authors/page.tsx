import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Avatar } from "@radix-ui/react-avatar";
import { fetchAllAuthors } from "@/utils/functions";
import type { AuthorProfile } from "@/utils/functions";

// Generate metadata for the Authors index page
export const metadata: Metadata = {
    title: "Authors | Create Next MDX Blog App",
    description: "Browse all authors contributing to the blog and explore their published articles.",
    keywords: ["authors", "blog", "contributors", "writers"],
    openGraph: {
        title: "Authors | Create Next MDX Blog App",
        description: "Browse all authors contributing to the blog and explore their published articles.",
        type: "website",
    },
};

// Server-rendered — pulls every distinct author from the Article table
export const dynamic = "force-dynamic";

export default async function AuthorsIndexPage(): Promise<React.JSX.Element> {
    const authors: AuthorProfile[] = await fetchAllAuthors();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow px-4 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 sm:mb-12 text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 matrix-glow text-green-700 dark:text-green-300">
                            Authors
                        </h1>
                        <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                            Meet the writers behind the blog.
                        </p>
                    </header>

                    {authors.length === 0 ? (
                        <div className="glass-card p-6 sm:p-8 text-center">
                            <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                                No authors have published articles yet.
                            </p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {authors.map((author) => (
                                <li key={author.slug}>
                                    <Link
                                        href={`/authors/${author.slug}`}
                                        className="glass-card flex items-start gap-4 p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent/30 dark:hover:shadow-[0_0_12px_rgba(0,200,0,0.15)]"
                                    >
                                        <Avatar className="shrink-0 border-2 border-green-500/30">
                                            <Image
                                                src={author.profileImageURL}
                                                alt={author.name}
                                                width={56}
                                                height={56}
                                                className="rounded-full object-cover"
                                            />
                                        </Avatar>
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <span className="text-base sm:text-lg font-semibold leading-tight text-green-700 dark:text-green-300">
                                                {author.name}
                                            </span>
                                            <span className="text-xs sm:text-sm text-green-800/70 dark:text-green-200/80 leading-snug line-clamp-3">
                                                {author.description}
                                            </span>
                                            <span className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
                                                {author.articleCount === 1
                                                    ? "1 article"
                                                    : `${author.articleCount} articles`}
                                            </span>
                                        </div>
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

"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Search, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import type { SearchApiResponse, SearchResult, SearchStatus } from "@/utils/types";

const DEBOUNCE_MS = 300;
// Skip the cheapest-but-noisiest calls — single characters match too much to be useful.
const MIN_QUERY_LENGTH = 2;

// Client-side full-text search box. Debounces input, cancels stale requests,
// and renders ranked results from GET /api/search. Results link to the dynamic
// article page (/dynamic/{slug}).
export default function ArticleSearch(): React.JSX.Element {
    const [query, setQuery] = useState<string>("");
    const [status, setStatus] = useState<SearchStatus>("idle");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const abortRef = useRef<AbortController | null>(null);
    // Per-session cache: repeated queries (e.g. backspace then retype) are served
    // locally instead of hitting Supabase again. Created lazily (see below) so the
    // Map isn't rebuilt and discarded on every render.
    const cacheRef = useRef<Map<string, SearchResult[]> | null>(null);

    useEffect(() => {
        const trimmed = query.trim();

        // Cancel any in-flight request before starting a new one.
        abortRef.current?.abort();

        if (trimmed.length < MIN_QUERY_LENGTH) {
            setStatus("idle");
            setResults([]);
            setErrorMessage("");
            return;
        }

        // Lazily allocate the cache on first use, never on render.
        const cache = (cacheRef.current ??= new Map<string, SearchResult[]>());

        // Serve repeated queries from cache — no Supabase round trip.
        const cached = cache.get(trimmed);
        if (cached) {
            setResults(cached);
            setStatus("success");
            setErrorMessage("");
            return;
        }

        const controller = new AbortController();
        abortRef.current = controller;
        setStatus("searching");

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
                    signal: controller.signal,
                });
                const payload = (await response.json()) as SearchApiResponse;

                if (response.ok && payload.ok) {
                    cache.set(trimmed, payload.results);
                    setResults(payload.results);
                    setStatus("success");
                    return;
                }

                setErrorMessage(
                    !payload.ok && payload.message
                        ? payload.message
                        : "Unable to search right now. Please try again."
                );
                setStatus("error");
            } catch (error) {
                // Ignore aborts triggered by a newer keystroke.
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
                setErrorMessage("Network error. Please check your connection and try again.");
                setStatus("error");
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };

    const belowMinLength = query.trim().length < MIN_QUERY_LENGTH;

    return (
        <div className="flex flex-col gap-6">
            <div className="relative">
                <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600/60 dark:text-green-400/60"
                    aria-hidden
                />
                <label htmlFor="article-search" className="sr-only">
                    Search articles
                </label>
                <Input
                    id="article-search"
                    type="search"
                    inputMode="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search articles by title, content, or tag..."
                    value={query}
                    onChange={handleChange}
                    className="h-11 pl-9 pr-10 border-green-400/40 bg-white/80 text-green-900 placeholder:text-green-500/50 focus-visible:ring-green-500/50 dark:border-green-500/30 dark:bg-black/40 dark:text-green-100 dark:placeholder:text-green-200/40"
                    aria-describedby="article-search-status"
                />
                {status === "searching" && (
                    <Loader2
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-green-600/70 dark:text-green-400/70"
                        aria-hidden
                    />
                )}
            </div>

            <div id="article-search-status" aria-live="polite" className="flex flex-col gap-4">
                {status === "error" && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                )}

                {status === "success" && results.length === 0 && (
                    <div className="glass-card p-6 text-center">
                        <p className="text-sm sm:text-base text-green-800/70 dark:text-green-200/80">
                            No articles match{" "}
                            <span className="font-semibold text-green-700 dark:text-green-300">
                                “{query.trim()}”
                            </span>
                            . Try different keywords.
                        </p>
                    </div>
                )}

                {results.length > 0 && (
                    <>
                        <p className="text-xs text-green-700/70 dark:text-green-300/70">
                            {results.length === 1 ? "1 result" : `${results.length} results`}
                        </p>
                        <ul className="flex flex-col gap-3">
                            {results.map((result) => (
                                <li key={result.slug}>
                                    <Link
                                        href={`/dynamic/${result.slug}`}
                                        className="glass-card flex flex-col gap-2 p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent/30 dark:hover:shadow-[0_0_12px_rgba(0,200,0,0.15)]"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-green-400/40 bg-green-100 dark:border-green-500/30 dark:bg-green-500/10">
                                                <FileText
                                                    className="h-4 w-4 text-green-600 dark:text-green-300"
                                                    aria-hidden
                                                />
                                            </span>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-base font-semibold leading-tight text-green-700 dark:text-green-300">
                                                    {result.title}
                                                </span>
                                                <span className="text-sm text-green-800/70 dark:text-green-200/80 leading-snug line-clamp-2">
                                                    {result.description}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 pl-11">
                                            {result.tags?.slice(0, 4).map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="border-green-400/40 text-green-700 dark:border-green-500/30 dark:text-green-300"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                            <span className="ml-auto text-xs text-green-600/70 dark:text-green-400/70">
                                                {result.reading_time}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {belowMinLength && (
                    <p className="text-sm text-green-800/60 dark:text-green-200/60 text-center">
                        Type at least {MIN_QUERY_LENGTH} characters to search across every published article.
                    </p>
                )}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type SummaryState = "idle" | "loading" | "ready" | "error";

// ArticleSummarizer — Client Component.
// Posts to /api/summarize/[slug], streams the TL;DR back, and renders it
// in a collapsible panel. Raw article content is never sent over the wire —
// the API route fetches it server-side from the slug.
export default function ArticleSummarizer({ slug }: { slug: string }): React.JSX.Element {
    const [state, setState] = useState<SummaryState>("idle");
    const [summary, setSummary] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
        };
    }, []);

    const cancelInFlight = (): void => {
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }
    };

    const generate = async (): Promise<void> => {
        cancelInFlight();

        const controller = new AbortController();
        abortRef.current = controller;

        setState("loading");
        setOpen(true);
        setSummary("");

        try {
            const res = await fetch(`/api/summarize/${encodeURIComponent(slug)}`, {
                method: "POST",
                signal: controller.signal,
            });

            if (!res.ok || !res.body) {
                setState("error");
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let received = "";

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;
                received += decoder.decode(value, { stream: true });
                setSummary(received);
            }

            setState("ready");
        }
        catch (err) {
            if ((err as Error).name === "AbortError") {
                return;
            }

            setState("error");
        }
        finally {
            if (abortRef.current === controller) {
                abortRef.current = null;
            }
        }
    };

    const buttonLabel = (): string => {
        if (state === "loading") return "Summarizing...";
        if (state === "ready" && open) return "Hide summary";
        if (state === "ready" && !open) return "Show summary";

        return "Generate TL;DR";
    };

    const handleClick = (): void => {
        if (state === "loading") return;

        if (state === "ready") {
            setOpen((prev) => !prev);
            return;
        }
        void generate();
    };

    const handleClose = (): void => {
        if (state === "loading") {
            cancelInFlight();
            setState("idle");
            setSummary("");
        }
        setOpen(false);
    };

    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClick}
                    disabled={state === "loading"}
                    className="border-green-500/40 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/40 dark:hover:text-green-200 transition-colors text-xs w-full sm:w-auto"
                    aria-label="Generate AI summary of this article"
                    aria-expanded={open}
                    aria-controls="article-summary-panel"
                >
                    {state === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                    )}
                    {buttonLabel()}
                </Button>

                {state === "ready" && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void generate()}
                        className="border-green-500/40 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/40 dark:hover:text-green-200 transition-colors text-xs w-full sm:w-auto"
                        aria-label="Regenerate AI summary"
                    >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Regenerate
                    </Button>
                )}
            </div>

            {open && (state !== "idle") && (
                <section
                    id="article-summary-panel"
                    aria-label="AI generated article summary"
                    className="mt-3 rounded-lg border border-green-500/30 bg-green-50/60 dark:bg-green-900/20 dark:border-green-500/30 p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-green-700 dark:text-green-300" aria-hidden="true" />
                            <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                                TL;DR — AI generated
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-green-700/70 hover:text-green-700 dark:text-green-300/70 dark:hover:text-green-300 transition-colors"
                            aria-label="Close summary"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>

                    {state === "error" ? (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Could not generate a summary. Please try again.
                        </p>
                    ) : (
                        <div className="text-sm text-green-900/90 dark:text-green-100/90 whitespace-pre-wrap leading-relaxed">
                            {summary}
                            {state === "loading" && (
                                <span className="inline-block w-2 h-4 ml-1 align-middle bg-green-600 dark:bg-green-400 animate-pulse" aria-hidden="true" />
                            )}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

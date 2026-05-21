"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import type { ChatInputType } from "@/utils/types";

const MIN_TEXTAREA_HEIGHT_PX = 44;
const MAX_TEXTAREA_HEIGHT_PX = 200;

// Chat Input — matrix themed
export function ChatInput({ isLoading, onSendMessage }: ChatInputType): React.JSX.Element {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = useCallback((): void => {
        const el = textareaRef.current;

        if (!el) return;

        el.style.height = "auto";
        const next = Math.min(
            Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT_PX),
            MAX_TEXTAREA_HEIGHT_PX
        );
        el.style.height = `${next}px`;
    }, []);

    useEffect(() => {
        resizeTextarea();
    }, [input, resizeTextarea]);

    function submit(): void {
        if (!input.trim() || isLoading) return;

        onSendMessage(input);
        setInput("");

        const el = textareaRef.current;

        if (el) {
            el.style.height = `${MIN_TEXTAREA_HEIGHT_PX}px`;
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        submit();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="shrink-0 flex items-end gap-2 p-4 border-t border-green-400/30 dark:border-green-500/20 bg-white/60 dark:bg-[#050d05]"
        >
            <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about JavaScript, TypeScript, React, Next.js, MDX..."
                disabled={isLoading}
                className="min-h-[44px] max-h-[200px] overflow-y-auto resize-none bg-white dark:bg-[#071407] border-green-300/60 dark:border-green-500/30 text-gray-900 dark:text-green-100 placeholder:text-gray-400 dark:placeholder:text-green-800 focus-visible:ring-green-500/50 focus-visible:border-green-400/60 code-font text-sm"
                rows={1}
            />
            <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-green-200 disabled:text-green-500 dark:disabled:bg-green-900/40 dark:disabled:text-green-700 text-white border border-green-500/40"
            >
                <Send className="h-4 w-4" />
            </Button>
        </form>
    );
}

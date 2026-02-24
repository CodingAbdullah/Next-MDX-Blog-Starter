"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import type ChatInputType from "@/utils/types/ChatInputType";

// Chat Input — matrix themed
export function ChatInput({ isLoading, onSendMessage }: ChatInputType) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
                onSendMessage(input);
                setInput("");
            }
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 p-4 border-t border-green-500/20 bg-[#050d05]"
        >
            <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about JavaScript, TypeScript, React, Next.js, MDX..."
                disabled={isLoading}
                className="min-h-[44px] max-h-[200px] resize-none bg-[#071407] border-green-500/30 text-green-100 placeholder:text-green-800 focus-visible:ring-green-500/50 focus-visible:border-green-400/60 code-font text-sm"
                rows={1}
            />
            <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-green-900/40 disabled:text-green-700 text-white border border-green-500/40"
            >
                <Send className="h-4 w-4" />
            </Button>
        </form>
    );
}

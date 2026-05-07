"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bot, User, Loader2 } from "lucide-react";
import { ChatToolResult } from "./chat-tool-result";
import type { ChatMessagesType, ToolInvocationPartType } from "@/utils/types";

const SUGGESTIONS = [
    "Explain React Server Components",
    "TypeScript generics example",
    "Next.js App Router basics",
    "MDX setup in Next.js",
];

// Chat Messages — matrix themed, auto-scrolling
export function ChatMessages({ messages, isLoading, error }: ChatMessagesType): React.JSX.Element {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white/60 dark:bg-[#050d05]">
                <div className="text-center max-w-md">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 mx-auto mb-4">
                        <Bot className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 matrix-glow mb-2 code-font">
                        Blog Assistant Ready
                    </h3>
                    <p className="text-sm text-green-600/80 dark:text-green-700 code-font mb-4">
                        Ask me anything about the topics covered in this technical blog.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {SUGGESTIONS.map((s) => (
                            <span
                                key={s}
                                className="text-xs px-2 py-1 rounded border border-green-300/60 dark:border-green-500/20 text-green-700 dark:text-green-600 code-font"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40 dark:bg-[#050d05] matrix-scrollbar">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                        "flex gap-3 max-w-[92%] sm:max-w-[85%]",
                        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                            message.role === "user"
                                ? "bg-green-100 dark:bg-green-500/20 border-green-300/50 dark:border-green-400/40"
                                : "bg-gray-100/80 dark:bg-black/40 border-green-200 dark:border-green-500/20"
                        )}
                    >
                        {message.role === "user" ? (
                            <User className="h-4 w-4 text-green-700 dark:text-green-300" />
                        ) : (
                            <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                    </div>

                    <div className="space-y-2">
                        {message.parts.map((part, index) => {
                            if (part.type === "text" && part.text) {
                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            "rounded-lg px-4 py-2.5 text-sm code-font",
                                            message.role === "user"
                                                ? "bg-green-100 border border-green-300/60 text-green-900 dark:bg-green-500/20 dark:border-green-400/30 dark:text-green-100"
                                                : "bg-white border border-green-200/60 text-gray-800 dark:bg-black/40 dark:border-green-500/20 dark:text-green-200"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap">{part.text}</p>
                                    </div>
                                );
                            }

                            if (
                                part.type === "dynamic-tool" ||
                                part.type.startsWith("tool-")
                            ) {
                                const toolPart = part as unknown as ToolInvocationPartType;
                                return <ChatToolResult key={index} toolInvocation={toolPart} />;
                            }

                            return null;
                        })}
                    </div>
                </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 mr-auto max-w-[92%] sm:max-w-[85%]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100/80 dark:bg-black/40 border border-green-200 dark:border-green-500/20">
                        <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="rounded-lg bg-white dark:bg-black/40 border border-green-200/60 dark:border-green-500/20 px-4 py-2.5 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-700/70 dark:text-green-600 code-font">Thinking...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-red-400/40 bg-red-50 dark:border-red-500/30 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400 code-font">
                    Something went wrong. Please try again.
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
}

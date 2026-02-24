"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback } from "react";
import { TextStreamChatTransport } from "ai";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Button } from "@/components/ui/button";
import { Bot, RotateCcw } from "lucide-react";

const transport = new TextStreamChatTransport({ api: "/api/chat" });

// Chat Interface — no sidebar, no persistence, matrix themed
export function ChatInterface() {
    const { messages, sendMessage, status, error, setMessages } = useChat({ transport });

    const isLoading = status === "submitted" || status === "streaming";

    const handleNewChat = useCallback(() => {
        setMessages([]);
    }, [setMessages]);

    const handleSendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || isLoading) return;
            await sendMessage({ text });
        },
        [sendMessage, isLoading]
    );

    return (
        <div className="flex flex-col h-[calc(100dvh-10rem)] sm:h-[calc(100dvh-12rem)] md:h-[calc(100dvh-14rem)] min-h-[420px] glass-card rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-[#071407]">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
                        <Bot className="h-4 w-4 text-green-400" />
                    </div>
                    <h2 className="text-sm font-semibold text-green-300 matrix-glow code-font">
                        Blog Assistant
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewChat}
                    disabled={messages.length === 0}
                    className="gap-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 border border-green-500/20 code-font text-xs disabled:opacity-30"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    New Chat
                </Button>
            </div>

            <ChatMessages messages={messages} isLoading={isLoading} error={error} />
            <ChatInput isLoading={isLoading} onSendMessage={handleSendMessage} />
        </div>
    );
}

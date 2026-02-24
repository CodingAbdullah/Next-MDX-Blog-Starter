import { ChatInterface } from "@/components/chat/chat-interface";

// Blog Chat page — no auth, no persistence, matrix themed
export default function ChatPage() {
    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
                <div className="mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-300 matrix-glow code-font">
                        Blog Assistant
                    </h1>
                    <p className="text-sm text-green-700 mt-1 code-font">
                        Ask anything about JavaScript, TypeScript, React, Next.js, MDX, and more.
                    </p>
                </div>
                <ChatInterface />
            </div>
        </div>
    );
}

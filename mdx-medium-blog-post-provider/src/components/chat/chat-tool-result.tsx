"use client";

import { Search } from "lucide-react";
import type { ToolInvocationPartType } from "@/utils/types";
import { TOOL_CONFIG } from "@/utils/constants";

// Chat Tool Result — matrix themed
export function ChatToolResult({
    toolInvocation,
}: {
    toolInvocation: ToolInvocationPartType;
}) {
    const config = TOOL_CONFIG[toolInvocation.toolName] ?? {
        icon: Search,
        label: toolInvocation.toolName,
        color: "text-green-400",
    };

    const Icon = config.icon;

    if (
        toolInvocation.state === "call" ||
        toolInvocation.state === "partial-call" ||
        toolInvocation.state === "input-streaming"
    ) {
        return (
            <div className="flex items-center gap-2 rounded-md border border-green-500/20 bg-black/40 px-3 py-2 text-sm text-green-600 code-font">
                <Icon className={`h-4 w-4 animate-pulse ${config.color}`} />
                <span>Calling {config.label}...</span>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-green-500/20 bg-black/30 p-3">
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-4 w-4 ${config.color}`} />
                <span className="text-sm font-medium text-green-300 code-font">{config.label}</span>
            </div>
            <pre className="text-xs text-green-600 overflow-x-auto whitespace-pre-wrap code-font matrix-scrollbar">
                {JSON.stringify(toolInvocation.output, null, 2)}
            </pre>
        </div>
    );
}

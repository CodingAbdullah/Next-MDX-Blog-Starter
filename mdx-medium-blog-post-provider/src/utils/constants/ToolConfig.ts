import { Search, Code2, BookOpen } from "lucide-react";
import type ToolConfigType from "@/utils/types/ToolConfigType";

// Tool configuration mapping for chat tool results
export const TOOL_CONFIG: Record<string, ToolConfigType> = {
    searchBlogTopics: {
        icon: Search,
        label: "Search Blog Topics",
        color: "text-green-400",
    },
    getCodeExample: {
        icon: Code2,
        label: "Code Example",
        color: "text-emerald-400",
    },
    explainConcept: {
        icon: BookOpen,
        label: "Explain Concept",
        color: "text-green-300",
    },
};

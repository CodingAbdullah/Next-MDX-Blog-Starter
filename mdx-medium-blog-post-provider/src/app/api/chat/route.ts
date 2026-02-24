import { streamText, convertToModelMessages, stepCountIs, tool } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { AI_CHAT_CONFIG } from "@/utils/constants/AiChatConfig";

export const runtime = "edge";

const BLOG_TOPICS = [
    "JavaScript", "TypeScript", "React", "Next.js", "MDX", "Markdown",
    "Tailwind CSS", "Node.js", "REST APIs", "Supabase", "PostgreSQL",
    "AWS", "Docker", "CI/CD", "Performance Optimization", "Testing",
    "Authentication", "State Management", "Server Components", "App Router",
    "CSS", "HTML", "Web APIs", "Accessibility", "SEO", "GraphQL",
    "Webhooks", "Edge Functions", "Middleware", "ISR", "SSR", "SSG",
];

export async function POST(req: Request) {
    try {
        const { messages: uiMessages } = await req.json();
        const messages = await convertToModelMessages(uiMessages);

        const result = streamText({
            model: anthropic(AI_CHAT_CONFIG.model),
            system: AI_CHAT_CONFIG.systemPrompt,
            messages,
            temperature: AI_CHAT_CONFIG.temperature,
            maxOutputTokens: AI_CHAT_CONFIG.maxTokens,
            tools: {
                searchBlogTopics: tool({
                    description: "Search for topics and subjects covered in this technical blog",
                    parameters: z.object({
                        query: z.string().describe("The topic or keyword to search for"),
                    }),
                    execute: async ({ query }) => {
                        const matches = BLOG_TOPICS.filter((t) =>
                            t.toLowerCase().includes(query.toLowerCase())
                        );
                        return {
                            query,
                            matches: matches.length > 0
                                ? matches
                                : ["No exact match — try a broader term"],
                            total: matches.length,
                        };
                    },
                }),
                getCodeExample: tool({
                    description: "Get a runnable code example for a specific programming concept or API",
                    parameters: z.object({
                        topic: z.string().describe("The programming concept, API, or pattern"),
                        language: z
                            .string()
                            .default("typescript")
                            .describe("The programming language"),
                    }),
                    execute: async ({ topic, language }) => ({
                        topic,
                        language,
                        note: `Generating a ${language} example for "${topic}"`,
                    }),
                }),
                explainConcept: tool({
                    description: "Provide a detailed explanation of a technical concept related to web development",
                    parameters: z.object({
                        concept: z.string().describe("The technical concept to explain"),
                        depth: z
                            .enum(["brief", "detailed"])
                            .default("detailed")
                            .describe("How detailed the explanation should be"),
                    }),
                    execute: async ({ concept, depth }) => ({
                        concept,
                        depth,
                        note: `Preparing a ${depth} explanation of "${concept}"`,
                    }),
                }),
            },
            stopWhen: stepCountIs(3),
        });

        return result.toTextStreamResponse();
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}

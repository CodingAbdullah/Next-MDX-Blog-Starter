import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchArticles } from "@/utils/functions";
import type { SearchApiResponse } from "@/utils/types";

// supabase-js relies on Node APIs, so this route runs in the Node runtime.
export const runtime = "nodejs";

const querySchema = z
    .string()
    .trim()
    .min(1, "Search query is required.")
    .max(200, "Search query is too long.");

const errorResponse = (message: string, status: number): NextResponse<SearchApiResponse> =>
    NextResponse.json<SearchApiResponse>({ ok: false, message }, { status });

// Route Handler — ranked full-text search across articles.
// Called client-side by the ArticleSearch component: GET /api/search?q=...
export async function GET(req: NextRequest): Promise<NextResponse<SearchApiResponse>> {
    const parsed = querySchema.safeParse(req.nextUrl.searchParams.get("q") ?? "");

    if (!parsed.success) {
        return errorResponse(parsed.error.issues[0]?.message ?? "Invalid query.", 400);
    }

    try {
        const results = await searchArticles(parsed.data);

        return NextResponse.json<SearchApiResponse>(
            { ok: true, query: parsed.data, results },
            { status: 200 }
        );
    } catch {
        return errorResponse("Unable to search right now. Please try again.", 500);
    }
}

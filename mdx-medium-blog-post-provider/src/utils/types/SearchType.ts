// Full-text article search types.

// A single ranked search hit returned by the search_articles RPC.
// Mirrors the lightweight summary columns — the heavy `content` column is excluded.
export interface SearchResult {
    slug: string;
    title: string;
    description: string;
    cover_image_url: string;
    tags: string[];
    date: string;
    reading_time: string;
    rank: number;
}

// JSON shape returned by GET /api/search to the client.
export interface SearchApiSuccessResponse {
    ok: true;
    query: string;
    results: SearchResult[];
}

export interface SearchApiErrorResponse {
    ok: false;
    message: string;
}

export type SearchApiResponse =
    | SearchApiSuccessResponse
    | SearchApiErrorResponse;

// UI request state for the ArticleSearch component.
export type SearchStatus = "idle" | "searching" | "success" | "error";

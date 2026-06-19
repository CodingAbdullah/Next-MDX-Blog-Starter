import getSupabaseClient from "../supabase_client/SupabaseClient";
import type { SearchResult } from "@/utils/types";

// Runs a ranked full-text search across the Article table via the search_articles
// RPC (native Postgres tsvector). Returns lightweight, relevance-ordered summaries.
//
// Required Supabase migration — run scripts/sql/DDL/createSearchArticlesFunction.sql
// once in the Supabase SQL editor before using the search feature.

export default async function searchArticles(query: string): Promise<SearchResult[]> {
    const trimmed = query.trim();

    // Nothing to search — avoid an unnecessary round trip.
    if (trimmed === "") {
        return [];
    }

    const { data, error } = await getSupabaseClient()
        .rpc("search_articles", { search_query: trimmed });

    if (error) {
        console.error("Could not search articles:", error.message);
        throw new Error("Could not search articles");
    }

    return (data as SearchResult[] | null) ?? [];
}

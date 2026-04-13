import getSupabaseClient from "../supabase_client/SupabaseClient";

// Atomically increments the view count for a given article slug and returns the new count.
// Targets the dedicated view_counts table via an upsert — works for both static and dynamic pages.
//
// Required Supabase migration — run scripts/sql/DDL/createViewCountsTable.sql and
// scripts/sql/DDL/createIncrementViewCountFunction.sql once in the Supabase SQL editor.

export default async function incrementViewCount(slug: string): Promise<number> {
    const { data, error } = await getSupabaseClient()
        .rpc('increment_view_count', { article_slug: slug.trim() });

    if (error) {
        console.error('Could not increment view count:', error.message);
        return 0;
    }

    return (data as number) ?? 0;
}

import getSupabaseClient from "../supabase_client/SupabaseClient";

// Atomically increments the view count for a given article slug and returns the new count.
//
// Required Supabase migration — run once in the Supabase SQL editor:
//
//   ALTER TABLE "Article" ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
//
//   CREATE OR REPLACE FUNCTION increment_view_count(article_slug TEXT)
//   RETURNS INTEGER
//   LANGUAGE plpgsql
//   AS $$
//   DECLARE
//     new_count INTEGER;
//   BEGIN
//     UPDATE "Article"
//     SET view_count = COALESCE(view_count, 0) + 1
//     WHERE slug = article_slug
//     RETURNING view_count INTO new_count;
//     RETURN new_count;
//   END;
//   $$;

export default async function incrementViewCount(slug: string): Promise<number> {
    const { data, error } = await getSupabaseClient()
        .rpc('increment_view_count', { article_slug: slug.trim() });

    if (error) {
        console.error('Could not increment view count:', error.message);
        return 0;
    }

    return (data as number) ?? 0;
}

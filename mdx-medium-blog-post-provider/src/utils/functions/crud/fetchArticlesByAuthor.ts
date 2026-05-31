import getSupabaseClient from "../supabase_client/SupabaseClient";

// Article summary returned to the author profile page
// Excludes the heavy `content` column to keep payloads small
export interface AuthorArticleSummary {
    slug: string;
    title: string;
    description: string;
    cover_image_url: string;
    tags: string[];
    date: string;
    reading_time: string;
}

// Fetch all articles authored by a given author name
// `authorName` must match the value stored in the `articleAuthorName` column
export default async function fetchArticlesByAuthor(authorName: string): Promise<AuthorArticleSummary[]> {
    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("slug, title, description, cover_image_url, tags, date, reading_time")
        .eq("articleAuthorName", authorName.trim())
        .order("date", { ascending: false });

    if (error) {
        throw new Error("Could not fetch articles for author");
    }

    return (data ?? []) as AuthorArticleSummary[];
}

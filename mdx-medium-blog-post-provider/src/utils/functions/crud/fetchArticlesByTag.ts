import getSupabaseClient from "../supabase_client/SupabaseClient";
import slugifyTag from "../tags/slugifyTag";

// Article summary returned to the tag archive page
// Excludes the heavy `content` column to keep payloads small
export interface TagArticleSummary {
    slug: string;
    title: string;
    description: string;
    cover_image_url: string;
    tags: string[];
    date: string;
    reading_time: string;
}

// Fetch all articles carrying a given tag, newest first
// Matches by slugified tag so casing/spacing variants ("DevOps" vs "devops") still resolve
export default async function fetchArticlesByTag(tagSlug: string): Promise<TagArticleSummary[]> {
    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("slug, title, description, cover_image_url, tags, date, reading_time")
        .order("date", { ascending: false });

    if (error) {
        throw new Error("Could not fetch articles for tag");
    }

    const normalizedSlug = slugifyTag(tagSlug);

    return ((data ?? []) as TagArticleSummary[]).filter((article) =>
        Array.isArray(article.tags) &&
        article.tags.some((tag) => slugifyTag(tag) === normalizedSlug)
    );
}

import getSupabaseClient from "../supabase_client/SupabaseClient";

// Article summary returned to the RSS feed route
// Excludes the heavy `content` column to keep payloads small
export interface ArticleFeedItem {
    slug: string;
    title: string;
    description: string;
    cover_image_url: string;
    tags: string[];
    date: string;
    articleAuthorName: string;
}

// Fetch all articles for the RSS feed, newest first
export default async function fetchArticleFeed(): Promise<ArticleFeedItem[]> {
    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("slug, title, description, cover_image_url, tags, date, articleAuthorName")
        .order("date", { ascending: false });

    if (error) {
        throw new Error("Could not fetch articles for RSS feed");
    }

    return (data ?? []) as ArticleFeedItem[];
}

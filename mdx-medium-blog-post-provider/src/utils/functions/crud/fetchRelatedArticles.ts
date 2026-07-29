import getSupabaseClient from "../supabase_client/SupabaseClient";
import slugifyTag from "../tags/slugifyTag";

// Article summary returned alongside a "Related Articles" section
// Excludes the heavy `content` column to keep payloads small
export interface RelatedArticleSummary {
    slug: string;
    title: string;
    description: string;
    cover_image_url: string;
    tags: string[];
    date: string;
    reading_time: string;
}

// Fetch up to `limit` articles that share at least one tag with the current article,
// ranked by number of shared tags (desc) then publish date (desc)
// Scoped to articles authored by "Abdullah Muhammad." only
export default async function fetchRelatedArticles(
    currentSlug: string,
    tags: string[],
    limit: number = 5
): Promise<RelatedArticleSummary[]> {
    if (!Array.isArray(tags) || tags.length === 0) {
        return [];
    }

    const normalizedCurrentTags = new Set(tags.map((tag) => slugifyTag(tag)));

    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("slug, title, description, cover_image_url, tags, date, reading_time")
        .eq("articleAuthorName", "Abdullah Muhammad.")
        .neq("slug", currentSlug)
        .order("date", { ascending: false });

    if (error) {
        throw new Error("Could not fetch related articles");
    }

    const scored = ((data ?? []) as RelatedArticleSummary[])
        .map((article) => {
            const sharedTagCount = Array.isArray(article.tags)
                ? article.tags.filter((tag) => normalizedCurrentTags.has(slugifyTag(tag))).length
                : 0;

            return { article, sharedTagCount };
        })
        .filter(({ sharedTagCount }) => sharedTagCount > 0)
        .sort((a, b) => {
            if (b.sharedTagCount !== a.sharedTagCount) {
                return b.sharedTagCount - a.sharedTagCount;
            }

            return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
        });

    return scored.slice(0, limit).map(({ article }) => article);
}

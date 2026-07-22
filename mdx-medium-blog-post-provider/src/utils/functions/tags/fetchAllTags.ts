import getSupabaseClient from "../supabase_client/SupabaseClient";
import slugifyTag from "./slugifyTag";

// A distinct tag derived from the Supabase Article table
export interface TagSummary {
    slug: string;
    name: string;
    articleCount: number;
}

// Fetch every distinct tag found across all Article rows
// Deduplicates by slug (case-insensitive) and counts each article once per tag
// Scoped to articles authored by "Abdullah Muhammad." only
export default async function fetchAllTags(): Promise<TagSummary[]> {
    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("tags")
        .eq("articleAuthorName", "Abdullah Muhammad.");

    if (error) {
        throw new Error("Could not fetch tags");
    }

    const tagsBySlug = new Map<string, TagSummary>();

    for (const row of data ?? []) {
        const tags: unknown = row.tags;

        if (!Array.isArray(tags)) {
            continue;
        }

        // Guard against the same tag appearing twice on one article
        const seenInArticle = new Set<string>();

        for (const rawTag of tags) {
            if (typeof rawTag !== "string") {
                continue;
            }

            const name = rawTag.trim();
            const slug = slugifyTag(name);

            if (!slug || seenInArticle.has(slug)) {
                continue;
            }

            seenInArticle.add(slug);

            const existing = tagsBySlug.get(slug);

            if (existing) {
                existing.articleCount += 1;
                continue;
            }

            tagsBySlug.set(slug, { slug, name, articleCount: 1 });
        }
    }

    return [...tagsBySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

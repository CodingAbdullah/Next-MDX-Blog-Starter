import getSupabaseClient from "../supabase_client/SupabaseClient";
import slugifyAuthorName from "./slugifyAuthorName";

// A distinct author derived from the Supabase Article table
export interface AuthorProfile {
    slug: string;
    name: string;
    description: string;
    profileImageURL: string;
    articleCount: number;
}

// Fetch every distinct author found across all Article rows
// Deduplicates by `articleAuthorName` and computes a slug for each
export default async function fetchAllAuthors(): Promise<AuthorProfile[]> {
    const { data, error } = await getSupabaseClient()
        .from("Article")
        .select("articleAuthorName, articleAuthorDescription, articleAuthorProfileImageURL")
        // Starter-kit only: scoped to the seed author so the demo renders with sample data.
        // Remove this `.eq` once real articles are inserted so every author appears on /authors.
        .eq("articleAuthorName", "Abdullah Muhammad.");

    if (error) {
        throw new Error("Could not fetch authors");
    }

    const authorsByName = new Map<string, AuthorProfile>();

    for (const row of data ?? []) {
        const name: string | null = row.articleAuthorName;

        if (!name) {
            continue;
        }

        const existing = authorsByName.get(name);

        if (existing) {
            existing.articleCount += 1;
            continue;
        }

        authorsByName.set(name, {
            slug: slugifyAuthorName(name),
            name,
            description: row.articleAuthorDescription ?? "",
            profileImageURL: row.articleAuthorProfileImageURL ?? "",
            articleCount: 1,
        });
    }

    return [...authorsByName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

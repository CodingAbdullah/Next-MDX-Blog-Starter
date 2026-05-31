// Convert an author name to a URL-safe slug
// "Abdullah Muhammad" -> "abdullah-muhammad"
export default function slugifyAuthorName(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

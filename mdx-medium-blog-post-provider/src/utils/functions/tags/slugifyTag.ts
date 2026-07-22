// Convert a tag name to a URL-safe slug
// "Test Category" -> "test-category"
export default function slugifyTag(tag: string): string {
    return tag
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

import { SITE_NAME, SITE_URL } from "@/utils/constants";
import type { ArticleJsonLd, ArticleJsonLdInputType } from "@/utils/types";
import slugifyAuthorName from "../authors/slugifyAuthorName";

// Normalise any parseable date string to ISO 8601; undefined when it cannot be parsed
function toIsoDate(value: string | undefined): string | undefined {
    if (!value) {
        return undefined;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

// Resolve site-relative paths against the canonical origin
function toAbsoluteUrl(value: string): string {
    return new URL(value, `${SITE_URL}/`).toString();
}

// Build a schema.org BlogPosting document for an article
export default function buildArticleJsonLd(input: ArticleJsonLdInputType): ArticleJsonLd {
    const url = toAbsoluteUrl(input.path);
    const datePublished = toIsoDate(input.publishedAt);
    const dateModified = toIsoDate(input.modifiedAt) ?? datePublished;
    const tags = (input.tags ?? []).filter((tag) => tag.trim().length > 0);
    const authorSlug = slugifyAuthorName(input.authorName);

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: input.title,
        description: input.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        ...(input.coverImageURL ? { image: [toAbsoluteUrl(input.coverImageURL)] } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        author: {
            "@type": "Person",
            name: input.authorName,
            ...(authorSlug ? { url: toAbsoluteUrl(`/authors/${authorSlug}`) } : {}),
            ...(input.authorProfileImageURL ? { image: toAbsoluteUrl(input.authorProfileImageURL) } : {}),
            ...(input.authorDescription ? { description: input.authorDescription } : {}),
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
        inLanguage: "en",
    };
}

// Serialise JSON-LD for inline <script> embedding; escaping "<" prevents a value from closing the tag early
export function serializeJsonLd(data: ArticleJsonLd): string {
    return JSON.stringify(data).replace(/</g, "\u003c");
}

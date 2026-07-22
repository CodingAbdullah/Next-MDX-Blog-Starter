import { fetchArticleFeed } from "@/utils/functions";
import type { ArticleFeedItem } from "@/utils/functions";

// Statically generated at build time, regenerated hourly via ISR
export const revalidate = 3600;

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const CHANNEL_TITLE = "Create Next MDX Blog App";
const CHANNEL_DESCRIPTION = "Latest articles from the Create Next MDX Blog App";

// Escape the five XML-reserved characters for safe embedding in element text
function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// RFC 822 date required by the RSS 2.0 spec; null when the stored date is unparseable
function toRfc822(value: string): string | null {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toUTCString();
}

function renderItem(article: ArticleFeedItem): string {
    const articleUrl = `${BASE_URL}/dynamic/${encodeURIComponent(article.slug)}`;
    const pubDate = toRfc822(article.date);
    const categories = (article.tags ?? [])
        .filter((tag): tag is string => typeof tag === "string" && tag.length > 0)
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

    return [
        "<item>",
        `<title>${escapeXml(article.title)}</title>`,
        `<link>${escapeXml(articleUrl)}</link>`,
        `<guid isPermaLink="true">${escapeXml(articleUrl)}</guid>`,
        `<description>${escapeXml(article.description)}</description>`,
        article.articleAuthorName ? `<dc:creator>${escapeXml(article.articleAuthorName)}</dc:creator>` : "",
        pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
        categories,
        "</item>",
    ]
        .filter((line) => line.length > 0)
        .join("\n");
}

function renderFeed(articles: ArticleFeedItem[]): string {
    const items = articles
        .filter((article) => typeof article.slug === "string" && article.slug.length > 0)
        .map(renderItem)
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${escapeXml(CHANNEL_TITLE)}</title>
<link>${escapeXml(BASE_URL)}</link>
<description>${escapeXml(CHANNEL_DESCRIPTION)}</description>
<language>en</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${escapeXml(`${BASE_URL}/feed.xml`)}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
}

// GET /feed.xml — RSS 2.0 feed of all published articles
export async function GET(): Promise<Response> {
    let articles: ArticleFeedItem[] = [];

    try {
        articles = await fetchArticleFeed();
    } 
    catch {
        // Supabase unavailable (e.g. at build time) — serve a valid, empty feed
    }

    return new Response(renderFeed(articles), {
        status: 200,
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}

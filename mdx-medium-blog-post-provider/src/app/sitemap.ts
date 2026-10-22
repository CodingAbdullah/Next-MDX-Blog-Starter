import type { MetadataRoute } from 'next';
import { fetchAllArticles } from '@/utils/functions';
import { SITE_URL } from '@/utils/constants';

const BASE_URL = SITE_URL;

// Static routes map
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/sample-blog-post-page`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/code-sandbox`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/chat`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
];

// Use the article's own timestamp so crawlers only re-fetch changed posts; fall back to now when missing
function toLastModified(value: unknown): Date {
  if (typeof value === 'string') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date();
}

// Dynamic routes map
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const articles = await fetchAllArticles();

    if (articles) {
      dynamicRoutes = articles
        .filter((article): article is typeof article & { slug: string } =>
          typeof article.slug === 'string' && article.slug.length > 0
        )
        .map((article) => ({
          url: `${BASE_URL}/dynamic/${encodeURIComponent(article.slug)}`,
          lastModified: toLastModified(article.updated_at ?? article.date),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }));
    }
  } catch {
    // Supabase unavailable at build time — static routes still served
  }

  return [...STATIC_ROUTES, ...dynamicRoutes];
}

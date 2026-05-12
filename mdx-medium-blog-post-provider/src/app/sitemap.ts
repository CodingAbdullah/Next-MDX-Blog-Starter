import type { MetadataRoute } from 'next';
import { fetchAllArticles } from '@/utils/functions';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

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
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }));
    }
  } catch {
    // Supabase unavailable at build time — static routes still served
  }

  return [...STATIC_ROUTES, ...dynamicRoutes];
}

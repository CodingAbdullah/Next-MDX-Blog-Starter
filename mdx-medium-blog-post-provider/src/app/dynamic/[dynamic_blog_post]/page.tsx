// Custom Article Canvas Page for creating and publishing a Medium style blog post
import DynamicArticle from "@/components/DynamicArticle";
import type { Metadata } from 'next';

// Generate dynamic metadata for the dynamic blog post page
// Generate static paths for each published article
// Modify to your own needs
export async function generateMetadata({ params }: { params: Promise<{ dynamic_blog_post: string }> }): Promise<Metadata> {
  const articleSlug = (await params).dynamic_blog_post;
  
  return {
    title: `${articleSlug} | Create Next MDX Blog App`,
    description: `Read the blog post: ${articleSlug}`,
    keywords: ['blog', 'article', 'MDX', 'dynamic content', 'Next.js'],
    openGraph: {
      title: `${articleSlug} | Create Next MDX Blog App`,
      description: `Read the blog post: ${articleSlug}`,
      type: 'article'
    }
  };
}

// Force server-side rendering — this page fetches from Supabase at request time
export const dynamic = 'force-dynamic';

// Custom Article component for containing MDX/JSX content for a blog post
// Dynamic Article custom component handles fetching MDX content remotely (via Supabase)
export default async function DynamicBlogPostPage({ params }: { params: Promise<{ dynamic_blog_post: string }> }) {
  const articleSlug = (await params).dynamic_blog_post;
  
  return (
    <div className="min-h-screen flex flex-col bg-black"> 
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <DynamicArticle slug={articleSlug} />
        </div>
      </main>
    </div>
  );
};
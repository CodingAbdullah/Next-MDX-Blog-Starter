// Custom Article Canvas Page for creating and publishing a Medium style blog post
import DynamicArticle from "@/components/DynamicArticle";

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
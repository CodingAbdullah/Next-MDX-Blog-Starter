// Custom Article Canvas Page for creating and publishing a Medium style blog post
import ArticleAuthorBio from "@/components/ArticleAuthorBio";
import ArticleHeader from "@/components/ArticleHeader";
import { ArticleAuthorInfoList, ArticleHeaderInfoList } from "@/utils/constants";
import StaticArticle from "@/components/StaticArticle";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTopButton from "@/components/BackToTopButton";
import ViewCounter from "@/components/ViewCounter";
import NewsletterSignup from "@/components/NewsletterSignup";
import type { Metadata } from 'next';

// Generate metadata for the Sample Blog Post page
export const metadata: Metadata = {
  title: 'Sample Blog Post | Create Next MDX Blog App',
  description: 'A sample blog post demonstrating the MDX Medium Blog Post Provider template capabilities',
  keywords: ['sample content', 'blog post', 'MDX', 'Next.js', 'article'],
  openGraph: {
    title: 'Sample Blog Post | Create Next MDX Blog App',
    description: 'A sample blog post demonstrating the MDX Medium Blog Post Provider template capabilities',
    type: 'article'
  }
};

// Sample blog post page component containing article content stored locally
// Utilizes the Static Article custom component
const SampleBlogPostPage = () => {  
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <ReadingProgressBar />
      <BackToTopButton />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ArticleHeader
              articleHeaderInformation={ArticleHeaderInfoList}
              viewCounterSlot={<ViewCounter slug="sample-blog-post-page" />}
            />
          <StaticArticle />
          <ArticleAuthorBio authorInformation={ArticleAuthorInfoList} />
          <NewsletterSignup />
        </div>
      </main>
    </div>
  );
};

export default SampleBlogPostPage;
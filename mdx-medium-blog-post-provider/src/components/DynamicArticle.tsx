// Custom Article Canvas Page for creating and publishing a Medium style blog post
import ArticleAuthorBio from "@/components/ArticleAuthorBio";
import ArticleHeader from "@/components/ArticleHeader";
import { ArticleAuthorInfoList, ArticleHeaderInfoList } from "@/utils/constants";
import MDXRemoteArticle from "./MDXRemoteArticle";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTopButton from "@/components/BackToTopButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import { fetchArticle, incrementViewCount } from "@/utils/functions";

// Custom Dynamic Article component encompasses loading article content stored in a Supabase database
export default async function DynamicArticle({ slug } : { slug: string }): Promise<React.JSX.Element> {
  // Make a call to the back-end and fetch article information
  const [articleData, viewCount] = await Promise.all([
    fetchArticle(slug),
    incrementViewCount(slug)
  ]);

  if (!articleData || !articleData.content) {
    throw new Error("Invalid article");
  }
  else {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <ReadingProgressBar />
        <BackToTopButton />
        <main className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ArticleHeader articleHeaderInformation={ArticleHeaderInfoList} viewCount={viewCount} />
            <div className="glass-card p-8 mb-8">
              <MDXRemoteArticle content={articleData.content} />
            </div>
            <ArticleAuthorBio authorInformation={ArticleAuthorInfoList} />
            <NewsletterSignup />
          </div>
        </main>
      </div>
    );
  }
};
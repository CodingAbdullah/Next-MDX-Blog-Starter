// Custom Article Canvas Page for creating and publishing a Medium style blog post
import ArticleAuthorBio from "@/components/ArticleAuthorBio";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleAuthorInfoList from "@/utils/constants/ArticleAuthorInfoList";
import ArticleHeaderInfoList from "@/utils/constants/ArticleHeaderInfoList";
import MDXRemoteArticle from "./MDXRemoteArticle";
import fetchArticle from "@/utils/functions/crud/fetchArticle";

// Custom Dynamic Article component encompasses loading article content stored in a Supabase database
export default async function DynamicArticle({ slug } : { slug: string }) {
  // Make a call to the back-end and fetch article information
  const articleData = await fetchArticle(slug);
  
  if (!articleData || !articleData.content) {
    throw new Error("Invalid article");
  }
  else {
    return (
      <div className="min-h-screen flex flex-col bg-black"> 
        <main className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ArticleHeader articleHeaderInformation={ArticleHeaderInfoList} />
            <div className="glass-card p-8 mb-8">
              <MDXRemoteArticle content={articleData.content} />
            </div>
            <ArticleAuthorBio authorInformation={ArticleAuthorInfoList} />
          </div>
        </main>
      </div>
    );
  }
};
// Custom Article Canvas Page for creating and publishing a Medium style blog post
import ArticleAuthorBio from "@/components/ArticleAuthorBio";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleAuthorInfoList from "@/utils/constants/ArticleAuthorInfoList";
import ArticleHeaderInfoList from "@/utils/constants/ArticleHeaderInfoList";
import StaticArticle from "@/components/StaticArticle";

// Sample blog post page component containing article content stored locally
// Utilizes the Static Article custom component
const SampleBlogPostPage = () => {  
  return (
    <div className="min-h-screen flex flex-col bg-black"> 
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ArticleHeader articleHeaderInformation={ArticleHeaderInfoList} />
          <StaticArticle />
          <ArticleAuthorBio authorInformation={ArticleAuthorInfoList} />
        </div>
      </main>
    </div>
  );
};

export default SampleBlogPostPage;
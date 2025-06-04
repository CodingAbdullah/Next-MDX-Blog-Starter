// Custom Article Canvas Page for creating and publishing a Medium style blog post
import ArticleContent from "@/markdown/ArticleContent.mdx";

// Custom Static Article component to be used for loading article content stored locally
// Article Header information will be hardcoded and stored locally, the following is simply an example
const StaticArticle = () => {  
  return (
    <div className="glass-card p-8 mb-8">
      <ArticleContent />
    </div>
  );
};

export default StaticArticle;
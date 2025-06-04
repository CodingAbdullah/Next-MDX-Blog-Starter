import ArticleHeaderInfoType from "../types/ArticleHeaderInfoType";
import ArticleAuthorInfoList from "./ArticleAuthorInfoList";

// Article Header Info List constant
// Feel free to modify and adjust accordingly
// The following is an example of how this could work using MDX files locally
// You can use this format to store article header information for each article
const ArticleHeaderInfoList: ArticleHeaderInfoType = {
    articleTags: ['Test Category', 'AI', 'DevOps'],
    articleTitle: "Test Blog Post",
    articleDescription: "Starter template for writing out a blog post using MDX/JSX and Next.js.",
    articleAuthorInfo: ArticleAuthorInfoList,
    articleCoverImageURL: { coverImageURL: 'https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/article-image-cover.PNG' },
    articlePublishDate: new Date(Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    articleReadingTime: '5 min read'
}

export default ArticleHeaderInfoList;
import ArticleHeaderInfoType from "../types/ArticleHeaderInfoType";
import ArticleAuthorInfoList from "./ArticleAuthorInfoList";

// Fixed ISO publish date for the sample article, so structured data and the header stay stable across builds
export const SAMPLE_ARTICLE_PUBLISHED_AT = "2026-10-22";

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
    articlePublishDate: new Date(SAMPLE_ARTICLE_PUBLISHED_AT).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    articleReadingTime: '5 min read'
}

export default ArticleHeaderInfoList;
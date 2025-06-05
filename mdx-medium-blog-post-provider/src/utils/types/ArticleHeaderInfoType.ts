import ArticleCoverImageInfoType from "./ArticleCoverImageType";
import ArticleAuthorInfoType from "./ArticleAuthorInfoType";

// Article Header Info Type
export default interface ArticleHeaderInfoType {
    articleTags: string[],
    articleTitle: string,
    articleAuthorInfo: ArticleAuthorInfoType,
    articlePublishDate: string,
    articleReadingTime: string,
    articleCoverImageURL: ArticleCoverImageInfoType,
    articleDescription: string
}
import { Avatar } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import ArticleCoverImage from "./ArticleCoverImage";
import ArticleHeaderInfoType from "@/utils/types/ArticleHeaderInfoType";
import Image from "next/image";

// Article Header custom component
export default function ArticleHeader({ articleHeaderInformation } : { articleHeaderInformation: ArticleHeaderInfoType }) {
    return (
        <div className="mb-8">
            <Badge className="mb-3 bg-green-900/60 text-green-100 border border-green-500/50">
                { articleHeaderInformation.articleTags[0] }
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 matrix-glow leading-tight text-green-300">
                { articleHeaderInformation.articleTitle }
            </h1>
            <p className="text-xl text-green-200/80 mb-6 leading-relaxed">
                { articleHeaderInformation.articleDescription }
            </p>         
            {/* Author info and publish date */}
            <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-4 border-2 border-green-500/30">
                    <Image src={ articleHeaderInformation.articleAuthorInfo.authorProfileImageURL } alt="No Name Exists" width={48} height={48} className="rounded-full object-cover" />
                </Avatar>
                <div>
                    <p className="font-medium text-green-300">{ articleHeaderInformation.articleAuthorInfo.authorName }</p>
                    <p className="text-sm text-green-400/70">
                    Published on {new Date(Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })} • { articleHeaderInformation.articleReadingTime }
                    </p>
                </div>
            </div>
            {/* Cover image */}
            <ArticleCoverImage coverImageURL={ articleHeaderInformation.articleCoverImageURL.coverImageURL } />        
        </div>
    )
}
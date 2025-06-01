// Custom Article Canvas Page for creating and publishing a Medium style blog post
import { Avatar } from "@/components/ui/avatar";
import ArticleContent from "@/markdown/ArticleContent.mdx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// Custom Article component for containing MDX/JSX content for a blog post
const Article = () => {  
  return (
    <div className="min-h-screen flex flex-col bg-black"> 
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-3 bg-green-900/60 text-green-100 border border-green-500/50">
                Test Category
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 matrix-glow leading-tight text-green-300">
                Test Blog Post
            </h1>
            <p className="text-xl text-green-200/80 mb-6 leading-relaxed">
                Starter template for writing out a blog post using <b>MDX/JSX</b> and <b>Next.js</b>
            </p>
            
            {/* Author info and publish date */}
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 mr-4 border-2 border-green-500/30">
                <Image src="https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/user.PNG" alt="No Name Exists" width={100} height={100} />
              </Avatar>
              <div>
                <p className="font-medium text-green-300">Anonymous</p>
                <p className="text-sm text-green-400/70">
                  Published on {new Date(Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • 5 min read
                </p>
              </div>
            </div>
            
            {/* Cover image */}
            <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/article-image-cover.PNG"
                  alt="Article Cover Image"
                  className="w-full object-cover h-[250px]"
                  width={250}
                  height={250}
                />
            </div>
          </div>
          {/* Article Content */}
          <div className="glass-card p-8 mb-8">
            <ArticleContent />
          </div>
          
          {/* Author bio */}
          <div className="glass-card p-6 mb-12">
            <div className="flex items-start">
              <Avatar className="h-16 w-16 mr-6 border-2 border-green-500/30">
                <Image src="https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/user.PNG" alt="No Name" width={100} height={100} />
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold mb-2 matrix-glow text-green-300">Anonymous</h3>
                <p className="text-green-200/80 mb-3">Blogger. Software Engineer. Designer.</p>
                <Link href="/">
                  <Button variant="outline" className="border-green-500/30 text-green-300">
                    Go Back To Home Page
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Article;
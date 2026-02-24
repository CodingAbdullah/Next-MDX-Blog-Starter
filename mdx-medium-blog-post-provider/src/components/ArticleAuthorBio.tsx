import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import type { ArticleAuthorInfoType } from "@/utils/types";

// Article Author Bio Section component
export default function ArticleAuthorBio({ authorInformation }: { authorInformation: ArticleAuthorInfoType }) {
    return (
        <div className="glass-card p-6 mb-12">
            <div className="flex items-start">
              <Avatar className="h-16 w-16 mr-6 border-2 border-green-500/30">
                <Image src={authorInformation.authorProfileImageURL} alt="No Name" width={64} height={64} className="rounded-full object-cover" />
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold mb-2 matrix-glow text-green-300">{authorInformation.authorName}</h3>
                <p className="text-green-200/80 mb-3">{authorInformation.authorDescription}</p>
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700 text-white border-none">
                    Go Back To Home Page
                  </Button>
                </Link>
              </div>
            </div>
        </div>
    )
}
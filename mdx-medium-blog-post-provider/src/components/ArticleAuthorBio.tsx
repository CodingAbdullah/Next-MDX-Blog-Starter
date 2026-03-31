import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import type { ArticleAuthorInfoType } from "@/utils/types";

// Article Author Bio Section component
export default function ArticleAuthorBio({ authorInformation }: { authorInformation: ArticleAuthorInfoType }) {
    return (
        <div className="glass-card p-4 sm:p-6 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0">
              <Avatar className="mr-0 sm:mr-6 mb-4 sm:mb-0 border-2 border-green-500/30">
                <Image src={authorInformation.authorProfileImageURL} alt="No Name" width={64} height={64} className="rounded-full object-cover" />
              </Avatar>
              <div className="text-center sm:text-left w-full">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 matrix-glow text-green-300">{authorInformation.authorName}</h3>
                <p className="text-green-200/80 mb-3 text-sm sm:text-base">{authorInformation.authorDescription}</p>
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700 text-white border-none w-full sm:w-auto text-sm sm:text-base">
                    Go Back To Home Page
                  </Button>
                </Link>
              </div>
            </div>
        </div>
    )
}
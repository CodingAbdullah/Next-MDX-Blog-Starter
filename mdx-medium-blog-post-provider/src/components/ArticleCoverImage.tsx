import Image from "next/image";
import ArticleCoverImageInfoType from "../utils/types/ArticleCoverImageType";

// Article Cover Image Section component
export default function ArticleCoverImage(coverImageInformation: ArticleCoverImageInfoType) {
    return (
        <div className="rounded-lg overflow-hidden mb-4">
            <Image
            src={ coverImageInformation.coverImageURL }
            alt="Article Cover Image"
            className="w-full object-cover h-[250px]"
            width={250}
            height={250}
            />
        </div>
    )
}
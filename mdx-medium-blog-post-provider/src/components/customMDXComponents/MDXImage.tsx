import Image from "next/image";
import type { MDXImageType } from "@/utils/types";

// MDXImage custom component
// Utilizes the built-in Next.js Image component as well as the figcaption element
export default function MDXImage(imageProperties: MDXImageType) {
    return (
        <figure className='text-center'>
            <Image
                className='mx-auto'
                src={imageProperties.src} 
                height={imageProperties.height} 
                width={imageProperties.width}
                alt={imageProperties.alt} 
            />
            <figcaption className="mb-4 leading-relaxed text-green-200/90">
                {imageProperties.figcaption}
            </figcaption>
        </figure>
    )
}
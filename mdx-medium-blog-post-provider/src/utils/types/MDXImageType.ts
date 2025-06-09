// Image custom component for adding images that need to utilize fig captions
export default interface MDXImageType {
    src: string,
    alt: string,
    width: number,
    height: number,
    figcaption: string
}
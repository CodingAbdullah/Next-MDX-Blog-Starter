import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../mdx-components';
import matter from 'gray-matter';

// Pass in the MDX remote article content as a string
// Utilize the gray matter library to separate article content from article metadata (front-matter)
export default function MDXRemoteArticle({ content }: { content: string }) {
    const { content: mdxContent } = matter(content);

    // MDX Remote used to capture article data from database
    return (
        <div>
            <MDXRemote source={mdxContent} components={useMDXComponents({})} />
        </div>
    )
}
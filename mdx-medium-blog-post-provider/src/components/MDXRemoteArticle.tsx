'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../mdx-components';

// Pass in the MDX remote article content as a string
export default function MDXRemoteArticle({ content }: { content: string }) {
    // MDX Remote used to capture article data from database
    return (
        <div>
            <MDXRemote source={content} components={useMDXComponents({})} />
        </div>
    )
}
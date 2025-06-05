'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../mdx-components';
import MDXRemoteArticleProps from '@/utils/types/MDXRemoteArticleType';

// Pass in the MDX remote article content as a string
export default function MDXRemoteArticle({ content }: MDXRemoteArticleProps) {
    // MDX Remote used to capture article data from database
    return (
        <div>
            <MDXRemote source={content} components={useMDXComponents({})}/>
        </div>
    )
}
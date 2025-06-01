import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/CodeBlock';
import { GitHubGist } from '@/components/GitHubGist';

// Custom MDX components for writing Medium article style blog posts
// Optimize Links and Images using Image and Link built-in components replacing img, a tags
// Code blocks, a, b, u, i, img, ul, ol, blockquote, h1, h2, h3, h4, h5, h6, custom component for handling GitHub Gists
// React-Syntax-Highlighting for Code Blocks (GitHub Gists) (integrate into MDX components file)
// Supabase containing Article Metadata (Name, Subtitle, Tags, Date, Slug, Description, etc.)
// *Check to see if Supabase can be used to store article content*
// Map markdown slugs to dynamic file path routing, loading static files
// Supabase for storing article metadata (article content?)
// AWS S3 for article images, thumbnails, etc.
// Gray Matter for MDX content metadata
// Dockerize the application
// Separate branch for SvelteKit version
// npx command script for downloading starting template
// Powershell/Shell script for creating the npx command script
// NPM package publishing as well
/*
// Example of Metadata for a MDX file
---
title: "Understanding SEO in MDX"
description: "A guide on how to optimize MDX pages for search engines"
author: "John Doe"
date: "2025-05-28"
tags: ["SEO", "MDX", "React"]
slug: "/seo-in-mdx"
---
*/

// MDX Components mapper for both built-in and custom components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 {...props} className={cn("text-3xl font-bold text-green-300 matrix-glow mt-8 mb-4", props.className)}>
      {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} className={cn("text-2xl font-bold text-green-300 matrix-glow mt-8 mb-4 border-b border-green-500/20 pb-2", props.className)}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className={cn("text-xl font-bold text-green-300  matrix-glow mt-6 mb-3", props.className)}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 {...props} className={cn("text-lg font-bold text-green-300 matrix-glow mt-6 mb-2", props.className)}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 {...props} className={cn("text-base font-bold text-green-300  matrix-glow mt-4 mb-2", props.className)}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 {...props} className={cn("text-base font-bold text-green-300 mt-4 mb-2", props.className)}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }) => (
      <p {...props} className={cn("mb-4 leading-relaxed text-green-200/90", props.className)}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} className={cn("text-green-400 hover:text-green-300 underline", props.className)} {...props}>
            {children}
          </Link>
        );
      }
      else if (href?.startsWith('https') || href?.startsWith('http')) {
        return (
          <a href={href} className={cn("text-green-400 hover:text-green-300 underline", props.className)} {...props}>
            {children}
          </a>
        );
      }
      else {
        return (
          <Link
            {...props} 
            href={href || ''}
            className={cn("text-green-400 hover:text-green-300 underline", props.className)}>
            {children}
          </Link>
        );
      }
    },
    ul: ({ children, ...props }) => (
      <ul {...props} className={cn("list-disc pl-6 mb-4 space-y-1", props.className)}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className={cn("list-decimal pl-6 mb-4 space-y-1", props.className)}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className={cn("mb-1 text-green-200/90", props.className)}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        {...props} 
        className={cn("border-l-4 border-green-500/50 pl-4 py-1 mb-4 text-green-200/80 italic", props.className)}
      >
        {children}
      </blockquote>
    ),
    img: (props) => (
      <Image
        width={100}
        height={100}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    pre: ({ className, ...props }) => {
      return <pre className="not-prose" {...props} />;
    },
    code: CodeBlock,
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table {...props} className="min-w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-green-900/30 border-b border-green-500/30">
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th {...props} className="px-6 py-3 text-left text-sm font-semibold text-green-300">
        {children}
      </th>
    ),
    tr: ({ children, ...props }) => (
      <tr {...props} className="border-b border-green-500/20">
        {children}
      </tr>
    ), 
    td: ({ children, ...props }) => (
      <td {...props} className="px-6 py-4 text-sm">
        {children}
      </td>
    ),
    hr: ({ ...props }) => (
      <hr {...props} className="my-6 border-green-500/20" />
    ),
    GitHubGist  
  }
};
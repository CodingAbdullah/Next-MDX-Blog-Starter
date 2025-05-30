import type { MDXComponents } from 'mdx/types';

// Custom MDX components for writing Medium article style blog posts
// Optimize Links and Images using Image and Link built-in components replacing img, a tags
// Code blocks, a, b, u, i, img, ul, ol, blockquote, h1, h2, h3, h4, h5, h6, custom component for handling GitHub Gists
// React-Syntax-Highlighting for Code Blocks (GitHub Gists)
// Supabase containing Article Metadata (Name, Subtitle, Tags, Date, Slug, Description, etc.)
// *Check to see if Supabase can be used to store article content*
// Map markdown slugs to dynamic file path routing, loading static files
// Supabase for storing article metadata (article content?)
// AWS S3 for article images, thumbnails, etc.
// Gray Matter for MDX content metadata
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
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
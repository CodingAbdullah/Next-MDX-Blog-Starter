import type { MDXComponents } from 'mdx/types';

// Custom MDX components for writing Medium article style blog posts
// Optimize Links and Images using Image and Link built-in components replacing img, a tags
// Code blocks, a, img, ul, ol, blockquote, h1, h2, h3, h4, h5, h6, custom component for handling GitHub Gists
// React-Syntax-Highlighting for Code Blocks (GitHub Gists)
// Supabase containing Article Metadata (Name, Subtitle, Tags, Date, Slug, Description, etc.)
// *Check to see if Supabase can be used to store article content*
// Map markdown slugs to dynamic file path routing, loading static files
// Supabase for storing article metadata (article content?)
// AWS S3 for article images, thumbnails, etc.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
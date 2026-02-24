import createMDX from '@next/mdx';
 import type { NextConfig } from 'next';

// Adding acceptable page extensions to be used in this application
// Adding external domains to be used in this application
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdx-blog-bucket.s3.us-east-2.amazonaws.com'
      }
    ]
  },
  experimental: {
    mdxRs: true,
    viewTransition: true
  },
  output: 'standalone' as const
}
 
const withMDX = createMDX({});
 
// Wrapping app configurations with the withMDX function
export default withMDX(nextConfig);
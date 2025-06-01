import createMDX from '@next/mdx';
 
// Adding acceptable page extensions to be used in this application
// Adding external domains to be used in this application
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ["mdx-blog-bucket.s3.us-east-2.amazonaws.com"]
  },
  experimental: {
    mdxRs: true,
    viewTransition: true
  }
}
 
const withMDX = createMDX({});
 
// Wrapping app configurations with the withMDX function
export default withMDX(nextConfig);
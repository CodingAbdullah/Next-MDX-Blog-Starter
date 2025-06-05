-- Example of inserting an article into the Article table in Supabase
-- Modify accordingly
INSERT INTO Article (
  slug,
  title,
  description,
  cover_image_url,
  date,
  reading_time,
  content,
  tags,
  github_gists,
  articleAuthorName,
  articleAuthorDescription,
  articleAuthorProfileImageURL
) VALUES (
  'dynamic-mdx-supabase',
  'Understand Dynamic MDX with Supabase',
  'An in-depth look at integrating MDX content from Supabase into a modern web app.',
  'https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/article-image-cover.PNG',
  CURRENT_DATE,
  '5 min read',
  $$# Understand Dynamic MDX with Supabase

This article explores how to fetch MDX stored in Supabase and render it dynamically in your Next.js app.$$,
  ARRAY['supabase', 'mdx', 'nextjs'],
  ARRAY['gist-id-123abc', 'gist-id-456def'],
  'Abdullah Muhammad',
  'Blogger. Software Developer. Designer.',
  'https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/user.PNG'
);
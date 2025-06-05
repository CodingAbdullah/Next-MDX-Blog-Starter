-- Example of updating an article in the Article table in Supabase
-- Modify accordingly
UPDATE Article
SET
  title = 'Mastering Dynamic MDX with Supabase',
  reading_time = '6 min read',
  content = $$# Mastering Dynamic MDX with Supabase

Updated content here...$$,
  tags = ARRAY['supabase', 'mdx', 'nextjs', 'content-management'],
  github_gists = ARRAY['gist-id-789ghi']
WHERE slug = 'dynamic-mdx-supabase';
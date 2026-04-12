-- Creates the increment_view_count RPC function used to atomically increment
-- the view_count column on the Article table and return the new total.
-- Run once in the Supabase SQL editor before using the view counter feature.
CREATE OR REPLACE FUNCTION increment_view_count(article_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE "Article"
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE slug = article_slug
  RETURNING view_count INTO new_count;
  RETURN new_count;
END;
$$;

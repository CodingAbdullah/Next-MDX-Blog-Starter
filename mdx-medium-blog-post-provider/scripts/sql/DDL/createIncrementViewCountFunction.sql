-- Creates the increment_view_count RPC function used to atomically upsert
-- and increment the count for a given slug in the view_counts table.
-- Works for both static and dynamic article pages.
-- Run once in the Supabase SQL editor before using the view counter feature.
CREATE OR REPLACE FUNCTION increment_view_count(article_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO view_counts (slug, count)
  VALUES (article_slug, 1)
  ON CONFLICT (slug) DO UPDATE
  SET count = view_counts.count + 1
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

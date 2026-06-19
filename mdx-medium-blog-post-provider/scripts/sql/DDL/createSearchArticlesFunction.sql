-- Full-Text Search over the Article table using native Postgres tsvector.
-- Adds a weighted GIN index and the search_articles RPC consumed by the
-- searchArticles helper. No external search service is required.
--
-- Column weights (affect ranking, not matching):
--   A = title, B = tags, C = description, D = content
--
-- Run once in the Supabase SQL editor before using the search feature.

-- GIN index backing the @@ match. The indexed expression must match the
-- WHERE clause in search_articles exactly for the index to be used.
CREATE INDEX IF NOT EXISTS article_search_idx ON Article USING GIN (
  (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'D')
  )
);

-- Ranked full-text search. Accepts a natural-language query (supports quoted
-- phrases, OR, and - exclusion via websearch_to_tsquery) and returns lightweight
-- article summaries ordered by relevance. The heavy `content` column is excluded.
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS TABLE (
  slug VARCHAR,
  title VARCHAR,
  description VARCHAR,
  cover_image_url VARCHAR,
  tags TEXT[],
  date DATE,
  reading_time VARCHAR,
  rank REAL
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    a.slug,
    a.title,
    a.description,
    a.cover_image_url,
    a.tags,
    a.date,
    a.reading_time,
    ts_rank(
      setweight(to_tsvector('english', coalesce(a.title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(array_to_string(a.tags, ' '), '')), 'B') ||
      setweight(to_tsvector('english', coalesce(a.description, '')), 'C') ||
      setweight(to_tsvector('english', coalesce(a.content, '')), 'D'),
      websearch_to_tsquery('english', search_query)
    ) AS rank
  FROM Article a
  WHERE (
    setweight(to_tsvector('english', coalesce(a.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(a.tags, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(a.description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(a.content, '')), 'D')
  ) @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC, a.date DESC
  LIMIT 20;
$$;

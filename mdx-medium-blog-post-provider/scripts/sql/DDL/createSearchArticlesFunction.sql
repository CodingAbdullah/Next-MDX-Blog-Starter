-- Full-Text Search over the Article table using native Postgres tsvector.
-- Adds a weighted GIN index and the search_articles RPC consumed by the
-- searchArticles helper. No external search service is required.
--
-- Column weights (affect ranking, not matching):
--   A = title, B = tags, C = description, D = content
--
-- Search-as-you-type: the query is rebuilt as a PREFIX tsquery so partial words
-- match while the user is still typing ("reac" matches "react"). This keeps the
-- per-keystroke calls meaningful instead of returning nothing until a word is
-- fully typed.
--
-- Run once in the Supabase SQL editor before using the search feature.

-- array_to_string is only STABLE, so it cannot appear directly in an index
-- expression. This thin IMMUTABLE wrapper is safe for text[] (text output is
-- deterministic) and lets the tags column participate in the search index.
CREATE OR REPLACE FUNCTION immutable_array_to_string(arr TEXT[])
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT array_to_string(arr, ' ');
$$;

-- GIN index backing the @@ match. The indexed expression must match the
-- WHERE clause in search_articles exactly for the index to be used.
CREATE INDEX IF NOT EXISTS article_search_idx ON "Article" USING GIN (
  (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(immutable_array_to_string(tags), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'D')
  )
);

-- Ranked full-text search with prefix matching. Returns lightweight article
-- summaries ordered by relevance. The heavy `content` column is excluded.
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
  WITH q AS (
    -- Build a prefix-aware tsquery: "react virtual" -> 'react:* & virtual:*'.
    -- to_tsvector normalizes, stems, and strips punctuation, so rebuilding a
    -- to_tsquery from its lexemes is injection-safe (only clean lexemes survive).
    -- Empty / stop-word-only input yields NULL, which matches no rows.
    SELECT to_tsquery(
      'english',
      (
        SELECT string_agg(lexeme || ':*', ' & ')
        FROM unnest(to_tsvector('english', search_query))
      )
    ) AS tsq
  )
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
      setweight(to_tsvector('english', coalesce(immutable_array_to_string(a.tags), '')), 'B') ||
      setweight(to_tsvector('english', coalesce(a.description, '')), 'C') ||
      setweight(to_tsvector('english', coalesce(a.content, '')), 'D'),
      q.tsq
    ) AS rank
  FROM "Article" a, q
  WHERE q.tsq IS NOT NULL
    -- Author lock: only surface articles published by "Abdullah Muhammad."
    -- The trailing period is part of the canonical name. The column is
    -- case-sensitive, so it must be quoted, and the match is exact — no other
    -- author (or name variant) can slip through.
    AND a."articleAuthorName" = 'Abdullah Muhammad.'
    AND (
      setweight(to_tsvector('english', coalesce(a.title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(immutable_array_to_string(a.tags), '')), 'B') ||
      setweight(to_tsvector('english', coalesce(a.description, '')), 'C') ||
      setweight(to_tsvector('english', coalesce(a.content, '')), 'D')
    ) @@ q.tsq
  ORDER BY rank DESC, a.date DESC
  LIMIT 20;
$$;

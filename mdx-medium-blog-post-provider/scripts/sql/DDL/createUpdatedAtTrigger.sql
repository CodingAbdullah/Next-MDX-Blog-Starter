-- Adds an updated_at timestamp to the Article table and keeps it current on every UPDATE.
-- Used for dateModified in each post's JSON-LD and for lastModified in the sitemap.
-- Safe to re-run: the column, function and trigger are created or replaced idempotently.
-- Add the column and backfill existing rows with their publish date, only on the first run
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Article' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE "Article" ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
    UPDATE "Article" SET updated_at = date::timestamptz;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION set_article_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS article_set_updated_at ON "Article";

CREATE TRIGGER article_set_updated_at
  BEFORE UPDATE ON "Article"
  FOR EACH ROW
  EXECUTE FUNCTION set_article_updated_at();

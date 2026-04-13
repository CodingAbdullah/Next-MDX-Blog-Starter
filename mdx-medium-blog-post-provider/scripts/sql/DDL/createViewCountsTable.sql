-- Creates a dedicated view_counts table for tracking article view counts.
-- Decoupled from the Article table so both static and dynamic articles
-- can have their views tracked regardless of whether a full Article record exists.
CREATE TABLE view_counts (
  slug VARCHAR PRIMARY KEY,
  count INTEGER DEFAULT 0
);

-- Enable Row-Level Security
ALTER TABLE view_counts ENABLE ROW LEVEL SECURITY;

-- Allow select, insert and update for view count tracking
CREATE POLICY "Allow select on view_counts"
  ON view_counts
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert on view_counts"
  ON view_counts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on view_counts"
  ON view_counts
  FOR UPDATE
  USING (true);

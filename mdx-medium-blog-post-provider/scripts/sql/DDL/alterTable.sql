-- Alter table properties such as enabling RLS (Row-Level Security)
ALTER TABLE Article ENABLE ROW LEVEL SECURITY;

-- Add view_count column to Article table for tracking article views
ALTER TABLE "Article" ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Insert policy added to Article table
CREATE POLICY "Allow insert on Article"
  ON "Article"
  FOR INSERT
  WITH CHECK (true);
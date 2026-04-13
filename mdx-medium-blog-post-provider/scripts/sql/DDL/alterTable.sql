-- Alter table properties such as enabling RLS (Row-Level Security)
ALTER TABLE Article ENABLE ROW LEVEL SECURITY;

-- Insert policy added to Article table
CREATE POLICY "Allow insert on Article"
  ON "Article"
  FOR INSERT
  WITH CHECK (true);
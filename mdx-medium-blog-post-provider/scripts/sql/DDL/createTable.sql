-- Creating an Article table object in the Supabase database
-- Run these statements in the Supabase query editor if you want to jumpstart development
CREATE TABLE Article (
  slug VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  cover_image_url VARCHAR NOT NULL,
  date DATE NOT NULL,
  reading_time VARCHAR NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],                -- Array of text values for tags
  github_gists TEXT[],        -- Array of text values for Gist URLs or IDs
  articleAuthorName VARCHAR NOT NULL,
  articleAuthorDescription VARCHAR NOT NULL,
  articleAuthorProfileImageURL VARCHAR NOT NULL
);
-- Fetch all articles from the Article table in Supabase
SELECT * 
FROM Article;

-- Fetch an article based on the Article slug value
SELECT *
FROM Article
WHERE slug='dynamic-mdx-supabase';

-- Fetch articles ordered by date (newest to oldest)
SELECT *
FROM Article
ORDER BY date DESC;

-- Add more queries here if you like
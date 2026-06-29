/*
# Create articles table for news portal

1. New Tables
- `articles`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `title` (text, not null) - Article headline
  - `summary` (text, not null) - Short description shown in list view
  - `content` (text, not null) - Full article body
  - `image_url` (text) - Featured image URL
  - `category` (text, not null) - News category (e.g., 'Politik', 'Teknologi', 'Olahraga', 'Hiburan')
  - `author` (text, not null) - Article author name
  - `published_at` (timestamptz, default now()) - Publication timestamp
  - `featured` (boolean, default false) - Whether article appears in the hero section
  - `views` (integer, default 0) - View count for popularity tracking
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `articles`.
- Allow anon and authenticated users to read all articles (public news portal).
- Restrict insert/update/delete to authenticated users (admin/editor role).
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  image_url text,
  category text NOT NULL,
  author text NOT NULL,
  published_at timestamptz DEFAULT now(),
  featured boolean NOT NULL DEFAULT false,
  views integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_articles" ON articles;
CREATE POLICY "anon_select_articles" ON articles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_articles" ON articles;
CREATE POLICY "auth_insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_articles" ON articles;
CREATE POLICY "auth_update_articles" ON articles FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_articles" ON articles;
CREATE POLICY "auth_delete_articles" ON articles FOR DELETE
  TO authenticated USING (true);

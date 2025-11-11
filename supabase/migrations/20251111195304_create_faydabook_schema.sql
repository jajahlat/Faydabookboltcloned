/*
  # Faydabook Database Schema
  
  ## Overview
  This migration creates the complete database schema for Faydabook, a spiritual ebook and audiobook library app dedicated to the teachings of Shaykh Ibrahim Niass (radiyallahu anhu).
  
  ## New Tables
  
  ### 1. `books`
  Stores all ebook and audiobook metadata
  - `id` (uuid, primary key) - Unique book identifier
  - `title` (text) - Book title
  - `title_arabic` (text, nullable) - Arabic title if available
  - `author` (text) - Author name (default: Shaykh Ibrahim Niass)
  - `description` (text, nullable) - Book description
  - `cover_url` (text) - Cover image URL
  - `epub_url` (text, nullable) - EPUB file URL
  - `pdf_url` (text, nullable) - PDF file URL
  - `audio_url` (text, nullable) - Audiobook file URL
  - `duration_seconds` (integer, nullable) - Audio duration in seconds
  - `language` (text) - Language code (ar, en, fr, etc.)
  - `category` (text) - Book category/theme
  - `page_count` (integer, nullable) - Number of pages
  - `popularity_score` (integer) - For sorting by popularity
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. `user_profiles`
  Extended user information beyond auth
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text, nullable) - User's display name
  - `avatar_url` (text, nullable) - Profile picture URL
  - `preferred_language` (text) - User's preferred language
  - `reading_theme` (text) - Light, Sepia, Dark, Night
  - `font_size` (integer) - Reading font size preference
  - `font_family` (text) - Reading font family preference
  - `notifications_enabled` (boolean) - Daily quote notifications
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `reading_progress`
  Tracks ebook reading progress
  - `id` (uuid, primary key) - Unique progress record
  - `user_id` (uuid, references user_profiles) - User reference
  - `book_id` (uuid, references books) - Book reference
  - `current_page` (integer) - Current page number
  - `total_pages` (integer) - Total pages in book
  - `progress_percentage` (numeric) - Progress as percentage
  - `last_read_at` (timestamptz) - Last reading timestamp
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 4. `listening_progress`
  Tracks audiobook listening progress
  - `id` (uuid, primary key) - Unique progress record
  - `user_id` (uuid, references user_profiles) - User reference
  - `book_id` (uuid, references books) - Book reference
  - `current_position_seconds` (integer) - Current playback position
  - `total_duration_seconds` (integer) - Total audio duration
  - `progress_percentage` (numeric) - Progress as percentage
  - `playback_speed` (numeric) - Playback speed (0.5x - 2x)
  - `last_listened_at` (timestamptz) - Last listening timestamp
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 5. `favorites`
  User's favorited books
  - `id` (uuid, primary key) - Unique favorite record
  - `user_id` (uuid, references user_profiles) - User reference
  - `book_id` (uuid, references books) - Book reference
  - `created_at` (timestamptz) - When favorited
  
  ### 6. `highlights`
  Text highlights in ebooks
  - `id` (uuid, primary key) - Unique highlight record
  - `user_id` (uuid, references user_profiles) - User reference
  - `book_id` (uuid, references books) - Book reference
  - `text_content` (text) - Highlighted text
  - `page_number` (integer) - Page where highlight exists
  - `color` (text) - Highlight color
  - `note` (text, nullable) - Optional note attached to highlight
  - `created_at` (timestamptz) - Creation timestamp
  
  ### 7. `bookmarks`
  Page bookmarks
  - `id` (uuid, primary key) - Unique bookmark record
  - `user_id` (uuid, references user_profiles) - User reference
  - `book_id` (uuid, references books) - Book reference
  - `page_number` (integer) - Bookmarked page
  - `title` (text, nullable) - Optional bookmark title
  - `created_at` (timestamptz) - Creation timestamp
  
  ### 8. `daily_quotes`
  Daily inspirational quotes from Shaykh Ibrahim Niass
  - `id` (uuid, primary key) - Unique quote record
  - `quote_text` (text) - Quote content
  - `quote_arabic` (text, nullable) - Arabic version if available
  - `source_book_id` (uuid, nullable, references books) - Source book
  - `scheduled_date` (date, nullable) - When to show this quote
  - `created_at` (timestamptz) - Creation timestamp
  
  ## Security
  - All tables have RLS enabled
  - Users can only read public book data
  - Users can only manage their own profiles, progress, favorites, highlights, and bookmarks
  - Admin role required for managing books and daily quotes
  
  ## Important Notes
  1. All tables use gen_random_uuid() for primary keys
  2. Timestamps use now() as default
  3. Progress tracking syncs between ebook and audiobook versions
  4. Supports multiple languages and themes
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_arabic text,
  author text DEFAULT 'Shaykh Ibrahim Niass',
  description text,
  cover_url text NOT NULL,
  epub_url text,
  pdf_url text,
  audio_url text,
  duration_seconds integer,
  language text NOT NULL DEFAULT 'en',
  category text NOT NULL DEFAULT 'general',
  page_count integer,
  popularity_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  preferred_language text DEFAULT 'en',
  reading_theme text DEFAULT 'Light',
  font_size integer DEFAULT 16,
  font_family text DEFAULT 'Lora',
  notifications_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reading_progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  current_page integer DEFAULT 0,
  total_pages integer NOT NULL,
  progress_percentage numeric DEFAULT 0,
  last_read_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Create listening_progress table
CREATE TABLE IF NOT EXISTS listening_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  current_position_seconds integer DEFAULT 0,
  total_duration_seconds integer NOT NULL,
  progress_percentage numeric DEFAULT 0,
  playback_speed numeric DEFAULT 1.0,
  last_listened_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Create highlights table
CREATE TABLE IF NOT EXISTS highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  text_content text NOT NULL,
  page_number integer NOT NULL,
  color text DEFAULT '#e4c77c',
  note text,
  created_at timestamptz DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  page_number integer NOT NULL,
  title text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id, page_number)
);

-- Create daily_quotes table
CREATE TABLE IF NOT EXISTS daily_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_text text NOT NULL,
  quote_arabic text,
  source_book_id uuid REFERENCES books(id) ON DELETE SET NULL,
  scheduled_date date,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for books (public read access)
CREATE POLICY "Books are viewable by everyone"
  ON books FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Books are viewable by anonymous users"
  ON books FOR SELECT
  TO anon
  USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for reading_progress
CREATE POLICY "Users can view own reading progress"
  ON reading_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading progress"
  ON reading_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading progress"
  ON reading_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading progress"
  ON reading_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for listening_progress
CREATE POLICY "Users can view own listening progress"
  ON listening_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listening progress"
  ON listening_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listening progress"
  ON listening_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own listening progress"
  ON listening_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for highlights
CREATE POLICY "Users can view own highlights"
  ON highlights FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own highlights"
  ON highlights FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own highlights"
  ON highlights FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own highlights"
  ON highlights FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for daily_quotes (public read access)
CREATE POLICY "Quotes are viewable by authenticated users"
  ON daily_quotes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Quotes are viewable by anonymous users"
  ON daily_quotes FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_books_language ON books(language);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_popularity ON books(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_last_read ON reading_progress(last_read_at DESC);
CREATE INDEX IF NOT EXISTS idx_listening_progress_user ON listening_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_progress_last_listened ON listening_progress(last_listened_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_user_book ON highlights(user_id, book_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_book ON bookmarks(user_id, book_id);
CREATE INDEX IF NOT EXISTS idx_daily_quotes_date ON daily_quotes(scheduled_date);
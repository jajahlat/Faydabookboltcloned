export type Book = {
  id: string;
  title: string;
  title_arabic: string | null;
  author: string;
  description: string | null;
  cover_url: string;
  epub_url: string | null;
  pdf_url: string | null;
  audio_url: string | null;
  duration_seconds: number | null;
  language: string;
  category: string;
  page_count: number | null;
  popularity_score: number;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_language: string;
  reading_theme: 'Light' | 'Sepia' | 'Dark' | 'Night';
  font_size: number;
  font_family: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type ReadingProgress = {
  id: string;
  user_id: string;
  book_id: string;
  current_page: number;
  total_pages: number;
  progress_percentage: number;
  last_read_at: string;
  created_at: string;
  updated_at: string;
};

export type ListeningProgress = {
  id: string;
  user_id: string;
  book_id: string;
  current_position_seconds: number;
  total_duration_seconds: number;
  progress_percentage: number;
  playback_speed: number;
  last_listened_at: string;
  created_at: string;
  updated_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  book_id: string;
  created_at: string;
};

export type Highlight = {
  id: string;
  user_id: string;
  book_id: string;
  text_content: string;
  page_number: number;
  color: string;
  note: string | null;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  book_id: string;
  page_number: number;
  title: string | null;
  created_at: string;
};

export type DailyQuote = {
  id: string;
  quote_text: string;
  quote_arabic: string | null;
  source_book_id: string | null;
  scheduled_date: string | null;
  created_at: string;
};

# Faydabook

A modern, cross-platform ebook and audiobook library dedicated to the teachings of Shaykh Ibrahim Niass (radiyallahu anhu). Built with React Native and Expo.

## Features

### Core Functionality
- **Ebook Library**: Browse and read digital books (EPUB/PDF support planned)
- **Audiobook Player**: Listen to spiritual teachings with a beautiful audio player
- **Progress Tracking**: Sync your reading and listening progress across devices
- **User Profiles**: Personalized experience with customizable reading preferences
- **Daily Wisdom**: Receive daily quotes from Shaykh Ibrahim Niass

### User Experience
- Beautiful, spiritual UI design with emerald green and gold accents
- Smooth animations and transitions
- Dark mode support (Light, Sepia, Dark, Night themes)
- Offline reading and listening capabilities
- Highlights, bookmarks, and notes
- Anonymous or authenticated access

## Tech Stack

- **Frontend**: React Native (Expo SDK 54)
- **Navigation**: Expo Router (file-based routing)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Styling**: React Native StyleSheet (following Material Design principles)
- **Audio**: Expo AV

## Color Palette

- **Primary**: Emerald Green (#126b40)
- **Accent**: Gold (#e4c77c)
- **Background**: Ivory (#f8f5f0)
- **Text**: Charcoal (#222222)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Update environment variables in `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

The database schema is already created with the following tables:

- `books` - Store ebook and audiobook metadata
- `user_profiles` - Extended user information
- `reading_progress` - Track ebook reading progress
- `listening_progress` - Track audiobook listening progress
- `favorites` - User's favorited books
- `highlights` - Text highlights in ebooks
- `bookmarks` - Page bookmarks
- `daily_quotes` - Daily inspirational quotes

All tables have Row Level Security (RLS) enabled for data protection.

## Project Structure

```
app/
├── (tabs)/           # Tab-based navigation
│   ├── index.tsx     # Home screen
│   ├── library.tsx   # Library screen
│   ├── audio.tsx     # Audio screen
│   └── profile.tsx   # Profile screen
├── auth.tsx          # Authentication screen
├── _layout.tsx       # Root layout with providers
└── +not-found.tsx    # 404 screen

constants/
└── theme.ts          # Theme configuration

contexts/
└── AuthContext.tsx   # Authentication context

lib/
└── supabase.ts       # Supabase client configuration

types/
└── database.types.ts # TypeScript types for database
```

## Screens

### Home Screen
- Daily wisdom quote
- Continue Reading section
- Continue Listening section
- Beautiful gradient header

### Library Screen
- Grid layout of books with cover art
- Search functionality
- Filters by type (All, Ebooks, Audiobooks)
- Book metadata and badges

### Audio Screen
- List of available audiobooks
- Duration display
- Play button for each audiobook
- Beautiful card design

### Profile Screen
- User preferences
- Reading theme selector
- Font size adjustment
- Notification settings
- Sign out functionality

## Authentication

The app supports three authentication methods:

1. **Email/Password**: Standard authentication
2. **Anonymous**: Guest access without registration
3. **Social** (planned): Google, Apple sign-in

## Contributing

This is a spiritual project dedicated to preserving and sharing the teachings of Shaykh Ibrahim Niass (RA). Contributions are welcome with respect to the subject matter.

## Admin Panel (Planned)

A web-based admin panel will be built to:
- Upload new books and audiobooks
- Manage book metadata
- Schedule daily quotes
- Monitor user engagement

## Future Enhancements

- Full EPUB reader with page turning
- PDF viewer integration
- Audio player with speed control and sleep timer
- Sync between ebook and audiobook versions
- Download for offline access
- Daily notification system
- Arabic font support (Amiri, Scheherazade)
- Share quotes and highlights
- Community features

## License

This project is dedicated to spreading the teachings of Shaykh Ibrahim Niass (radiyallahu anhu).

## Acknowledgments

This app is built with love and respect for the legacy of Shaykh Ibrahim Niass (RA), the great Sufi master whose teachings continue to guide millions worldwide.

May Allah be pleased with him and benefit us through his knowledge. Ameen.

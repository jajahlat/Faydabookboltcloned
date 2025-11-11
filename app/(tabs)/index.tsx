import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Headphones, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { Book, ReadingProgress, ListeningProgress, DailyQuote } from '@/types/database.types';

type BookWithProgress = Book & {
  reading_progress?: ReadingProgress;
  listening_progress?: ListeningProgress;
};

export default function HomeScreen() {
  const [continueReading, setContinueReading] = useState<BookWithProgress[]>([]);
  const [continueListening, setContinueListening] = useState<BookWithProgress[]>([]);
  const [dailyQuote, setDailyQuote] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [readingData, listeningData, quoteData] = await Promise.all([
          supabase
            .from('reading_progress')
            .select('*, books(*)')
            .eq('user_id', user.id)
            .order('last_read_at', { ascending: false })
            .limit(5),
          supabase
            .from('listening_progress')
            .select('*, books(*)')
            .eq('user_id', user.id)
            .order('last_listened_at', { ascending: false })
            .limit(5),
          supabase
            .from('daily_quotes')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single(),
        ]);

        if (readingData.data) {
          const books = readingData.data.map((item: any) => ({
            ...item.books,
            reading_progress: item,
          }));
          setContinueReading(books);
        }

        if (listeningData.data) {
          const books = listeningData.data.map((item: any) => ({
            ...item.books,
            listening_progress: item,
          }));
          setContinueListening(books);
        }

        if (quoteData.data) {
          setDailyQuote(quoteData.data);
        }
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookCard = (book: BookWithProgress, type: 'reading' | 'listening') => {
    const progress = type === 'reading'
      ? book.reading_progress?.progress_percentage
      : book.listening_progress?.progress_percentage;

    return (
      <TouchableOpacity key={book.id} style={styles.bookCard}>
        <Image source={{ uri: book.cover_url }} style={styles.bookCover} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          {book.title_arabic && (
            <Text style={styles.bookTitleArabic} numberOfLines={1}>
              {book.title_arabic}
            </Text>
          )}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress || 0}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress || 0)}% complete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={Colors.gradients.hero} style={styles.header}>
        <Text style={styles.headerTitle}>As-salamu alaykum</Text>
        <Text style={styles.headerSubtitle}>Continue your spiritual journey</Text>
      </LinearGradient>

      {dailyQuote && (
        <View style={styles.quoteCard}>
          <View style={styles.quoteHeader}>
            <Sparkles size={24} color={Colors.accent} />
            <Text style={styles.quoteLabel}>Daily Wisdom</Text>
          </View>
          <Text style={styles.quoteText}>{dailyQuote.quote_text}</Text>
          {dailyQuote.quote_arabic && (
            <Text style={styles.quoteArabic}>{dailyQuote.quote_arabic}</Text>
          )}
        </View>
      )}

      {continueReading.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Continue Reading</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {continueReading.map((book) => renderBookCard(book, 'reading'))}
          </ScrollView>
        </View>
      )}

      {continueListening.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Headphones size={24} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Continue Listening</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {continueListening.map((book) => renderBookCard(book, 'listening'))}
          </ScrollView>
        </View>
      )}

      {!loading && continueReading.length === 0 && continueListening.length === 0 && (
        <View style={styles.emptyState}>
          <BookOpen size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>Start Your Journey</Text>
          <Text style={styles.emptyText}>
            Explore the wisdom of Shaykh Ibrahim Niass in our library
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.xl,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.white,
    opacity: 0.9,
  },
  quoteCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    ...Shadows.medium,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  quoteLabel: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  quoteText: {
    fontSize: Typography.fontSizes.lg,
    lineHeight: Typography.fontSizes.lg * Typography.lineHeights.relaxed,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  quoteArabic: {
    fontSize: Typography.fontSizes.xl,
    lineHeight: Typography.fontSizes.xl * Typography.lineHeights.relaxed,
    color: Colors.primary,
    textAlign: 'right',
  },
  section: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  bookCard: {
    width: 280,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginLeft: Spacing.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: BorderRadius.sm,
  },
  bookInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bookTitleArabic: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    marginTop: Spacing['2xl'],
  },
  emptyTitle: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.fontSizes.base,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: Typography.fontSizes.base * Typography.lineHeights.relaxed,
  },
});

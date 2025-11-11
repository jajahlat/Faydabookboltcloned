import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { Search, Filter, BookOpen } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { Book } from '@/types/database.types';

type FilterType = 'all' | 'ebook' | 'audio';

export default function LibraryScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchQuery, selectedLanguage, selectedCategory, filterType]);

  const loadBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('popularity_score', { ascending: false });

      if (error) throw error;
      if (data) {
        setBooks(data);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.title_arabic?.includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter((book) => book.language === selectedLanguage);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (filterType === 'ebook') {
      filtered = filtered.filter((book) => book.epub_url || book.pdf_url);
    } else if (filterType === 'audio') {
      filtered = filtered.filter((book) => book.audio_url);
    }

    setFilteredBooks(filtered);
  };

  const renderBookCard = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookCard}>
      <Image source={{ uri: item.cover_url }} style={styles.bookCover} />
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      {item.title_arabic && (
        <Text style={styles.bookTitleArabic} numberOfLines={1}>
          {item.title_arabic}
        </Text>
      )}
      <View style={styles.bookMeta}>
        {item.epub_url && (
          <View style={styles.badge}>
            <BookOpen size={12} color={Colors.primary} />
            <Text style={styles.badgeText}>Ebook</Text>
          </View>
        )}
        {item.audio_url && (
          <View style={[styles.badge, { backgroundColor: Colors.accent + '20' }]}>
            <Text style={[styles.badgeText, { color: Colors.accent }]}>Audio</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <Text style={styles.headerSubtitle}>
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} available
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, authors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textLight}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterType === 'all' && styles.filterChipActive,
          ]}
          onPress={() => setFilterType('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              filterType === 'all' && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterType === 'ebook' && styles.filterChipActive,
          ]}
          onPress={() => setFilterType('ebook')}
        >
          <Text
            style={[
              styles.filterChipText,
              filterType === 'ebook' && styles.filterChipTextActive,
            ]}
          >
            Ebooks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterType === 'audio' && styles.filterChipActive,
          ]}
          onPress={() => setFilterType('audio')}
        >
          <Text
            style={[
              styles.filterChipText,
              filterType === 'audio' && styles.filterChipTextActive,
            ]}
          >
            Audiobooks
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.bookRow}
          contentContainerStyle={styles.booksList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <BookOpen size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No books found</Text>
          <Text style={styles.emptyText}>
            Try adjusting your search or filters
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing['2xl'] + Spacing.lg,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSizes.base,
    color: Colors.textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: Typography.fontSizes.base,
    color: Colors.text,
  },
  filtersContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.text,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  booksList: {
    padding: Spacing.lg,
  },
  bookRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  bookCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadows.medium,
  },
  bookCover: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
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
  bookMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    backgroundColor: Colors.primary + '20',
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.primary,
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
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
  },
});

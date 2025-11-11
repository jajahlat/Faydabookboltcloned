import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Headphones, Play, Pause } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { Book } from '@/types/database.types';

export default function AudioScreen() {
  const [audiobooks, setAudiobooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAudiobooks();
  }, []);

  const loadAudiobooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .not('audio_url', 'is', null)
        .order('popularity_score', { ascending: false });

      if (error) throw error;
      if (data) {
        setAudiobooks(data);
      }
    } catch (error) {
      console.error('Error loading audiobooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const renderAudiobookCard = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.audiobookCard}>
      <Image source={{ uri: item.cover_url }} style={styles.audiobookCover} />
      <View style={styles.audiobookInfo}>
        <Text style={styles.audiobookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.title_arabic && (
          <Text style={styles.audiobookTitleArabic} numberOfLines={1}>
            {item.title_arabic}
          </Text>
        )}
        <Text style={styles.audiobookAuthor}>{item.author}</Text>
        <View style={styles.audiobookMeta}>
          <Headphones size={14} color={Colors.textLight} />
          <Text style={styles.audiobookDuration}>
            {formatDuration(item.duration_seconds)}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Play size={24} color={Colors.white} fill={Colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Headphones size={32} color={Colors.primary} />
        <Text style={styles.headerTitle}>Audiobooks</Text>
        <Text style={styles.headerSubtitle}>
          Listen to the teachings of Shaykh Ibrahim Niass
        </Text>
      </View>

      {audiobooks.length > 0 ? (
        <FlatList
          data={audiobooks}
          renderItem={renderAudiobookCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.audiobooksList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Headphones size={64} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No audiobooks yet</Text>
          <Text style={styles.emptyText}>
            Audiobooks will appear here once they are added to the library
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
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSizes.base,
    color: Colors.textLight,
    textAlign: 'center',
  },
  audiobooksList: {
    padding: Spacing.lg,
  },
  audiobookCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  audiobookCover: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.sm,
  },
  audiobookInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  audiobookTitle: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  audiobookTitleArabic: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  audiobookAuthor: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  audiobookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audiobookDuration: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
    marginLeft: Spacing.xs,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
    lineHeight: Typography.fontSizes.base * Typography.lineHeights.relaxed,
  },
});

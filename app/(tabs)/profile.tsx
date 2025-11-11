import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {
  User,
  Settings,
  Bell,
  Moon,
  Sun,
  BookOpen,
  LogOut,
} from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/database.types';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ notifications_enabled: value })
        .eq('id', profile.id);

      if (error) throw error;
      setProfile({ ...profile, notifications_enabled: value });
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <Icon size={24} color={Colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <User size={48} color={Colors.white} />
        </View>
        <Text style={styles.userName}>
          {profile?.display_name || 'Guest User'}
        </Text>
        <Text style={styles.userEmail}>Continue your spiritual journey</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsCard}>
          <SettingItem
            icon={Bell}
            title="Daily Notifications"
            subtitle="Receive daily wisdom quotes"
            rightElement={
              <Switch
                value={profile?.notifications_enabled || false}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#e0e0e0', true: Colors.primary }}
                thumbColor={Colors.white}
              />
            }
          />
          <SettingItem
            icon={BookOpen}
            title="Reading Theme"
            subtitle={profile?.reading_theme || 'Light'}
            onPress={() => {}}
          />
          <SettingItem
            icon={Settings}
            title="Font Size"
            subtitle={`${profile?.font_size || 16}px`}
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingsCard}>
          <SettingItem
            icon={BookOpen}
            title="About Faydabook"
            onPress={() => {}}
          />
          <SettingItem
            icon={User}
            title="About Shaykh Ibrahim Niass"
            onPress={() => {}}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={20} color="#d32f2f" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Faydabook v1.0.0</Text>
        <Text style={styles.footerSubtext}>
          Dedicated to the teachings of Shaykh Ibrahim Niass (RA)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'] + Spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSizes.base,
    color: Colors.white,
    opacity: 0.9,
  },
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.small,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  signOutText: {
    fontSize: Typography.fontSizes.base,
    fontWeight: Typography.fontWeights.medium,
    color: '#d32f2f',
    marginLeft: Spacing.sm,
  },
  footer: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
  footerText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  footerSubtext: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

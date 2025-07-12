import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = usePrivy();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? You will need to sign in again.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout
            router.replace('/');
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile',
          subtitle: 'Edit your profile information',
          icon: 'person',
          onPress: () => router.push('/profile'),
        },
        {
          id: 'linked-accounts',
          title: 'Linked Accounts',
          subtitle: `${user?.linked_accounts?.length || 0} accounts connected`,
          icon: 'link',
          onPress: () => Alert.alert('Linked Accounts', 'Manage your connected accounts'),
        },
        {
          id: 'wallet-settings',
          title: 'Wallet Settings',
          subtitle: 'Manage wallet preferences',
          icon: 'wallet',
          onPress: () => router.push('/wallet'),
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          id: 'security-settings',
          title: 'Security Settings',
          subtitle: 'Passkeys, 2FA, and privacy',
          icon: 'shield-checkmark',
          onPress: () => router.push('/security'),
        },
        {
          id: 'biometric',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face ID',
          icon: 'finger-print',
          type: 'switch',
          value: biometricEnabled,
          onValueChange: setBiometricEnabled,
        },
        {
          id: 'auto-lock',
          title: 'Auto Lock',
          subtitle: 'Lock app when inactive',
          icon: 'lock-closed',
          type: 'switch',
          value: autoLockEnabled,
          onValueChange: setAutoLockEnabled,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'currency',
          title: 'Currency',
          subtitle: currency,
          icon: 'cash',
          onPress: () => {
            Alert.alert(
              'Select Currency',
              'Choose your preferred currency',
              [
                { text: 'USD', onPress: () => setCurrency('USD') },
                { text: 'EUR', onPress: () => setCurrency('EUR') },
                { text: 'GBP', onPress: () => setCurrency('GBP') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          },
        },
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Transaction alerts and updates',
          icon: 'notifications',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          icon: 'language',
          onPress: () => Alert.alert('Language', 'Language selection coming soon'),
        },
        {
          id: 'theme',
          title: 'Theme',
          subtitle: colorScheme === 'dark' ? 'Dark' : 'Light',
          icon: 'moon',
          onPress: () => Alert.alert('Theme', 'Theme selection coming soon'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'FAQs, guides, and contact',
          icon: 'help-circle',
          onPress: () => router.push('/help'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Help us improve the app',
          icon: 'chatbubble-ellipses',
          onPress: () => Alert.alert('Feedback', 'Feedback feature coming soon'),
        },
        {
          id: 'about',
          title: 'About',
          subtitle: 'Version, terms, and privacy',
          icon: 'information-circle',
          onPress: () => router.push('/about'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.type === 'switch' ? undefined : item.onPress}
                  disabled={item.type === 'switch'}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: colors.tint }]}>
                      <Ionicons name={item.icon as any} size={20} color={colors.background} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={[styles.menuTitle, { color: colors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#E0E0E0', true: colors.tint }}
                      thumbColor={colors.background}
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            App Information
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Version</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Build</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>2024.1.15</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#F44336' }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={[styles.logoutText, { color: 'white' }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 34,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
}); 
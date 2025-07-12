import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = usePrivy();
  const account = getUserEmbeddedEthereumWallet(user);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', 'Address copied to clipboard');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'wallet',
          title: 'Wallet Address',
          subtitle: account?.address ? formatAddress(account.address) : 'No wallet created',
          icon: 'wallet',
          onPress: () => account?.address && copyToClipboard(account.address),
          showArrow: false,
        },
        {
          id: 'linked-accounts',
          title: 'Linked Accounts',
          subtitle: `${user?.linked_accounts?.length || 0} accounts linked`,
          icon: 'link',
          onPress: () => router.push('/settings'),
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'security',
          title: 'Security',
          subtitle: 'Passkeys, 2FA, and privacy',
          icon: 'shield-checkmark',
          onPress: () => router.push('/security'),
        },
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Transaction alerts and updates',
          icon: 'notifications',
          onPress: () => router.push('/notifications'),
        },
        {
          id: 'preferences',
          title: 'Preferences',
          subtitle: 'Currency, language, and display',
          icon: 'settings',
          onPress: () => router.push('/settings'),
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
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={[styles.profileCard, { backgroundColor: colors.tint }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.background }]}>
              <Ionicons name="person" size={40} color={colors.tint} />
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.background }]}>
            {user?.linked_accounts?.find(acc => acc.type === 'email')?.address || 'User'}
          </Text>
          <Text style={[styles.userId, { color: colors.background }]}>
            ID: {user?.id || 'Unknown'}
          </Text>
        </View>

        {/* Sections */}
        {profileSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
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
                  {item.showArrow !== false && (
                    <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Wallet Details */}
        {account?.address && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Wallet Details
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
              <View style={styles.walletInfo}>
                <Text style={[styles.walletLabel, { color: colors.icon }]}>
                  Full Address
                </Text>
                <TouchableOpacity
                  style={styles.addressContainer}
                  onPress={() => copyToClipboard(account.address)}
                >
                  <Text style={[styles.walletAddress, { color: colors.text }]}>
                    {account.address}
                  </Text>
                  <Ionicons name="copy-outline" size={16} color={colors.tint} />
                </TouchableOpacity>
              </View>
              <View style={styles.walletInfo}>
                <Text style={[styles.walletLabel, { color: colors.icon }]}>
                  Network
                </Text>
                <Text style={[styles.walletValue, { color: colors.text }]}>
                  Ethereum Mainnet
                </Text>
              </View>
            </View>
          </View>
        )}

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
  logoutButton: {
    padding: 5,
  },
  profileCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    fontWeight: '500',
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
  walletInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  walletLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 14,
    fontFamily: 'monospace',
    flex: 1,
  },
  walletValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bottomSpacing: {
    height: 20,
  },
}); 
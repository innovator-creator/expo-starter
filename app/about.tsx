import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const appInfo = {
    name: 'Digital Wallet',
    version: '1.0.0',
    build: '2024.1.15',
    description: 'A secure, user-friendly cryptocurrency wallet for managing your digital assets.',
  };

  const aboutSections = [
    {
      title: 'Legal',
      items: [
        {
          id: 'terms',
          title: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          icon: 'document-text',
          onPress: () => Linking.openURL('https://example.com/terms'),
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          subtitle: 'How we protect your data',
          icon: 'shield-checkmark',
          onPress: () => Linking.openURL('https://example.com/privacy'),
        },
        {
          id: 'licenses',
          title: 'Open Source Licenses',
          subtitle: 'Third-party software licenses',
          icon: 'code-slash',
          onPress: () => {
            // Show licenses modal
          },
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: 'help-circle',
          onPress: () => router.push('/help'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Help us improve the app',
          icon: 'chatbubble-ellipses',
          onPress: () => Linking.openURL('mailto:feedback@example.com'),
        },
        {
          id: 'website',
          title: 'Visit Website',
          subtitle: 'Learn more about our services',
          icon: 'globe',
          onPress: () => Linking.openURL('https://example.com'),
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          id: 'twitter',
          title: 'Follow on Twitter',
          subtitle: 'Stay updated with latest news',
          icon: 'logo-twitter',
          onPress: () => Linking.openURL('https://twitter.com/example'),
        },
        {
          id: 'discord',
          title: 'Join Discord',
          subtitle: 'Connect with the community',
          icon: 'logo-discord',
          onPress: () => Linking.openURL('https://discord.gg/example'),
        },
        {
          id: 'github',
          title: 'GitHub',
          subtitle: 'View source code',
          icon: 'logo-github',
          onPress: () => Linking.openURL('https://github.com/example'),
        },
      ],
    },
  ];

  const teamMembers = [
    {
      name: 'Development Team',
      role: 'Core Development',
      description: 'Building the future of digital finance',
    },
    {
      name: 'Security Team',
      role: 'Security & Compliance',
      description: 'Ensuring your assets are protected',
    },
    {
      name: 'Support Team',
      role: 'Customer Support',
      description: 'Here to help you succeed',
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
          <View style={styles.placeholder} />
        </View>

        {/* App Info */}
        <View style={[styles.appInfoCard, { backgroundColor: colors.tint }]}>
          <View style={[styles.appIcon, { backgroundColor: colors.background }]}>
            <Ionicons name="wallet" size={40} color={colors.tint} />
          </View>
          <Text style={[styles.appName, { color: colors.background }]}>
            {appInfo.name}
          </Text>
          <Text style={[styles.appVersion, { color: colors.background }]}>
            Version {appInfo.version} ({appInfo.build})
          </Text>
          <Text style={[styles.appDescription, { color: colors.background }]}>
            {appInfo.description}
          </Text>
        </View>

        {/* About Sections */}
        {aboutSections.map((section) => (
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
                  <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Team */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Our Team
          </Text>
          <View style={styles.teamContainer}>
            {teamMembers.map((member, index) => (
              <View
                key={index}
                style={[styles.teamCard, { backgroundColor: colors.background }]}
              >
                <View style={[styles.teamIcon, { backgroundColor: colors.tint }]}>
                  <Ionicons name="people" size={24} color={colors.background} />
                </View>
                <Text style={[styles.teamName, { color: colors.text }]}>
                  {member.name}
                </Text>
                <Text style={[styles.teamRole, { color: colors.tint }]}>
                  {member.role}
                </Text>
                <Text style={[styles.teamDescription, { color: colors.icon }]}>
                  {member.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Features
          </Text>
          <View style={[styles.featuresContainer, { backgroundColor: colors.background }]}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Enterprise-grade security
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="flash" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Fast and reliable transactions
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="phone-portrait" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Cross-platform compatibility
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="key" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Passkey authentication
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="qr-code" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                QR code support
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="notifications" size={20} color={colors.tint} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Real-time notifications
              </Text>
            </View>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyrightText, { color: colors.icon }]}>
            © 2024 Digital Wallet. All rights reserved.
          </Text>
          <Text style={[styles.copyrightText, { color: colors.icon }]}>
            Made with ❤️ for the crypto community
          </Text>
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
  appInfoCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
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
  teamContainer: {
    paddingHorizontal: 20,
  },
  teamCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  teamRole: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  teamDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
  },
  copyrightSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  copyrightText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  bottomSpacing: {
    height: 20,
  },
}); 
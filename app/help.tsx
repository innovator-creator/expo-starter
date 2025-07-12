import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I create a wallet?',
      answer: 'To create a wallet, go to the Wallet screen and tap "Create Wallet". Follow the prompts to set up your secure wallet with a recovery phrase.',
    },
    {
      id: '2',
      question: 'How do I send cryptocurrency?',
      answer: 'Navigate to the Send screen, select the token you want to send, enter the recipient address, specify the amount, and confirm the transaction.',
    },
    {
      id: '3',
      question: 'How do I receive cryptocurrency?',
      answer: 'Go to the Receive screen to view your wallet address and QR code. Share this with the sender to receive payments.',
    },
    {
      id: '4',
      question: 'What if I lose my device?',
      answer: 'Use your recovery phrase to restore your wallet on a new device. Never share your recovery phrase with anyone.',
    },
    {
      id: '5',
      question: 'How secure is my wallet?',
      answer: 'Your wallet uses industry-standard encryption and security measures. We recommend enabling biometric authentication and keeping your recovery phrase secure.',
    },
    {
      id: '6',
      question: 'What cryptocurrencies are supported?',
      answer: 'Currently, we support Ethereum (ETH) and ERC-20 tokens. More cryptocurrencies will be added in future updates.',
    },
  ];

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      subtitle: 'Learn the basics of using your wallet',
      icon: 'play-circle',
      color: '#4CAF50',
    },
    {
      id: 'security',
      title: 'Security Guide',
      subtitle: 'Keep your wallet and funds safe',
      icon: 'shield-checkmark',
      color: '#FF9800',
    },
    {
      id: 'transactions',
      title: 'Transactions',
      subtitle: 'How to send and receive cryptocurrency',
      icon: 'swap-horizontal',
      color: '#2196F3',
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      subtitle: 'Common issues and solutions',
      icon: 'construct',
      color: '#9C27B0',
    },
  ];

  const supportOptions = [
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'Get help via email',
      icon: 'mail',
      action: () => {
        // Open email client
      },
    },
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: 'chatbubbles',
      action: () => {
        // Open chat
      },
    },
    {
      id: 'community',
      title: 'Community Forum',
      subtitle: 'Connect with other users',
      icon: 'people',
      action: () => {
        // Open community forum
      },
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Support</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search help articles..."
              placeholderTextColor={colors.icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={20} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Help Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {helpCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: colors.background }]}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon as any} size={24} color="white" />
                </View>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {category.title}
                </Text>
                <Text style={[styles.categorySubtitle, { color: colors.icon }]}>
                  {category.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Frequently Asked Questions
          </Text>
          <View style={[styles.faqContainer, { backgroundColor: colors.background }]}>
            {filteredFAQs.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => toggleFAQ(faq.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={[styles.faqQuestion, { color: colors.text }]}>
                    {faq.question}
                  </Text>
                  <Ionicons
                    name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.icon}
                  />
                </View>
                {expandedFAQ === faq.id && (
                  <Text style={[styles.faqAnswer, { color: colors.icon }]}>
                    {faq.answer}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Contact Support
          </Text>
          <View style={[styles.supportContainer, { backgroundColor: colors.background }]}>
            {supportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.supportItem}
                onPress={option.action}
              >
                <View style={styles.supportLeft}>
                  <View style={[styles.supportIcon, { backgroundColor: colors.tint }]}>
                    <Ionicons name={option.icon as any} size={20} color={colors.background} />
                  </View>
                  <View style={styles.supportText}>
                    <Text style={[styles.supportTitle, { color: colors.text }]}>
                      {option.title}
                    </Text>
                    <Text style={[styles.supportSubtitle, { color: colors.icon }]}>
                      {option.subtitle}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: colors.tint }]}
            >
              <Ionicons name="document-text" size={24} color={colors.background} />
              <Text style={[styles.quickActionText, { color: colors.background }]}>
                User Guide
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: colors.tint }]}
            >
              <Ionicons name="videocam" size={24} color={colors.background} />
              <Text style={[styles.quickActionText, { color: colors.background }]}>
                Video Tutorials
              </Text>
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  categorySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  faqContainer: {
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
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  supportContainer: {
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
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  quickActionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 20,
  },
}); 
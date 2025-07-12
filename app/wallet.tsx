import React, { useState } from 'react';
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
import { usePrivy, getUserEmbeddedEthereumWallet, useEmbeddedEthereumWallet } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function WalletScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = usePrivy();
  const account = getUserEmbeddedEthereumWallet(user);
  const { create } = useEmbeddedEthereumWallet();

  const [isCreating, setIsCreating] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', 'Address copied to clipboard');
  };

  const handleCreateWallet = async () => {
    setIsCreating(true);
    try {
      await create();
      Alert.alert('Success!', 'Wallet created successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to create wallet');
    } finally {
      setIsCreating(false);
    }
  };

  const tokens = [
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '0.125',
      value: '$225.50',
      change: '+2.5%',
      changeType: 'positive',
      icon: '🔵',
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '150.00',
      value: '$150.00',
      change: '+0.1%',
      changeType: 'positive',
      icon: '🔵',
    },
  ];

  const walletActions = [
    {
      id: 'send',
      title: 'Send',
      subtitle: 'Transfer tokens',
      icon: 'arrow-up',
      color: '#4CAF50',
      onPress: () => router.push('/send'),
    },
    {
      id: 'receive',
      title: 'Receive',
      subtitle: 'Get tokens',
      icon: 'arrow-down',
      color: '#2196F3',
      onPress: () => router.push('/receive'),
    },
    {
      id: 'swap',
      title: 'Swap',
      subtitle: 'Exchange tokens',
      icon: 'swap-horizontal',
      color: '#FF9800',
      onPress: () => Alert.alert('Coming Soon', 'Token swap feature will be available soon'),
    },
    {
      id: 'stake',
      title: 'Stake',
      subtitle: 'Earn rewards',
      icon: 'trending-up',
      color: '#9C27B0',
      onPress: () => Alert.alert('Coming Soon', 'Staking feature will be available soon'),
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Wallet</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Wallet Status */}
        {!account?.address ? (
          <View style={[styles.noWalletCard, { backgroundColor: colors.tint }]}>
            <Ionicons name="wallet-outline" size={48} color={colors.background} />
            <Text style={[styles.noWalletTitle, { color: colors.background }]}>
              No Wallet Created
            </Text>
            <Text style={[styles.noWalletSubtitle, { color: colors.background }]}>
              Create your first wallet to start managing your digital assets
            </Text>
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: colors.background }]}
              onPress={handleCreateWallet}
              disabled={isCreating}
            >
              <Text style={[styles.createButtonText, { color: colors.tint }]}>
                {isCreating ? 'Creating...' : 'Create Wallet'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Wallet Info */}
            <View style={[styles.walletCard, { backgroundColor: colors.tint }]}>
              <View style={styles.walletHeader}>
                <Text style={[styles.walletTitle, { color: colors.background }]}>
                  My Wallet
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(account.address)}
                >
                  <Ionicons name="copy-outline" size={20} color={colors.background} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.walletAddress, { color: colors.background }]}>
                {formatAddress(account.address)}
              </Text>
              <Text style={[styles.networkInfo, { color: colors.background }]}>
                Ethereum Mainnet
              </Text>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Quick Actions
              </Text>
              <View style={styles.actionsGrid}>
                {walletActions.map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    style={[styles.actionButton, { backgroundColor: colors.background }]}
                    onPress={action.onPress}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                      <Ionicons name={action.icon as any} size={24} color="white" />
                    </View>
                    <Text style={[styles.actionTitle, { color: colors.text }]}>
                      {action.title}
                    </Text>
                    <Text style={[styles.actionSubtitle, { color: colors.icon }]}>
                      {action.subtitle}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tokens */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Tokens
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.seeAll, { color: colors.tint }]}>Manage</Text>
                </TouchableOpacity>
              </View>
              
              {tokens.map((token) => (
                <TouchableOpacity
                  key={token.id}
                  style={[styles.tokenItem, { backgroundColor: colors.background }]}
                >
                  <View style={styles.tokenInfo}>
                    <Text style={styles.tokenIcon}>{token.icon}</Text>
                    <View style={styles.tokenDetails}>
                      <Text style={[styles.tokenName, { color: colors.text }]}>
                        {token.name}
                      </Text>
                      <Text style={[styles.tokenSymbol, { color: colors.icon }]}>
                        {token.symbol}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tokenBalance}>
                    <Text style={[styles.balanceAmount, { color: colors.text }]}>
                      {token.balance}
                    </Text>
                    <Text style={[styles.balanceValue, { color: colors.icon }]}>
                      {token.value}
                    </Text>
                    <Text style={[
                      styles.balanceChange,
                      { color: token.changeType === 'positive' ? '#4CAF50' : '#F44336' }
                    ]}>
                      {token.change}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Wallet Actions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Wallet Management
              </Text>
              <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: colors.tint }]}>
                      <Ionicons name="key-outline" size={20} color={colors.background} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={[styles.menuTitle, { color: colors.text }]}>
                        Export Private Key
                      </Text>
                      <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                        Backup your wallet
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <View style={[styles.menuIcon, { backgroundColor: colors.tint }]}>
                      <Ionicons name="qr-code-outline" size={20} color={colors.background} />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={[styles.menuTitle, { color: colors.text }]}>
                        Show QR Code
                      </Text>
                      <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                        Share your address
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </>
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
  settingsButton: {
    padding: 5,
  },
  noWalletCard: {
    margin: 20,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  noWalletTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noWalletSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  createButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  walletCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  copyButton: {
    padding: 5,
  },
  walletAddress: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  networkInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  seeAll: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actionButton: {
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
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
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
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  tokenDetails: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  tokenSymbol: {
    fontSize: 14,
  },
  tokenBalance: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  balanceValue: {
    fontSize: 14,
    marginBottom: 2,
  },
  balanceChange: {
    fontSize: 12,
    fontWeight: '600',
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
  bottomSpacing: {
    height: 20,
  },
}); 
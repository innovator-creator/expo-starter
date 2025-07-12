import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = usePrivy();
  const account = getUserEmbeddedEthereumWallet(user);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const quickActions = [
    {
      id: 'send',
      title: 'Send',
      icon: 'arrow-up',
      color: '#4CAF50',
      onPress: () => router.push('/send'),
    },
    {
      id: 'receive',
      title: 'Receive',
      icon: 'arrow-down',
      color: '#2196F3',
      onPress: () => router.push('/receive'),
    },
    {
      id: 'transactions',
      title: 'History',
      icon: 'time',
      color: '#FF9800',
      onPress: () => router.push('/transactions'),
    },
    {
      id: 'wallet',
      title: 'Wallet',
      icon: 'wallet',
      color: '#9C27B0',
      onPress: () => router.push('/wallet'),
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'received',
      amount: '0.05',
      currency: 'ETH',
      from: '0x1234...5678',
      timestamp: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'sent',
      amount: '0.02',
      currency: 'ETH',
      to: '0x8765...4321',
      timestamp: '1 day ago',
      status: 'completed',
    },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>Hello!</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>
              Welcome back to your wallet
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle" size={40} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: colors.tint }]}>
          <Text style={[styles.balanceLabel, { color: colors.background }]}>
            Total Balance
          </Text>
          <Text style={[styles.balanceAmount, { color: colors.background }]}>
            {account?.address ? '0.125 ETH' : '0.000 ETH'}
          </Text>
          <Text style={[styles.balanceValue, { color: colors.background }]}>
            ≈ $225.50 USD
          </Text>
          {account?.address && (
            <Text style={[styles.address, { color: colors.background }]}>
              {formatAddress(account.address)}
            </Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
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
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => router.push('/transactions')}>
              <Text style={[styles.seeAll, { color: colors.tint }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={[styles.transactionItem, { backgroundColor: colors.background }]}
            >
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={transaction.type === 'received' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={transaction.type === 'received' ? '#4CAF50' : '#F44336'}
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={[styles.transactionType, { color: colors.text }]}>
                  {transaction.type === 'received' ? 'Received' : 'Sent'}
                </Text>
                <Text style={[styles.transactionAddress, { color: colors.icon }]}>
                  {transaction.type === 'received' ? `From ${transaction.from}` : `To ${transaction.to}`}
                </Text>
                <Text style={[styles.transactionTime, { color: colors.icon }]}>
                  {transaction.timestamp}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[styles.amount, { color: colors.text }]}>
                  {transaction.type === 'received' ? '+' : '-'}{transaction.amount} {transaction.currency}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  greeting: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  profileButton: {
    padding: 5,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  address: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
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
  },
  seeAll: {
    fontSize: 16,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionAddress: {
    fontSize: 14,
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  },
}); 
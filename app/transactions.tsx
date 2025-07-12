import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'sent', label: 'Sent' },
    { id: 'received', label: 'Received' },
    { id: 'pending', label: 'Pending' },
  ];

  const transactions = [
    {
      id: '1',
      type: 'received',
      amount: '0.05',
      currency: 'ETH',
      from: '0x1234...5678',
      to: '0x8765...4321',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      hash: '0xabc123...def456',
      fee: '0.001',
      blockNumber: 12345678,
    },
    {
      id: '2',
      type: 'sent',
      amount: '0.02',
      currency: 'ETH',
      from: '0x8765...4321',
      to: '0x9876...5432',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'completed',
      hash: '0xdef456...ghi789',
      fee: '0.001',
      blockNumber: 12345675,
    },
    {
      id: '3',
      type: 'sent',
      amount: '50.00',
      currency: 'USDC',
      from: '0x8765...4321',
      to: '0x5432...1098',
      timestamp: '2024-01-13T09:20:00Z',
      status: 'pending',
      hash: '0xghi789...jkl012',
      fee: '0.001',
      blockNumber: null,
    },
    {
      id: '4',
      type: 'received',
      amount: '0.1',
      currency: 'ETH',
      from: '0x6543...2109',
      to: '0x8765...4321',
      timestamp: '2024-01-12T14:15:00Z',
      status: 'completed',
      hash: '0xjkl012...mno345',
      fee: '0.001',
      blockNumber: 12345670,
    },
  ];

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'failed':
        return '#F44336';
      default:
        return colors.icon;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'failed':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const renderTransaction = ({ item }: { item: typeof transactions[0] }) => (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: colors.background }]}
      onPress={() => {
        // Navigate to transaction details
        Alert.alert('Transaction Details', `Hash: ${item.hash}`);
      }}
    >
      <View style={styles.transactionHeader}>
        <View style={styles.transactionType}>
          <Ionicons
            name={item.type === 'received' ? 'arrow-down' : 'arrow-up'}
            size={20}
            color={item.type === 'received' ? '#4CAF50' : '#F44336'}
          />
          <Text style={[styles.transactionTypeText, { color: colors.text }]}>
            {item.type === 'received' ? 'Received' : 'Sent'}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[styles.amount, { color: colors.text }]}>
            {item.type === 'received' ? '+' : '-'}{item.amount} {item.currency}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Ionicons name={getStatusIcon(item.status) as any} size={12} color="white" />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.addressRow}>
          <Text style={[styles.addressLabel, { color: colors.icon }]}>
            {item.type === 'received' ? 'From:' : 'To:'}
          </Text>
          <Text style={[styles.address, { color: colors.text }]}>
            {item.type === 'received' ? formatAddress(item.from) : formatAddress(item.to)}
          </Text>
        </View>
        
        <View style={styles.transactionInfo}>
          <Text style={[styles.timestamp, { color: colors.icon }]}>
            {formatDate(item.timestamp)}
          </Text>
          <Text style={[styles.fee, { color: colors.icon }]}>
            Fee: {item.fee} ETH
          </Text>
        </View>

        {item.blockNumber && (
          <Text style={[styles.blockNumber, { color: colors.icon }]}>
            Block: {item.blockNumber}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transactions</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            // Show filter options
          }}
        >
          <Ionicons name="filter" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions..."
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

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              {
                backgroundColor: selectedFilter === filter.id ? colors.tint : colors.background,
              },
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedFilter === filter.id ? colors.background : colors.text,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No transactions found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.icon }]}>
              {searchQuery || selectedFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Your transaction history will appear here'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  filterButton: {
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionsList: {
    flex: 1,
  },
  transactionsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transactionItem: {
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
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionTypeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  transactionDetails: {
    gap: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  address: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: 12,
  },
  fee: {
    fontSize: 12,
  },
  blockNumber: {
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function SendScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = usePrivy();
  const account = getUserEmbeddedEthereumWallet(user);

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [isLoading, setIsLoading] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '0.125', value: '$225.50' },
    { symbol: 'USDC', name: 'USD Coin', balance: '150.00', value: '$150.00' },
  ];

  const selectedTokenData = tokens.find(token => token.symbol === selectedToken);

  const validateAddress = (address: string) => {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const validateAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    const balance = parseFloat(selectedTokenData?.balance || '0');
    return numAmount > 0 && numAmount <= balance;
  };

  const handlePasteAddress = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      if (validateAddress(clipboardContent)) {
        setRecipientAddress(clipboardContent);
      } else {
        Alert.alert('Invalid Address', 'The clipboard content is not a valid Ethereum address');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read clipboard');
    }
  };

  const handleScanQR = () => {
    Alert.alert('QR Scanner', 'QR code scanning feature will be available soon');
  };

  const handleSend = async () => {
    if (!account?.address) {
      Alert.alert('No Wallet', 'Please create a wallet first');
      return;
    }

    if (!validateAddress(recipientAddress)) {
      Alert.alert('Invalid Address', 'Please enter a valid Ethereum address');
      return;
    }

    if (!validateAmount(amount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount within your balance');
      return;
    }

    setIsLoading(true);

    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Transaction Successful',
        `Successfully sent ${amount} ${selectedToken} to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  const canSend = validateAddress(recipientAddress) && validateAmount(amount) && !isLoading;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Send</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Token Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Select Token
            </Text>
            <View style={styles.tokenSelector}>
              {tokens.map((token) => (
                <TouchableOpacity
                  key={token.symbol}
                  style={[
                    styles.tokenOption,
                    {
                      backgroundColor: selectedToken === token.symbol ? colors.tint : colors.background,
                      borderColor: selectedToken === token.symbol ? colors.tint : '#E0E0E0',
                    },
                  ]}
                  onPress={() => setSelectedToken(token.symbol)}
                >
                  <Text
                    style={[
                      styles.tokenSymbol,
                      {
                        color: selectedToken === token.symbol ? colors.background : colors.text,
                      },
                    ]}
                  >
                    {token.symbol}
                  </Text>
                  <Text
                    style={[
                      styles.tokenBalance,
                      {
                        color: selectedToken === token.symbol ? colors.background : colors.icon,
                      },
                    ]}
                  >
                    {token.balance}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recipient Address */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recipient Address
            </Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.addressInput, { color: colors.text }]}
                placeholder="Enter Ethereum address"
                placeholderTextColor={colors.icon}
                value={recipientAddress}
                onChangeText={setRecipientAddress}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.addressActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handlePasteAddress}
                >
                  <Ionicons name="clipboard-outline" size={20} color={colors.tint} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleScanQR}
                >
                  <Ionicons name="qr-code-outline" size={20} color={colors.tint} />
                </TouchableOpacity>
              </View>
            </View>
            {recipientAddress.length > 0 && !validateAddress(recipientAddress) && (
              <Text style={styles.errorText}>Invalid Ethereum address</Text>
            )}
          </View>

          {/* Amount */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Amount
            </Text>
            <View style={[styles.amountContainer, { backgroundColor: colors.background }]}>
              <TextInput
                style={[styles.amountInput, { color: colors.text }]}
                placeholder="0.00"
                placeholderTextColor={colors.icon}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.tokenLabel, { color: colors.text }]}>
                {selectedToken}
              </Text>
            </View>
            <View style={styles.balanceInfo}>
              <Text style={[styles.balanceText, { color: colors.icon }]}>
                Balance: {selectedTokenData?.balance} {selectedToken}
              </Text>
              <Text style={[styles.balanceValue, { color: colors.icon }]}>
                ≈ {selectedTokenData?.value}
              </Text>
            </View>
            {amount.length > 0 && !validateAmount(amount) && (
              <Text style={styles.errorText}>
                Amount must be greater than 0 and within your balance
              </Text>
            )}
          </View>

          {/* Transaction Fee */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Transaction Fee
            </Text>
            <View style={[styles.feeContainer, { backgroundColor: colors.background }]}>
              <View style={styles.feeInfo}>
                <Text style={[styles.feeLabel, { color: colors.text }]}>
                  Network Fee
                </Text>
                <Text style={[styles.feeAmount, { color: colors.text }]}>
                  0.001 ETH
                </Text>
              </View>
              <Text style={[styles.feeValue, { color: colors.icon }]}>
                ≈ $1.80
              </Text>
            </View>
          </View>

          {/* Send Button */}
          <View style={styles.sendButtonContainer}>
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: canSend ? colors.tint : '#E0E0E0',
                },
              ]}
              onPress={handleSend}
              disabled={!canSend}
            >
              {isLoading ? (
                <Text style={[styles.sendButtonText, { color: colors.background }]}>
                  Sending...
                </Text>
              ) : (
                <Text style={[styles.sendButtonText, { color: canSend ? colors.background : '#999' }]}>
                  Send {amount || '0'} {selectedToken}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Ionicons name="shield-checkmark" size={16} color={colors.icon} />
            <Text style={[styles.securityText, { color: colors.icon }]}>
              Double-check the recipient address before sending
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tokenSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  tokenOption: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tokenBalance: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'monospace',
  },
  addressActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
  },
  tokenLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  balanceText: {
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 14,
  },
  feeContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  feeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  feeValue: {
    fontSize: 14,
    textAlign: 'right',
  },
  sendButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sendButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  securityText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 8,
  },
}); 
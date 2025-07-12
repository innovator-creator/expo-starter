import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePrivy, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-styled';

const { width } = Dimensions.get('window');

export default function ReceiveScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = usePrivy();
  const account = getUserEmbeddedEthereumWallet(user);

  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async () => {
    if (!account?.address) return;
    
    try {
      await Clipboard.setStringAsync(account.address);
      setCopied(true);
      Alert.alert('Copied!', 'Address copied to clipboard');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy address');
    }
  };

  const shareAddress = () => {
    if (!account?.address) return;
    
    Alert.alert(
      'Share Address',
      'Share your wallet address with others to receive payments',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Share',
          onPress: () => {
            // In a real app, this would use the native share API
            Alert.alert('Share', `Share address: ${account.address}`);
          },
        },
      ]
    );
  };

  if (!account?.address) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Receive</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.noWalletContainer}>
          <Ionicons name="wallet-outline" size={64} color={colors.icon} />
          <Text style={[styles.noWalletTitle, { color: colors.text }]}>
            No Wallet Created
          </Text>
          <Text style={[styles.noWalletSubtitle, { color: colors.icon }]}>
            Create a wallet first to receive cryptocurrency
          </Text>
          <TouchableOpacity
            style={[styles.createWalletButton, { backgroundColor: colors.tint }]}
            onPress={() => router.push('/wallet')}
          >
            <Text style={[styles.createWalletText, { color: colors.background }]}>
              Create Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Receive</Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={shareAddress}
          >
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Wallet Address
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.icon }]}>
            Share this QR code or address to receive payments
          </Text>

          <View style={[styles.qrContainer, { backgroundColor: colors.background }]}>
            <QRCode
              value={account.address}
              size={width * 0.6}
              color={colors.text}
              backgroundColor={colors.background}
              style={styles.qrCode}
            />
          </View>

          {/* Address Display */}
          <View style={[styles.addressContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.addressLabel, { color: colors.icon }]}>
              Wallet Address
            </Text>
            <View style={styles.addressRow}>
              <Text style={[styles.address, { color: colors.text }]}>
                {formatAddress(account.address)}
              </Text>
              <TouchableOpacity
                style={[styles.copyButton, { backgroundColor: copied ? '#4CAF50' : colors.tint }]}
                onPress={copyToClipboard}
              >
                <Ionicons
                  name={copied ? 'checkmark' : 'copy-outline'}
                  size={20}
                  color={colors.background}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.fullAddressButton}
              onPress={() => {
                Alert.alert('Full Address', account.address);
              }}
            >
              <Text style={[styles.fullAddressText, { color: colors.tint }]}>
                View Full Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={[styles.instructionsTitle, { color: colors.text }]}>
            How to Receive
          </Text>
          
          <View style={styles.instructionItem}>
            <View style={[styles.instructionIcon, { backgroundColor: colors.tint }]}>
              <Text style={[styles.instructionNumber, { color: colors.background }]}>1</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                Share Your Address
              </Text>
              <Text style={[styles.instructionText, { color: colors.icon }]}>
                Share the QR code or address with the sender
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={[styles.instructionIcon, { backgroundColor: colors.tint }]}>
              <Text style={[styles.instructionNumber, { color: colors.background }]}>2</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                Wait for Payment
              </Text>
              <Text style={[styles.instructionText, { color: colors.icon }]}>
                The sender will initiate the transaction
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={[styles.instructionIcon, { backgroundColor: colors.tint }]}>
              <Text style={[styles.instructionNumber, { color: colors.background }]}>3</Text>
            </View>
            <View style={styles.instructionContent}>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                Confirm Receipt
              </Text>
              <Text style={[styles.instructionText, { color: colors.icon }]}>
                Check your transaction history for the incoming payment
              </Text>
            </View>
          </View>
        </View>

        {/* Security Tips */}
        <View style={styles.securitySection}>
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark" size={20} color={colors.tint} />
            <Text style={[styles.securityTitle, { color: colors.text }]}>
              Security Tips
            </Text>
          </View>
          
          <View style={styles.securityTips}>
            <Text style={[styles.securityTip, { color: colors.icon }]}>
              • Only share your address with trusted parties
            </Text>
            <Text style={[styles.securityTip, { color: colors.icon }]}>
              • Double-check the address before sharing
            </Text>
            <Text style={[styles.securityTip, { color: colors.icon }]}>
              • This address can receive any ERC-20 token
            </Text>
            <Text style={[styles.securityTip, { color: colors.icon }]}>
              • Never share your private key or recovery phrase
            </Text>
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
  shareButton: {
    padding: 5,
  },
  placeholder: {
    width: 34,
  },
  noWalletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noWalletTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  noWalletSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  createWalletButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  createWalletText: {
    fontSize: 18,
    fontWeight: '600',
  },
  qrSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrCode: {
    borderRadius: 8,
  },
  addressContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addressLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  address: {
    fontSize: 16,
    fontFamily: 'monospace',
    flex: 1,
  },
  copyButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  fullAddressButton: {
    alignItems: 'center',
  },
  fullAddressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  instructionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  securitySection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  securityTips: {
    gap: 8,
  },
  securityTip: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
}); 
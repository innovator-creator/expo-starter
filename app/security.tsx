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
import { Ionicons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('5 minutes');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securitySections = [
    {
      title: 'Authentication',
      items: [
        {
          id: 'passkeys',
          title: 'Passkeys',
          subtitle: 'Manage your passkey authentication',
          icon: 'key',
          onPress: () => Alert.alert('Passkeys', 'Passkey management coming soon'),
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
          id: 'two-factor',
          title: 'Two-Factor Authentication',
          subtitle: 'Add an extra layer of security',
          icon: 'shield-checkmark',
          type: 'switch',
          value: twoFactorEnabled,
          onValueChange: setTwoFactorEnabled,
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          id: 'auto-lock',
          title: 'Auto Lock',
          subtitle: 'Lock app when inactive',
          icon: 'lock-closed',
          type: 'switch',
          value: autoLockEnabled,
          onValueChange: setAutoLockEnabled,
        },
        {
          id: 'session-timeout',
          title: 'Session Timeout',
          subtitle: sessionTimeout,
          icon: 'time',
          onPress: () => {
            Alert.alert(
              'Session Timeout',
              'Choose session timeout duration',
              [
                { text: '1 minute', onPress: () => setSessionTimeout('1 minute') },
                { text: '5 minutes', onPress: () => setSessionTimeout('5 minutes') },
                { text: '15 minutes', onPress: () => setSessionTimeout('15 minutes') },
                { text: '30 minutes', onPress: () => setSessionTimeout('30 minutes') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          },
        },
        {
          id: 'privacy-settings',
          title: 'Privacy Settings',
          subtitle: 'Control data sharing and analytics',
          icon: 'eye-off',
          onPress: () => Alert.alert('Privacy Settings', 'Privacy controls coming soon'),
        },
      ],
    },
    {
      title: 'Wallet Security',
      items: [
        {
          id: 'export-private-key',
          title: 'Export Private Key',
          subtitle: 'Backup your wallet (keep secure)',
          icon: 'download',
          onPress: () => {
            Alert.alert(
              'Export Private Key',
              'Warning: Never share your private key with anyone. This action will reveal your private key.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Export', style: 'destructive', onPress: () => Alert.alert('Export', 'Private key export coming soon') },
              ]
            );
          },
        },
        {
          id: 'recovery-phrase',
          title: 'Recovery Phrase',
          subtitle: 'View your 12-word recovery phrase',
          icon: 'document-text',
          onPress: () => {
            Alert.alert(
              'Recovery Phrase',
              'Warning: Keep your recovery phrase secure and private.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'View', style: 'destructive', onPress: () => Alert.alert('Recovery Phrase', 'Recovery phrase view coming soon') },
              ]
            );
          },
        },
        {
          id: 'change-password',
          title: 'Change Password',
          subtitle: 'Update your account password',
          icon: 'lock-open',
          onPress: () => Alert.alert('Change Password', 'Password change coming soon'),
        },
      ],
    },
    {
      title: 'Security Log',
      items: [
        {
          id: 'login-history',
          title: 'Login History',
          subtitle: 'View recent login attempts',
          icon: 'list',
          onPress: () => Alert.alert('Login History', 'Login history coming soon'),
        },
        {
          id: 'device-management',
          title: 'Device Management',
          subtitle: 'Manage connected devices',
          icon: 'phone-portrait',
          onPress: () => Alert.alert('Device Management', 'Device management coming soon'),
        },
      ],
    },
  ];

  const securityTips = [
    'Never share your private key or recovery phrase',
    'Enable biometric authentication for quick access',
    'Use a strong, unique password',
    'Keep your recovery phrase in a secure location',
    'Be cautious of phishing attempts',
    'Regularly review your login history',
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Security</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Security Status */}
        <View style={[styles.securityStatus, { backgroundColor: colors.tint }]}>
          <Ionicons name="shield-checkmark" size={32} color={colors.background} />
          <Text style={[styles.securityStatusTitle, { color: colors.background }]}>
            Security Status: Good
          </Text>
          <Text style={[styles.securityStatusSubtitle, { color: colors.background }]}>
            Your wallet is protected with recommended security measures
          </Text>
        </View>

        {/* Security Sections */}
        {securitySections.map((section) => (
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

        {/* Security Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Security Tips
          </Text>
          <View style={[styles.tipsContainer, { backgroundColor: colors.background }]}>
            {securityTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.tint} />
                <Text style={[styles.tipText, { color: colors.text }]}>
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Emergency Actions
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            <TouchableOpacity
              style={styles.emergencyItem}
              onPress={() => {
                Alert.alert(
                  'Lock Wallet',
                  'This will immediately lock your wallet and require re-authentication.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Lock', style: 'destructive', onPress: () => Alert.alert('Locked', 'Wallet has been locked') },
                  ]
                );
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: '#FF9800' }]}>
                  <Ionicons name="lock-closed" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>
                    Lock Wallet
                  </Text>
                  <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                    Immediately lock your wallet
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
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
  securityStatus: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  securityStatusTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  securityStatusSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  tipsContainer: {
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
}); 
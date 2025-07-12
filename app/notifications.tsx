import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [pushNotifications, setPushNotifications] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

  const notificationHistory = [
    {
      id: '1',
      type: 'transaction',
      title: 'Transaction Completed',
      message: 'You received 0.05 ETH from 0x1234...5678',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'security',
      title: 'New Login Detected',
      message: 'New device logged into your account',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '3',
      type: 'transaction',
      title: 'Transaction Failed',
      message: 'Failed to send 0.02 ETH - insufficient funds',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: '4',
      type: 'price',
      title: 'Price Alert',
      message: 'ETH price has increased by 5%',
      timestamp: '3 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'swap-horizontal';
      case 'security':
        return 'shield-checkmark';
      case 'price':
        return 'trending-up';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return '#4CAF50';
      case 'security':
        return '#FF9800';
      case 'price':
        return '#2196F3';
      default:
        return colors.tint;
    }
  };

  const renderNotification = ({ item }: { item: typeof notificationHistory[0] }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: colors.background,
          opacity: item.read ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIcon}>
          <Ionicons
            name={getNotificationIcon(item.type) as any}
            size={20}
            color={getNotificationColor(item.type)}
          />
        </View>
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.notificationMessage, { color: colors.icon }]}>
            {item.message}
          </Text>
          <Text style={[styles.notificationTime, { color: colors.icon }]}>
            {item.timestamp}
          </Text>
        </View>
        {!item.read && (
          <View style={[styles.unreadDot, { backgroundColor: colors.tint }]} />
        )}
      </View>
    </TouchableOpacity>
  );

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              // Clear all notifications
            }}
          >
            <Text style={[styles.clearText, { color: colors.tint }]}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notification Settings
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.tint }]}>
                  <Ionicons name="notifications" size={20} color={colors.background} />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    Push Notifications
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                    Enable all notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#E0E0E0', true: colors.tint }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="swap-horizontal" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    Transaction Alerts
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                    Notify on incoming/outgoing transactions
                  </Text>
                </View>
              </View>
              <Switch
                value={transactionAlerts}
                onValueChange={setTransactionAlerts}
                trackColor={{ false: '#E0E0E0', true: colors.tint }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: '#2196F3' }]}>
                  <Ionicons name="trending-up" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    Price Alerts
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                    Get notified of significant price changes
                  </Text>
                </View>
              </View>
              <Switch
                value={priceAlerts}
                onValueChange={setPriceAlerts}
                trackColor={{ false: '#E0E0E0', true: colors.tint }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: '#FF9800' }]}>
                  <Ionicons name="shield-checkmark" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    Security Alerts
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                    Important security notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={securityAlerts}
                onValueChange={setSecurityAlerts}
                trackColor={{ false: '#E0E0E0', true: colors.tint }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: '#9C27B0' }]}>
                  <Ionicons name="megaphone" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    Marketing Notifications
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: colors.icon }]}>
                    Updates about new features and promotions
                  </Text>
                </View>
              </View>
              <Switch
                value={marketingNotifications}
                onValueChange={setMarketingNotifications}
                trackColor={{ false: '#E0E0E0', true: colors.tint }}
                thumbColor={colors.background}
              />
            </View>
          </View>
        </View>

        {/* Notification History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Notifications
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.tint }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={notificationHistory}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.notificationsList}
            contentContainerStyle={styles.notificationsContent}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="notifications-off" size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No notifications
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.icon }]}>
                  You're all caught up!
                </Text>
              </View>
            }
          />
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferences
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.tint }]}>
                  <Ionicons name="time" size={20} color={colors.background} />
                </View>
                <View style={styles.menuText}>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>
                    Quiet Hours
                  </Text>
                  <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                    Don't disturb me between 10 PM - 8 AM
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.tint }]}>
                  <Ionicons name="volume-high" size={20} color={colors.background} />
                </View>
                <View style={styles.menuText}>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>
                    Sound & Vibration
                  </Text>
                  <Text style={[styles.menuSubtitle, { color: colors.icon }]}>
                    Customize notification sounds
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
  clearButton: {
    padding: 5,
  },
  clearText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '500',
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  notificationsList: {
    marginHorizontal: 20,
  },
  notificationsContent: {
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
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import VrumoCard from '../../components/VrumoCard';
import { getUser, clearAuth } from '../../utils/storage';
import { getUserBookings } from '../../services/api';
import { User } from '../../types/user';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUser();
      if (data) {
        setUser(data);
        try {
          const res = await getUserBookings(data.id);
          setBookings(res.data);
        } catch (e) {
          console.error("Failed to fetch bookings:", e);
        }
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout', 
        onPress: async () => {
          await clearAuth();
          navigation.replace('LoginPhone');
        }, 
        style: 'destructive' 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Profile Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarRing} />
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'R'}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{user?.name || 'Rahul Agarwal'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'rahul@example.com'}</Text>
          <View style={styles.badge}>
            <Ionicons name="star" size={10} color={Colors.primary} />
            <Text style={styles.badgeText}>PLATINUM MEMBER</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12.4k</Text>
            <Text style={styles.statLabel}>KM DRIVEN</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>WASHES</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>Gold</Text>
            <Text style={styles.statLabel}>HEALTH</Text>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.secLabel}>Account & Settings</Text>
        <MenuItem 
          icon="person-outline" 
          name="Edit Profile" 
          sub="Update your name, email & location" 
          color={Colors.primary} 
          onPress={() => navigation.navigate('ProfileSetup' as any)}
        />
        <MenuItem 
          icon="car-outline" 
          name="My Vehicles" 
          sub="Manage 2 active vehicles" 
          color={Colors.secondary} 
        />
        <MenuItem 
          icon="wallet-outline" 
          name="Payment Methods" 
          sub="Visa ···· 4821" 
          color={Colors.info} 
        />
        <MenuItem 
          icon="settings-outline" 
          name="Settings" 
          sub="Notifications · Privacy" 
          color={Colors.textTertiary} 
        />
        <MenuItem 
          icon="help-circle-outline" 
          name="Help & Support" 
          sub="24/7 Concierge" 
          color={Colors.secondary} 
        />

        <MenuItem 
          icon="time-outline" 
          name="Booking History" 
          sub="View your recent service bookings" 
          color={Colors.warning}
          onPress={() => navigation.navigate('BookingHistory' as any)}
        />

        {/* Referral Card */}
        <View style={styles.refCard}>
          <View style={styles.refHeader}>
            <Text style={styles.refTitle}>Invite your friends</Text>
            <View style={styles.refBadge}>
              <Text style={styles.refBadgeText}>FREE WASH</Text>
            </View>
          </View>
          <Text style={styles.refSub}>Get 1 premium wash for every friend who joins.</Text>
          <View style={styles.refBarBg}>
            <View style={[styles.refBarFill, { width: '66%' }]} />
          </View>
          <View style={styles.refCounts}>
            <Text style={styles.refDone}>2 referrals done</Text>
            <Text style={styles.refGoal}>Goal: 3</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, name, sub, color, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
    <View style={[styles.menuItemIcon, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={styles.menuItemInfo}>
      <Text style={styles.menuItemName}>{name}</Text>
      <Text style={styles.menuItemSub}>{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginBottom: 20,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
    borderStyle: 'dashed',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: 'rgba(201, 168, 76, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginLeft: 4,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    ...Shadows.soft,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  statLabel: {
    fontSize: 8,
    color: Colors.textTertiary,
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 1,
  },
  secLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  menuItemSub: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  refCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
    marginBottom: 24,
    ...Shadows.medium,
  },
  refHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  refBadge: {
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  refBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  refTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  refSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  refBarBg: {
    height: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 3,
    marginTop: 20,
    overflow: 'hidden',
  },
  refBarFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  refCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  refDone: { fontSize: 11, fontWeight: '600', color: Colors.primaryDark },
  refGoal: { fontSize: 11, color: Colors.textTertiary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  logoutText: {
    color: Colors.error,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  bookingCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  bookingDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingStatusWrap: {
    backgroundColor: Colors.info + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bookingStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.info,
  },
  bookingId: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  noBookings: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    marginBottom: 12,
  },
});

export default ProfileScreen;

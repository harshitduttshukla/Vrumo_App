import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows } from '../../constants/Colors';
import { getUser } from '../../utils/storage';
import { getUserBookings } from '../../services/api';

const BookingHistoryScreen = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = await getUser();
        if (user) {
          const res = await getUserBookings(user.id);
          setBookings(res.data);
        }
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : bookings.length > 0 ? (
          bookings.slice().reverse().map((b, i) => (
            <View key={i} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingService}>Wash Service</Text>
                <Text style={styles.bookingPrice}>₹{b.total_price}</Text>
              </View>
              <Text style={styles.bookingDate}>{String(b.booking_date)} at {b.time_slot}</Text>
              <View style={styles.bookingFooter}>
                <View style={styles.bookingStatusWrap}>
                  <Text style={styles.bookingStatus}>{b.status.toUpperCase()}</Text>
                </View>
                <Text style={styles.bookingId}>ID: {b.id.substring(0, 8).toUpperCase()}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noBookings}>
            <Text style={{ color: Colors.textTertiary }}>No bookings found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
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
    padding: 40,
  },
});

export default BookingHistoryScreen;

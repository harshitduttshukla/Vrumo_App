import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import colors from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export interface BookingType {
  id: string;
  serviceName: string;
  vehicleType: string;
  price: string;
  date: string;
  timeSlot: string;
  status: string;
}

interface BookingCardProps {
  booking: BookingType;
  onCancel?: () => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return '#3B82F6';
      case 'Completed': return '#10B981';
      case 'Cancelled': return '#EF4444';
      case 'Pending': default: return '#F59E0B';
    }
  };

  const statusColor = getStatusColor(booking.status);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.95}
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="car-sport" size={24} color={colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={1}>Ride • {booking.serviceName}</Text>
            <Text style={styles.subtitle}>{booking.vehicleType}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{booking.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={18} color={colors.textLight} />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={18} color={colors.textLight} />
            <Text style={styles.detailText}>{booking.timeSlot}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>₹{booking.price}</Text>
          {booking.status === 'Pending' && onCancel && (
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, padding: 20, borderRadius: 20, marginBottom: 20, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 15, elevation: 4 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconContainer: { width: 48, height: 48, backgroundColor: colors.secondary, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  headerText: { flex: 1 },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.textLight, marginTop: 4, fontWeight: '500' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  detailItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  detailText: { marginLeft: 8, fontSize: 15, color: colors.text, fontWeight: '500' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary },
  cancelBtn: { paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.error, borderRadius: 10 },
  cancelText: { color: colors.error, fontWeight: 'bold', fontSize: 14 }
});

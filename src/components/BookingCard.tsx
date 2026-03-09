import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Booking } from '../types/booking';

interface Props {
  booking: Booking;
}

const BookingCard: React.FC<Props> = ({ booking }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{booking.serviceId}</Text>
        <Text style={[styles.status, { color: getStatusColor(booking.status) }]}>{booking.status}</Text>
      </View>
      <Text style={styles.detail}>Vehicle: {booking.vehicleModel}</Text>
      <Text style={styles.detail}>Date: {booking.date}</Text>
      <Text style={styles.detail}>Time: {booking.time}</Text>
      <Text style={styles.price}>₹{booking.price}</Text>
    </View>
  );
};

const getStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'Confirmed': return '#10B981';
    case 'Pending': return '#F59E0B';
    case 'Completed': return '#3B82F6';
    case 'Cancelled': return '#EF4444';
    default: return '#6B7280';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginTop: 8,
  },
});

export default BookingCard;

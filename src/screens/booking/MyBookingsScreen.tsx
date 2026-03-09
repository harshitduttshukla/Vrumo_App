import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import BookingCard, { BookingType } from '../../components/BookingCard';
import colors from '../../utils/colors';

const dummyBookings: BookingType[] = [
  { id: '1', serviceName: 'Prime Sedan', vehicleType: 'Cyber City to IGI Airport', price: '450', date: '28 Oct 2023', timeSlot: '10:00 AM', status: 'Completed' },
  { id: '2', serviceName: 'Bike', vehicleType: 'Metro Sta. to Office', price: '49', date: '20 Oct 2023', timeSlot: '04:00 PM', status: 'Completed' },
  { id: '3', serviceName: 'Mini', vehicleType: 'Home to Mall', price: '190', date: '10 Oct 2023', timeSlot: '11:00 AM', status: 'Cancelled' },
];

export default function MyBookingsScreen() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rides</Text>
      </View>
      <View style={styles.filterContainer}>
        <FlatList 
          horizontal showsHorizontalScrollIndicator={false} data={filters} keyExtractor={item => item}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterChip, filter === item && styles.filterChipActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList 
        data={filter === 'All' ? dummyBookings : dummyBookings.filter(b => b.status === filter)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookingCard booking={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.secondary },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: 32, fontWeight: '900', color: colors.primary, letterSpacing: -0.5 },
  filterContainer: { marginBottom: 16 },
  filterChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: colors.white, marginRight: 12, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 14, fontWeight: '600', color: colors.textLight },
  filterTextActive: { color: colors.accent },
  list: { paddingHorizontal: 20, paddingBottom: 40 }
});

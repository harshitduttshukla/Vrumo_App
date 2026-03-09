import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import BookingCard from '../../components/BookingCard';
import Loader from '../../components/Loader';
import { Booking } from '../../types/booking';

const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: 'Exterior Wash',
    vehicleType: 'Car',
    vehicleModel: 'Tata Nexon',
    date: '2023-11-20',
    time: '10:00 AM - 12:00 PM',
    price: 199,
    status: 'Completed',
  },
  {
    id: '2',
    serviceId: 'Premium Detailing',
    vehicleType: 'Bike',
    vehicleModel: 'Royal Enfield',
    date: '2023-12-05',
    time: '02:00 PM - 04:00 PM',
    price: 499,
    status: 'Confirmed',
  },
];

const MyBookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Bookings</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <BookingCard booking={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No bookings found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 40,
    fontSize: 16,
  },
});

export default MyBookingsScreen;

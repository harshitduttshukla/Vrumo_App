import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import BookingCard from '../../components/BookingCard';
import colors from '../../utils/colors';

const dummyBookings = [
    { id: '1', serviceName: 'Exterior Wash', vehicleType: 'Hyundai Creta', price: '199', date: '25 Oct 2026', timeSlot: '10:00 AM', status: 'Pending' },
    { id: '2', serviceName: 'Bike Polishing', vehicleType: 'Royal Enfield', price: '249', date: '20 Oct 2026', timeSlot: '04:00 PM', status: 'Completed' },
    { id: '3', serviceName: 'Interior Cleaning', vehicleType: 'Tata Nexon', price: '399', date: '15 Oct 2026', timeSlot: '11:00 AM', status: 'Cancelled' },
];

export default function MyBookingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Bookings</Text>
            </View>
            <FlatList
                data={dummyBookings}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <BookingCard booking={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondary },
    header: { padding: 24, paddingBottom: 16 },
    title: { fontSize: 28, fontWeight: '800', color: colors.primary },
    list: { padding: 20, paddingTop: 0 }
});

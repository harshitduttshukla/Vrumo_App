import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function BookingCard({ booking, onCancel }) {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return colors.confirmed;
            case 'completed': return colors.completed;
            case 'cancelled': return colors.cancelled;
            default: return colors.pending;
        }
    };

    const statusColor = getStatusColor(booking.status);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{booking.serviceName}</Text>
                    <Text style={styles.subtitle}>{booking.vehicleType} • ₹{booking.price}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <Text style={{ color: statusColor, fontSize: 12, fontWeight: '700' }}>{booking.status}</Text>
                </View>
            </View>
            <View style={styles.details}>
                <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.row}>
                    <Ionicons name="time-outline" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{booking.timeSlot}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: colors.white, padding: 20, borderRadius: 18, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
    title: { fontSize: 18, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textLight, marginTop: 4, fontWeight: '500' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
    details: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 },
    row: { flexDirection: 'row', alignItems: 'center' },
    detailText: { marginLeft: 8, fontSize: 14, color: colors.textLight, fontWeight: '500' }
});

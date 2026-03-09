import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../utils/colors';

export default function BookingScreen({ route, navigation }) {
    const { service } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Booking Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.price}>₹{service.price}</Text>
                    </View>
                    <Text style={styles.summaryDesc}>{service.desc || 'Premium care'}</Text>
                </View>

                <Text style={styles.sectionTitle}>Details</Text>
                <View style={styles.form}>
                    <InputField icon="person-outline" placeholder="Full Name" />
                    <InputField icon="call-outline" placeholder="Phone Number" keyboardType="phone-pad" />
                    <InputField icon="location-outline" placeholder="Address (Doorstep Service)" />
                    <InputField icon="car-sport-outline" placeholder="Vehicle Model (e.g. Creta)" />

                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <View style={{ flex: 1 }}><InputField icon="calendar-outline" placeholder="Date" /></View>
                        <View style={{ flex: 1 }}><InputField icon="time-outline" placeholder="Time Slot" /></View>
                    </View>
                </View>

                <PrimaryButton
                    title="Confirm Booking"
                    onPress={() => { Alert.alert('Success', 'Your premium service is booked!', [{ text: 'Great', onPress: () => navigation.navigate('MainTabs') }]); }}
                    style={styles.btn}
                />
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondary },
    scroll: { padding: 20 },
    summaryCard: { backgroundColor: colors.primary, padding: 24, borderRadius: 20, marginBottom: 30, shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
    summaryLabel: { color: colors.textLight, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: '700' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    serviceName: { fontSize: 22, fontWeight: 'bold', color: colors.white },
    price: { fontSize: 22, color: colors.accent, fontWeight: '900' },
    summaryDesc: { color: colors.white, opacity: 0.8, marginTop: 8, fontSize: 14 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 20 },
    form: { marginBottom: 10 },
    btn: { marginTop: 16 }
});

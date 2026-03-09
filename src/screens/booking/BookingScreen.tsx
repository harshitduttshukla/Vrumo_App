import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { VehicleType } from '../../components/VehicleCard';

export default function BookingScreen({ route, navigation }: any) {
  const { vehicle } = route.params as { vehicle: VehicleType };
  const [loading, setLoading] = useState(false);

  const handleConfirmRide = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Booking Confirmed', `Your ₹{vehicle.name} is arriving in ₹{vehicle.eta}!`, [
        { text: 'View Ride', onPress: () => navigation.navigate('MainTabs', { screen: 'Bookings' }) }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Ride</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>

        {/* Map Route Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeLineContainer}>
            <View style={styles.dotGreen} />
            <View style={styles.line} />
            <View style={styles.dotRed} />
          </View>
          <View style={styles.routeDetails}>
            <View style={styles.locationBlock}>
              <Text style={styles.locationTitle}>Pickup</Text>
              <Text style={styles.locationValue}>Current Location</Text>
            </View>
            <View style={styles.locationBlock}>
              <Text style={styles.locationTitle}>Drop-off</Text>
              <Text style={styles.locationValue}>Cyber City, DLF Phase 2</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleImageBg}>
            <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} resizeMode="contain" />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleType}>{vehicle.type} • {vehicle.capacity} Seats</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹{vehicle.price}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentCard}>
          <Ionicons name="cash-outline" size={24} color={colors.success} />
          <Text style={styles.paymentText}>Cash on Trip</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </View>

      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title={`Confirm Booking • ₹₹{vehicle.price}`}
          onPress={handleConfirmRide}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.secondary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: colors.primary },
  content: { padding: 20, flex: 1 },
  routeCard: { backgroundColor: colors.white, padding: 20, borderRadius: 24, flexDirection: 'row', marginBottom: 20, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4 },
  routeLineContainer: { alignItems: 'center', marginRight: 16 },
  dotGreen: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success },
  line: { width: 2, height: 40, backgroundColor: colors.border, marginVertical: 4 },
  dotRed: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.error },
  routeDetails: { flex: 1, justifyContent: 'space-between' },
  locationBlock: {},
  locationTitle: { fontSize: 13, color: colors.textLight, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  locationValue: { fontSize: 16, color: colors.text, fontWeight: '800' },
  vehicleCard: { backgroundColor: colors.white, padding: 16, borderRadius: 24, flexDirection: 'row', alignItems: 'center', marginBottom: 20, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4 },
  vehicleImageBg: { width: 70, height: 70, backgroundColor: colors.secondary, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  vehicleImage: { width: '80%', height: '80%' },
  vehicleInfo: { flex: 1 },
  vehicleName: { fontSize: 20, fontWeight: '900', color: colors.text, marginBottom: 4 },
  vehicleType: { fontSize: 14, color: colors.textLight, fontWeight: '600' },
  priceInfo: { alignItems: 'flex-end' },
  price: { fontSize: 24, fontWeight: '900', color: colors.primary },
  paymentCard: { backgroundColor: colors.white, padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4 },
  paymentText: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text, marginLeft: 16 },
  footer: { padding: 24, backgroundColor: colors.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 15 },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/colors';
import VehicleCard, { VehicleType } from '../../components/VehicleCard';
import PrimaryButton from '../../components/PrimaryButton';

const VEHICLES: VehicleType[] = [
  { id: '1', name: 'Mini', type: 'Hatchback', price: 149, eta: '3 min', capacity: 4, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/car-4993630-4161756.png' },
  { id: '2', name: 'Auto', type: 'Rickshaw', price: 89, eta: '2 min', capacity: 3, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/auto-rickshaw-6844976-5616422.png' },
  { id: '3', name: 'Bike', type: 'Motorcycle', price: 49, eta: '1 min', capacity: 1, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/motorcycle-4993645-4161771.png' },
  { id: '4', name: 'Prime Sedan', type: 'Sedan', price: 219, eta: '5 min', capacity: 4, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/sedan-car-4993641-4161767.png' },
  { id: '5', name: 'Prime SUV', type: 'SUV', price: 349, eta: '8 min', capacity: 6, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/suv-car-4993646-4161772.png' },
];

export default function HomeScreen({ navigation }: any) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(VEHICLES[0]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
        style={styles.mapBackground}
      >
        <View style={styles.mapOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* Header Glassmorphism */}
          <View style={styles.headerGlass}>
            <View style={styles.avatar}>
              <Ionicons name="menu" size={24} color={colors.primary} />
            </View>
            <View style={styles.locationInputBox}>
              <View style={styles.locationRow}>
                <View style={styles.dotGreen} />
                <Text style={styles.locationText}>Current Location</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.locationRow}>
                <View style={styles.dotRed} />
                <Text style={styles.locationTextHint}>Where to?</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* Center Map Pin */}
        <View style={styles.centerPin}>
          <View style={styles.pinBubble}>
            <Text style={styles.pinText}>{selectedVehicle.eta}</Text>
          </View>
          <Ionicons name="location" size={40} color={colors.primary} />
        </View>

        {/* Bottom Sheet UI */}
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          <Text style={styles.sheetTitle}>Choose a ride</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vehicleList}
          >
            {VEHICLES.map(v => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                isSelected={selectedVehicle.id === v.id}
                onPress={() => setSelectedVehicle(v)}
              />
            ))}
          </ScrollView>

          <View style={styles.actionContainer}>
            <PrimaryButton
              title={`Book ₹{selectedVehicle.name}`}
              onPress={() => navigation.navigate('Booking', { vehicle: selectedVehicle })}
            />
          </View>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  mapBackground: { flex: 1, justifyContent: 'space-between' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.2)' },
  safeArea: { flex: 1 },
  headerGlass: {
    backgroundColor: colors.glass,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  locationInputBox: { flex: 1 },
  locationRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  dotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.success, marginRight: 12 },
  dotRed: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.error, marginRight: 12 },
  locationText: { fontSize: 16, fontWeight: '700', color: colors.text },
  locationTextHint: { fontSize: 16, fontWeight: '600', color: colors.textLight },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 22 },
  centerPin: { position: 'absolute', top: '40%', left: '50%', transform: [{ translateX: -20 }, { translateY: -40 }], alignItems: 'center' },
  pinBubble: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginBottom: 4 },
  pinText: { color: colors.white, fontWeight: 'bold', fontSize: 12 },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 20,
  },
  sheetHandle: { width: 40, height: 5, borderRadius: 3, backgroundColor: colors.border, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 22, fontWeight: '900', color: colors.primary, paddingHorizontal: 24, marginBottom: 16, letterSpacing: -0.5 },
  vehicleList: { paddingHorizontal: 24, paddingBottom: 16 },
  actionContainer: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 30 },
});

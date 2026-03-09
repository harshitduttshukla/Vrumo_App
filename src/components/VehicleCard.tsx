import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

export interface VehicleType {
  id: string;
  name: string;
  type: string;
  price: number;
  eta: string;
  capacity: number;
  image: string;
}

interface VehicleCardProps {
  vehicle: VehicleType;
  isSelected?: boolean;
  onPress: () => void;
}

export default function VehicleCard({ vehicle, isSelected, onPress }: VehicleCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardSelected]} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: vehicle.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.info}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{vehicle.name}</Text>
            <View style={styles.capacity}>
              <Ionicons name="person" size={12} color={colors.textLight} />
              <Text style={styles.capacityText}>{vehicle.capacity}</Text>
            </View>
          </View>
          <Text style={styles.eta}>{vehicle.eta} away</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{vehicle.price}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 20,
    marginRight: 16,
    width: 140,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardSelected: {
    borderColor: colors.accent,
    backgroundColor: '#FFFBEB',
  },
  imageContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  capacity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  capacityText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '700',
    marginLeft: 2,
  },
  eta: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  selectedBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
  }
});

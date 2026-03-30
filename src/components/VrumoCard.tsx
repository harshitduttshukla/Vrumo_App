import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { Colors, Shadows } from '../constants/Colors';

interface VrumoCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'gold' | 'flat' | 'surface';
}

const VrumoCard: React.FC<VrumoCardProps> = ({ children, style, variant = 'default' }) => {
  return (
    <View style={[
      styles.card,
      variant === 'gold' && styles.goldBorder,
      variant === 'flat' && styles.flat,
      variant === 'surface' && styles.surface,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    ...Shadows.soft,
  },
  goldBorder: {
    borderColor: 'rgba(201, 168, 76, 0.3)',
    borderWidth: 1.5,
  },
  flat: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  surface: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default VrumoCard;

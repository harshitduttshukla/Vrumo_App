import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Vrumo</Text>
      <Text style={styles.tagline}>Premium Doorstep Car & Bike Cleaning</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 56, fontWeight: '900', color: colors.accent, letterSpacing: 2, marginBottom: 16 },
  tagline: { fontSize: 16, color: colors.white, opacity: 0.8 }
});

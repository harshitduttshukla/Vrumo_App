import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/colors';

export default function ProfileScreen({ navigation }: any) {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  const renderOption = (icon: keyof typeof Ionicons.glyphMap, title: string, isDestructive = false, onPress?: () => void) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <View style={[styles.optionIcon, isDestructive && { backgroundColor: '#FEE2E2' }]}>
        <Ionicons name={icon} size={22} color={isDestructive ? colors.error : colors.primary} />
      </View>
      <Text style={[styles.optionText, isDestructive && { color: colors.error }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RS</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Rahul Sharma</Text>
            <Text style={styles.phone}>+91 9876543210</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account settings</Text>
          {renderOption('list-outline', 'My Bookings', false, () => navigation.navigate('Bookings'))}
          {renderOption('location-outline', 'Saved Addresses')}
          {renderOption('card-outline', 'Payment Methods')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & More</Text>
          {renderOption('help-circle-outline', 'Help Center')}
          {renderOption('document-text-outline', 'Terms & Conditions')}
          {renderOption('log-out-outline', 'Logout', true, handleLogout)}
        </View>
        
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.secondary },
  header: { padding: 24, paddingBottom: 8 },
  title: { fontSize: 32, fontWeight: '900', color: colors.primary, letterSpacing: -0.5 },
  profileCard: { backgroundColor: colors.white, marginHorizontal: 20, marginTop: 16, padding: 24, borderRadius: 24, flexDirection: 'row', alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 4 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: colors.accent },
  profileInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 4 },
  phone: { fontSize: 16, color: colors.textLight, fontWeight: '500' },
  editBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 32, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.textLight, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  optionCard: { backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, marginBottom: 12, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  optionIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  optionText: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.text },
});

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/colors';

export default function ProfileScreen({ navigation }) {
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') }
        ]);
    };

    const OptionCard = ({ icon, title, onPress, danger }) => (
        <TouchableOpacity style={styles.optionCard} onPress={onPress}>
            <View style={[styles.iconBox, danger && { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name={icon} size={22} color={danger ? colors.error : colors.primary} />
            </View>
            <Text style={[styles.optionTitle, danger && { color: colors.error }]}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={styles.profileHeader}>
                    <ImageBackground style={styles.avatar} imageStyle={{ borderRadius: 50 }} source={{ uri: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0F172A&color=FBBF24&size=100' }} />
                    <Text style={styles.name}>Rahul Sharma</Text>
                    <Text style={styles.phone}>+91 98765 43210</Text>
                </View>

                <Text style={styles.sectionTitle}>Account</Text>
                <OptionCard icon="person-outline" title="Edit Profile" />
                <OptionCard icon="list-outline" title="My Bookings" onPress={() => navigation.navigate('Bookings')} />

                <Text style={styles.sectionTitle}>Settings & Support</Text>
                <OptionCard icon="shield-checkmark-outline" title="Privacy Policy" />
                <OptionCard icon="help-circle-outline" title="Help & Support" />
                <OptionCard icon="log-out-outline" title="Logout" onPress={handleLogout} danger />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

import { ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondary },
    profileHeader: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
    avatar: { width: 100, height: 100, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    name: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 4 },
    phone: { fontSize: 16, color: colors.textLight, fontWeight: '500' },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textLight, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginTop: 10 },
    optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    optionTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text }
});

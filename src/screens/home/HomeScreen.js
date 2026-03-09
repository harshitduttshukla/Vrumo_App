import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import ServiceCard from '../../components/ServiceCard';
import colors from '../../utils/colors';

const CAR_SERVICES = [
    { id: '1', name: 'Exterior Wash', price: '199', desc: 'Detailed exterior foam wash and shine.', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80' },
    { id: '2', name: 'Interior Cleaning', price: '399', desc: 'Vacuuming, dashboard polish & upholstery.', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80' },
    { id: '3', name: 'Deep Cleaning', price: '999', desc: 'Complete SPA for your car inside out.', image: 'https://images.unsplash.com/photo-1550519363-d3c2eb1c8567?w=600&q=80' },
];

const BIKE_SERVICES = [
    { id: '4', name: 'Bike Wash', price: '99', desc: 'Foam wash, chain lube & polish.', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80' },
];

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Morning, Rahul 👋</Text>
                    <Text style={styles.subtitle}>Your premium vehicle care awaits.</Text>
                </View>

                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1600539755498-8e6ad7124e5a?w=800&q=80' }}
                    style={styles.hero}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroTitle}>Premium Car & Bike Cleaning</Text>
                        <Text style={styles.heroSub}>At Your Doorstep</Text>
                    </View>
                </ImageBackground>

                <Text style={styles.sectionTitle}>🚗 Car Cleaning</Text>
                <View style={styles.grid}>
                    {CAR_SERVICES.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onPress={() => navigation.navigate('ServiceDetails', { service })}
                            style={styles.gridItem}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>🏍 Bike Cleaning</Text>
                <View style={styles.grid}>
                    {BIKE_SERVICES.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onPress={() => navigation.navigate('ServiceDetails', { service })}
                            style={styles.gridItem}
                        />
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.secondary },
    scroll: { padding: 20 },
    header: { marginBottom: 20 },
    greeting: { fontSize: 26, fontWeight: 'bold', color: colors.primary },
    subtitle: { fontSize: 16, color: colors.textLight, marginTop: 4 },
    hero: { width: '100%', height: 180, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
    heroOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: 20, padding: 24, justifyContent: 'center' },
    heroTitle: { fontSize: 22, fontWeight: '800', color: colors.white, marginBottom: 8 },
    heroSub: { fontSize: 16, color: colors.accent, fontWeight: '600' },
    sectionTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 16, marginTop: 10 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    gridItem: { width: '48%' }
});

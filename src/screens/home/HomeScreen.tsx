import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import ServiceCard from '../../components/ServiceCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const services = [
  {
    id: 'car-1',
    name: 'Exterior Wash',
    description: 'High-pressure foam wash',
    price: 199,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'car' as const,
  },
  {
    id: 'car-2',
    name: 'Interior Cleaning',
    description: 'Vacuuming and dashboard polishing',
    price: 399,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'car' as const,
  },
  {
    id: 'car-3',
    name: 'Full Deep Cleaning',
    description: 'Complete interior and exterior detailing',
    price: 999,
    image: 'https://images.unsplash.com/photo-1620063251760-4966601ad8ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'car' as const,
  },
  {
    id: 'car-4',
    name: 'Ceramic Coating',
    description: 'Premium paint protection',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1550935579-22a4505fccb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'car' as const,
  },
  {
    id: 'bike-1',
    name: 'Bike Wash',
    description: 'Foam wash for bikes',
    price: 99,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'bike' as const,
  },
  {
    id: 'bike-2',
    name: 'Chain Cleaning',
    description: 'Thorough chain cleaning and lubing',
    price: 149,
    image: 'https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'bike' as const,
  },
  {
    id: 'bike-3',
    name: 'Bike Polishing',
    description: 'Wax polish to restore shine',
    price: 249,
    image: 'https://images.unsplash.com/photo-1621245086812-401476b7bd4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'bike' as const,
  },
  {
    id: 'bike-4',
    name: 'Premium Detailing',
    description: 'Full body detailed cleaning',
    price: 499,
    image: 'https://images.unsplash.com/photo-1609149724103-605a92bf6544?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'bike' as const,
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleBook = (service: any) => {
    navigation.navigate('ServiceDetails', { service });
  };

  const carServices = services.filter((s) => s.category === 'car');
  const bikeServices = services.filter((s) => s.category === 'bike');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Premium Car & Bike Cleaning</Text>
          <Text style={styles.bannerSubtitle}>At Your Doorstep</Text>
        </View>

        <Text style={styles.sectionTitle}>🚗 Car Cleaning</Text>
        <View style={styles.cardContainer}>
          {carServices.map((service) => (
            <ServiceCard key={service.id} service={service} onPress={() => handleBook(service)} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>🏍 Bike Cleaning</Text>
        <View style={styles.cardContainer}>
          {bikeServices.map((service) => (
            <ServiceCard key={service.id} service={service} onPress={() => handleBook(service)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 16,
  },
  banner: {
    backgroundColor: '#0F172A',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FBBF24',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 24,
  },
});

export default HomeScreen;

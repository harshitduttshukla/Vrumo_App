import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServiceCard from '../../components/ServiceCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

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
    image: require('../../assets/images/swift_wash.png'),
    category: 'car' as const,
  },
  {
    id: 'car-2',
    name: 'Interior Cleaning',
    description: 'Vacuuming and dashboard polishing',
    price: 399,
    image: require('../../assets/images/creta_interior.png'),
    category: 'car' as const,
  },
  {
    id: 'car-3',
    name: 'Full Deep Cleaning',
    description: 'Complete interior and exterior detailing',
    price: 999,
    image: require('../../assets/images/nexon_wash.png'),
    category: 'car' as const,
  },
  {
    id: 'car-4',
    name: 'Ceramic Coating',
    description: 'Premium paint protection',
    price: 2999,
    image: require('../../assets/images/thar_polish.png'),
    category: 'car' as const,
  },
  {
    id: 'bike-1',
    name: 'Bike Wash',
    description: 'Foam wash for bikes',
    price: 99,
    image: require('../../assets/images/enfield_wash.png'),
    category: 'bike' as const,
  },
  {
    id: 'bike-2',
    name: 'Chain Cleaning',
    description: 'Thorough chain cleaning and lubing',
    price: 149,
    image: require('../../assets/images/pulsar_chain.png'),
    category: 'bike' as const,
  },
  {
    id: 'bike-3',
    name: 'Bike Polishing',
    description: 'Wax polish to restore shine',
    price: 249,
    image: require('../../assets/images/apache_polish.png'),
    category: 'bike' as const,
  },
  {
    id: 'bike-4',
    name: 'Premium Detailing',
    description: 'Full body detailed cleaning',
    price: 499,
    image: require('../../assets/images/duke_detail.png'),
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}>
          <Ionicons name="location-outline" size={24} color="#10B981" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Home <Ionicons name="chevron-down" size={14} color="#0F172A" /></Text>
            <Text style={styles.locationSubText} numberOfLines={1}>50, Shaheed Lieutenant...</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIconContainer} onPress={() => navigation.navigate('Profile')}>
           <Ionicons name="person-circle-outline" size={36} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Premium Cleaning</Text>
          <Text style={styles.bannerSubtitle}>At Your Doorstep</Text>
        </View>

        <Text style={styles.sectionTitle}>Car Services</Text>
        <View style={styles.cardContainer}>
          {carServices.map((service) => (
            <ServiceCard key={service.id} service={service} onPress={() => handleBook(service)} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Bike Services</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  locationSubText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  profileIconContainer: {
    paddingLeft: 12,
  },
  container: {
    padding: 16,
    paddingBottom: 100, // accommodate tab bar hiding content
  },
  banner: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
    marginTop: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import LocationPicker from '../../components/LocationPicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getUser } from '../../utils/storage';
import { createBooking, getMe } from '../../services/api';

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { service } = route.params;

  const [user, setUser] = useState<any>(null);
  const [vehicleType, setVehicleType] = useState('Car');
  const [address, setAddress] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [date, setDate] = useState(service.date || '');
  const [time, setTime] = useState(service.slot || '');
  const [latitude, setLatitude] = useState<number | null>(service.latitude || null);
  const [longitude, setLongitude] = useState<number | null>(service.longitude || null);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = await getUser();
        if (!storedUser) {
          navigation.replace('LoginPhone');
          return;
        }
        
        // Optionally verify with backend
        const response = await getMe();
        setUser(response.data);
      } catch (err) {
        navigation.replace('LoginPhone');
      } finally {
        setFetchingUser(false);
      }
    };

    checkAuth();
  }, [navigation]);

  const handleConfirm = async () => {
    if (!address || !date || !time) {
      Alert.alert('Error', 'Please fill all details');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        serviceType: service.name,
        vehicleType: service.seats ? `${vehicleType} (${service.seats}-Seater)` : vehicleType,
        date,
        time,
        address,
        latitude,
        longitude,
        vehicleSeats: service.seats,
        totalPrice: service.price
      };
      
      await createBooking(bookingData);
      
      Alert.alert('Success', 'Booking Confirmed!', [
        { text: 'OK', onPress: () => navigation.popToTop() }
      ]);
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Booking failed. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userBanner}>
          <View style={styles.userIcon}>
            <Text style={styles.userInitial}>{user?.name?.[0] || 'U'}</Text>
          </View>
          <View>
            <Text style={styles.userName}>Booking for {user?.name}</Text>
            <Text style={styles.userPhone}>{user?.phone || user?.phone_number}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{service.name}</Text>
          </View>
          {service.seats && (
            <View style={styles.row}>
              <Text style={styles.label}>Configuration:</Text>
              <Text style={styles.value}>{service.seats}-Seater</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.price}>₹{service.price}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text style={styles.sectionTitle}>Vehicle Type</Text>
            <View style={styles.toggleContainer}>
              {['Car', 'Bike'].map((type) => (
                <TouchableOpacity 
                  key={type} 
                  onPress={() => setVehicleType(type)}
                  style={[
                    styles.toggleButton,
                    vehicleType === type && styles.toggleButtonActive
                  ]}
                >
                  <Text style={[
                    styles.toggleButtonText,
                    vehicleType === type && styles.toggleButtonTextActive
                  ]}>
                    {type.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {(date && time) ? (
            <View style={styles.slotConfirmed}>
              <View style={styles.slotInfo}>
                <Ionicons name="calendar" size={20} color={Colors.primary} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.slotLabel}>Service Scheduled</Text>
                  <Text style={styles.slotValue}>
                    {date === new Date().toISOString().split('T')[0] ? 'Today' : date} at {time}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.changeBtn} 
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.changeText}>Change Slot</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.formHeader}>
                <Text style={styles.sectionTitle}>Service Details</Text>
              </View>
              <InputField label="Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
              <InputField label="Time Slot" placeholder="e.g. 10:00 AM - 12:00 PM" value={time} onChangeText={setTime} />
            </>
          )}

          <View style={styles.formHeader}>
            <Text style={styles.sectionTitle}>Service Location</Text>
          </View>
          
          <LocationPicker 
            onLocationSelect={(loc) => {
              setLatitude(loc.latitude);
              setLongitude(loc.longitude);
            }} 
          />

          <InputField label="Address" placeholder="Enter complete address (Floor/Flat no.)" value={address} onChangeText={setAddress} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton title="Confirm Booking" onPress={handleConfirm} loading={loading} />
      </View>
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
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#334155',
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#94A3B8',
  },
  value: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    color: '#FBBF24',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
  },
  userBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  userPhone: {
    fontSize: 14,
    color: '#64748B',
  },
  slotConfirmed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 20,
  },
  slotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  slotLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0369A1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  slotValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0C4A6E',
    marginTop: 2,
  },
  changeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0369A1',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    paddingBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 100,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  toggleButtonTextActive: {
    color: '#2563EB',
  },
});

export default BookingScreen;

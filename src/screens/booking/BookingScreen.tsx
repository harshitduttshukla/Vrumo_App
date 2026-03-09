import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { service } = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!name || !phone || !address || !vehicleModel || !date || !time) {
      Alert.alert('Error', 'Please fill all details');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Booking Confirmed!', [
        { text: 'OK', onPress: () => navigation.popToTop() }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{service.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle:</Text>
            <Text style={styles.value}>{vehicleModel || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.price}>₹{service.price}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Your Details</Text>
          <InputField label="Name" placeholder="Enter full name" value={name} onChangeText={setName} />
          <InputField label="Phone Number" placeholder="Enter phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <InputField label="Address" placeholder="Enter complete address" value={address} onChangeText={setAddress} />
          <InputField label="Vehicle Model" placeholder="e.g. Tata Nexon or Royal Enfield" value={vehicleModel} onChangeText={setVehicleModel} />
          <InputField label="Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
          <InputField label="Time Slot" placeholder="e.g. 10:00 AM - 12:00 PM" value={time} onChangeText={setTime} />
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
});

export default BookingScreen;

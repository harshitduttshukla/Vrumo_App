import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import LocationPicker from '../../components/LocationPicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { updateProfile, getMe } from '../../services/api';
import { storeUser, getUser } from '../../utils/storage';

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;

interface Props {
  navigation: ProfileSetupScreenNavigationProp;
}

const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [vehicleSeats, setVehicleSeats] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, vehicleType?: string}>({});

  useEffect(() => {
    const loadData = async () => {
      const u = await getUser();
      if (u) {
        if (u.name) setName(u.name);
        if (u.email) setEmail(u.email);
        if (u.vehicle_type) setVehicleType(u.vehicle_type);
        if (u.vehicle_seats) setVehicleSeats(u.vehicle_seats);
      }
    };
    loadData();
  }, []);

  const validate = () => {
    const newErrors: {name?: string, email?: string, vehicleType?: string} = {};
    if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!vehicleType) newErrors.vehicleType = 'Please select a vehicle type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await updateProfile(
        name, 
        email, 
        latitude || undefined, 
        longitude || undefined,
        vehicleType || undefined,
        vehicleSeats || undefined
      );
      
      // Refresh user data in storage
      const meResponse = await getMe();
      await storeUser(meResponse.data);
      
      Alert.alert('Success', 'Profile setup complete!', [
        { 
          text: 'OK', 
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.replace('MainTabs');
            }
          }
        }
      ]);
    } catch (err: any) {
      console.log('Update Profile Error:', err.response?.data);
      const detail = err.response?.data?.detail;
      const msg = typeof detail === 'string' ? detail : 
                  (Array.isArray(detail) ? detail[0]?.msg : 'Failed to update profile. Please try again.');
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Update <Text style={styles.highlight}>Profile</Text></Text>
              <Text style={styles.subtitle}>Keep your contact and location details up to date</Text>
            </View>

            <View style={styles.form}>
              <InputField
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                error={errors.name}
              />

              <InputField
                label="Email Address"
                placeholder="john@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
              
              <View style={styles.selectionSection}>
                <Text style={styles.sectionLabel}>Select Your Vehicle</Text>
                <View style={styles.row}>
                  <TouchableOpacity 
                    style={[styles.chip, vehicleType === '2 Wheeler' && styles.chipActive]} 
                    onPress={() => {
                        setVehicleType('2 Wheeler');
                        setVehicleSeats(null);
                    }}
                  >
                    <Text style={[styles.chipText, vehicleType === '2 Wheeler' && styles.chipTextActive]}>2 Wheeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.chip, vehicleType === '4 Wheeler' && styles.chipActive]} 
                    onPress={() => setVehicleType('4 Wheeler')}
                  >
                    <Text style={[styles.chipText, vehicleType === '4 Wheeler' && styles.chipTextActive]}>4 Wheeler</Text>
                  </TouchableOpacity>
                </View>
                {errors.vehicleType && <Text style={styles.errorText}>{errors.vehicleType}</Text>}
              </View>

              {vehicleType === '4 Wheeler' && (
                <View style={[styles.selectionSection, { marginTop: 10 }]}>
                    <Text style={styles.sectionLabel}>Seating Capacity</Text>
                    <View style={styles.row}>
                    <TouchableOpacity 
                        style={[styles.chip, vehicleSeats === '5 Seater' && styles.chipActive]} 
                        onPress={() => setVehicleSeats('5 Seater')}
                    >
                        <Text style={[styles.chipText, vehicleSeats === '5 Seater' && styles.chipTextActive]}>5 Seater</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.chip, vehicleSeats === '7 Seater' && styles.chipActive]} 
                        onPress={() => setVehicleSeats('7 Seater')}
                    >
                        <Text style={[styles.chipText, vehicleSeats === '7 Seater' && styles.chipTextActive]}>7 Seater</Text>
                    </TouchableOpacity>
                    </View>
                </View>
              )}

              <View style={styles.locationSection}>
                <Text style={styles.locationLabel}>Set Your Home Location</Text>
                <LocationPicker 
                  onLocationSelect={(loc) => {
                    setLatitude(loc.latitude);
                    setLongitude(loc.longitude);
                  }} 
                />
              </View>

              <CustomButton 
                title="Save Changes" 
                onPress={handleComplete} 
                loading={loading} 
                style={styles.button}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  highlight: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 12,
    marginTop: 16,
  },
  locationSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 8,
  },
  selectionSection: {
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  chip: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  chipTextActive: {
    color: Colors.primaryDark,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});

export default ProfileSetupScreen;

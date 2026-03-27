import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { updateProfile, getMe } from '../../services/api';
import { storeUser } from '../../utils/storage';

type ProfileSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;

interface Props {
  navigation: ProfileSetupScreenNavigationProp;
}

const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});

  const validate = () => {
    const newErrors: {name?: string, email?: string} = {};
    if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await updateProfile(name, email);
      
      // Refresh user data in storage
      const meResponse = await getMe();
      await storeUser(meResponse.data);
      
      Alert.alert('Success', 'Profile setup complete!', [
        { text: 'OK', onPress: () => navigation.replace('MainTabs') }
      ]);
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to update profile. Please try again.';
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
              <Text style={styles.title}>Complete <Text style={styles.highlight}>Profile</Text></Text>
              <Text style={styles.subtitle}>Just a few more details to get you started</Text>
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

              <CustomButton 
                title="Finish Setup" 
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
});

export default ProfileSetupScreen;

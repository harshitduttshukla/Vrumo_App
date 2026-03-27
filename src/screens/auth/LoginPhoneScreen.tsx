import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { sendOtp } from '../../services/api';

type LoginPhoneScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginPhone'>;

interface Props {
  navigation: LoginPhoneScreenNavigationProp;
}

const LoginPhoneScreen: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await sendOtp(phone);
      if (response.data?.debug_otp) {
        Alert.alert('Debug OTP', `Your OTP is: ${response.data.debug_otp}`);
      }
      navigation.navigate('VerifyOTP', { phone });
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to send OTP. Please try again.';
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
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* Background Decorative Elements */}
          <View style={styles.bgCircleTop} />
          <View style={styles.bgCircleBottom} />

          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome <Text style={styles.highlight}>Back</Text></Text>
              <Text style={styles.subtitle}>Enter your phone number to continue.</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                  <View style={styles.prefixContainer}>
                    <Text style={styles.prefixText}>+91</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="00000 00000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text.replace(/\D/g, '').slice(0, 10));
                      if (error) setError('');
                    }}
                    maxLength={10}
                  />
                  <Feather name="phone" size={20} color="#2563EB" style={styles.inputIcon} />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              <TouchableOpacity 
                style={[styles.button, (loading || phone.length !== 10) && styles.buttonDisabled]} 
                onPress={handleSendOtp}
                disabled={loading || phone.length !== 10}
              >
                {loading ? (
                  <Feather name="loader" size={24} color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Send OTP</Text>
                    <Feather name="arrow-right" size={20} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
              By continuing, you agree to our <Text style={styles.footerLink}>Terms of Service</Text> and <Text style={styles.footerLink}>Privacy Policy</Text>.
            </Text>
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
  bgCircleTop: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(37, 99, 235, 0.03)',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  highlight: {
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    borderTopWidth: 4,
    borderTopColor: '#2563EB',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 4,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  prefixContainer: {
    height: '60%',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    paddingHorizontal: 12,
    letterSpacing: 1,
  },
  inputIcon: {
    marginRight: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    height: 60,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 32,
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  footerLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default LoginPhoneScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import OTPInput from '../../components/OTPInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { verifyOtp, sendOtp } from '../../services/api';
import { storeToken, storeUser } from '../../utils/storage';

type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyOTP'>;
type VerifyOTPScreenRouteProp = RouteProp<RootStackParamList, 'VerifyOTP'>;

interface Props {
  navigation: VerifyOTPScreenNavigationProp;
  route: VerifyOTPScreenRouteProp;
}

const VerifyOTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phone } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      const { access_token, user, is_new_user } = response.data;
      
      await storeToken(access_token);
      await storeUser(user);
      
      if (is_new_user) {
        navigation.replace('ProfileSetup');
      } else {
        navigation.replace('MainTabs');
      }
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Verification failed. Please check the code.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    try {
      await sendOtp(phone);
      setTimer(30);
      setCanResend(false);
      setCode(['', '', '', '', '', '']);
    } catch (err: any) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Confirm <Text style={styles.highlight}>OTP</Text></Text>
          <Text style={styles.subtitle}>Sent to <Text style={styles.phoneText}>+91 {phone}</Text></Text>
        </View>

        <View style={styles.form}>
          <OTPInput code={code} setCode={setCode} />

          <CustomButton 
            title="Verify & Login" 
            onPress={handleVerify} 
            loading={loading}
            disabled={code.some(d => d === '')}
            style={styles.button}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in <Text style={styles.timerBold}>{timer}s</Text></Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Edit Phone Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  phoneText: {
    color: '#0F172A',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 12,
    marginTop: 20,
  },
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerText: {
    color: '#64748B',
    fontSize: 14,
  },
  timerBold: {
    color: '#0F172A',
    fontWeight: 'bold',
  },
  resendLink: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  backButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  backText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default VerifyOTPScreen;

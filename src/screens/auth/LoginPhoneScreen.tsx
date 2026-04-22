import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { login, oauthLogin, googleLogin } from '../../services/api';
import { signInWithGoogle } from '../../services/googleAuth';
import { storeToken, storeUser } from '../../utils/storage';

type LoginPhoneScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginPhone'>;

interface Props {
  navigation: LoginPhoneScreenNavigationProp;
}

const PRIMARY = '#2563EB'; 
const PRIMARY_TEXT = '#1E40AF'; 
const GRAY_BG = '#F1F5F9';

const LoginPhoneScreen: React.FC<Props> = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'Please enter email/phone and password');
      return;
    }

    setLoading(true);
    try {
      const response = await login(emailOrPhone, password);
      const { access_token, user } = response.data;
      
      await storeToken(access_token);
      await storeUser(user);
      
      navigation.replace('MainTabs');
    } catch (err: any) {
      let msg = 'Failed to login. Please check credentials.';
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
           msg = err.response.data.detail.map((d: any) => `${d.loc[1] || 'Field'}: ${d.msg}`).join('\n');
        } else {
           msg = typeof err.response.data.detail === 'string' ? err.response.data.detail : JSON.stringify(err.response.data.detail);
        }
      }
      Alert.alert('Login failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { userInfo, idToken } = await signInWithGoogle();
      console.log('Google idToken:', idToken);

      // Call backend
      // Call backend
      let response;
      try {
        // In mock mode, we just want to get through
        response = await oauthLogin('test@vrumo.com', 'Test User', 'google', 'MOCK_TOKEN');
      } catch (err) {
        console.log('Mock login failed', err);
        throw err;
      }

      const { access_token, user } = response.data;
      await storeToken(access_token);
      await storeUser(user);
      
      navigation.replace('MainTabs');
    } catch (error: any) {
      if (error.message !== 'Sign-In cancelled') {
        Alert.alert('Google Sign-In Error', error.message || 'Something went wrong');
      }
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
          
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Vrumo</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="EMAIL / PHONE"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Feather name="loader" size={24} color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
                style={styles.googleIcon} 
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpText}>New User? Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FCF8FC' }, // slight pink hue from image
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 60 },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 20
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: PRIMARY_TEXT,
    letterSpacing: 2,
  },
  
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: GRAY_BG,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 60,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333333',
    fontWeight: '600',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: PRIMARY_TEXT,
    fontWeight: '700',
    fontSize: 14,
  },
  
  loginButton: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  
  orText: {
    textAlign: 'center',
    color: '#A0AAB5',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  
  signUpLink: {
    alignItems: 'center',
  },
  signUpText: {
    color: PRIMARY_TEXT,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginPhoneScreen;

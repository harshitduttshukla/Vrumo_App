import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { registerUser } from '../../services/api';
import { storeToken, storeUser } from '../../utils/storage';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const PRIMARY = '#2563EB'; 
const PRIMARY_TEXT = '#1E40AF';
const GRAY_BG = '#F1F5F9';

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !emailOrPhone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(name, emailOrPhone, password);
      const { access_token, user } = response.data;
      
      await storeToken(access_token);
      await storeUser(user);
      
      navigation.replace('MainTabs');
    } catch (err: any) {
      let msg = 'Failed to register. Please try again.';
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          msg = err.response.data.detail.map((d: any) => `${d.loc[1] || 'Field'}: ${d.msg}`).join('\n');
        } else {
          msg = typeof err.response.data.detail === 'string' ? err.response.data.detail : JSON.stringify(err.response.data.detail);
        }
      }
      Alert.alert('Registration failed', msg);
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
            <Text style={styles.logoText}>Sign Up Vrumo</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="FULL NAME"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <Feather name="loader" size={24} color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>REGISTER</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.goBack()}>
              <Text style={styles.signUpText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FCF8FC' },
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
    fontSize: 28,
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
  
  loginButton: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
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
  
  signUpLink: {
    alignItems: 'center',
  },
  signUpText: {
    color: PRIMARY_TEXT,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;

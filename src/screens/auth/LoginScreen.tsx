import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../utils/colors';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to Vrumo for premium services.</Text>
        </View>

        <View style={styles.form}>
          <InputField 
            label="Email / Mobile Number"
            placeholder="Enter your email or mobile"
            value={email}
            onChangeText={setEmail}
          />
          <InputField 
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton title="Login" onPress={() => navigation.replace('MainTabs')} style={styles.btn} />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textLight },
  form: { marginBottom: 32 },
  forgot: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { color: colors.primary, fontWeight: '600' },
  btn: { marginBottom: 24 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 16, color: colors.textLight, fontWeight: 'bold' },
  googleBtn: { borderWidth: 1, borderColor: colors.border, paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  googleBtnText: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: colors.textLight },
  footerLink: { color: colors.primary, fontWeight: 'bold' }
});

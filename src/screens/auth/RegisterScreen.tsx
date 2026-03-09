import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../utils/colors';

export default function RegisterScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Vrumo for premium vehicle cleaning.</Text>
        </View>

        <View style={styles.form}>
          <InputField label="Full Name" placeholder="e.g. Rahul Sharma" />
          <InputField label="Email" placeholder="your@email.com" />
          <InputField label="Mobile Number" placeholder="+91 xxxxxxxxxx" keyboardType="phone-pad" />
          <InputField label="Password" placeholder="Create a password" secureTextEntry />
          
          <PrimaryButton 
            title="Create Account" 
            onPress={() => {
              Alert.alert('Success', 'Account created successfully!');
              navigation.replace('MainTabs');
            }} 
            style={styles.btn} 
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Login</Text>
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
  btn: { marginTop: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: colors.textLight },
  footerLink: { color: colors.primary, fontWeight: 'bold' }
});

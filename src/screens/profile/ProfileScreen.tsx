import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { User } from '../../types/user';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const mockUser: User = {
  id: 'u-1',
  name: 'John Doe',
  email: 'john.doe@vrumo.in',
  phone: '+91 9876543210',
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.replace('Login'), style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.contact}>{mockUser.email}</Text>
          <Text style={styles.contact}>{mockUser.phone}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Info', 'Edit Profile coming soon!')}>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MyBookings')}>
            <Text style={styles.actionText}>My Bookings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <CustomButton title="Logout" onPress={handleLogout} style={styles.logoutButton} />
        </View>
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
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#0F172A',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#FBBF24',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  contact: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  actions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButton: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionText: {
    fontSize: 18,
    color: '#334155',
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
  },
});

export default ProfileScreen;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPhoneScreen from '../screens/auth/LoginPhoneScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import TabNavigator from './TabNavigator';
import ServiceDetailsScreen from '../screens/home/ServiceDetailsScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import BookingHistoryScreen from '../screens/profile/BookingHistoryScreen';

export type RootStackParamList = {
  Splash: undefined;
  LoginPhone: undefined;
  VerifyOTP: { email: string };
  Register: undefined;
  MainTabs: undefined;
  ServiceDetails: { service: any };
  Booking: { service: any };
  BookingHistory: undefined;
  MyBookings: undefined;
  Health: undefined;
  Services: undefined;
  Profile: undefined;
  ProfileSetup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id="root" initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LoginPhone" component={LoginPhoneScreen} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ headerShown: true, title: 'Service Details' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: true, title: 'Book Service' }} />
        <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} options={{ headerShown: true, title: 'Recent Bookings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

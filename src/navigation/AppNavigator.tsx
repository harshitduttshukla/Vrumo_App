import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPhoneScreen from '../screens/auth/LoginPhoneScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import TabNavigator from './TabNavigator';
import ServiceDetailsScreen from '../screens/home/ServiceDetailsScreen';
import BookingScreen from '../screens/booking/BookingScreen';

export type RootStackParamList = {
  LoginPhone: undefined;
  VerifyOTP: { phone: string };
  MainTabs: undefined;
  ServiceDetails: { service: any };
  Booking: { service: any };
  MyBookings: undefined;
  Profile: undefined;
  ProfileSetup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id="root" initialRouteName="LoginPhone" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPhone" component={LoginPhoneScreen} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ headerShown: true, title: 'Service Details' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: true, title: 'Book Service' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

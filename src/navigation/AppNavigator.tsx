import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TabNavigator from './TabNavigator';
import ServiceDetailsScreen from '../screens/home/ServiceDetailsScreen';
import BookingScreen from '../screens/booking/BookingScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ServiceDetails: { service: any };
  Booking: { service: any };
  MyBookings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} options={{ headerShown: true, title: 'Service Details' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: true, title: 'Book Service' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

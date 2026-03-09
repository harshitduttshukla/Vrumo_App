import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ServiceDetailsScreen from '../screens/home/ServiceDetailsScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import MyBookingsScreen from '../screens/booking/MyBookingsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.textLight,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    borderTopWidth: 0,
                    elevation: 10,
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 10
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
            />
            <Tab.Screen
                name="Bookings"
                component={MyBookingsScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="receipt" size={size} color={color} /> }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen
                    name="ServiceDetails"
                    component={ServiceDetailsScreen}
                    options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitleVisible: false, headerTintColor: colors.primary }}
                />
                <Stack.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{ headerShown: true, title: 'Confirm Booking', headerShadowVisible: false, headerBackTitleVisible: false, headerTintColor: colors.primary }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

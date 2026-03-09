import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import MyBookingsScreen from '../screens/booking/MyBookingsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'MyBookings') {
                        iconName = 'calendar';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FBBF24',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarStyle: {
                    backgroundColor: '#0F172A',
                    borderTopWidth: 0,
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: 'Bookings' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

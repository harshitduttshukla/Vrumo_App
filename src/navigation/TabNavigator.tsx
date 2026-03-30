import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import MyBookingsScreen from '../screens/booking/MyBookingsScreen';
import HealthScreen from '../screens/health/HealthScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            id="RootTabNav"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Health') {
                        iconName = 'pulse-outline';
                    } else if (route.name === 'Services') {
                        iconName = 'construct-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textTertiary,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderColor: '#F1F5F9',
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                    height: 60 + (insets.bottom > 0 ? insets.bottom - 5 : 0),
                    ...Platform.select({
                        ios: { shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: -4 }, shadowRadius: 10 },
                        android: { elevation: 4 },
                    }),
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Health" component={HealthScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

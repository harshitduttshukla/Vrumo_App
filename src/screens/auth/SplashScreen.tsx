import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken } from '../../utils/storage';
import { Colors } from '../../constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginPhone'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    
    animation.start();
    return () => animation.stop();
  }, [fadeAnim]);

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate/Add minor delay for branding feel
      const startTime = Date.now();
      const token = await getToken();
      const endTime = Date.now();
      const delay = Math.max(1500 - (endTime - startTime), 0);

      setTimeout(() => {
        if (token) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('LoginPhone');
        }
      }, delay);
    };

    checkAuth();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>V<Text style={styles.logoHighlight}>RUMO</Text></Text>
        </View>
        <ActivityIndicator size="small" color={Colors.primary} style={styles.loader} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primaryDark,
    letterSpacing: -2,
  },
  logoHighlight: {
    color: Colors.primary,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;

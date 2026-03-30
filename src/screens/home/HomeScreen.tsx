import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows } from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VrumoCard from '../../components/VrumoCard';
import AlertCard from '../../components/AlertCard';
import StatBox from '../../components/StatBox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getUser } from '../../utils/storage';
import * as Location from 'expo-location';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = React.useState<any>(null);
  const [address, setAddress] = React.useState('Detecting location...');

  React.useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      setUser(storedUser);
      
      // Get readable address
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          let reverse = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
          if (reverse.length > 0) {
            const addr = reverse[0];
            setAddress(`${addr.name || addr.street || ''}, ${addr.city || addr.district || ''}`);
          }
        }
      } catch (e) {
        setAddress('Lucknow, India'); // Fallback
      }
    };
    loadUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.locHeader}>
              <Ionicons name="location" size={14} color={Colors.primary} />
              <Text style={styles.locText}>{address}</Text>
            </View>
            <Text style={styles.logo}>Vrumo</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={20} color={Colors.text} />
            <View style={styles.pip} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingSmall}>Good morning,</Text>
          <Text style={styles.userName}>{user?.name || 'Vrumo User'}</Text>
        </View>

        {/* Car Card */}
        <VrumoCard style={styles.carCard}>
          <View style={styles.carCardHeader}>
            <View>
              <Text style={styles.carPlate}>UP 32 · AB 4821</Text>
              <Text style={styles.carModel}>Honda City ZX</Text>
              <Text style={styles.carLoc}>{address}</Text>
            </View>
            <MaterialCommunityIcons name="car-sports" size={48} color={Colors.primary} />
          </View>
          <View style={styles.carStats}>
            <StatBox value="18" label="Washes" />
            <StatBox value="78" label="Health" color={Colors.secondary} />
            <StatBox value="Apr 2" label="PUC Due" color={Colors.warning} />
          </View>
        </VrumoCard>

        {/* Next Service */}
        <VrumoCard variant="flat" style={styles.nextCard}>
          <View style={styles.nextIcon}>
            <Text style={{ fontSize: 20 }}>💧</Text>
          </View>
          <View style={styles.nextInfo}>
            <Text style={styles.nextTitle}>Eco Wash — Tomorrow</Text>
            <Text style={styles.nextSub}>4:30 AM · Slot B-14 · Raju K.</Text>
          </View>
          <View style={styles.tagScheduled}>
            <Text style={styles.tagText}>Scheduled</Text>
          </View>
        </VrumoCard>

        {/* AI Alert */}
        <AlertCard 
          title="AI · 2 Issues Detected" 
          message="Rear bumper dent · PUC expires Apr 2" 
          cta="View health report →"
          onPress={() => navigation.navigate('Health' as any)}
        />

        {/* Quick Services */}
        <Text style={styles.secLabel}>Quick services</Text>
        <View style={styles.svcGrid}>
          <QuickServiceBtn 
            icon="💧" 
            name="Professional Wash" 
            sub="Staring  at  ₹299" 
            onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Services', params: { initialService: 'wash' } } as any)} 
          />
          <QuickServiceBtn 
            icon="🔧" 
            name="Doorstep Mechanic" 
            sub="At your slot" 
            onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Services', params: { initialService: 'mech' } } as any)} 
          />
          <QuickServiceBtn 
            icon="✨" 
            name="Premium Detailing" 
            sub="Premium finish" 
            onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Services', params: { initialService: 'detail' } } as any)} 
          />
          <QuickServiceBtn 
            icon="📄" 
            name="PUC Renewal" 
            sub="Due Apr 2" 
            onPress={() => navigation.navigate('MainTabs' as any, { screen: 'Services', params: { initialService: 'puc' } } as any)} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const QuickServiceBtn = ({ icon, name, sub, onPress }: { icon: string, name: string, sub: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.svcBtn} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.svcBtnIcon}>{icon}</Text>
    <Text style={styles.svcBtnName}>{name}</Text>
    <Text style={styles.svcBtnSub}>{sub}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  locHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textTertiary,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  logoSub: {
    fontSize: 8,
    color: Colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pip: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 10,
    right: 10,
    borderWidth: 2,
    borderColor: Colors.backgroundSecondary,
  },
  greetingSection: {
    marginBottom: 20,
  },
  greetingSmall: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  carCard: {
    backgroundColor: '#141C30',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.2)', // Subtle Gold border
    ...Shadows.strong,
  },
  carCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  carPlate: {
    fontSize: 10,
    color: Colors.textTertiary,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  carModel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginTop: 4,
  },
  carLoc: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  carEmoji: {
    fontSize: 40,
  },
  carStats: {
    flexDirection: 'row',
    gap: 10,
  },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  nextIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.infoLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nextInfo: {
    flex: 1,
    marginRight: 10,
  },
  nextTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    flexShrink: 1,
  },
  nextSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tagScheduled: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  tagText: {
    fontSize: 9,
    color: Colors.secondary,
    fontWeight: '700',
  },
  secLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  svcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  svcBtn: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    ...Shadows.soft,
  },
  svcBtnIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  svcBtnName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  svcBtnSub: {
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});

export default HomeScreen;

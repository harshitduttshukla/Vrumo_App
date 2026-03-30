import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type ServiceId = 'home' | 'wash' | 'mech' | 'detail' | 'puc';
type WashSegment = 'instant' | 'monthly' | 'society' | 'deep';
type VehicleType = 'sedan';

interface Package {
  id: string;
  name: string;
  desc: string;
  price: number;
  unit?: string;
  tag?: string;
  include?: string[];
}

const WASH_SEGMENTS: { id: WashSegment; name: string; icon: string; color: string }[] = [
  { id: 'instant', name: 'Instant', icon: '⚡', color: Colors.warning },
  { id: 'monthly', name: 'Colony', icon: '🏠', color: Colors.info },
  { id: 'society', name: 'Society', icon: '🛡️', color: Colors.secondary },
  { id: 'deep', name: 'Deep Clean', icon: '✨', color: '#8B5CF6' },
];

const WASH_PACKAGES: Record<WashSegment, Package[]> = {
  instant: [
    { 
      id: 'swift', 
      name: 'Vrumo Swift Wash', 
      desc: 'Quick exterior refresh with Pressure Washer. 30-40 mins.', 
      price: 299,
      unit: '/session',
      include: ['PH-neutral shampoo foam', 'Pressure rinse (Microfiber dry)', 'Tyre & rim wipe (dressing)', 'Windshield clean']
    },
    { 
      id: 'signature', 
      name: 'Vrumo Signature Wash', 
      desc: 'Full exterior + interior refresh with Pressure Washer.', 
      price: 549,
      unit: '/session',
      tag: 'BESTSELLER',
      include: ['Everything in Swift Wash', 'Dashboard & console UV dressing', 'Full interior vacuum (incl. boot)', 'Odour neutraliser spray']
    },
  ],
  monthly: [
    { 
      id: 'colony_care', 
      name: 'Vrumo Colony Care', 
      desc: '4 professional washes/month. Always on schedule.', 
      price: 999,
      unit: '/mo',
      include: ['4 High-pressure foam pre-soaks', 'Pressure rinse + Microfiber dry', 'Tyre cleaning + shine dressing', 'Before/after photo proof']
    },
    { 
      id: 'colony_elite', 
      name: 'Vrumo Colony Elite', 
      desc: '4 foam washes + full interior every visit.', 
      price: 1499,
      unit: '/mo',
      tag: 'FEATURED',
      include: ['Everything in Colony Care', 'Full interior vacuum every visit', 'UV dressing on all panels', 'Paint wax seal (Quarterly)']
    },
  ],
  society: [
    { 
      id: 'society_shield', 
      name: 'Vrumo Society Shield', 
      desc: 'Alt-day bucket wash + weekly interior. RWA compliant.', 
      price: 2000,
      unit: '/mo',
      include: ['13-14 Alt-day bucket washes', 'PH-neutral lab-tested chemicals', 'Weekly full interior care', 'Dedicated slot: 6:30-8:00 AM']
    },
    { 
      id: 'society_prestige', 
      name: 'Vrumo Society Prestige', 
      desc: 'Alt-day bucket + interior 4x + quarterly detail.', 
      price: 2800,
      unit: '/mo',
      tag: 'ULTIMATE',
      include: ['13-14 Alt-day bucket washes', 'Premium nano-ceramic seal (Monthly)', 'Weekly deep interior clean', 'Quarterly mini-detail included']
    },
  ],
  deep: [
    { 
      id: 'cabin', 
      name: 'Cabin Detox', 
      desc: 'Full cabin deep clean. Like new inside.', 
      price: 1499, 
      unit: '/session',
      include: [
        'Full interior vacuum (incl. under seats & boot)',
        'Dashboard, console & AC vents deep clean',
        'Interior roof lining & door panels wipe',
        'Seat fabric cleaning (Dry shampoo)',
        'Odour eliminator & cabin freshener'
      ]
    },
    { 
      id: 'paint', 
      name: 'Paint Refresh', 
      desc: 'Multi-step exterior decontamination and seal.', 
      price: 1799, 
      unit: '/session',
      include: [
        'Snow foam pre-soak & Two-bucket wash',
        'Tar & iron decontamination spray',
        'Clay bar treatment (removes dirt)',
        'Liquid carnauba wax hand application',
        'Headlight & tail light polish'
      ]
    },
    { 
      id: 'grand', 
      name: 'Vrumo Grand Detox', 
      desc: 'Complete interior + exterior. Nothing skipped.', 
      price: 2499, 
      unit: '/session',
      tag: 'PREMIUM',
      include: [
        'Everything in Cabin + Paint Refresh',
        'Engine bay external wipe',
        'Windshield water-repellent (2 months)',
        'Nano ceramic spray sealant (30-day)',
        'Digital service certificate'
      ]
    },
  ],
};

const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [currentView, setCurrentView] = useState<ServiceId>('home');
  const [washSegment, setWashSegment] = useState<WashSegment>('instant');
  // const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const openService = (id: ServiceId) => {
    setCurrentView(id);
    setSelectedPkg(null);
    setSelectedSlot(null);
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.initialService) {
        openService(route.params.initialService);
        // Clear params to avoid re-triggering
        route.params.initialService = undefined;
      }
    }, [route.params?.initialService])
  );

  const closeService = () => setCurrentView('home');

  if (currentView === 'home') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Vrumo Services</Text>

          <MainServiceCard 
            icon="💧" 
            name="Professional Wash" 
            desc="Instant · Monthly · Society · Deep Clean" 
            price="From ₹299" 
            tag="popular" 
            onPress={() => openService('wash')} 
          />
          <MainServiceCard 
            icon="🔧" 
            name="Doorstep Mechanic" 
            desc="OBD scan · Repairs · At your slot" 
            price="From ₹299" 
            tag="warn" 
            onPress={() => openService('mech')} 
          />
          <MainServiceCard 
            icon="✨" 
            name="Premium Detailing" 
            desc="Interior · Exterior · Ceramic coat" 
            price="From ₹499" 
            tag="gold" 
            onPress={() => openService('detail')} 
          />
          <MainServiceCard 
            icon="📄" 
            name="PUC Renewal" 
            desc="Doorstep test · DigiLocker upload" 
            price="Due Apr 2" 
            tag="error" 
            onPress={() => openService('puc')} 
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={closeService}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentView === 'wash' ? 'Professional Wash' : currentView.toUpperCase()}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {currentView === 'wash' && (
          <>
            <View style={styles.segmentContainer}>
              {WASH_SEGMENTS.map((seg) => (
                <TouchableOpacity 
                  key={seg.id} 
                  style={[
                    styles.segmentTab, 
                    washSegment === seg.id && { backgroundColor: seg.color + '15', borderColor: seg.color }
                  ]}
                  onPress={() => {
                    setWashSegment(seg.id);
                    setSelectedPkg(null);
                  }}
                >
                  <Text style={[styles.segmentIcon, washSegment === seg.id && { color: seg.color }]}>{seg.icon}</Text>
                  <Text style={[styles.segmentName, washSegment === seg.id && { color: seg.color, fontWeight: '700' }]}>{seg.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Vehicle Type selector removed as per request */}

            <Text style={styles.secLabel}>Select Plan</Text>
            {WASH_PACKAGES[washSegment].map((pkg) => {
              const currentPrice = pkg.price;
              return (
                <TouchableOpacity 
                  key={pkg.id} 
                  style={[styles.pkgCard, selectedPkg === pkg.id && styles.pkgCardOn]} 
                  onPress={() => setSelectedPkg(pkg.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.radio, selectedPkg === pkg.id && styles.radioOn]}>
                    <View style={[styles.radioDot, selectedPkg === pkg.id && styles.radioDotOn]} />
                  </View>
                  <View style={styles.pkgInfo}>
                    <View style={styles.pkgTitleRow}>
                      <Text style={styles.pkgName} numberOfLines={2}>{pkg.name}</Text>
                      {pkg.tag && (
                        <View style={[styles.pkgTag, pkg.tag === 'BESTSELLER' ? styles.tagYellow : styles.tagPurple]}>
                          <Text style={styles.pkgTagText}>{pkg.tag}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.pkgDesc}>{pkg.desc}</Text>
                    
                    {selectedPkg === pkg.id && pkg.include && (
                      <View style={styles.includeBox}>
                        {pkg.include.map((item, idx) => (
                          <View key={idx} style={styles.includeItem}>
                            <Ionicons name="checkmark-circle" size={12} color={Colors.secondary} />
                            <Text style={styles.includeText}>{item}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.pkgPrice}>₹{currentPrice}</Text>
                    <Text style={styles.pkgUnit}>{pkg.unit}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.secLabel}>Pick a Slot</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
                <Text style={{ fontSize: 10, color: Colors.textTertiary, fontWeight: '700', textTransform: 'uppercase' }}>Scroll</Text>
                <Ionicons name="arrow-forward" size={10} color={Colors.textTertiary} />
              </View>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.slotScroll}
            >
              {['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'].map((slot) => {
                const isOn = selectedSlot === slot;
                return (
                  <TouchableOpacity 
                    key={slot} 
                    style={[styles.slot, isOn && styles.slotOn]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={[styles.slotT, isOn && styles.slotTOn]}>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity 
              style={[styles.ctaBtn, (!selectedPkg || !selectedSlot) && { opacity: 0.6 }]} 
              disabled={!selectedPkg || !selectedSlot}
              activeOpacity={0.8}
              onPress={() => {
                const pkgObj = WASH_PACKAGES[washSegment]?.find(p => p.id === selectedPkg);
                navigation.navigate('Booking', { 
                  service: {
                    ...pkgObj,
                    segment: washSegment,
                    slot: selectedSlot,
                    date: washSegment === 'instant' ? new Date().toISOString().split('T')[0] : (pkgObj as any)?.date
                  }
                });
              }}
            >
              <Text style={styles.ctaBtnText}>Book Now</Text>
            </TouchableOpacity>
          </>
        )}

        {(currentView !== 'wash' && currentView !== 'puc') && (
          <View style={{ alignItems: 'center', paddingVertical: 80 }}>
            <Ionicons name="construct-outline" size={64} color={Colors.border} />
            <Text style={{ fontSize: 18, color: Colors.textTertiary, marginTop: 16 }}>{currentView.toUpperCase()} coming soon...</Text>
          </View>
        )}

        {currentView === 'puc' && (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 20 }}>PUC Renewal</Text>
            <Text style={{ color: Colors.textSecondary }}>This feature is coming soon to your area.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const MainServiceCard = ({ icon, name, desc, price, tag, onPress }: any) => (
  <TouchableOpacity style={styles.mainCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.mainCardIcon}>
      <Text style={{ fontSize: 28 }}>{icon}</Text>
    </View>
    <View style={styles.mainCardInfo}>
      <Text style={styles.mainCardName}>{name}</Text>
      <Text style={styles.mainCardDesc}>{desc}</Text>
    </View>
    <View style={styles.mainCardEnd}>
      <View style={[
        styles.statusTag, 
        tag === 'popular' && { backgroundColor: Colors.infoLight, borderColor: Colors.info },
        tag === 'warn' && { backgroundColor: Colors.warningLight, borderColor: Colors.warning },
        tag === 'error' && { backgroundColor: Colors.errorLight, borderColor: Colors.error },
        tag === 'ok' && { backgroundColor: Colors.secondaryLight, borderColor: Colors.secondary },
        tag === 'gold' && { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
      ]}>
        <Text style={[
          styles.statusTagText,
          tag === 'popular' && { color: Colors.info },
          tag === 'warn' && { color: Colors.warning },
          tag === 'error' && { color: Colors.error },
          tag === 'ok' && { color: Colors.secondary },
          tag === 'gold' && { color: Colors.primaryDark },
        ]}>{price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFCFE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth:1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  mainCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    ...Shadows.soft,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  mainCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mainCardInfo: {
    flex: 1,
  },
  mainCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  mainCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  mainCardEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },

  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  segmentTab: {
    flex: 1,
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  segmentIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  segmentName: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  vehicleTypeBox: {
    marginBottom: 20,
  },
  vehicleToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  vehicleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  vehicleBtnOn: {
    backgroundColor: Colors.primary,
    ...Shadows.soft,
  },
  vehicleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  vehicleBtnTextOn: {
    color: Colors.white,
  },

  secLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textTertiary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },
  pkgCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 },
    }),
  },
  pkgCardOn: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFEF9',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  radioOn: { borderColor: Colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'transparent' },
  radioDotOn: { backgroundColor: Colors.primary },
  pkgInfo: { flex: 1, marginHorizontal: 12 },
  pkgTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 4, gap: 4 },
  pkgName: { fontSize: 16, fontWeight: '700', color: Colors.text, flexShrink: 1 },
  pkgTag: { marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tagYellow: { backgroundColor: '#FEF3C7' },
  tagPurple: { backgroundColor: '#F3E8FF' },
  pkgTagText: { fontSize: 9, fontWeight: '800', color: Colors.text },
  pkgDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  pkgPrice: { fontSize: 18, fontWeight: '800', color: Colors.text },
  pkgUnit: { fontSize: 10, color: Colors.textTertiary, textAlign: 'right' },

  includeBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  includeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  slotScroll: {
    paddingRight: 20,
    gap: 10,
    marginBottom: 20,
  },
  slot: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  slotOn: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  slotT: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  slotTOn: { color: Colors.primaryDark },

  ctaBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    ...Shadows.medium,
  },
  ctaBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
});

export default ServicesScreen;

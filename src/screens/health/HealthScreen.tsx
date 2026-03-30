import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Shadows } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import VrumoCard from '../../components/VrumoCard';
import StatBox from '../../components/StatBox';

const HealthScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Vehicle Health Report</Text>

        {/* Health Score Overview */}
        <VrumoCard style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <View style={styles.ringContainer}>
              <View style={styles.ringBg} />
              <View style={[styles.ringFg, { transform: [{ rotate: '45deg' }] }]} />
              <View style={styles.ringInner}>
                <Text style={styles.scoreValue}>78</Text>
                <Text style={styles.scoreMax}>/ 100</Text>
              </View>
            </View>
            <View style={styles.scoreMeta}>
              <Text style={styles.healthGrade}>Good Condition</Text>
              <Text style={styles.healthSub}>2 advisories · Mar 18 · 4:32 AM</Text>
              <View style={styles.hbars}>
                <View style={[styles.hb, { backgroundColor: Colors.secondary }]} />
                <View style={[styles.hb, { backgroundColor: Colors.secondary }]} />
                <View style={[styles.hb, { backgroundColor: Colors.secondary }]} />
                <View style={[styles.hb, { backgroundColor: Colors.warning }]} />
                <View style={[styles.hb, { backgroundColor: Colors.warning }]} />
                <View style={[styles.hb, { backgroundColor: Colors.secondary }]} />
                <View style={[styles.hb, { backgroundColor: Colors.secondary }]} />
              </View>
            </View>
          </View>

          <Text style={styles.secLabelTiny}>Post-wash photos · Mar 18</Text>
          <View style={styles.photoGrid}>
            <PhotoBox emoji="🚗" label="Front" />
            <PhotoBox emoji="🔙" label="Rear" />
            <PhotoBox emoji="🪟" label="Driver" />
            <PhotoBox emoji="🔑" label="Pass." />
          </View>
        </VrumoCard>

        {/* Visual Checks */}
        <Text style={styles.secLabel}>Visual checks (AI)</Text>
        <CheckItem name="Windshield" value="Clear" status="ok" />
        <CheckItem name="Tyres & wheels" value="Good" status="ok" />
        <CheckItem 
          name="Rear bumper" 
          value="Dent" 
          status="warn" 
          action="Fix now" 
        />
        <CheckItem name="Body paint" value="Clean" status="ok" />

        {/* OBD Diagnostics */}
        <Text style={styles.secLabel}>OBD-II engine diagnostics</Text>
        <View style={styles.gaugeGrid}>
          <GaugeItem label="RPM" value="1,840" unit="rev/min" percent={29} status="ok" />
          <GaugeItem label="Coolant" value="88°C" unit="normal" percent={62} status="ok" />
          <GaugeItem label="Battery" value="13.8V" unit="healthy" percent={72} status="ok" />
          <GaugeItem label="Throttle" value="44%" unit="position" percent={44} status="ok" />
          <GaugeItem label="Fuel trim" value="+2.3%" unit="normal" percent={55} status="warn" />
          <GaugeItem label="Eng. load" value="45%" unit="moderate" percent={45} status="ok" />
        </View>

        {/* DTC Codes */}
        <Text style={styles.secLabel}>Fault codes (DTC)</Text>
        <DTCItem 
          code="P0171" 
          name="System too lean — Bank 1" 
          sub="Vacuum leak · dirty MAF sensor" 
          est="Est. repair: ₹1,500 – ₹6,000"
          status="warn"
        />

        {/* Compliance */}
        <Text style={styles.secLabel}>Compliance</Text>
        <CheckItem name="PUC certificate" value="Apr 2" status="warn" action="Renew" />
        <CheckItem name="Insurance" value="Dec 2025" status="ok" />

      </ScrollView>
    </SafeAreaView>
  );
};

const PhotoBox = ({ emoji, label }: { emoji: string, label: string }) => (
  <TouchableOpacity style={styles.photoBox}>
    <Text style={styles.photoEmoji}>{emoji}</Text>
    <Text style={styles.photoLabel}>{label}</Text>
  </TouchableOpacity>
);

const CheckItem = ({ name, value, status, action }: { name: string, value: string, status: 'ok' | 'warn' | 'bad', action?: string }) => (
  <View style={[styles.checkItem, status === 'warn' && styles.warnBorder]}>
    <View style={[styles.checkDot, { backgroundColor: status === 'ok' ? Colors.secondary : status === 'warn' ? Colors.warning : Colors.error }]} />
    <Text style={styles.checkName}>{name}</Text>
    <Text style={[styles.checkValue, { color: status === 'ok' ? Colors.secondary : status === 'warn' ? Colors.warning : Colors.error }]}>{value}</Text>
    {action && (
      <TouchableOpacity style={styles.fixBtn}>
        <Text style={styles.fixBtnText}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const GaugeItem = ({ label, value, unit, percent, status }: { label: string, value: string, unit: string, percent: number, status: 'ok' | 'warn' | 'bad' }) => (
  <View style={styles.gauge}>
    <Text style={styles.gaugeLabel}>{label}</Text>
    <Text style={styles.gaugeValue}>{value}</Text>
    <Text style={styles.gaugeUnit}>{unit}</Text>
    <View style={styles.gaugeBar}>
      <View style={[styles.gaugeFill, { width: `${percent}%`, backgroundColor: status === 'ok' ? Colors.secondary : status === 'warn' ? Colors.warning : Colors.error }]} />
    </View>
  </View>
);

const DTCItem = ({ code, name, sub, est, status }: { code: string, name: string, sub: string, est: string, status: 'warn' | 'bad' }) => (
  <View style={[styles.dtcItem, status === 'warn' && styles.warnBorder]}>
    <View style={styles.dtcCodeBadge}>
      <Text style={styles.dtcCodeText}>{code}</Text>
    </View>
    <View style={styles.dtcInfo}>
      <Text style={styles.dtcName}>{name}</Text>
      <Text style={styles.dtcSub}>{sub}</Text>
      <Text style={styles.dtcEst}>{est}</Text>
    </View>
    <TouchableOpacity style={styles.dtcBookBtn}>
      <Text style={styles.dtcBookBtnText}>Book fix</Text>
    </TouchableOpacity>
  </View>
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
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  scoreCard: {
    padding: 16,
    marginBottom: 20,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ringContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 16,
  },
  ringBg: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: Colors.borderLight,
  },
  ringFg: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: Colors.secondary,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  ringInner: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  scoreMax: {
    fontSize: 9,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
  },
  scoreMeta: {
    flex: 1,
  },
  healthGrade: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  healthSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  hbars: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 10,
  },
  hb: {
    height: 3,
    flex: 1,
    borderRadius: 2,
  },
  secLabelTiny: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textTertiary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  photoBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  photoLabel: {
    fontSize: 8,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
  },
  secLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  warnBorder: {
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  checkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  checkName: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
  },
  checkValue: {
    fontSize: 11,
    marginRight: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  fixBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  fixBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1a1200',
  },
  gaugeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  gauge: {
    width: '31.5%',
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  gaugeLabel: {
    fontSize: 8,
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  gaugeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  gaugeUnit: {
    fontSize: 8,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  gaugeBar: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.border,
    borderRadius: 1,
    marginTop: 8,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: 2,
    borderRadius: 1,
  },
  dtcItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  dtcCodeBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginRight: 12,
  },
  dtcCodeText: {
    fontSize: 10,
    color: Colors.warning,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  dtcInfo: {
    flex: 1,
  },
  dtcName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  dtcSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  dtcEst: {
    fontSize: 10,
    color: Colors.textTertiary,
  },
  dtcBookBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
  },
  dtcBookBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1a1200',
  },
});

export default HealthScreen;

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native';
import colors from '../utils/colors';

export default function ServiceCard({ service, onPress, style }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scale, { toValue: 0.97, duration: 150, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
        Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
            <Animated.View style={[styles.card, style, { transform: [{ scale }] }]}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: service.image }} resizeMode="cover" />
                    <View style={styles.gradientOverlay} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{service.name}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{service.desc || 'Premium care for your vehicle'}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.price}>₹{service.price}</Text>
                        <View style={styles.bookBtn}>
                            <Text style={styles.bookText}>Book</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        overflow: 'hidden',
    },
    imageContainer: { width: '100%', height: 140, backgroundColor: colors.secondary, position: 'relative' },
    image: { width: '100%', height: '100%' },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0, height: 40,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    info: { padding: 16 },
    title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
    desc: { fontSize: 13, color: colors.textLight, marginBottom: 16, lineHeight: 18 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 20, fontWeight: '900', color: colors.primary },
    bookBtn: { backgroundColor: colors.accent, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
    bookText: { color: colors.primary, fontWeight: 'bold', fontSize: 14 }
});

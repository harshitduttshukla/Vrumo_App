import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../utils/colors';

export default function PrimaryButton({ title, onPress, loading = false, style, textStyle }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={loading}
        >
            <Animated.View style={[styles.button, style, { transform: [{ scale }] }]}>
                {loading ? (
                    <ActivityIndicator color={colors.primary} />
                ) : (
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                )}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.accent,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '700',
    }
});

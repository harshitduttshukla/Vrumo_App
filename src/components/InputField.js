import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

export default function InputField({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, icon }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && <Ionicons name={icon} size={20} color={colors.textLight} style={styles.icon} />}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    label: { fontSize: 14, color: colors.text, marginBottom: 8, fontWeight: '600' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    icon: { marginRight: 10 },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: colors.text,
    }
});

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function InputField({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, icon }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, isFocused && styles.focused]}>
        {icon && <Ionicons name={icon} size={20} color={isFocused ? colors.primary : colors.textLight} style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  focused: {
    borderColor: colors.accent,
    backgroundColor: colors.white,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  }
});

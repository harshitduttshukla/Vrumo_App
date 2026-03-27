import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, NativeEventEmitter } from 'react-native';

interface Props {
  code: string[];
  setCode: (code: string[]) => void;
}

const OTPInput: React.FC<Props> = ({ code, setCode }) => {
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length !== 0 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
});

export default OTPInput;

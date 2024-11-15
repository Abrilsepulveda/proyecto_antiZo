// InputField.js
import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, Animated } from 'react-native';

export default function InputField({ 
    placeholder, 
    value, 
    onChangeText, 
    keyboardType = 'default', 
    secureTextEntry = false, 
    error 
}) {
    const [shakeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [error]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </Animated.View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
    },
});

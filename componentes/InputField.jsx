import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

export default function InputField({ placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false, error }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

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


//estilos
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
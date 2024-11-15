       
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente principal de detalles de trabajo
export default function JobDetails() {
const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Image source={require('../assets/starbucks_logo.png')} style={styles.logo} />
            <Text style={styles.companyName}>Starbucks</Text>

            <Text style={styles.label}>Nombre del puesto:</Text>
            <Text style={styles.info}>Barista</Text>

            <Text style={styles.label}>Horarios:</Text>
            <Text style={styles.info}>10:00 a 18:00</Text>

            <Text style={styles.label}>Requisitos:</Text>
            <Text style={styles.info}>Experiencia previa, certificado</Text>

            <Text style={styles.label}>Ubicación del puesto:</Text>
            <Text style={styles.info}>Starbucks en el Jumbo, calle Juan Julian Lastra 2400</Text>

            <Text style={styles.label}>Salario mínimo:</Text>
            <Text style={styles.info}>$200,000</Text>

            <Text style={styles.label}>Rango Etario:</Text>
            <Text style={styles.info}>Entre 18 y 30 años</Text>

            <TouchableOpacity
                style={styles.applyButton}
                onPress={() => navigation.navigate('Busqueda')}
            >
            <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E0F5A1',
        alignItems: 'center',
    },
    
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    
    backText: {
        fontSize: 24,
        color: '#555',
    },
    
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006341',
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        marginVertical: 4,
    },

    info: {
        fontSize: 16,
        color: '#333',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },

    applyButton: {
        marginTop: 30,
        backgroundColor: '#B7E497',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: 'center',
    },

    applyButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
});
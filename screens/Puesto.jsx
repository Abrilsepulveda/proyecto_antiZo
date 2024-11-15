       
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

// Estilos para los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E0F5A1', // Fondo verde claro
        alignItems: 'center', // Centra los elementos horizontalmente
    },
    backButton: {
        position: 'absolute',
        top: 20, // Margen desde la parte superior
        left: 20, // Margen desde la izquierda
    },
    backText: {
        fontSize: 24, // Tamaño del texto del botón de regreso
        color: '#555', // Color gris oscuro
    },
    logo: {
        width: 80, // Ancho del logo
        height: 80, // Altura del logo
        marginBottom: 20, // Espaciado inferior
    },
    companyName: {
        fontSize: 24, // Tamaño de texto del nombre de la empresa
        fontWeight: 'bold', // Texto en negrita
        color: '#006341', // Color verde
        marginBottom: 20, // Espaciado inferior
    },
    label: {
        fontSize: 16, // Tamaño de texto para las etiquetas
        fontWeight: 'bold', // Texto en negrita
        color: '#333', // Color gris oscuro
        alignSelf: 'flex-start', // Alineación a la izquierda
        marginVertical: 4, // Margen vertical
    },
    info: {
        fontSize: 16, // Tamaño de texto para la información
        color: '#333', // Color gris oscuro
        alignSelf: 'flex-start', // Alineación a la izquierda
        marginBottom: 8, // Espaciado inferior
    },
    applyButton: {
        marginTop: 30, // Espaciado superior
        backgroundColor: '#B7E497', // Fondo verde más oscuro
        paddingVertical: 15, // Espaciado vertical del botón
        paddingHorizontal: 40, // Espaciado horizontal del botón
        borderRadius: 8, // Bordes redondeados
        alignItems: 'center', // Centra el texto dentro del botón
    },
    applyButtonText: {
        fontSize: 18, // Tamaño del texto dentro del botón
        color: '#333', // Color gris oscuro
        fontWeight: 'bold', // Texto en negrita
    },
});
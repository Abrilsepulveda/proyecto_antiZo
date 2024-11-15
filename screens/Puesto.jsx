       
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
       )}
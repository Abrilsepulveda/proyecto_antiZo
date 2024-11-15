// Busqueda.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, Button, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../Firebase';

// Componente principal de la pantalla de búsqueda
const BusquedaScreen = () => {
    const navigation = useNavigation();// Hook para manejar la navegación entre pantallas
    const [busqueda, setBusqueda] = useState(''); // Estado para almacenar el texto de búsqueda

    // Hook para cargar los trabajos desde Firestore al cargar la pantalla
    useEffect(() => {
        const fetchTrabajos = async () => {
            const trabajosSnapshot = await firebase.firestore().collection('trabajos').get(); // Obtiene los datos de la colección "trabajos"
            const trabajosData = trabajosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los datos obtenidos
            setTrabajos(trabajosData);
        };

        fetchTrabajos();
    }, []);

    // Filtrar trabajos según la búsqueda
    const trabajosFiltrados = trabajos.filter(trabajo => 
        trabajo.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const trabajos = [
        {
            id: '1',
            nombre: 'Ferracioli, Paseo de la Patagonia',
            ubicacion: 'Paseo de la Patagonia',
            distancia: '2 km',
            imagen: require('../assets/imagenes/paseo.png')
        },
        {
            id: '2',
            nombre: 'Starbucks Jumbo',
            ubicacion: 'Jumbo',
            distancia: '100 m',
            imagen: require('../assets/imagenes/jumbo.png')
        },
        {
            id: '3',
            nombre: 'Shell Ignacio Rivas',
            ubicacion: 'Ignacio Rivas',
            distancia: '800 m',
            imagen: require('../assets/imagenes/shell.png')
        }
    ];

    const BottomNavigation = ({ navigation }) => {
        return (
            <View style={styles.bottomNav}>
                {/* Redirige a la pantalla Home */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/imagenes/home.png')} style={styles.navIcon} />
                </TouchableOpacity>
    
                {/* Mantiene en la pantalla de búsqueda */}
                <TouchableOpacity onPress={() => navigation.navigate('Busqueda')}>
                    <Image source={require('../assets/imagenes/lupa.png')} style={styles.navIcon} />
                </TouchableOpacity>
    
                {/* Redirige a la pantalla de perfil */}
                <TouchableOpacity onPress={() => navigation.navigate('PerfilEmpleados')}>
                    <Image source={require('../assets/imagenes/cuenta.png')} style={styles.navIcon} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar trabajo"
                value={busqueda}
                onChangeText={setBusqueda}
            />


            <FlatList
                data={trabajosFiltrados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imagen }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.nombre}</Text>
                            <Text style={styles.cardSubtitle}>{item.ubicacion}</Text>
                            <Text style={styles.cardDistance}>{item.distancia} min left</Text>
                        </View>
                    </View>
                )}
            />
            <Button title="Volver a Home" onPress={() => navigation.goBack()} />
            <BottomNavigation navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    searchInput: {
        marginTop: 50,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
   
    card: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#666',
        marginVertical: 5,
    },
    cardDistance: {
        color: '#333',
        fontWeight: 'bold',
    },
});

export default Busqueda;
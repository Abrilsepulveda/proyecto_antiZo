// Busqueda.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import firebase from '../Firebase';
import { Ionicons } from '@expo/vector-icons';

const BusquedaScreen = () => {
    const navigation = useNavigation();
    const [trabajos, setTrabajos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchTrabajos = async () => {
            const trabajosSnapshot = await firebase.firestore().collection('trabajos').get();
            const trabajosData = trabajosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTrabajos(trabajosData);
        };

        fetchTrabajos();
    }, []);

    // Filtrar trabajos según la búsqueda
    const trabajosFiltrados = trabajos.filter(trabajo => 
        trabajo.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar trabajo"
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -34.603722,
                    longitude: -58.381592,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Agregar marcadores para trabajos filtrados */}
                {trabajosFiltrados.map(trabajo => (
                    <Marker
                        key={trabajo.id}
                        coordinate={{
                            latitude: trabajo.ubicacion.latitude,
                            longitude: trabajo.ubicacion.longitude
                        }}
                        title={trabajo.nombre} // Título del marcador
                        description={`Distancia: ${trabajo.distancia} min`} // Descripción del marcador
                    />
                ))}
            </MapView>

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
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
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

export default BusquedaScreen;
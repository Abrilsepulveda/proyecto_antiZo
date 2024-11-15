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
            setTrabajos(trabajosData); // Actualiza el estado con los trabajos obtenidos
        };

        fetchTrabajos();
    }, []);

    // Filtrar trabajos según la búsqueda
    const trabajosFiltrados = trabajos.filter(trabajo => 
        trabajo.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    //Ejemplo de como se verian los trabajos
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

    // Barra de navegación inferior
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

// Estilos para los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', // Fondo gris claro
    },
    searchInput: {
        marginTop: 50, // Espaciado superior
        marginHorizontal: 20, // Margen lateral
        padding: 10, // Espaciado interno
        backgroundColor: '#fff', // Fondo blanco
        borderRadius: 10, // Bordes redondeados
        fontSize: 18, // Tamaño del texto
        shadowColor: '#000', // Sombra negra
        shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        elevation: 2, // Altura para sombra en Android
    },
    card: {
        flexDirection: 'row', // Elementos en fila
        margin: 10, // Margen entre tarjetas
        backgroundColor: '#fff', // Fondo blanco
        borderRadius: 10, // Bordes redondeados
        overflow: 'hidden', // Oculta elementos fuera del borde
        shadowColor: '#000', // Sombra negra
        shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
        shadowOpacity: 0.1, // Opacidad baja
        elevation: 2, // Altura para sombra en Android
    },
    cardImage: {
        width: 100, // Ancho de la imagen
        height: 100, // Alto de la imagen
        borderRadius: 10, // Bordes redondeados
    },
    cardContent: {
        flex: 1, // Toma todo el espacio disponible
        padding: 10, // Espaciado interno
    },
    cardTitle: {
        fontSize: 18, // Tamaño del texto
        fontWeight: 'bold', // Texto en negrita
    },
    cardSubtitle: {
        color: '#666', // Texto gris
        marginVertical: 5, // Margen vertical
    },
    cardDistance: {
        color: '#333', // Texto gris oscuro
        fontWeight: 'bold', // Texto en negrita
    },
});

export default Busqueda;
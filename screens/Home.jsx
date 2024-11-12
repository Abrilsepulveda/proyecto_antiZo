import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


// Pantalla principal con botones de navegación
function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* Botones de navegación */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsuariosAdd')}>
        <Text>Add User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmpresaAdd')}>
        <Text>Add Company</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Busqueda')}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MapScreen')}>
        <Text>Go to Map</Text>
      </TouchableOpacity>

      {/* Barra de navegación inferior con íconos */}
      <View style={styles.navBar}>
        <Icon name="search" size={30} color="#000" onPress={() => navigation.navigate('Busqueda')} />
        <Icon name="user" size={30} color="#000" onPress={() => navigation.navigate('UserScreen')} />
        <Icon name="home" size={30} color="#000" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

// Defino el componente "MapScreen", donde muestro un mapa
function MapScreen() {
  // Configuro la región inicial del mapa
  const initialRegion = {
    latitude: -34.603722,  // Latitud inicial
    longitude: -58.381592, // Longitud inicial
    latitudeDelta: 0.0922, // Zoom en la latitud
    longitudeDelta: 0.0421, // Zoom en la longitud
  };

  return (
    <View style={styles.container}>
      {/* Uso MapView para mostrar el mapa */}
      <MapView
        style={styles.map} // Ocupo toda la pantalla con el mapa
        initialRegion={initialRegion} // Establezco la región inicial del mapa
      >
        {/* Añado un marcador en una ubicación específica */}
        <Marker
          coordinate={{ latitude: -34.603722, longitude: -58.381592 }} // Coordenadas del marcador
          title="Ubicación 1" // Título del marcador
          description="Descripción de la ubicación" // Descripción cuando se hace clic en el marcador
        />
      </MapView>
    </View>
  );
}
// Pantalla de búsqueda (sin funcionalidad adicional)
function SearchScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text>Pantalla de Búsqueda</Text>
    </View>
  );
}
// Pantalla de perfil de usuario (sin funcionalidad adicional)
function UserScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text>Pantalla de Usuario</Text>
    </View>
  );
}

// Pantalla de búsqueda
function Busqueda() {
  return (
    <View style={styles.screenCenter}>
      <Text>Buscar</Text>
    </View>
  );
}
// Estilos para el contenedor y el mapa
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupo toda la pantalla con el contenedor
  },
  map: {
    width: Dimensions.get('window').width, // El ancho del mapa es igual al de la pantalla
    height: Dimensions.get('window').height, // El alto del mapa es igual al de la pantalla
  },
});

// Creo el Stack Navigator para la navegación entre pantallas
const Stack = createStackNavigator();

// Defino el componente principal "App" que contiene todas las pantallas
export default function App() {
  return (
    <NavigationContainer>
      {/* Defino las pantallas que quiero en la navegación */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Busqueda" component={Busqueda} />
        <Stack.Screen name="EmpresaAdd" component={EmpresaAdd} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UsuariosAdd" component={UsuariosAdd} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

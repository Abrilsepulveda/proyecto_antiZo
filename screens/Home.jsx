import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';

// Defino el componente "Home", que es la pantalla principal
function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {/* Botones de navegación a las distintas pantallas */}
        <Button title="Add User" onPress={() => navigation.navigate('UsuariosAdd')} />
        <Button title="Add Company" onPress={() => navigation.navigate('EmpresaAdd')} />
        <Button title="Search" onPress={() => navigation.navigate('Busqueda')} />
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Go to Map" onPress={() => navigation.navigate('MapScreen')} />
      </View>
          {/* Barra de navegación inferior */}
          <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={28} style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Busqueda')}>
          <Icon name="search-outline" size={28} style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EmpresaAdd')}>
          <Icon name="business-outline" size={28} style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UsuariosAdd')}>
          <Icon name="person-outline" size={28} style={styles.navbarIcon} />
        </TouchableOpacity>
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
//Búsqueda
function Busqueda() {
  return (
    <View style={styles.center}>
      <Text>Buscar</Text>
    </View>
  );
}

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

// Pantalla de búsqueda
function Busqueda() {
  return (
    <View>
      <Text>Buscar</Text>
    </View>
  );
}

// Pantalla para agregar empresa
function EmpresaAdd() {
  return (
    <View>
      <Text>Agregar Empresa</Text>
    </View>
  );
}

// Pantalla de login
function Login({ navigation }) {
  return (
    <View>
      <Text>Pantalla de Login</Text>
      {/* Botón para navegar a la pantalla Home después de hacer login */}
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// Pantalla para agregar usuario
function UsuariosAdd() {
  return (
    <View>
      <Text>Agregar Usuario</Text>
    </View>
  );
}
// Importaciones necesarias para la navegación y las pantallas
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenedor de navegación
import { createStackNavigator } from '@react-navigation/stack'; // Crear el stack de navegación
import Login from '../proyecto_antiZo/screens/Login'; // Pantalla Login
import UsuariosAdd from '../proyecto_antiZo/screens/UsuariosAdd'; // Pantalla para agregar usuarios
import EmpresaAdd from '../proyecto_antiZo/screens/EmpresaAdd'; // Pantalla para agregar empresas
import Home from '../proyecto_antiZo/screens/Home'; // Pantalla Home

// Importaciones adicionales
import { StatusBar } from 'expo-status-bar'; // Para la barra de estado

// Crear el stack
const Stack = createStackNavigator();

export default function App() {
  return (
    // Contenedor de la navegación
    <NavigationContainer>
      <StatusBar style="auto" /> {/* StatusBar para el control de la barra de estado */}
      
      {/* Stack Navigator controla las pantallas */}
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Ocultamos el header si no lo necesitas
        />
        {/* Pantalla Home */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Inicio' }} // Título para la pantalla Home
        />
        {/* Pantallas adicionales para navegación */}
        <Stack.Screen
          name="UsuariosAdd"
          component={UsuariosAdd}
          options={{ title: 'Registrar Usuario' }}
        />
        <Stack.Screen
          name="EmpresaAdd"
          component={EmpresaAdd}
          options={{ title: 'Registrar Empresa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

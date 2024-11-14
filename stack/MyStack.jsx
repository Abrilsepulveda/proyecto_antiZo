import React from 'react';
import 'react-native-gesture-handler';
import { Button } from 'react-native';
import appFirebase from '../Firebase';
import { getAuth, signOut } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from "../screens/Login";
import RegistroEmpresa from "../screens/EmpresaAdd";
import RegistroUsuarios from "../screens/UsuariosAdd";
import Home from "../screens/Home";
import Busqueda from "../screens/Busqueda";
import InputField from "../componentes/InputField";

// Inicializar Firebase Auth
const auth = getAuth();

// Crear el stack de navegación
const Stack = createStackNavigator();

export default function MyStack() {
  const navigation = useNavigation();

  const CerrarSesion = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Pantalla Login */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false, // Ocultar el header si no lo necesitas
        }}
      />

      {/* Pantalla Home */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
          headerLeft: () => (
            <Button onPress={CerrarSesion} title="Salir" color="#304A6E" />
          ),
        }}
      />

      {/* Pantalla Busqueda */}
      <Stack.Screen
        name="Busqueda"
        component={Busqueda}
        options={{
          title: "Busqueda",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />

      {/* Pantalla EmpresaAdd */}
      <Stack.Screen
        name="EmpresaAdd"
        component={EmpresaAdd}
        options={{
          title: "Registrar Empresa",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />

      {/* Pantalla UsuariosAdd */}
      <Stack.Screen
        name="UsuariosAdd"
        component={UsuariosAdd}
        options={{
          title: "Registrar Usuario",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />
    </Stack.Navigator>
  );
}
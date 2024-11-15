// MyStack.jsx
import 'react-native-gesture-handler';
import { Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from "../screens/Login";
import EmpresaAdd from "../screens/EmpresaAdd";
import UsuariosAdd from "../screens/UsuariosAdd";
import Home from "../screens/Home";
import Puesto from "../screens/Puesto";
import Drone from "../screens/Drone";
import Busqueda from "../screens/Busqueda";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import React, { useState, useEffect } from 'react';

// Inicializar Firebase Auth
const auth = getAuth();
const Stack = createStackNavigator();

export default function MyStack() {
    const navigation = useNavigation();
    const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario

    // Función para cerrar sesión
    const CerrarSesion = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    };

    // Función para obtener el rol del usuario desde Firestore
    const getUserRole = async (uid) => {
        const userDoc = await getDoc(doc(db, 'empresas', uid));
        if (userDoc.exists()) {
            setUserRole(userDoc.data().role); // Asigna el rol si se encuentra en Firestore
        } else {
            setUserRole('empleado'); // Si no existe en empresas, lo considera como empleado por defecto
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            getUserRole(user.uid); // Obtiene el rol del usuario autenticado
        }
    }, [auth.currentUser]);

    // Dependiendo del rol, configura las pantallas del Stack
    return (
        <Stack.Navigator initialRouteName="Login">
            {/* Pantalla Login */}
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false, // Ocultar el header si no lo necesito
                }}
            />

            {/* Pantalla Home */}
            {(userRole === 'empresa' || userRole === 'empleado') && (
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
            )}

            {/* Pantalla Busqueda */}
            {(userRole === 'empresa' || userRole === 'empleado') && (
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
            )}

            {/* Pantalla EmpresaAdd */}
            {userRole === 'empresa' && (
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
            )}

            {/* Pantalla UsuariosAdd */}
            {userRole === 'empleado' && (
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
            )}
            {/* Pantalla Puesto*/}
            {(userRole === 'empresa' || userRole === 'empleado') && (
                <Stack.Screen
                    name="Puesto"
                    component={Puesto}
                    options={{
                        title: "Puesto",
                        headerTintColor: 'white',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#304A6E',
                        },
                    }}
                />
            )}
            {/* Pantalla Drone*/}
            {(userRole === 'empresa' || userRole === 'empleado') && (
                <Stack.Screen
                    name="Drone"
                    component={Drone}
                    options={{
                        title: "Drone",
                        headerTintColor: 'white',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#304A6E',
                        },
                    }}
                />
            )}


            
        </Stack.Navigator>
    );
}

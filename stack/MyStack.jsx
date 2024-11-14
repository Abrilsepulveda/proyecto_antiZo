import React from 'react';
import 'react-native-gesture-handler';
import { Button, ActivityIndicator } from 'react-native';
import appFirebase from '../Firebase';
import { getAuth, signOut } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from "../screens/Login";
import RegistroEmpresa from "../screens/EmpresaAdd";
import RegistroUsuarios from "../screens/UsuariosAdd";
import Home from "../screens/Home";
import Busqueda from "../screens/Busqueda";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
// Importaciones adicionales
import { StatusBar } from 'expo-status-bar'; // Para la barra de estado

// Inicializar Firebase Auth
const auth = getAuth();

// Crear el stack de navegación
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
      setUserRole(userDoc.data().role); // Asignamos el rol si se encuentra en Firestore
    } else {
      setUserRole('empleado'); // Si no existe en empresas, lo consideramos como empleado por defecto
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getUserRole(user.uid); // Obtenemos el rol del usuario autenticado
    }
  }, [auth.currentUser]);

  // Dependiendo del rol, configuramos las pantallas del Stack
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

      {/* Pantalla Home*/}
      {userRole === 'empresa' || userRole === 'empleado' ? (
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

     ) : null}

      {/* Pantalla Busqueda */}
      {userRole === 'empresa' || userRole === 'empleado' ? (
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
    ) : null}


      {/* Pantalla EmpresaAdd */}
      {userRole === 'empresa' ? (
      <Stack.Screen
        name="EmpresaAdd"
        component={RegistroEmpresa }
        options={{
          title: "Registrar Empresa",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />
    ) : null}

      {/* Pantalla UsuariosAdd */}
      {userRole === 'empleado' ? (
      <Stack.Screen
        name="UsuariosAdd"
        component={RegistroUsuarios}
        options={{
          title: "Registrar Usuario",
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#304A6E',
          },
        }}
      />
    ) : null}
    </Stack.Navigator>
  );
}
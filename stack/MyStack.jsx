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

const Stack = createStackNavigator();
const auth = getAuth(appFirebase);



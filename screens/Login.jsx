//Login.jsx

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'; 
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 



const Login = () => {
  const navigation = useNavigation();

  return (
    <View> 

      {}
      <Button title="Registrar usuario" onPress={() => navigation.navigate('UsuariosAdd')} />
      <Button title="Registrar empresa" onPress={() => navigation.navigate('EmpresaAdd')} />
    </View>
  );
};

export default function Login({ navigation }) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



const handleLogin = async () => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario logueado:', user.email);
  
      navigation.navigate('Home'); 
  } catch (error) {
      console.error(error);
      Alert.alert('Error de inicio de sesión', error.message);
      }
    };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imagenes/logo.png')} style={styles.logo} />
      <Text style={styles.title}>WorkMap</Text>
      <Text style={styles.subtitle}>Tu trabajo ideal, a un click de distancia</Text>

      <TextInput
        style={styles.input}
        placeholder="correo@gmail.com"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>recuperar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../assets/imagenes/google1.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Al hacer clic en Continuar, aceptas nuestras Condiciones de servicio y Política de privacidad
      </Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EFFFA6',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
      },
      subtitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 30,
      },
      input: {
        width: '100%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
      },
      forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
      },
      forgotPasswordText: {
        color: '#007BFF',
      },
      loginButton: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
      },
      loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      googleButton: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
      },
    
      googleButtonText: {
        color: '#000',
        fontWeight: 'bold',
      },
      registerText: {
        color: '#007BFF',
        marginBottom: 20,
      },
      footer: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    } );
    

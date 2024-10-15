//EmpresaAdd.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

<TouchableOpacity onPress={() => navigation.navigate('UsuariosAdd')}>
  <Text style={styles.switchText}>Registrarse como Empleado</Text>
</TouchableOpacity>


export default function RegistroEmpresa({ navigation }) {
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [tipoEmpresa, setTipoEmpresa] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contacto, setContacto] = useState('');

    const handleRegistro = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
    
            await setDoc(doc(db, "empresas", user.uid), {
                nombreEmpresa: nombreEmpresa,
                tipoEmpresa: tipoEmpresa,
                email: email,
                contacto: contacto,
              });
      
              console.log('Empresa registrada con éxito');
              navigation.navigate('Home'); 
            })
            .catch(error => {
              console.error('Error al registrar la empresa:', error);
            });
  };
        return (
            <View style={styles.container}>
              <Image source={require('../assets/imagenes/favicon.png')} style={styles.logo} />
              <Text style={styles.title}>WorkMap</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la Empresa"
                value={nombreEmpresa}
                onChangeText={setNombreEmpresa}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de Empresa"
                value={tipoEmpresa}
                onChangeText={setTipoEmpresa}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            <TextInput
                    style={styles.input}
                    placeholder="Número de contacto"
                    value={contacto}
                    onChangeText={setContacto}
                    keyboardType="phone-pad"
            />

        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>
    </View>
  );  
}
// estilos
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
      button: {
        width: '100%',
        backgroundColor: '#A4E168',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      switchText: {
        color: '#000',
        marginTop: 15,
        fontSize: 16,
        textDecorationLine: 'underline',
      },
    });
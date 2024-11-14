import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from '../Firebase';
import {doc, setDoc } from 'firebase/firestore';
import {auth, db} from "../Firebase";
import InputField from "../componentes/InputField";


export default function RegistroEmpresa({ navigation }) {
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [rubro, setRubro] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contacto, setContacto] = useState('');
    const [error, setError] = useState('');


    const validateInputs = () => {
        if (!nombreEmpresa || !rubro || !email || !password || !confirmPassword || !contacto){
            setError('Todos los campos son obligatorios!!!');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
    };
    const handleRegistroEmpresa = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;// Obtenemos el usuario creado en Firebase

                // Almacenamos la información de la empresa en Firestore
                await setDoc(doc(db, "empresas", user.uid), {
                    nombreEmpresa: nombreEmpresa,
                    rubro: rubro,
                    email: email,
                    contacto: contacto,
                    role: 'empresa', // El rol de este usuario será 'empresa'
                    active: true,  // Indicamos que la empresa está activa por defecto
                });
                console.log('Empresa registrada con éxito');
                navigation.navigate('Home'); // Navegamos a la pantalla Home después de registrar la empresa
            })
            .catch(error => {
                console.error('Error al registrar la empresa:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} />
            <Text style={styles.title}>Registro Empresa</Text>

            {/* Campos para el formulario */}
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Empresa"
                value={nombreEmpresa}
                onChangeText={setNombreEmpresa}
            />
            <TextInput
                style={styles.input}
                placeholder="Rubro"
                value={rubro}
                onChangeText={setRubro}
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

            {/* Botón de registro */}
            <TouchableOpacity style={styles.button} onPress={handleRegistroEmpresa}>
                <Text style={styles.buttonText}>Registrar Empresa</Text>
            </TouchableOpacity>


            {/* Opción para registrarse como usuario */}
            <TouchableOpacity onPress={() => navigation.navigate('UsuariosAdd')}>
                <Text style={styles.switchText}>Registrarse como Empleado</Text>
            </TouchableOpacity>

            {/* Botón para navegar a la pantalla de Login */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Ir a Login</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos CSS dentro de la pantalla
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
        textDecorationLine: 'underline',
    },
    loginButton: { // Estilo del botón para ir a login
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: { // Estilo del texto del botón de login
        color: '#A4E168',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

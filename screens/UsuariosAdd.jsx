import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import InputField from '../componentes/InputField';
import { auth, db } from '../Firebase'; // Importar auth y db desde Firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';



// Componente principal RegistroEmpleado que recibe navigation como prop
export default function RegistroEmpleado({ navigation }) {
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre
    const [apellidos, setApellidos] = useState(''); // Estado para almacenar los apellidos
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [contacto, setContacto] = useState(''); // Estado para almacenar el contacto

    const validateInputs = () => {
        if (!nombre || !apellidos || !email || !password || !confirmPassword || !contacto) {
            setError('Todos los campos son obligatorios');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        setError('');
        return true;
    };

    // Función para manejar el registro de un empleado
    const handleRegistro = () => {
        // Usar Firebase para crear un usuario con email y contraseña
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => { // Si se crea el usuario exitosamente
                const user = userCredential.user; // Obtener el usuario creado
                // Guardar los datos del empleado en Firestore
                await setDoc(doc(db, "empleados", user.uid), {
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                    contacto: contacto,
                    role: 'empleado', // Asignamos el rol de "empleado"
                    active: true, // Indicamos que el empleado está activo
                });
                console.log('Empleado registrado con éxito'); // Mensaje de éxito en consola
                navigation.navigate('Home'); // Navegar a la pantalla de inicio
            })
            .catch(error => {
                console.error('Error al registrar el empleado:', error); // Manejo de errores
            });
    };

    
    return (
        <View style={styles.container}> {/*Contenedor principal*/}
            <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} /> 
            <Text style={styles.title}>WorkMap</Text> 

            {/* Campos de entrada para el registro */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre} // Actualizar estado al cambiar texto
            />
            <TextInput
                style={styles.input}
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={setApellidos} // Actualizar estado al cambiar texto
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail} // Actualizar estado al cambiar texto
                keyboardType="email-address" // Tipo de teclado para email
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword} // Actualizar estado al cambiar texto
                secureTextEntry // Ocultar contraseña
            />
            <TextInput
                style={styles.input}
                placeholder="Número de contacto"
                value={contacto}
                onChangeText={setContacto} // Actualizar estado al cambiar texto
                keyboardType="phone-pad" // Tipo de teclado para número de teléfono
            />

            {/* Botón para registrar al empleado */}
            <TouchableOpacity style={styles.button} onPress={handleRegistro}>
                <Text style={styles.buttonText}>Registrarme</Text> 
            </TouchableOpacity>

            {/* Navegar a la pantalla de registro de empresa */}
            <TouchableOpacity onPress={() => navigation.navigate('EmpresaAdd')}>
                <Text style={styles.switchText}>Registrarse como Empresa</Text> 
            </TouchableOpacity>

            {/* Botón para navegar a la pantalla de Login */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Ir a Login</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos para el componente
const styles = StyleSheet.create({
    container: { // Estilo del contenedor
        flex: 1,
        backgroundColor: '#EFFFA6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: { // Estilo del logo
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: { // Estilo del título
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30,
    },
    input: { // Estilo de los campos de entrada
        width: '100%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    button: { // Estilo del botón
        width: '100%',
        backgroundColor: '#A4E168',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: { // Estilo del texto del botón
        color: '#fff',
        fontWeight: 'bold',
    },
    switchText: { // Estilo del texto para cambiar de registro
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

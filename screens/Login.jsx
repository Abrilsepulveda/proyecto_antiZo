// Login.jsx
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Para manejar la navegación entre pantallas
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Componentes para la UI
import { loginWithEmail, loginWithGoogle } from '../firebase/authService';

export default function Login() {
    const navigation = useNavigation(); // Hook para obtener la navegación
    const [email, setEmail] = useState(''); // Estado para el email
    const [password, setPassword] = useState(''); // Estado para la contraseña

    // Función para manejar el inicio de sesión (navegar a Home)
    const handleLogin = () => {
        loginWithEmail(email, password)
        .then(() => {
        navigation.navigate('Home'); // Navegamos a la pantalla Home
    })
    .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
    });
};

const handleGoogleLogin = () => {
    loginWithGoogle()
        .then(() => {
            navigation.navigate('Home');
        })
        .catch((error) => {
            console.error('Error al iniciar sesión con Google:', error);
            alert('Error al iniciar sesión con Google.');
        });
};

    // Función para manejar el registro (navegar a UsuariosAdd)
    const handleRegisterUser = () => {
        navigation.navigate('UsuariosAdd');
    };

    // Función para manejar el registro (navegar a EmpresaAdd)
    const handleRegisterCompany = () => {
        navigation.navigate('EmpresaAdd');
    };

    // Estructura del renderizado del componente
    return (
        <View style={styles.container}>
            <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} />
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

            {/* Botón para iniciar sesión que llama a la función handleLogin */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
                <Image source={require('../assets/imagenes/google.png')} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </TouchableOpacity>

            {/* Botón para registrarse como usuario */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterUser}>
                <Text style={styles.registerText}>Registrarse como Usuario</Text>
            </TouchableOpacity>

            {/* Botón para registrarse como empresa */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterCompany}>
                <Text style={styles.registerText}>Registrarse como Empresa</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
                Al hacer clic en Continuar, aceptas nuestras Condiciones de servicio y Política de privacidad
            </Text>
        </View>
    );
}

// Estilos del componente Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
    },
    forgotPassword: {
        marginBottom: 15,
    },
    forgotPasswordText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    googleButton: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: '#333',
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    registerText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 12,
        color: '#555',
    },
});

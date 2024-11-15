import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import InputField from '../componentes/InputField';
import { auth, db } from '../Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Componente principal RegistroEmpleado que recibe navigation como prop
export default function RegistroEmpleado({ navigation }) {
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre
    const [apellidos, setApellidos] = useState(''); // Estado para almacenar los apellidos
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para almacenar la confirmación de la contraseña
    const [contacto, setContacto] = useState(''); // Estado para almacenar el contacto
    const [error, setError] = useState(''); // Estado para manejar errores

    // Función para validar los inputs
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
    const handleRegistro = async () => {
        if (!validateInputs()) return;

        try {
            // Crear usuario con email y contraseña en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

            console.log('Empleado registrado con éxito');
            navigation.navigate('Home'); // Navegar a la pantalla de inicio

        } catch (error) {
            console.error('Error al registrar el empleado:', error);
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo electrónico ya está registrado.');
            } else if (error.code === 'auth/invalid-email') {
                setError('El correo electrónico no es válido.');
            } else {
                setError('Error al registrar el empleado. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} />
            <Text style={styles.title}>Registro Usuario</Text>

            <InputField placeholder="Nombre" value={nombre} onChangeText={setNombre} error={error && !nombre ? error : ''} />
            <InputField placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} error={error && !apellidos ? error : ''} />
            <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" error={error && !email ? error : ''} />
            <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry error={error && !password ? error : ''} />
            <InputField placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={error && !confirmPassword ? error : ''} />
            <InputField placeholder="Número de contacto" value={contacto} onChangeText={setContacto} keyboardType="phone-pad" error={error && !contacto ? error : ''} />

            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleRegistro}>
                <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EmpresaAdd')}>
                <Text style={styles.switchText}>Registrarse como Empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Ir a Login</Text>
            </TouchableOpacity>
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
    loginButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#A4E168',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

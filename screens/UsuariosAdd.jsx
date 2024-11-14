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
    const [role, setRole] = useState('empleado'); // Estado para almacenar el rol
    const [contacto, setContacto] = useState(''); // Estado para almacenar el contacto

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
    const handleRegistro = () => {
        if (!validateInputs()) return;
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
                setError('Error al registrar el empleado. Inténtalo de nuevo.');
            });
    };

    
    return (
        <View style={styles.container}> {/*Contenedor principal*/}
            <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} /> 
            <Text style={styles.title}>Registro Usuarios</Text> 

            <InputField placeholder="Nombre" value={nombre} onChangeText={setNombre} error={error && !nombre ? error : ''} />
            <InputField placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} error={error && !apellidos ? error : ''} />
            <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" error={error && !email ? error : ''} />
            <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry error={error && !password ? error : ''} />
            <InputField placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={error && !confirmPassword ? error : ''} />
            <InputField placeholder="Número de contacto" value={contacto} onChangeText={setContacto} keyboardType="phone-pad" error={error && !contacto ? error : ''} />

            {error && <Text style={styles.errorMessage}>{error}</Text>}

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
    roleSelector: { // Estilo de los botones de rol
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        width: '100%',
    },
    roleButton: { // Estilo de cada botón de rol
        flex: 1,
        padding: 10,
        backgroundColor: '#304A6E',
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedRole: { // Estilo para el rol seleccionado
        backgroundColor: '#A4E168',
    },
    roleButtonText: { // Estilo del texto del botón de rol
        color: '#fff',
        fontWeight: 'bold',
    },
    errorMessage: { // Estilo del mensaje de error
        color: 'red',
        marginTop: 10,
    },
});

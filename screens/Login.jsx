import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import InputField from '../componentes/InputField'; 
import { loginWithEmail, loginWithGoogle } from '../componentes/authService'; // Asegúrate de que la ruta esté bien
import { auth } from '../Firebase'; // Asegúrate de que la configuración de Firebase esté correcta
import { doc, getDoc } from 'firebase/firestore';


export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkUserRole(user); // Verifica el rol del usuario si ya está logueado
      }
    });

    return () => unsubscribe();
  }, []);

  // Función que verifica el rol del usuario después de iniciar sesión
  const checkUserRole = async (user) => {
    const userRef = doc(db, 'empleados', user.uid); // Aquí puedes usar 'empresas' si el usuario es una empresa
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userRole = userData.role;

      if (userRole === 'empleado') {
        navigation.navigate('Home');
      } else if (userRole === 'empresa') {
        navigation.navigate('Home');
      } else if (userRole === 'Administrador') {
        navigation.navigate('homeAdmin');
      }
    }
  };

  // Maneja el inicio de sesión con correo y contraseña
  const handleLogin = () => {
    loginWithEmail(email, password)
      .then((userCredential) => {
        checkUserRole(userCredential.user); // Verifica el rol del usuario después del login
      })
      .catch((error) => {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
        console.error(error.message);
      });
  };

  // Maneja el inicio de sesión con Google
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((userCredential) => {
        checkUserRole(userCredential.user); // Verifica el rol del usuario después de iniciar sesión con Google
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
        setError('Error al iniciar sesión con Google.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imagenes/logoApp.png')} style={styles.logo} />
      <Text style={styles.title}>WorkMap</Text>
      <Text style={styles.subtitle}>Tu trabajo ideal, a un click de distancia</Text>

      {/* Campo de correo */}
      <InputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        error={error && !email ? error : ''}
      />

      {/* Campo de contraseña */}
      <InputField
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={error && !password ? error : ''}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
      </TouchableOpacity>

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Botón de inicio de sesión con Google */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image source={require('../assets/imagenes/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      {/* Botón para registrarse como usuario */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('UsuariosAdd')}>
        <Text style={styles.registerText}>Registrarse como Usuario</Text>
      </TouchableOpacity>

      {/* Botón para registrarse como empresa */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('EmpresaAdd')}>
        <Text style={styles.registerText}>Registrarse como Empresa</Text>
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
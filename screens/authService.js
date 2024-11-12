// authService.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Inicio de sesión con correo y contraseña
export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Registro de usuario
export const registerUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Registro de empresa (puedes usar la misma función o agregar lógica específica)
export const registerCompanyWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Inicio de sesión con Google
export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

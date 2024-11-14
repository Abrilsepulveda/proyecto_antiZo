//conexion a firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAMD34t8im7jqA4QLb4WfaPVOHeTYReycg",
  authDomain: "proyecto-antizo.firebaseapp.com",
  projectId: "proyecto-antizo",
  storageBucket: "proyecto-antizo.appspot.com",
  messagingSenderId: "150345699938",
  appId: "1:150345699938:web:be7872e3c8d083ecc0f73b",
  measurementId: "G-6PYJW9CEP1"
};



// Inicializar la aplicación
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Analytics
const analytics = getAnalytics(app);

// Inicializar Firebase Auth
const auth = getAuth(app);

// Inicializar Firestore
const db = getFirestore(app); 

// Exportar auth y db
export { auth, db }; 

// Importaciones necesarias para la navegación
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenedor de navegación
import MyStack from "../proyecto_antiZo/stack/MyStack";


// Componente principal de la app
export default function App() {
  return (
    <NavigationContainer>
      {/* Llamamos a MyStack*/}
      <MyStack />
    </NavigationContainer>
  );
}
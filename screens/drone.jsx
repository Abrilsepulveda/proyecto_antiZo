import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Imágenes 
const images = [
    require('jumbo.png'),
    require('shell.png'),
    require('paseo.png'),
    require('stock center.png'),
    require('todo moda.png'),
    require('niñofeliz.png'),
]
export default function DroneScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007aff" />
        </TouchableOpacity>
        <Text style={styles.title}>Drone</Text>
        <View style={styles.imageGrid}>
          {images.map((img, index) => (
            <Image key={index} source={img} style={styles.image} />
          ))}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e0f7fa', // Fondo en verde claro
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
    ,
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    color: '#4CAF50', // Color verde para el logo
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#AAAAAA', // Sombras como en la imagen
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 28,
    color: '#1E88E5', // Color azul para el título "Drone"
    fontWeight: 'bold',
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 8,
  },
});
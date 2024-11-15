import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Imágenes 
const images = [
    require('c:\Users\diore_dawekbr\Downloads\imagen jumbo.jpg'),
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
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function MapScreen() {
  const initialRegion = {
    latitude: -34.603722,
    longitude: -58.381592,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={MapView.PROVIDER_GOOGLE} // Usar Google Maps
      >
        <Marker
          coordinate={{ latitude: -34.603722, longitude: -58.381592 }}
          title="Ubicación 1"
          description="Descripción de la ubicación"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;

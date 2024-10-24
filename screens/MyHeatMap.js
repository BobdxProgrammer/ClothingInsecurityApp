import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Heatmap } from 'react-native-maps';

const Heatmap = () => {
  const points = [
    { latitude: 37.78825, longitude: -122.4324, weight: 1 },
    { latitude: 37.78845, longitude: -122.4344, weight: 1 },
    { latitude: 37.78865, longitude: -122.4364, weight: 1 },
    { latitude: 37.78925, longitude: -122.4320, weight: 1 },
    { latitude: 37.78835, longitude: -122.4310, weight: 1 },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Heatmap points={points} opacity={0.6} radius={20} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Heatmap;

import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const CountyScreen = () => {
  const nav = useNavigation();
  const route = useRoute();
  const [countiesMHI, setCountiesMHI] = useState({});
  const [countiesPOVALL, setCountiesPOVALL] = useState({});
  const [state, setState] = useState("");
  const [counties, setCounties] = useState([]); 
  const [coordinates, setCoordinates] = useState({});
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: route.params?.latitude || 38.906990,
    longitude: route.params?.longitude || -77.044416,
    latitudeDelta: 30,
    longitudeDelta: 30,
  });

  const fetchData = async () => {
    try {
      setState(route.params?.pass);
      const countiesList = route.params?.counties || []; 
      console.log("Initial CountiesList: ", countiesList);
      setCounties(countiesList);

      const response = await fetch("");//Paste your own API here
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const json = await response.json();
      const countiesMHI_list = {};
      const countiesPOVALL_list = {};

      json.forEach((item, index) => {
        if (index > 0) { 
          const countyName = item[1].trim();
          const stateAbbrev = item[0];
          const combinedKey = `${countyName}_${stateAbbrev}`;
          countiesMHI_list[combinedKey] = item[2];
          countiesPOVALL_list[combinedKey] = item[4];
        }
      });

      setCountiesMHI(countiesMHI_list);
      setCountiesPOVALL(countiesPOVALL_list);

      await fetchCoordinates(countiesList, route.params?.pass);
      
      const initialLatitude = route.params?.latitude;
      const initialLongitude = route.params?.longitude;

      if (initialLatitude && initialLongitude) {
        setMapRegion({
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      Alert.alert("Error", "There was a problem fetching data. Please try again.");
    }
  };

  const fetchCoordinates = async (countiesList, stateAbbrev) => {
    const coords = {};
    console.log("countiesList:", countiesList);
    try {
      for (const county of countiesList) {
        const trimmedCounty = county.trim();
        console.log("trimmedCounty:", trimmedCounty);
        console.log("stateAbbrev:", stateAbbrev);
        const response = await fetch(``);//Paste Your own API here
        if (!response.ok) {
          throw new Error(`Failed to fetch coordinates for ${trimmedCounty}`);
        }

        const data = await response.json();
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].location;
          coords[trimmedCounty] = { latitude: lat, longitude: lng };
        } else {
          console.log(`No results for ${trimmedCounty}, ${stateAbbrev}`);
        }
      }
      console.log("Fetched Coordinates:", coords);
      setCoordinates(coords);
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
      Alert.alert("Error", "There was a problem fetching coordinates. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params?.pass]);

  const getMarkerColor = (povertyRate) => {
    if (povertyRate < 5) return 'green';
    if (povertyRate < 10) return 'yellow';
    if (povertyRate < 15) return 'orange';
    return 'red';
  };

  const handleMarkerPress = (county) => {
    setSelectedCounty(county);
    const coords = coordinates[county];
    if (coords) {
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.7, 
        longitudeDelta: 0.7, 
      });
    }
  };

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.predictButton} onPress={() => nav.navigate("States")}>
        <Text style={styles.predictButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.infoText, { color: 'red' }]}>
        Counties with Poverty Rate above 20% are highlighted in red!
      </Text>
      <Text style={[styles.infoText, { color: 'orange' }]}>
        Counties with Poverty Rate between 15% and 20% are highlighted in orange!
      </Text>
      <Text style={[styles.infoText, { color: 'brown' }]}>
        Counties with Poverty Rate between 10% and 15% are highlighted in yellow!
      </Text>
      <Text style={[styles.infoText, { color: 'green' }]}>
        Counties with Poverty Rate below 10% are highlighted in green!
      </Text>
      <MapView
        style={styles.map}
        region={mapRegion}
      >
        {counties.length > 0 && counties.map((county) => {
          const povertyRate = countiesPOVALL[`${county}_${state}`];
          const color = getMarkerColor(povertyRate);
          const coords = coordinates[county];

          return coords ? (
            <Marker
              key={county}
              coordinate={coords}
              pinColor={color}
              onPress={() => handleMarkerPress(county)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          ) : null;
        })}
      </MapView>

      {selectedCounty && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>{selectedCounty}</Text>
          <Text>Poverty Rate: {countiesPOVALL[`${selectedCounty}_${state}`]}%</Text>
          <Text>Median Household Income: ${countiesMHI[`${selectedCounty}_${state}`]}</Text>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => nav.navigate('Predict', { selectedcounty: selectedCounty, selectedstate: state })}
          >
            <Text style={styles.popupButtonText}>Calculate Clothing Insecurity Index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => nav.navigate('Donate For A Cause', { selectedcounty: selectedCounty, selectedstate: state })}
          >
            <Text style={styles.popupButtonText}>See How You Can Help !</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#F0F4C3",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  predictButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
 },
 predictButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
 },
  popup: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  popupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CountyScreen;

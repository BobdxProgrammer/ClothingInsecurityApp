import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDhxA3CKtamkzvd-gyK0ewUDb7wDAWdHNc';

const DonationLocationsScreen = ({ route }) => {
  const nav = useNavigation();
  const selectedcounty = route.params?.selectedcounty;
  const selectedstate = route.params?.selectedstate;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const fetchPlaces = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = `clothing donation centers in ${selectedcounty}, ${selectedstate}`;
      const response = await axios.get(
        ``//Paste your own query
      );
      setPlaces(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePredictClothingNeeds = () => {
    setIsProcessing(true);
    setShowTable(false);

    setTimeout(() => {
      setIsProcessing(false);
      setShowTable(true);
    }, 2000);
  };

  const clothingNeedsData = [
    { clothingType: 'Jackets', gender: 'Male', age: '18-25', countsNeeded: 120 },
    { clothingType: 'Shirts', gender: 'Female', age: '18-25', countsNeeded: 100 },
    { clothingType: 'Pants', gender: 'Male', age: '25-40', countsNeeded: 150 },
    { clothingType: 'Shoes', gender: 'Female', age: '40-60', countsNeeded: 80 },
  ];

  const handleDonateToNonProfits = () => {
    nav.navigate('NonProfitOrganizations');
  };

  const handleDonateNow = () => {
    nav.navigate('DonateNow');
  };

  return (
    <View style={styles.viewContainer}>
      
      
      

      <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.popupButton} onPress={() => nav.goBack()}>
        <Text style={styles.popupButtonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.popupButton} onPress={handleDonateToNonProfits}>
        <Text style={styles.popupButtonText}>Donate to a Non Profit</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.popupButton} onPress={handleDonateNow}>
          <Text style={styles.popupButtonText}>Donate Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.popupButton} onPress={fetchPlaces}>
          <Text style={styles.popupButtonText}>Find Donation Centers</Text>
        </TouchableOpacity>
        {isProcessing && <ActivityIndicator size="large" color="#388E3C" style={styles.processingIndicator} />}
      {loading && <ActivityIndicator size="large" color="#388E3C" />}
      {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.placeItem}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeDetails}>Business Status: {item.business_status || 'N/A'}</Text>
            <Text style={styles.placeDetails}>Address: {item.formatted_address}</Text>
            {item.geometry?.location && (
              <Text style={styles.placeDetails}>
                Latitude: {item.geometry.location.lat}, Longitude: {item.geometry.location.lng}
              </Text>
            )}
            {item.photos && item.photos.length > 0 && (
              <Image
                style={styles.photo}
                source={{
                  uri: ``,//Paste your own url
                }}
              />
            )}
            <TouchableOpacity onPress={() => Linking.openURL(``)}>
              <Text style={styles.mapLink}>View on Map</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    padding: 10,
    backgroundColor: "#F0F4C3",
    flex: 1,
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
  backButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  backButtonText: {
    fontSize: 18,
    color: '#2E7D32',
  },
  processingIndicator: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  tableContainer: {
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#388E3C',
  },
  table: {
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#388E3C',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#388E3C',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
  },
  donateButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 2,
  },
  donateButtonText: {
    fontSize: 18,
    color: '#2E7D32',
  },
  buttonGroup: {
    marginVertical: 10,
  },
  fetchButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  fetchButtonText: {
    fontSize: 18,
    color: '#2E7D32',
  },
  donateNowButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    elevation: 2,
  },
  donateNowButtonText: {
    fontSize: 18,
    color: '#2E7D32',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  placeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  placeDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
  photo: {
    height: 100,
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
  },
  mapLink: {
    color: '#388E3C',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});

export default DonationLocationsScreen;

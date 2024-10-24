import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const DetailScreen = ({ route, navigation }) => {
  const { countyName, povertyRate, clothingNeedIndex } = route.params || {};


  if (!countyName || povertyRate === undefined || clothingNeedIndex === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid data provided!</Text>
      </View>
    );
  }


  const getClothingNeedStatus = (index) => {
    if (index >= 0 && index <= 0.3) {
      return "Sustainable";
    } else if (index > 0.3 && index <= 0.6) {
      return "Moderate";
    } else {
      return "High";
    }
  };


  const clothingNeedStatus = getClothingNeedStatus(clothingNeedIndex);


  const handleDonateClick = async () => {
    const apiKey = '';//Paste your own API key from Google
    const url = ``;//Pasteyour own url


    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        navigation.navigate('DonationCenters', { centers: data.results });
      } else {
        Alert.alert('No donation centers found');
      }
    } catch (error) {
      Alert.alert('Error fetching donation centers');
    }
  };


  const handleHelpClick = () => {
    navigation.navigate('Help');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.countyNameText}>{countyName}</Text>
        <Text style={styles.povertyRateText}>Poverty Rate: {povertyRate}%</Text>
      </View>


      <View style={styles.infoCard}>
        <Text style={styles.clothingNeedText}>Clothing Need Index: {clothingNeedIndex}</Text>
        <Text style={styles.clothingNeedStatusText}>Clothing Insecurity: {clothingNeedStatus}</Text>
      </View>


      <TouchableOpacity style={styles.button} onPress={handleDonateClick}>
        <MaterialIcons name="local-laundry-service" size={24} color="white" />
        <Text style={styles.helpButtonText}>Find Donation Centers Nearby</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.helpButton} onPress={handleHelpClick}>
        <Text style={styles.helpButtonText}>Help Those in Need</Text>
      </TouchableOpacity>


      <View style={styles.iconContainer}>
        {[
          'local-laundry-service',
          'checkroom',
          'store-mall-directory',
          'shopping-bag',
          'recycling',
        ].map((iconName, index) => (
          <MaterialIcons key={index} name={iconName} size={36} color="#28A745" style={styles.icon} />
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  countyNameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#343A40',
  },
  povertyRateText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#C82333',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 20,
  },
  clothingNeedText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#495057',
  },
  clothingNeedStatusText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 10,
  },
  helpButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  helpButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});


export default DetailScreen;




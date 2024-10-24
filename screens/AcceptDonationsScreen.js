import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { database } from '../firebase'; // Adjust the path as necessary
import { ref, set } from 'firebase/database'; // Import Firebase Database methods
import { getAuth } from 'firebase/auth';

const AcceptDonationsScreen = ({ navigation }) => {
  const nav = useNavigation();
  const auth = getAuth();

  const [donationData, setDonationData] = useState([
    { clothingType: '', gender: '', age: '', count: '' },
    { clothingType: '', gender: '', age: '', count: '' },
    { clothingType: '', gender: '', age: '', count: '' },
    { clothingType: '', gender: '', age: '', count: '' },
    { clothingType: '', gender: '', age: '', count: '' },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [thankYouMessageVisible, setThankYouMessageVisible] = useState(false);
  const [isDonationComplete, setIsDonationComplete] = useState(false);
  const userEmail = auth.currentUser ? auth.currentUser.email : null;

  const handleInputChange = (index, field, value) => {
    const newData = [...donationData];
    newData[index][field] = value;
    setDonationData(newData);
  };

  const handleDonateItems = async () => {
    setIsProcessing(true);
    setThankYouMessageVisible(false);

    setTimeout(() => {
      setIsProcessing(false);
      setThankYouMessageVisible(true);
      setIsDonationComplete(true); // Mark donation as complete
    }, 1000);

  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login'); // Redirect to login screen after sign out
      })
      .catch(error => alert(error.message));
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.predictButton} onPress={() => nav.goBack()}>
        <Text style={styles.predictButtonText}>Back</Text>
      </TouchableOpacity>

      {!isDonationComplete && (
        <>
          <Text style={styles.title}>Record the Donations</Text>
          <Text style={styles.backButtonText}>
            Your donations will be recorded. Please use options provided in previous screen to finish your donation.
          </Text>
          
          <View style={styles.table}>
            {donationData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <TextInput
                  style={styles.input}
                  value={row.clothingType}
                  onChangeText={(value) => handleInputChange(index, 'clothingType', value)}
                  placeholder="Cloth Type"
                />
                <TextInput
                  style={styles.input}
                  value={row.gender}
                  onChangeText={(value) => handleInputChange(index, 'gender', value)}
                  placeholder="Gender"
                />
                <TextInput
                  style={styles.input}
                  value={row.age}
                  onChangeText={(value) => handleInputChange(index, 'age', value)}
                  placeholder="Age"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={row.count}
                  onChangeText={(value) => handleInputChange(index, 'count', value)}
                  placeholder="Count"
                  keyboardType="numeric"
                />
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.predictButton} onPress={handleDonateItems}>
            <Text style={styles.predictButtonText}>Record the donation</Text>
          </TouchableOpacity>
        </>
      )}

      {isProcessing && <ActivityIndicator size="large" color="#388E3C" style={styles.processingIndicator} />}

      {thankYouMessageVisible && (
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouMessage}>THANK YOU! for the donation. You are building America a better place to live!!</Text>
          <Text style={styles.recordedMessage}>Your donations are recorded. You should expect to hear back from a Non Profit Organization soon.</Text>
        </View>
      )}

      {isDonationComplete && (
        <TouchableOpacity style={styles.predictButton} onPress={handleSignOut}>
          <Text style={styles.predictButtonText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F0F4C3",
    flex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  table: {
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '23%',
  },
  donateButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  donateButtonText: {
    fontSize: 16,
    color: '#2E7D32',
  },
  processingIndicator: {
    marginVertical: 20,
  },
  thankYouContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  thankYouMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recordedMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AcceptDonationsScreen;

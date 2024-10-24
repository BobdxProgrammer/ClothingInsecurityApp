import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'; // Import Firebase auth

// Import your local image
const backgroundImage = require(''); // Update the path to your image

const ClothingPredictionsScreen = ({ route, navigation }) => {
   const { clothingInsecurityIndex } = route.params;
   const nav = useNavigation();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const [showTable, setShowTable] = useState(false);

   // Define the linear model to predict clothing needs
   const linearModel = (seasonFactor, malePopulation, femalePopulation, kidsPopulation, adultPopulation) => {
      const coefficientSeason = 1.2;
      const coefficientMale = 0.8;
      const coefficientFemale = 0.9;
      const coefficientKids = 0.7;
      const coefficientAdults = 1.1;

      return (coefficientSeason * seasonFactor) +
             (coefficientMale * malePopulation) +
             (coefficientFemale * femalePopulation) +
             (coefficientKids * kidsPopulation) +
             (coefficientAdults * adultPopulation);
   };

   // Season factors that impact the clothing needs
   const seasonFactors = {
      'Summer': 0.7,
      'Winter': 1.5,
      'Fall': 1.0,
      'Spring': 0.9
   };

   // Sample clothing prediction data with demographics and gender
   const clothingPredictions = [
      { clothingType: 'T-Shirts', season: 'Summer', gender: 'Male', malePopulation: 100, femalePopulation: 120, kidsPopulation: 80, adultPopulation: 140 },
      { clothingType: 'T-Shirts', season: 'Summer', gender: 'Female', malePopulation: 100, femalePopulation: 120, kidsPopulation: 80, adultPopulation: 140 },
      { clothingType: 'Jackets', season: 'Winter', gender: 'Male', malePopulation: 100, femalePopulation: 120, kidsPopulation: 80, adultPopulation: 140 },
      { clothingType: 'Jackets', season: 'Winter', gender: 'Female', malePopulation: 90, femalePopulation: 130, kidsPopulation: 60, adultPopulation: 165 },
      { clothingType: 'Jeans', season: 'Fall', gender: 'Male', malePopulation: 110, femalePopulation: 115, kidsPopulation: 60, adultPopulation: 165 },
      { clothingType: 'Jeans', season: 'Fall', gender: 'Female', malePopulation: 105, femalePopulation: 125, kidsPopulation: 50, adultPopulation: 175 },
      { clothingType: 'Sweaters', season: 'Winter', gender: 'Male', malePopulation: 90, femalePopulation: 130, kidsPopulation: 50, adultPopulation: 170 },
      { clothingType: 'Sweaters', season: 'Winter', gender: 'Female', malePopulation: 100, femalePopulation: 120, kidsPopulation: 60, adultPopulation: 160 },
      { clothingType: 'Shoes', season: 'Spring', gender: 'Male', malePopulation: 105, femalePopulation: 95, kidsPopulation: 70, adultPopulation: 130 },
      { clothingType: 'Shoes', season: 'Spring', gender: 'Female', malePopulation: 110, femalePopulation: 100, kidsPopulation: 80, adultPopulation: 120 }
   ];

   // Apply the linear model to each clothing item to predict the counts
   const predictionsWithCounts = clothingPredictions.map(item => ({
      ...item,
      count: Math.round(linearModel(
         seasonFactors[item.season],
         item.malePopulation,
         item.femalePopulation,
         item.kidsPopulation,
         item.adultPopulation
      ))
   }));

   const handlePredictClothingNeeds = () => {
      setIsProcessing(true);
      setShowTable(false);

      setTimeout(() => {
         setIsProcessing(false);
         setShowTable(true);
      }, 2000);
   };

   const handleDonateNow = () => {
      nav.navigate('DonateNow');
   };

   const handleSignOut = () => {
      auth
         .signOut()
         .then(() => {
            nav.replace('Login'); 
         })
         .catch(error => alert(error.message));
   };

   return (
      <ImageBackground source={backgroundImage} style={styles.background}>
         <ScrollView contentContainerStyle={styles.overlay}>
            <Text style={styles.title}>Clothing Needs Predictions</Text>
            <Text style={styles.description}>
               Based on the Clothing Insecurity Index, here are the predicted clothing needs in the area based on an AI Model.
            </Text>
   
            
   
            <TouchableOpacity style={styles.predictButton} onPress={handlePredictClothingNeeds}>
               <Text style={styles.predictButtonText}>Tap here to see the clothing needs</Text>
            </TouchableOpacity>
            {isProcessing && <ActivityIndicator size="large" color="#388E3C" style={styles.processingIndicator} />}
            {showTable && (
               <>
                  <View style={styles.tableHeader}>
                     <Text style={[styles.tableHeaderText, { flex: 2 }]}>Clothing Type</Text>
                     <Text style={styles.tableHeaderText}>Season</Text>
                     <Text style={styles.tableHeaderText}>Gender</Text>
                     <Text style={styles.tableHeaderText}>Counts Needed</Text>
                  </View>
   
                  {predictionsWithCounts.map((item, index) => (
                     <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableRowText, { flex: 2 }]}>{item.clothingType}</Text>
                        <Text style={styles.tableRowText}>{item.season}</Text>
                        <Text style={styles.tableRowText}>{item.gender}</Text>
                        <Text style={styles.tableRowText}>{item.count}</Text>
                     </View>
                  ))}
               </>
            )}
   
            {/* Donate Now Button */}
            <TouchableOpacity style={styles.button} onPress={handleDonateNow}>
               <Text style={styles.buttonText}>Donate Now</Text>
            </TouchableOpacity>
   
            {/* Go Back Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
               <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
   
            {/* Sign Out Button */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
               <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
         </ScrollView>
      </ImageBackground>
   );
   
};

const styles = StyleSheet.create({
   background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   overlay: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', 
   },
   title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#ffffff',
      textAlign: 'center',
   },
   description: {
      fontSize: 16,
      marginBottom: 20,
      color: '#ffffff',
      textAlign: 'center',
   },
   processingIndicator: {
      marginVertical: 20,
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
   tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: '#ffffff',
      paddingBottom: 10,
   },
   tableHeaderText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      flex: 1,
   },
   tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   tableRowText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      flex: 1,
   },
   button: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
   },
   buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
   },
   signOutButton: {
      backgroundColor: '#FF6347',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
   },
   signOutButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
   },
});

export default ClothingPredictionsScreen;

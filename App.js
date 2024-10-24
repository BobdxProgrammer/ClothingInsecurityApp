import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import StateScreen from './screens/StateScreen';
import CountyScreen from './screens/CountyScreen';
import DonationLocationsScreen from './screens/DonationLocationsScreen';
import NonProfitScreen from './screens/NonProfitScreen';
import AcceptDonationsScreen from './screens/AcceptDonationsScreen';
import PredictClothingIndexScreen from './screens/PredictClothingIndexScreen';
import ClothingPredictionsScreen from './screens/ClothingPredictionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="States" component={StateScreen} />
        <Stack.Screen name="County" component={CountyScreen} />
        <Stack.Screen name="Donate For A Cause" component={DonationLocationsScreen} />
        <Stack.Screen name="DonateNow" component={AcceptDonationsScreen} />
        <Stack.Screen name="NonProfitOrganizations" component={NonProfitScreen} />
        <Stack.Screen name="Predict" component={PredictClothingIndexScreen} />
        <Stack.Screen name="ClothingPredictions" component={ClothingPredictionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
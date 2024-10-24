import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { auth } from '../firebase'; 

const backgroundImage = require('./assets/background.jpg'); 

const WelcomeScreen = ({ navigation }) => {
  const icons = [
    { name: 'local-laundry-service', color: '#ffffff' },
    { name: 'checkroom', color: '#ffffff' },
    { name: 'shopping-bag', color: '#ffffff' },
    { name: 'favorite', color: '#ffffff' },
    { name: 'people', color: '#ffffff' },
  ];

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Clothing Insecurity In America</Text>
        <Text style={styles.description}>
          Many individuals and families face clothing insecurity, lacking adequate and appropriate clothing. Your donations can make a difference!
        </Text>
        <Text style={styles.boldText}>
          More than 11% of Americans are living in poverty.
        </Text>
        <Text style={styles.boldText}>
          80% of American clothing never see the light of day.
        </Text>
        <View style={styles.iconContainer}>
          {icons.map((icon, index) => (
            <View key={index} style={styles.iconWrapper}>
              <MaterialIcons name={icon.name} size={60} color={icon.color} />
            </View>
          ))}
        </View>
        <CustomButton
          title="Let's Help America"
          onPress={() => navigation.navigate('States')} 
        />

        {/* Sign Out Button at the bottom */}
        <View style={styles.signOutButtonContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  signOutButtonContainer: {
    position: 'absolute', 
    bottom: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default WelcomeScreen;

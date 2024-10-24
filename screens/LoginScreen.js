import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('Welcome');
      })
      .catch(error => alert(error.message));
  };

  const handlePasswordReset = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent. Please check your inbox.');
      })
      .catch(error => {
        console.error("Error sending password reset email: ", error.message);
        alert(error.message);
      });
  };

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.gradientBackground}>
          <Text style={styles.appName}>CARECloset_</Text>
          <Text style={styles.tagline}>Predict & Donate to Address Clothing Insecurity</Text>

          <View>
            <MaterialIcons name="checkroom" size={80} color="#388E3C" style={styles.icon} />
          </View>

          <Text style={styles.description}>
            Help people in need by donating clothes through an AI-powered solution that identifies areas with clothing insecurity based on socio-economic factors.
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={24} color="#388E3C" style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholderTextColor="#388E3C"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={24} color="#388E3C" style={styles.icon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#388E3C"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePasswordReset} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#2E7D32',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#C8E6C9',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    marginTop: 10,
    borderColor: '#388E3C',
    borderWidth: 2,
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#388E3C',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonOutlineText: {
    color: '#388E3C',
    fontWeight: '700',
    fontSize: 18,
  },
  resetButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#388E3C',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

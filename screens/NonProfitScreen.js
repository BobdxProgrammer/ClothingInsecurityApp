import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const NonProfitScreen = () => {
  const nav = useNavigation();

  const nonProfits = [
    { name: 'Planet Aid', url: 'https://www.planetaid.org/find-a-bin' },
    { name: 'Nspire Outreach', url: 'https://nspireoutreach.org/nspire-clothing-drive.html' },
    { name: 'Schedule Pick Up here', url: 'https://donations.clothingpickupatl.com/register.aspx' },
    { name: 'Salvation Army', url: 'https://satruck.org/' },
    { name: 'Big Brother Big Sister', url: 'https://www.bbbsfoundation.org/' },
    { name: 'Epilepsy.com', url: 'https://www.epilepsy.com/give/donate-clothing-and-household-goods' },
    { name: 'Kohls', url: 'https://www.givebackbox.com/' },
    { name: 'Pickup Please', url: 'https://pickupplease.org/donation-pickup/' },
    { name: 'Purple Heart Foundation', url: 'https://purpleheartfoundation.org/clothing-donation/' },
    { name: 'Go Green Pick Up', url: 'https://scheduling.gogreendrop.com/pickup' },
    { name: 'One Warm Coat', url: 'https://www.onewarmcoat.org/' },
  ];

  const icons = [
    { name: 'local-laundry-service', color: '#388E3C' },
    { name: 'checkroom', color: '#388E3C' },
    { name: 'shopping-bag', color: '#388E3C' },
    { name: 'favorite', color: '#388E3C' },
    { name: 'people', color: '#388E3C' },
  ];

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.popupButton} onPress={() => nav.goBack()}>
        <Text style={styles.popupButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.popupButtonText}></Text>
      <Text style={styles.title}>Non-Profit Organizations</Text>

      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <View key={index} style={styles.iconWrapper}>
            <MaterialIcons name={icon.name} size={40} color={icon.color} />
          </View>
        ))}
      </View>

      <FlatList
        data={nonProfits}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.nonProfitItem}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.nonProfitName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
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
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: '#F0F4C3',
    borderRadius: 30,
    padding: 15,
    elevation: 2,
  },
  nonProfitItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 2,
  },
  nonProfitName: {
    color: '#388E3C',
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
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default NonProfitScreen;

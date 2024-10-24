import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const HelpScreen = () => {
  const [gender, setGender] = useState('male');
  const [season, setSeason] = useState('winter');
  const [selectedCategories, setSelectedCategories] = useState({});
  const [quantities, setQuantities] = useState({});
  const [otherType, setOtherType] = useState('');


  const clothingCategories = {
    Tops: ['T-shirts', 'Blouses', 'Shirts', 'Tank Tops'],
    Sweaters: ['Sweatshirts', 'Sweaters'],
    Dresses: ['Dresses', 'Formal Wear'],
    Outerwear: ['Coats', 'Jackets', 'Blazers', 'Raincoats', 'Overcoats'],
    Bottoms: ['Pants', 'Slacks', 'Jeans', 'Sweatpants', 'Skirts', 'Shorts'],
    Shoes: ['Shoes', 'Boots', 'Sandals'],
    Accessories: ['Hats', 'Gloves', 'Mittens', 'Scarves', 'Belts', 'Ties', 'Wallets'],
    Underwear: ['Underwear', 'Bras'],
    Sleepwear: ['Pajamas', 'Sleepwear'],
    Others: ['Other'],
  };


  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    if (!selectedCategories[category]) {
      setQuantities({ ...quantities, [category]: 1 });
    } else {
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[category];
      setQuantities(updatedQuantities);
    }
  };


  const handleDonate = () => {
    // Handle donation logic here
    Alert.alert('Donation Submitted', 'Thank you for your contribution!');
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help Those in Need</Text>


      <Text style={styles.label}>Gender:</Text>
      <Picker selectedValue={gender} style={styles.picker} onValueChange={(itemValue) => setGender(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>


      <Text style={styles.label}>Select Season:</Text>
      {['Winter', 'Spring', 'Summer', 'Fall'].map((seasonOption) => (
        <View key={seasonOption} style={styles.radioContainer}>
          <Text>{seasonOption}</Text>
          <input
            type="radio"
            value={seasonOption}
            checked={season === seasonOption}
            onChange={() => setSeason(seasonOption)}
          />
        </View>
      ))}


      <Text style={styles.label}>Clothing Categories:</Text>
      {Object.keys(clothingCategories).map((category) => (
        <View key={category} style={styles.checkboxContainer}>
          <Text>{category}</Text>
          <input
            type="checkbox"
            checked={selectedCategories[category] || false}
            onChange={() => handleCategoryChange(category)}
          />
          {selectedCategories[category] && (
            <View>
              {clothingCategories[category].map((item) => (
                <Text key={item} style={styles.item}>
                  {item}
                </Text>
              ))}
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity (1-20)"
                keyboardType="numeric"
                onChangeText={(value) => setQuantities({ ...quantities, [category]: value })}
              />
            </View>
          )}
        </View>
      ))}


      <Text style={styles.label}>Other (If any):</Text>
      <TextInput
        style={styles.input}
        value={otherType}
        onChangeText={setOtherType}
        placeholder="Enter clothing type"
      />


      <Button title="Donate" onPress={handleDonate} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxContainer: {
    marginVertical: 5,
  },
  item: {
    paddingLeft: 10,
  },
  quantityInput: {
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});


export default HelpScreen;






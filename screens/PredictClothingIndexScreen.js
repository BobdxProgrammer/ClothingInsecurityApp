import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PredictClothingIndexScreen = ({ route }) => {
   const selectedcounty = route.params?.selectedcounty;
   const selectedstate = route.params?.selectedstate;
   const nav = useNavigation();
   const datasets = {
      uninsuredCount: {
          "District of Columbia DC": "18257",
          "Bergen County NJ": "52077",
          "Burlington County NJ": "16551",
          "Camden County NJ": "31815",
          "Cape May County NJ": "2743",
          "Cumberland County NJ": "17553",
          "Essex County NJ": "94132",
          "Gloucester County NJ": "11133",
          "Hudson County NJ": "71462",
          "Hunterdon County NJ": "3213",
          "Mercer County NJ": "36394",
          "Middlesex County NJ": "69736",
          "Monmouth County NJ": "31951",
          "Morris County NJ": "20649",
          "Ocean County NJ": "26386",
          "Passaic County NJ": "60149",
          "Salem County NJ": "3376",
          "Somerset County NJ": "15041",
          "Sussex County NJ": "4698",
          "Union County NJ": "69737",
          "Warren County NJ": "4810",
      },
      homelessCount: {
          "District of Columbia DC": "489",
          "Bergen County NJ": "489",
          "Burlington County NJ": "489",
          "Camden County NJ": "489",
          "Cape May County NJ": "489",
          "Cumberland County NJ": "489",
          "Essex County NJ": "489",
          "Gloucester County NJ": "489",
          "Hudson County NJ": "489",
          "Hunterdon County NJ": "489",
          "Mercer County NJ": "489",
          "Middlesex County NJ": "489",
          "Monmouth County NJ": "489",
          "Morris County NJ": "489",
          "Ocean County NJ": "489",
          "Passaic County NJ": "489",
          "Salem County NJ": "489",
          "Somerset County NJ": "489",
          "Sussex County NJ": "489",
          "Union County NJ": "489",
          "Warren County NJ": "489",
      },
      ssiIncomeCount: {
          "District of Columbia DC": "16308",
          "Bergen County NJ": "16766",
          "Burlington County NJ": "13240",
          "Camden County NJ": "30433",
          "Cape May County NJ": "3608",
          "Cumberland County NJ": "12383",
          "Essex County NJ": "53120",
          "Gloucester County NJ": "9258",
          "Hudson County NJ": "42436",
          "Hunterdon County NJ": "1625",
          "Mercer County NJ": "14435",
          "Middlesex County NJ": "26510",
          "Monmouth County NJ": "14539",
          "Morris County NJ": "6939",
          "Ocean County NJ": "32585",
          "Passaic County NJ": "42161",
          "Salem County NJ": "3551",
          "Somerset County NJ": "6752",
          "Sussex County NJ": "2376",
          "Union County NJ": "21438",
          "Warren County NJ": "3069",
      },
      populationDensity: {
          "District of Columbia DC": "490",
          "Bergen County NJ": "4092",
          "Burlington County NJ": "582",
          "Camden County NJ": "2374",
          "Cape May County NJ": "371",
          "Cumberland County NJ": "311",
          "Essex County NJ": "6754", // Fixed comma issue
          "Gloucester County NJ": "948",
          "Hudson County NJ": "15010",
          "Hunterdon County NJ": "302",
          "Mercer County NJ": "1688",
          "Middlesex County NJ": "2776",
          "Monmouth County NJ": "1361",
          "Morris County NJ": "1096",
          "Ocean County NJ": "1036",
          "Passaic County NJ": "2775",
          "Salem County NJ": "193",
          "Somerset County NJ": "1143",
          "Sussex County NJ": "280",
          "Union County NJ": "5560",
          "Warren County NJ": "310",
      },
      unemploymentRateCount: {
          "District of Columbia DC": "5.9",
          "Bergen County NJ": "3.9",
          "Burlington County NJ": "3.9",
          "Camden County NJ": "4.8",
          "Cape May County NJ": "7.6",
          "Cumberland County NJ": "6.5",
          "Essex County NJ": "5.5",
          "Gloucester County NJ": "4.3",
          "Hudson County NJ": "4.4",
          "Hunterdon County NJ": "3.5",
          "Mercer County NJ": "3.9",
          "Middlesex County NJ": "4.1",
          "Monmouth County NJ": "3.8",
          "Morris County NJ": "3.7",
          "Ocean County NJ": "4.2",
          "Passaic County NJ": "5.5",
          "Salem County NJ": "5.5",
          "Somerset County NJ": "3.8",
          "Sussex County NJ": "4.3",
          "Union County NJ": "4.7",
          "Warren County NJ": "4.0",
      },
      povertyIndexCount: {
          "District of Columbia DC": "11.4",
          "Bergen County NJ": "7.0",
          "Burlington County NJ": "6.6",
          "Camden County NJ": "12.4",
          "Cape May County NJ": "9.6",
          "Cumberland County NJ": "15.5",
          "Essex County NJ": "15.6",
          "Gloucester County NJ": "7.6",
          "Hudson County NJ": "14.2",
          "Hunterdon County NJ": "4.1",
          "Mercer County NJ": "10.6",
          "Middlesex County NJ": "8.2",
          "Monmouth County NJ": "6.3",
          "Morris County NJ": "4.4",
          "Ocean County NJ": "11.2",
          "Passaic County NJ": "12.4",
          "Salem County NJ": "10.7",
          "Somerset County NJ": "5.1",
          "Sussex County NJ": "5.9",
          "Union County NJ": "9.6",
          "Warren County NJ": "7.0",
      },
      singleParentHouseHoldCount: {
          "District of Columbia DC": "5704",
          "Bergen County NJ": "17028",
          "Burlington County NJ": "10963",
          "Camden County NJ": "12630",
          "Cape May County NJ": "630",
          "Cumberland County NJ": "4207",
          "Essex County NJ": "30515",
          "Gloucester County NJ": "6602",
          "Hudson County NJ": "19134",
          "Hunterdon County NJ": "9655",
          "Mercer County NJ": "17259",
          "Middlesex County NJ": "17259",
          "Monmouth County NJ": "8322",
          "Morris County NJ": "5957",
          "Ocean County NJ": "7136",
          "Passaic County NJ": "14841",
          "Salem County NJ": "1898",
          "Somerset County NJ": "5550",
          "Sussex County NJ": "2266",
          "Union County NJ": "14967",
          "Warren County NJ": "1724",
      },
      highSchoolGraduateOnlyPercentCount: {
          "District of Columbia DC": "32.5",
          "Bergen County NJ": "20.7",
          "Burlington County NJ": "26.4",
          "Camden County NJ": "29.3", 
          "Cape May County NJ": "31.5",
          "Cumberland County NJ": "39.2",
          "Essex County NJ": "27.8",
          "Gloucester County NJ": "31.2",
          "Hudson County NJ": "23.8",
          "Hunterdon County NJ": "27.1",
          "Mercer County NJ": "23.8",
          "Middlesex County NJ": "26.7",
          "Monmouth County NJ": "24.2",
          "Morris County NJ": "22.3",
          "Ocean County NJ": "23.7",
          "Passaic County NJ": "27.9",
          "Salem County NJ": "29.5",
          "Somerset County NJ": "29.8",
          "Sussex County NJ": "21.6",
          "Union County NJ": "28.4",
          "Warren County NJ": "24.2",
      },
  };

   const mergeDatasets = () => {
      const mergedData = {};
      Object.keys(datasets.uninsuredCount).forEach((county) => {
          if (datasets.ssiIncomeCount[county]) {
              mergedData[county] = {
                  uninsured: convertToFloat(datasets.uninsuredCount)[county],
                  homeless: convertToFloat(datasets.homelessCount)[county],
                  ssiIncome: convertToFloat(datasets.ssiIncomeCount)[county],
                  populationDensity: convertToFloat(datasets.populationDensity)[county],
                  unemployment: convertToFloat(datasets.unemploymentRateCount)[county],
                  poverty: convertToFloat(datasets.povertyIndexCount)[county],
                  singleParent: convertToFloat(datasets.singleParentHouseHoldCount)[county],
                  highSchoolGrad: convertToFloat(datasets.highSchoolGraduateOnlyPercentCount)[county],
              };
          }
      });
      return mergedData;
  };

   const convertToFloat = (data) => {
      const result = {};
      for (const key in data) {
          result[key] = parseFloat(data[key]) || 0;
      }
      return result;
   };

   const calculateClothingInsecurityIndex = (mergedData, selectedcounty, selectedstate) => {
      const key = `${selectedcounty} ${selectedstate}`;
      console.log('Key for lookup:', key);
      const data = mergedData[key];
  
      if (data) {
          const maxValues = {
              uninsured: Math.max(...Object.values(mergedData).map(item => item.uninsured)),
              homeless: Math.max(...Object.values(mergedData).map(item => item.homeless)),
              ssiIncome: Math.max(...Object.values(mergedData).map(item => item.ssiIncome)),
              populationDensity: Math.max(...Object.values(mergedData).map(item => item.populationDensity)),
              unemployment: Math.max(...Object.values(mergedData).map(item => item.unemployment)),
              poverty: Math.max(...Object.values(mergedData).map(item => item.poverty)),
              singleParent: Math.max(...Object.values(mergedData).map(item => item.singleParent)),
              highSchoolGrad: Math.max(...Object.values(mergedData).map(item => item.highSchoolGrad)),
          };
  
          const minValues = {
              uninsured: Math.min(...Object.values(mergedData).map(item => item.uninsured)),
              homeless: Math.min(...Object.values(mergedData).map(item => item.homeless)),
              ssiIncome: Math.min(...Object.values(mergedData).map(item => item.ssiIncome)),
              populationDensity: Math.min(...Object.values(mergedData).map(item => item.populationDensity)),
              unemployment: Math.min(...Object.values(mergedData).map(item => item.unemployment)),
              poverty: Math.min(...Object.values(mergedData).map(item => item.poverty)),
              singleParent: Math.min(...Object.values(mergedData).map(item => item.singleParent)),
              highSchoolGrad: Math.min(...Object.values(mergedData).map(item => item.highSchoolGrad)),
          };
  
          console.log('Data:', data);
          console.log('Max Values:', maxValues);
          console.log('Min Values:', minValues);
  
          const normalizedUninsured = maxValues.uninsured !== minValues.uninsured 
              ? (data.uninsured - minValues.uninsured) / (maxValues.uninsured - minValues.uninsured) 
              : 0;
  
          const normalizedHomeless = maxValues.homeless !== minValues.homeless 
              ? (data.homeless - minValues.homeless) / (maxValues.homeless - minValues.homeless) 
              : 0;
  
          const normalizedSsiIncome = maxValues.ssiIncome !== minValues.ssiIncome 
              ? 1 - ((data.ssiIncome - minValues.ssiIncome) / (maxValues.ssiIncome - minValues.ssiIncome)) 
              : 0;
  
          const normalizedPopulationDensity = maxValues.populationDensity !== minValues.populationDensity 
              ? (data.populationDensity - minValues.populationDensity) / (maxValues.populationDensity - minValues.populationDensity) 
              : 0;
  
          const normalizedUnemployment = maxValues.unemployment !== minValues.unemployment 
              ? (data.unemployment - minValues.unemployment) / (maxValues.unemployment - minValues.unemployment) 
              : 0;
  
          const normalizedPoverty = maxValues.poverty !== minValues.poverty 
              ? (data.poverty - minValues.poverty) / (maxValues.poverty - minValues.poverty) 
              : 0;
  
          const normalizedSingleParent = maxValues.singleParent !== minValues.singleParent 
              ? (data.singleParent - minValues.singleParent) / (maxValues.singleParent - minValues.singleParent) 
              : 0;
  
          const normalizedHighSchoolGrad = maxValues.highSchoolGrad !== minValues.highSchoolGrad 
              ? 1 - ((data.highSchoolGrad - minValues.highSchoolGrad) / (maxValues.highSchoolGrad - minValues.highSchoolGrad)) 
              : 0;
  
          const rawIndex =
              normalizedUninsured * 0.15 +
              normalizedHomeless * 0.2 +
              normalizedSsiIncome * 0.15 +
              normalizedPopulationDensity * 0.1 +
              normalizedUnemployment * 0.1 +
              normalizedPoverty * 0.25 +
              normalizedSingleParent * 0.05 +
              normalizedHighSchoolGrad * 0.05;
  
          return Math.min(Math.max(rawIndex, 0), 1);
      } else {
          console.error('Data not found for key:', key);
          return null; 
      }
  };
  
  
  
  

   const [clothingInsecurityIndex, setClothingInsecurityIndex] = useState(null);

   useEffect(() => {
      const mergedData = mergeDatasets();
      const index = calculateClothingInsecurityIndex(mergedData, selectedcounty, selectedstate);
      
      if (index !== null) {
         setClothingInsecurityIndex(index);
      } else {
         console.warn(`No data found for ${selectedcounty} in ${selectedstate}.`);
         setClothingInsecurityIndex(null);
      }
   }, [selectedcounty, selectedstate]);

   const getIndexColor = (index) => {
      if (index > 0.5) return '#FF5722'; 
      if (index > 0.25) return '#FFC107'; 
      if (index > 0.1) return '#b5651d'; 
      return '#4CAF50'; 
   };

   const getSeverityText = (index) => {
      if (index > 0.5) return { text: 'Severe', color: '#FF5722' }; 
      if (index > 0.25) return { text: 'High', color: '#FFC107' }; 
      if (index > 0.1) return { text: 'Medium', color: '#b5651d' }; 
      return { text: 'Low', color: '#4CAF50' }; 
   };

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>Clothing Insecurity Index Prediction</Text>
         <Text style={styles.description}>
            The Clothing Insecurity Index is calculated using a model based on various socio-economic factors:
         </Text>

         {clothingInsecurityIndex !== null && (
            <View style={styles.resultContainer}>
               <Text style={styles.county}>County: {selectedcounty}</Text>
               <Text style={styles.county}>State: {selectedstate}</Text>
               <Text style={styles.county}></Text>
               <Text style={styles.county}>Clothing Insecurity Index:</Text>
               <Text style={[styles.result, { color: getIndexColor(clothingInsecurityIndex) }]}>
                  {clothingInsecurityIndex.toFixed(2)}
               </Text>
               <Text style={[styles.severityText, { color: getSeverityText(clothingInsecurityIndex).color }]}>
                  {getSeverityText(clothingInsecurityIndex).text}
               </Text>
            </View>
         )}
         <Text style={styles.county}></Text>
         <View style={styles.card}>
            <Text style={styles.cardTitle}>Data Points for the Calculations are:</Text>
            <View style={styles.dataPointsContainer}>
               {[
                  "Number of People with No Health Insurance in the County",
                  "Number of Homeless People in the County",
                  "Number of People living on SSI and Food Stamps in the County",
                  "Population Density of the County",
                  "Unemployment Rate in the County",
                  "Poverty Index in the County",
                  "Number of Households with Single Parent with Child under 18 years",
                  "Percentage of People with Education Attainment at High School Level",
                  "Median Household Income in the County",
               ].map((item, index) => (
                  <View key={index} style={styles.dataPoint}>
                     <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                     <Text style={styles.dataPointText}> {item}</Text>
                  </View>
               ))}
            </View>
         </View>
         <TouchableOpacity
            style={styles.predictButton}
            onPress={() => nav.navigate('ClothingPredictions', { clothingInsecurityIndex: clothingInsecurityIndex })}
         >
            <Text style={styles.predictButtonText}>View Clothing Needs Predictions</Text>
         </TouchableOpacity>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#F0F4C3',
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
   title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#3E2723',
   },
   
   description: {
      fontSize: 16,
      marginBottom: 20,
      color: '#3E2723',
   },
   card: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      elevation: 2,
      padding: 15,
      marginBottom: 20,
   },
   cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#3E2723',
   },
   dataPointsContainer: {
      marginBottom: 10,
   },
   dataPoint: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
   },
   dataPointText: {
      fontSize: 14,
      marginLeft: 5,
      color: '#3E2723',
   },
   county: {
      fontSize: 18,
      marginTop: 10,
      fontWeight: 'bold',
      color: '#3E2723',
   },
   resultContainer: {
      marginTop: 20,
      alignItems: 'center',
   },
   result: {
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
   },
   severityText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
   },
});

export default PredictClothingIndexScreen;

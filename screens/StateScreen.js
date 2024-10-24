import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const stateNames = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const StateScreen = () => {
  const nav = useNavigation();
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [averageMHI, setAverageMHI] = useState({});
  const [saePOV, setSAEPOV] = useState({});
  const [saePOVALL, setSAEPOVALL] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.census.gov/data/timeseries/poverty/saipe?time=2022&for=county:*&in=state:*&key=d43aae5fc3c0d64d56fd18cfaa382ddc8aaf85af&get=STABREV,NAME,SAEMHI_PT,SAEPOVALL_PT,SAEPOVRTALL_PT");
      const json = await response.json();
      const counties = {};
      const averages = {};
      const saes = {};
      const saesPOVALL_list = {};

      for (let inc = 1; inc < json.length; inc++) {
        const state = json[inc][0];
        const county = json[inc][1];
        const median = Number(json[inc][2]);
        const sae = Number(json[inc][3]);
        const saeALL = Number(json[inc][4]);

        if (!counties[state]) {
          counties[state] = [];
          averages[state] = { total: 0, count: 0 };
          saes[state] = { total: 0, count: 0 };
          saesPOVALL_list[state] = { total: 0, count: 0 };
        }
        counties[state].push(county);
        averages[state].total += median;
        averages[state].count += 1;
        saes[state].total += sae;
        saes[state].count += 1;
        saesPOVALL_list[state].total += saeALL;
        saesPOVALL_list[state].count += 1;
      }

      for (const state in averages) {
        averages[state] = Math.round(averages[state].total / averages[state].count);
      }
      for (const state in saes) {
        saes[state] = Math.round(saes[state].total / saes[state].count);
      }
      for (const state in saesPOVALL_list) {
        saesPOVALL_list[state] = Math.round(saesPOVALL_list[state].total / saesPOVALL_list[state].count);
      }

      setAverageMHI(averages);
      setSAEPOV(saes);
      setSAEPOVALL(saesPOVALL_list);
      setData(counties);
    } catch (e) {
      console.log("Error is: " + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dropdown = (state) => {
    setExpanded((prev) => ({ ...prev, [state]: !prev[state] }));
  };

  const handleNav = async (state, countyName) => {
    try {
      console.log(state);
      console.log(stateNames[state]);
      const response = await fetch(``);//Paste your own query
      console.log(response);
      const data1 = await response.json();
      
      const { lat, lng } = data1.results[0].location;
      
      let tempCounties = data[state];
      console.log("tempCounties ", tempCounties);
      nav.navigate("County", { counties: tempCounties, pass: state, countyName, latitude: lat, longitude: lng });
    } catch (error) {
      console.log("Error fetching coordinates: " + error);
    }
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.description}>
        Select the state, and discover the situation at a glance!
      </Text>
      <Text style={styles.backButtonText}>
        States with Poverty Rate above 15% are highlighted in red !!
      </Text>
      <FlatList
        data={Object.keys(data)}
        keyExtractor={(state) => state}
        renderItem={({ item: state }) => {
          const povertyRate = saePOVALL[state]; 
          const isHighPoverty = povertyRate > 15;

          return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.stateButton} onPress={() => dropdown(state)}>
                <Text style={[styles.stateText, isHighPoverty && styles.highPovertyText]}>
                  {stateNames[state] || state}
                </Text>
                <MaterialIcons name={expanded[state] ? "expand-less" : "expand-more"} size={24} color="#000" />
              </TouchableOpacity>
              {expanded[state] && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Average Median Household Income: <Text style={styles.highlight}>${averageMHI[state]}</Text>
                  </Text>
                  <Text style={styles.detailsText}>
                    Overall Population in Poverty: <Text style={styles.highlight}>{saePOV[state]}</Text>
                  </Text>
                  <Text style={styles.detailsText}>
                    Poverty Rate: <Text style={styles.highlight}>{povertyRate}%</Text>
                  </Text>
                  <TouchableOpacity style={styles.detailButton} onPress={() => handleNav(state, state)}>
                    <Text style={styles.detailButtonText}>View Counties</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#F0F4C3",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#C8E6C9', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  stateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  stateText: {
    color: "#388E3C", 
    fontSize: 18,
    fontWeight: 'bold',
  },
  highPovertyText: {
    color: 'red', 
  },
  backButtonText: {
    fontSize: 16,
    color: '#2E7D32', 
  },
  detailsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    borderColor: '#BDBDBD',
    borderWidth: 1,
  },
  detailsText: {
    fontSize: 14,
    color: '#424242',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#388E3C', 
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StateScreen;

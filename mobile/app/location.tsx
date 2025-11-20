import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,  
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 


const COUNTRIES = [
  'Gabon', 'Gambia', 'Germany', 'Ghana', 'Greece', 
  'Grenada', 'Guatemala', 'Guyana', 'Haiti', 'Honduras'
];

export default function LocationScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('Ghana'); 

  const filteredCountries = COUNTRIES.filter(country => 
    country.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCountry) {
      console.log("Selected Location:", selectedCountry);
      router.push('/login');
    } else {
      alert("Please select a location");
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = item === selectedCountry;
    
    return (
      <TouchableOpacity 
        style={[styles.countryItem, isSelected && styles.selectedItem]} 
        onPress={() => setSelectedCountry(item)}
      >
        <Text style={styles.countryText}>{item}</Text>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color="#000" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Status Bar padding */}
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Select your Location</Text>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="chevron-down" size={20} color="#888" />
        </View>

        {/* COUNTRY LIST */}
        <FlatList
          data={filteredCountries}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* GRADIENT BUTTON */}
        <TouchableOpacity onPress={handleContinue} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#FF007F', '#8B008B']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25, 
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12, 
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  selectedItem: {
    backgroundColor: '#E8E8E8', 
    borderColor: '#BBB',
  },
  countryText: {
    fontSize: 16,
    color: '#333',
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    marginBottom: 30,
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
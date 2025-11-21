import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, FlatList, 
  Dimensions, TouchableOpacity, SafeAreaView, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_SIZE = width / 3;

// MOCK DATA (Using Web URLs to make the grid look diverse instantly)
const EXPLORE_DATA = [
  { id: '1', image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17', views: '470K', title: 'A day in my life' },
  { id: '2', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', views: null },
  { id: '3', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', views: '1M' },
  { id: '4', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', views: '2.3M' },
  { id: '5', image: 'https://images.unsplash.com/photo-1554048612-387768052bf7', views: '270K', title: 'Photography Edition' },
  { id: '6', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf', views: '10K', title: 'Cooking Vlog' },
  { id: '7', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', views: null },
  { id: '8', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', views: '3.3M', title: 'GEM PODCAST' },
  { id: '9', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', views: null },
  { id: '10', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e', views: '3.3M', title: 'Creating MAGIC' },
  { id: '11', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f', views: '3.3M', title: 'Y2K Design' },
  { id: '12', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', views: null },
  { id: '13', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', views: '500K' },
  { id: '14', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', views: '12K' },
  { id: '15', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', views: null },
];

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      
      {/* OVERLAYS (Views & Title) */}
      {(item.views || item.title) && (
         <LinearGradient
           colors={['transparent', 'rgba(0,0,0,0.6)']}
           style={styles.overlay}
         >
            {item.title && (
              <Text style={styles.overlayTitle} numberOfLines={2}>{item.title}</Text>
            )}
            {item.views && (
              <View style={styles.viewsBadge}>
                <Ionicons name="eye" size={12} color="#FFF" style={{marginRight: 4}} />
                <Text style={styles.viewsText}>{item.views}</Text>
              </View>
            )}
         </LinearGradient>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* SEARCH BAR HEADER */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
           <Ionicons name="search" size={20} color="#888" />
           <TextInput
             style={styles.input}
             placeholder="Explore"
             placeholderTextColor="#888"
             value={searchText}
             onChangeText={setSearchText}
           />
        </View>
      </View>

      {/* GRID CONTENT */}
      <FlatList
        data={EXPLORE_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25, 
    paddingHorizontal: 15,
    height: 45,
    // Shadow for elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },

  // GRID STYLES
  gridItem: {
    width: COLUMN_SIZE,
    height: COLUMN_SIZE * 1.2, 
    padding: 1, 
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0, left: 1, right: 1,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  viewsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end', 
  },
  viewsText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  overlayTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});
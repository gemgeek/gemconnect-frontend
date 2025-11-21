import React, { useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  SafeAreaView, FlatList, Dimensions 
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsModal from '../../src/components/SettingsModal';
import { useRouter, useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMN_SIZE = width / 3;

// MOCK DATA FOR THE GRID 
const POSTS = [
  { id: '1', image: require('../../assets/images/feed_post1.png') },
  { id: '2', image: require('../../assets/images/gem_studio.png') },
  { id: '3', image: require('../../assets/images/feed_post1.png') }, 
  { id: '4', image: require('../../assets/images/gem_studio.png') },
  { id: '5', image: require('../../assets/images/story_me.jpg') },
  { id: '6', image: require('../../assets/images/feed_post1.png') },
  { id: '7', image: require('../../assets/images/gem_studio.png') },
  { id: '8', image: require('../../assets/images/feed_post1.png') },
  { id: '9', image: require('../../assets/images/story_me.jpg') },
];

export default function ProfileScreen() {
  const router = useRouter();

  // STATE FOR PROFILE DATA
  const [username, setUsername] = useState('ese_nam'); 
  const [fullName, setFullName] = useState('Matilda Esenam Gbeve');
  const [bio, setBio] = useState('Full-Stack Software Engineer 👑\nEvolving ✨');
  const [avatar, setAvatar] = useState<any>(require('../../assets/images/story_me.jpg')); 

  const [activeTab, setActiveTab] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // RELOAD DATA WHENEVER SCREEN IS FOCUSED
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const savedName = await AsyncStorage.getItem('name');
          const savedUser = await AsyncStorage.getItem('username');
          const savedBio = await AsyncStorage.getItem('bio');
          const savedAvatar = await AsyncStorage.getItem('avatar');

          if (savedName) setFullName(savedName);
          if (savedUser) setUsername(savedUser);
          if (savedBio) setBio(savedBio);
          if (savedAvatar) setAvatar({ uri: savedAvatar });
        } catch (e) {
          console.log("Error loading profile", e);
        }
      };
      loadProfile();
    }, [])
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      
      {/* AVATAR & STATS ROW */}
      <View style={styles.statsRow}>
        <LinearGradient
           colors={['#FF007F', '#8B008B']}
           style={styles.avatarRing}
        >
          <View style={styles.avatarBorder}>
            <Image source={avatar} style={styles.avatar} />
          </View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>36</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>36.9K</Text>
            <Text style={styles.statLabel}>followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>following</Text>
          </View>
        </View>
      </View>

      {/* NAME & BIO */}
      <View style={styles.bioContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Image 
             source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png'}} 
             style={styles.verifiedBadge} 
          />
        </View>
        <Text style={styles.bioText}>{bio}</Text>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionsContainer}>
        
        <TouchableOpacity 
          style={{ flex: 1, marginRight: 8 }}
          onPress={() => router.push('/edit-profile')}
        >
          <LinearGradient
            colors={['#FF007F', '#8B008B']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Edit profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, marginRight: 8 }}>
          <LinearGradient
            colors={['#FF007F', '#8B008B']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Share profile</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity>
          <LinearGradient
            colors={['#FF007F', '#8B008B']}
            style={styles.iconButton}
          >
             <Feather name="user-plus" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* CONTENT TABS */}
      <View style={styles.tabRow}>
        <TouchableOpacity 
          onPress={() => setActiveTab(0)} 
          style={[styles.tabItem, activeTab === 0 && styles.activeTab]}
        >
          <MaterialCommunityIcons name="grid" size={28} color={activeTab === 0 ? '#000' : '#999'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setActiveTab(1)} 
          style={[styles.tabItem, activeTab === 1 && styles.activeTab]}
        >
          <MaterialCommunityIcons name="movie-play-outline" size={28} color={activeTab === 1 ? '#000' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab(2)} 
          style={[styles.tabItem, activeTab === 2 && styles.activeTab]}
        >
          <MaterialCommunityIcons name="account-box-outline" size={28} color={activeTab === 2 ? '#000' : '#999'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP NAV BAR */}
      <View style={styles.topNav}>
        <View style={styles.navLeft}>
          <Feather name="lock" size={18} color="#000" />
          <Text style={styles.navUsername}>{username}</Text> 
        </View>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
         <Feather name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MAIN SCROLLABLE CONTENT */}
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Image source={item.image} style={styles.gridImage} resizeMode="cover" />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <SettingsModal 
        visible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  // Top Nav
  topNav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  navLeft: { flexDirection: 'row', alignItems: 'center' },
  navUsername: { fontSize: 20, fontWeight: 'bold', marginLeft: 5 },

  headerContent: { paddingHorizontal: 16 },

  // Stats Row
  statsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 10,
  },
  avatarRing: {
    width: 90, height: 90, borderRadius: 45,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarBorder: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
  },
  avatar: { width: 78, height: 78, borderRadius: 39 },

  statsContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-around', marginLeft: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  statLabel: { fontSize: 13, color: '#333' },

  // Bio
  bioContainer: { marginTop: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  fullName: { fontWeight: 'bold', fontSize: 15 },
  verifiedBadge: { width: 14, height: 14, marginLeft: 4 },
  bioText: { fontSize: 14, color: '#333', lineHeight: 20 },

  // Actions
  actionsContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 10 },
  gradientButton: {
    paddingVertical: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  iconButton: {
    width: 34, height: 34, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },

  // Tabs
  tabRow: { flexDirection: 'row', marginTop: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  tabItem: { flex: 1, alignItems: 'center', paddingBottom: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#000' },

  // Grid
  gridItem: { width: COLUMN_SIZE, height: COLUMN_SIZE, padding: 1 },
  gridImage: { width: '100%', height: '100%' },
});
import React from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity, 
  SafeAreaView, StatusBar, ScrollView 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// MOCK DATA 
const STORIES = [
  { id: '1', name: 'Kobbe', image: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', name: 'Tilly', image: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Ximena', image: 'https://i.pravatar.cc/150?img=1' },
  { id: '4', name: 'Ximena', image: 'https://i.pravatar.cc/150?img=9' }, 
];

const CHATS = [
  { 
    id: '1', 
    name: 'Matilda Esenam', 
    message: 'Senior Developer, USA', 
    time: '10:10 am', 
    avatar: require('../../assets/images/story_me.jpg') 
  },
  { 
    id: '2', 
    name: 'Emmanuel Mensah', 
    message: 'CEO, Plutus Painting', 
    time: '11/11/2025', 
    avatar: 'https://i.pravatar.cc/150?img=11' 
  },
  { 
    id: '3', 
    name: 'Kingsley Donkor', 
    message: 'Business Developer', 
    time: '11/11/2025', 
    avatar: 'https://i.pravatar.cc/150?img=8' 
  },
  { 
    id: '4', 
    name: 'Adjoa Tilly', 
    message: 'Fullstack Developer', 
    time: '03/11/2025', 
    avatar: 'https://i.pravatar.cc/150?img=5' 
  },
  { 
    id: '5', 
    name: 'Gem Geek', 
    message: 'Backend Engineer', 
    time: '01/11/2025', 
    avatar: require('../../assets/images/gem_studio.png') 
  },
  { 
    id: '6', 
    name: 'Gem Ese', 
    message: 'Graphic Designer', 
    time: '18/10/2025', 
    avatar: 'https://i.pravatar.cc/150?img=1' 
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderStory = ({ item }: { item: any }) => (
    <View style={styles.storyItem}>
      <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.gradientRing}>
        <View style={styles.whiteBorder}>
          <Image source={{ uri: item.image }} style={styles.storyImage} />
        </View>
      </LinearGradient>
      <Text style={styles.storyName}>{item.name}</Text>
    </View>
  );

  const renderChat = ({ item }: { item: any }) => {
     // Handle local vs remote image
     const source = typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar;

     return (
      <TouchableOpacity 
        style={styles.chatRow} 
        onPress={() => router.push({ pathname: '/chat', params: { name: item.name } })}
      >
        <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.avatarRing}>
           <View style={styles.avatarBorder}>
             <Image source={source} style={styles.chatAvatar} />
           </View>
        </LinearGradient>
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
          <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
           <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.iconButton}>
           <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* STORIES / STATUS */}
      <View style={styles.storiesContainer}>
         <View style={styles.searchCircle}>
            <Ionicons name="search" size={24} color="#666" />
         </View>
         <FlatList 
           data={STORIES}
           horizontal
           showsHorizontalScrollIndicator={false}
           renderItem={renderStory}
           keyExtractor={item => item.id}
         />
      </View>

      {/* CHAT LIST */}
      <FlatList
        data={CHATS}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' }, 

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFF'
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  iconButton: { padding: 5 },

  storiesContainer: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, 
    paddingHorizontal: 20, backgroundColor: '#FFF', marginBottom: 10
  },
  searchCircle: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 1, borderColor: '#DDD',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  storyItem: { alignItems: 'center', marginRight: 15 },
  gradientRing: {
    width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center',
  },
  whiteBorder: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF', 
    justifyContent: 'center', alignItems: 'center',
  },
  storyImage: { width: 52, height: 52, borderRadius: 26 },
  storyName: { fontSize: 12, marginTop: 4, color: '#333' },

  listContent: { backgroundColor: '#FFF' }, // List background white
  chatRow: {
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15,
    alignItems: 'center', backgroundColor: '#F5F5F5', marginBottom: 2 // Light grey rows
  },
  avatarRing: {
    width: 54, height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  avatarBorder: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', 
    justifyContent: 'center', alignItems: 'center',
  },
  chatAvatar: { width: 46, height: 46, borderRadius: 23 },
  
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  chatTime: { fontSize: 12, color: '#999' },
  chatMessage: { fontSize: 14, color: '#666' },

  separator: { height: 1, backgroundColor: '#EEE', marginLeft: 90 }
});
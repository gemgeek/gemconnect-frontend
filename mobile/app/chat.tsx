import React from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, TextInput, 
  SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// MOCK MESSAGES for the conversation
const MESSAGES = [
  { id: '1', text: 'Hi Emmanuel, can you help me? It\'s a bit urgent', isMe: true, time: '10:10 am' },
  { id: '2', text: 'Hello Tilly, tell me. What is it that you need. let me know, I am here to help with anything so feel free okay.', isMe: false, time: '10:10 am' },
  { id: '3', text: 'Will you be attending the upcoming event?', isMe: true, time: '10:10 am' },
  { id: '4', text: 'Yes Tilly, I will be there. Anything you need me to get you?', isMe: false, time: '10:10 am' },
  { id: '5', text: 'I was wondering if you could get me some materials for my painting... (long text truncated)', isMe: true, time: '10:10 am' },
  { id: '6', text: 'Okay Tilly, that\'s fine. I will do so.', isMe: false, time: '10:10 am' },
  { id: '7', text: 'Thank you so much! You\'re a life saver!', isMe: true, time: '10:10 am' },
  { id: '8', text: 'Welcome Tilly.', isMe: false, time: '10:10 am' },
];

export default function ChatScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); 

  const renderMessage = ({ item }: { item: any }) => {
    // Avatars
    const myAvatar = require('../assets/images/story_me.jpg');
    const theirAvatar = { uri: 'https://i.pravatar.cc/150?img=11' }; 

    return (
      <View style={[styles.messageRow, item.isMe ? styles.myRow : styles.theirRow]}>
        
        {/* SHOW AVATAR ON LEFT IF IT'S THEM */}
        {!item.isMe && (
          <View style={styles.avatarContainer}>
             <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.ring}>
                <Image source={theirAvatar} style={styles.avatar} />
             </LinearGradient>
          </View>
        )}

        {/* MESSAGE BUBBLE */}
        <View style={styles.bubbleContainer}>
          {item.isMe ? (
             <LinearGradient
               colors={['#FF007F', '#8B008B']}
               start={{x: 0, y: 0}} end={{x: 1, y: 0}}
               style={[styles.bubble, styles.myBubble]}
             >
                <Text style={styles.myText}>{item.text}</Text>
             </LinearGradient>
          ) : (
             <View style={[styles.bubble, styles.theirBubble]}>
                <Text style={styles.theirText}>{item.text}</Text>
             </View>
          )}
        </View>

        {/* SHOW AVATAR ON RIGHT IF IT'S ME */}
        {item.isMe && (
          <View style={styles.avatarContainer}>
             <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.ring}>
                <Image source={myAvatar} style={styles.avatar} />
             </LinearGradient>
          </View>
        )}

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{padding: 5}}>
           <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name || 'Chat'}</Text>
        <View style={styles.headerIcons}>
           <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="call" size={24} color="#FF007F" />
           </TouchableOpacity>
           <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="videocam" size={24} color="#FF007F" />
           </TouchableOpacity>
        </View>
      </View>

      {/* MESSAGES LIST */}
      <FlatList
        data={MESSAGES}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* INPUT AREA */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
           <TouchableOpacity><Ionicons name="add-circle-outline" size={28} color="#999" /></TouchableOpacity>
           <TextInput 
             style={styles.input} 
             placeholder="Message..." 
             placeholderTextColor="#999"
           />
           <TouchableOpacity><Ionicons name="camera-outline" size={26} color="#999" /></TouchableOpacity>
           <TouchableOpacity><Ionicons name="mic-outline" size={26} color="#999" /></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0'
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 15 },

  listContent: { paddingVertical: 20, paddingHorizontal: 10 },

  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 20 },
  myRow: { justifyContent: 'flex-end' },
  theirRow: { justifyContent: 'flex-start' },

  avatarContainer: { marginHorizontal: 8, marginBottom: 5 },
  ring: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFF' },

  bubbleContainer: { maxWidth: '70%' },
  bubble: { padding: 12, borderRadius: 18 },
  myBubble: { borderBottomRightRadius: 4 }, // Hook effect
  theirBubble: { backgroundColor: '#E5E5EA', borderBottomLeftRadius: 4 },

  myText: { color: '#FFF', fontSize: 15 },
  theirText: { color: '#000', fontSize: 15 },

  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#EEE',
    marginBottom: Platform.OS === 'ios' ? 0 : 10
  },
  input: {
    flex: 1, height: 40, backgroundColor: '#F2F2F2', borderRadius: 20,
    paddingHorizontal: 15, marginHorizontal: 10, fontSize: 16
  },
});
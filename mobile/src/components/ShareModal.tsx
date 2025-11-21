import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Modal, TouchableOpacity, Image, 
  TextInput, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

// MOCK FRIENDS 
const FRIENDS = [
  { id: '1', name: 'Kobbe Mensah', image: require('../../assets/images/story_dynamis.png'), selected: false },
  { id: '2', name: 'Gem Tilly', image: require('../../assets/images/story_gem.jpg'), selected: false },
  { id: '3', name: 'Ximena Ese', image: require('../../assets/images/story_ximena.jpg'), selected: false },
  { id: '4', name: 'GEM STUDIO', image: require('../../assets/images/gem_studio.png'), selected: false }, 
  { id: '5', name: 'Yo! GEM', image: require('../../assets/images/gem_studio.png'), selected: false },
  { id: '6', name: 'Dr. Ray', image: require('../../assets/images/story_kofi.jpg'), selected: false },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ShareModal({ visible, onClose }: Props) {
  const [searchText, setSearchText] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Tap backdrop to close */}
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        {/* BOTTOM SHEET */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.sheet}>
          
          {/* HANDLE BAR */}
          <View style={styles.handleContainer}>
             <View style={styles.handle} />
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" style={{marginRight: 8}} />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <TouchableOpacity style={styles.groupIcon}>
               <Feather name="users" size={22} color="#333" />
               <View style={styles.plusBadge}><Text style={styles.plusText}>+</Text></View>
            </TouchableOpacity>
          </View>

          {/* FRIENDS GRID (Horizontal Scroll in Rows) */}
          <View style={styles.friendsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 15}}>
               {FRIENDS.map((friend) => (
                 <TouchableOpacity key={friend.id} style={styles.friendItem}>
                    <View style={styles.avatarContainer}>
                       {/* Handle local or remote images */}
                       <Image 
                         source={typeof friend.image === 'string' ? { uri: friend.image } : friend.image} 
                         style={styles.avatar} 
                       />
                       {friend.id === '1' || friend.id === '2' || friend.id === '4' ? (
                          <Image 
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png'}} 
                            style={styles.verified} 
                          />
                       ) : null}
                    </View>
                    <Text style={styles.friendName} numberOfLines={2}>{friend.name}</Text>
                 </TouchableOpacity>
               ))}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          {/* ACTION BUTTONS (Big Circles) */}
          <View style={styles.actionsContainer}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 15}}>
                
                {/* Add to Story */}
                <TouchableOpacity style={styles.actionItem}>
                   <View style={styles.circleIcon}>
                      <Ionicons name="add-circle-outline" size={32} color="#333" />
                   </View>
                   <Text style={styles.actionLabel}>Add to story</Text>
                </TouchableOpacity>

                {/* Copy Link */}
                <TouchableOpacity style={styles.actionItem}>
                   <View style={[styles.circleIcon, {backgroundColor: '#EEE'}]}>
                      <Feather name="link" size={28} color="#333" />
                   </View>
                   <Text style={styles.actionLabel}>Copy link</Text>
                </TouchableOpacity>

                {/* WhatsApp */}
                <TouchableOpacity style={styles.actionItem}>
                   <View style={[styles.circleIcon, {backgroundColor: '#25D366'}]}>
                      <FontAwesome name="whatsapp" size={32} color="#FFF" />
                   </View>
                   <Text style={styles.actionLabel}>WhatsApp{'\n'}Status</Text>
                </TouchableOpacity>

                {/* Share To */}
                <TouchableOpacity style={styles.actionItem}>
                   <View style={[styles.circleIcon, {backgroundColor: '#EEE'}]}>
                      <Feather name="share" size={28} color="#333" />
                   </View>
                   <Text style={styles.actionLabel}>Share to...</Text>
                </TouchableOpacity>

             </ScrollView>
          </View>

        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 30 },
  
  handleContainer: { alignItems: 'center', paddingTop: 10, paddingBottom: 5 },
  handle: { width: 40, height: 4, backgroundColor: '#CCC', borderRadius: 2 },

  searchRow: { flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', marginTop: 10 },
  searchContainer: { 
    flex: 1, flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#F0F0F0', borderRadius: 10, paddingHorizontal: 10, height: 40 
  },
  input: { flex: 1, fontSize: 16 },
  groupIcon: { marginLeft: 15, justifyContent: 'center', alignItems: 'center' },
  plusBadge: { position: 'absolute', top: -2, right: -4, backgroundColor: '#333', borderRadius: 5, width: 10, height: 10, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },

  friendsContainer: { marginTop: 20, height: 110 },
  friendItem: { alignItems: 'center', marginRight: 20, width: 70 },
  avatarContainer: { marginBottom: 5 },
  avatar: { width: 54, height: 54, borderRadius: 27 },
  verified: { width: 14, height: 14, position: 'absolute', bottom: 0, right: 0 },
  friendName: { fontSize: 12, textAlign: 'center', color: '#333' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },

  actionsContainer: { marginTop: 10 },
  actionItem: { alignItems: 'center', marginRight: 25, width: 70 },
  circleIcon: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#F0F0F0', 
    alignItems: 'center', justifyContent: 'center', marginBottom: 8 
  },
  actionLabel: { fontSize: 12, textAlign: 'center', color: '#333' },
});
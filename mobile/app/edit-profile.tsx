import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, 
  SafeAreaView, ScrollView, Modal, Alert 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState('Matilda Esenam Gbeve');
  const [username, setUsername] = useState('ese_nam');
  const [pronouns, setPronouns] = useState('She/Her');
  const [bio, setBio] = useState('Full-Stack Software Engineer 👑\nEvolving ✨');
  const [avatar, setAvatar] = useState<any>(require('../assets/images/story_me.jpg')); 
  
  // Modal State
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);

  // Load existing data when screen opens
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedBio = await AsyncStorage.getItem('bio');
        const savedAvatar = await AsyncStorage.getItem('avatar');

        if (savedName) setName(savedName);
        if (savedUsername) setUsername(savedUsername);
        if (savedBio) setBio(savedBio);
        if (savedAvatar) setAvatar({ uri: savedAvatar });
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    };
    loadData();
  }, []);

  // SAVE FUNCTION
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('bio', bio);
      
      if (avatar.uri) {
        await AsyncStorage.setItem('avatar', avatar.uri);
      }

      Alert.alert("Success", "Profile updated!", [
        { text: "OK", onPress: () => router.back() } 
      ]);
    } catch (e) {
      Alert.alert("Error", "Failed to save changes");
    }
  };

  // IMAGE PICKER LOGIC
  const pickImage = async (useCamera: boolean = false) => {
    const permissionResult = useCamera 
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "We need access to change your photo!");
      return;
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.5 });

    if (!result.canceled) {
      setAvatar({ uri: result.assets[0].uri }); 
      setShowPhotoSheet(false);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar(require('../assets/images/story_me.jpg')); 
    AsyncStorage.removeItem('avatar'); // Remove saved avatar
    setShowPhotoSheet(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
           <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <TouchableOpacity onPress={handleSave}>
           <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* PROFILE PICTURE */}
        <View style={styles.avatarSection}>
          <Image source={avatar} style={styles.avatar} />
          <TouchableOpacity onPress={() => setShowPhotoSheet(true)}>
            <Text style={styles.changePhotoText}>Edit profile picture</Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input} 
              value={username} 
              onChangeText={setUsername} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pronouns</Text>
            <TextInput 
              style={styles.input} 
              value={pronouns} 
              onChangeText={setPronouns} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput 
              style={styles.input} 
              value={bio} 
              onChangeText={setBio} 
              multiline
            />
          </View>

          {/* Placeholders */}
          <TouchableOpacity style={styles.linkRow}>
             <Text style={styles.label}>Links</Text>
             <View style={{flex: 1}} />
             <Text style={styles.placeholderText}>Add links</Text>
             <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow}>
             <Text style={styles.label}>Banners</Text>
             <View style={{flex: 1}} />
             <Text style={styles.placeholderText}>Add banners</Text>
             <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* PHOTO BOTTOM SHEET */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPhotoSheet}
        onRequestClose={() => setShowPhotoSheet(false)}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} onPress={() => setShowPhotoSheet(false)} />
          
          <View style={styles.sheet}>
             <View style={styles.sheetHeader}>
               <View style={styles.handle} />
               <Image source={avatar} style={styles.sheetAvatar} />
             </View>
             <View style={styles.divider} />
             <Text style={styles.sheetDescription}>
               Change your profile photo here.
             </Text>

             <TouchableOpacity style={styles.sheetOption} onPress={() => pickImage(false)}>
                <Ionicons name="image-outline" size={28} color="#000" />
                <Text style={styles.optionText}>Choose from library</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.sheetOption} onPress={() => pickImage(true)}>
                <Ionicons name="camera-outline" size={28} color="#000" />
                <Text style={styles.optionText}>Take photo</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.sheetOption} onPress={handleRemovePhoto}>
                <Feather name="trash-2" size={28} color="#FF3B30" />
                <Text style={[styles.optionText, {color: '#FF3B30'}]}>Remove current picture</Text>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 17, fontWeight: '600' },
  cancelText: { fontSize: 16, color: '#000' },
  doneText: { fontSize: 16, color: '#007AFF', fontWeight: '600' }, // Blue Done button

  content: { paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  changePhotoText: { color: '#FF007F', fontSize: 16, fontWeight: '500' },

  form: { paddingHorizontal: 15 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EFEFEF', paddingVertical: 15 },
  label: { width: 100, fontSize: 16, color: '#000' },
  input: { flex: 1, fontSize: 16, color: '#000' },
  
  linkRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EFEFEF', paddingVertical: 15 },
  placeholderText: { fontSize: 16, color: '#999', marginRight: 5 },

  // MODAL
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 40, paddingHorizontal: 20 },
  sheetHeader: { alignItems: 'center', paddingTop: 10 },
  handle: { width: 40, height: 4, backgroundColor: '#CCC', borderRadius: 2, marginBottom: 15 },
  sheetAvatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#EEE', width: '100%', marginBottom: 15 },
  sheetDescription: { textAlign: 'center', color: '#666', fontSize: 12, marginBottom: 25 },
  sheetOption: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  optionText: { fontSize: 17, marginLeft: 15 },
});
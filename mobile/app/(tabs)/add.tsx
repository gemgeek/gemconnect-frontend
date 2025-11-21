import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, 
  SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client/react';
import { CREATE_POST } from '../../src/graphql/mutations';

export default function AddPostScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null); 
  const [caption, setCaption] = useState('');
  
  // SETUP MUTATION
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: (data: any) => {
      Alert.alert("Success", "Post uploaded successfully!");
      setImage(null);
      setBase64Image(null);
      setCaption('');
      router.push('/(tabs)');
    },
    onError: (error: any) => {
      Alert.alert("Upload Failed", error.message);
    }
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Access needed to upload photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.7, 
      base64: true, 
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Format needs to be: "data:image/jpeg;base64,..."
      const b64 = `data:${result.assets[0].mimeType || 'image/jpeg'};base64,${result.assets[0].base64}`;
      setBase64Image(b64);
    }
  };

  const handlePost = () => {
    if (!caption && !image) {
      Alert.alert("Missing Info", "Please add a photo or a caption.");
      return;
    }

    // CALL MUTATION
    createPost({
      variables: {
        content: caption,
        imageData: base64Image // Sending the string!
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          
          <View style={styles.header}>
            <Text style={styles.headerTitle}>New Post</Text>
            <TouchableOpacity onPress={() => { setImage(null); setCaption(''); }}>
               <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.placeholder}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="camera-outline" size={40} color="#888" />
                  </View>
                  <Text style={styles.placeholderText}>Tap to select a photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.input}
                placeholder="Write a caption..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={caption}
                onChangeText={setCaption}
              />
            </View>

            <TouchableOpacity 
              onPress={handlePost} 
              disabled={loading}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={loading ? ['#DDD', '#CCC'] : ['#FF007F', '#8B008B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Share Post</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  clearText: { fontSize: 16, color: '#888' },
  content: { padding: 20 },
  imagePicker: { width: '100%', height: 350, backgroundColor: '#F8F8F8', borderRadius: 15, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#EEE', borderStyle: 'dashed' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EFEFEF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  placeholderText: { color: '#888', fontSize: 16 },
  inputContainer: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
  input: { backgroundColor: '#F9F9F9', borderRadius: 12, padding: 15, fontSize: 16, height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#EEE' },
  buttonContainer: { shadowColor: "#FF007F", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  gradientButton: { paddingVertical: 15, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
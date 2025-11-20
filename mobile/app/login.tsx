import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { useMutation } from '@apollo/client/react';
import { LOGIN_USER } from '../src/graphql/mutations';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // LOGIN MUTATION SETUP
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async (data: any) => {
      // GET THE TOKEN
      const token = data.tokenAuth.token;
      
      console.log("Login Success! Token:", token);

      try {
        // SAVE THE TOKEN
        await AsyncStorage.setItem('token', token);
        
        await AsyncStorage.setItem('username', email); 

        Alert.alert("Success", "Login Successful!");
        // router.replace('/(tabs)/feed'); 
      } catch (e) {
        console.error("Saving error", e);
      }
    },
    onError: (error: any) => {
      Alert.alert("Login Failed", error.message);
    }
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    // NOTE: Your backend logic uses 'username' for login, 
    // but your design uses 'email'. 
    // If your Django setup allows email login, send email.
    // If it requires username, we might need to adjust.
    // Let's try sending email as the username first (common Django setup).
    
    loginUser({
      variables: {
        username: email, // Sending email as the username field
        password: password
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        <Text style={styles.header}>Log In</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email or Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email or username"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.linkHighlight}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleLogin} 
          style={styles.buttonWrapper}
          disabled={loading}
        >
          <LinearGradient
            colors={['#FF007F', '#8B008B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={30} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
              style={{ width: 30, height: 30 }} 
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 60, height: 60 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#000' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  linkText: { color: '#888' },
  linkHighlight: { color: '#FF007F', fontWeight: 'bold' },
  buttonWrapper: {
    height: 55,
    marginBottom: 30,
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 28 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  orText: { marginHorizontal: 10, color: '#888', fontWeight: '500' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialButton: { padding: 10 },
});
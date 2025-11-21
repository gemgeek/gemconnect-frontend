import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Image, KeyboardAvoidingView, Platform, ScrollView,
  Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMutation } from '@apollo/client/react';
import { LOGIN_USER } from '../src/graphql/mutations';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: async (data: any) => {
      const token = data.tokenAuth.token;
      console.log("Login Success! Token:", token);

      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('username', username); 
        Alert.alert("Success", "Login Successful!");
        router.replace('/(tabs)'); 
      } catch (e) {
        console.error("Saving error", e);
      }
    },
    onError: (error: any) => {
      Alert.alert("Login Failed", error.message);
    }
  });

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }
    
    loginUser({
      variables: {
        username: username,
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
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible} 
            />
            <TouchableOpacity 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
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
    borderWidth: 1, borderColor: '#DDD', borderRadius: 12,
    padding: 15, fontSize: 16, backgroundColor: '#FFF',
  },
  
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, 
    borderColor: '#DDD', borderRadius: 12, backgroundColor: '#FFF',
  },
  passwordInput: {
    flex: 1, padding: 15, fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  linkText: { color: '#888' },
  linkHighlight: { color: '#FF007F', fontWeight: 'bold' },
  buttonWrapper: {
    height: 55, marginBottom: 30,
    shadowColor: "#FF007F", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 5,
  },
  button: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 28 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  orText: { marginHorizontal: 10, color: '#888', fontWeight: '500' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialButton: { padding: 10 },
});
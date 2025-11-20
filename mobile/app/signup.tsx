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
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; 

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log("Register with:", firstName, lastName, email);
    // Connect to GraphQL later
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

        <Text style={styles.header}>Sign Up</Text>

        {/* SPLIT ROW FOR NAMES */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full name</Text> 
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />
            <View style={{ width: 10 }} /> 
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
          <Text style={styles.linkText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkHighlight}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRegister} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#FF007F', '#8B008B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
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
  row: { flexDirection: 'row' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  halfInput: { flex: 1 }, // Takes up half the space
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
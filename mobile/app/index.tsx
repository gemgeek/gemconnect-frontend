import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Splash Screen Timer
    const timer = setTimeout(() => {
      console.log("Time is up! Ready to navigate to Screen 2.");
      router.replace('/onboarding'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      {/* The Logo */}
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />

      {/* The Text */}
      <Text style={styles.title}>GemConnect</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',   
    alignItems: 'center',       
  },
  logo: {
    width: 120,  
    height: 120,
    marginBottom: 20, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B008B', 
    letterSpacing: 1,
  }
});
import React from 'react';
import { 
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, 
  ScrollView, Alert, SafeAreaView 
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove the Token
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('username');
              
              // Close the Modal
              onClose();

              // Navigate back to Login
              router.replace('/login');
            } catch (e) {
              console.error("Logout error", e);
            }
          }
        }
      ]
    );
  };

  const MenuItem = ({ icon, label, isDestructive = false, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={[styles.menuText, isDestructive && styles.destructiveText]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet" 
    >
      <SafeAreaView style={styles.container}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{width: 28}} /> 
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          
          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={{marginRight: 8}} />
            <TextInput 
              placeholder="Search" 
              placeholderTextColor="#999"
              style={styles.input}
            />
            <Ionicons name="mic-outline" size={20} color="#999" />
          </View>

          {/* ACCOUNT SECTION */}
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#666" style={{marginRight: 8}} />
            <Text style={styles.sectionTitle}>Your Account</Text>
          </View>

          {/* MENU LIST */}
          <MenuItem label="Personal details" />
          <MenuItem label="Password" />
          <MenuItem label="Security" />
          <MenuItem label="Account privacy" />
          <MenuItem label="Notifications" />
          <MenuItem label="Appearance" />
          <MenuItem label="Help & Support" />
          <MenuItem label="About" />
          
          {/* LOGOUT */}
          <MenuItem 
            label="Logout" 
            onPress={handleLogout} 
            isDestructive 
          />
          
          <MenuItem 
            label="Delete account" 
            isDestructive 
          />

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },

  content: { padding: 20 },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0',
    borderRadius: 10, paddingHorizontal: 10, height: 45, marginBottom: 25,
  },
  input: { flex: 1, fontSize: 16 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#000' },

  menuItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F8F8F8',
  },
  menuText: { fontSize: 16, color: '#333' },
  destructiveText: { color: '#FF0000' }, 
});
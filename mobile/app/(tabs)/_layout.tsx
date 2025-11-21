import { Tabs } from 'expo-router';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { View, Image, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#EfEfEf',
          height: 60, 
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
      }}
    >
      {/* HOME (Feed) */}
      <Tabs.Screen
        name="index" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={28} color={focused ? '#000' : '#333'} />
          ),
        }}
      />

      {/* EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="grid-outline" size={28} color={focused ? '#000' : '#333'} />
          ),
        }}
      />

      {/* ADD POST (The Plus Button) */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: () => (
            <View style={styles.addIconWrapper}>
              <Feather name="plus-square" size={28} color="#000" />
            </View>
          ),
        }}
      />

      {/* MESSAGES */}
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={28} color={focused ? '#000' : '#333'} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.profileIcon, focused && styles.profileActive]}>
               <Image 
                 source={require('../../assets/images/story_me.jpg')} 
                 style={styles.avatarImage} 
               />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  profileActive: {
    borderColor: '#000', 
    borderWidth: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  }
});
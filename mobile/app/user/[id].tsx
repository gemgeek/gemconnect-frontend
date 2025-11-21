import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  SafeAreaView, FlatList, Dimensions, ActivityIndicator, StatusBar 
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER_PROFILE } from '../../src/graphql/queries';
import { FOLLOW_USER } from '../../src/graphql/mutations';

const { width } = Dimensions.get('window');
const COLUMN_SIZE = width / 3;

const getImageUrl = (imgString: string) => {
  if (!imgString) return 'https://i.pravatar.cc/150?img=3';
  if (imgString.startsWith('http')) return imgString;
  return `https://nonmanipulatory-fearsomely-nathanial.ngrok-free.dev/media/${imgString}`;
};

export default function PublicProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  
  const { data, loading, error } = useQuery<any>(GET_USER_PROFILE, {
    variables: { userId: id },
    fetchPolicy: 'network-only' 
  });

  const [followUser] = useMutation(FOLLOW_USER);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (data && data.user) {
      setIsFollowing(data.user.isFollowing);
    }
  }, [data]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    followUser({ variables: { userId: id } }).catch((err: any) => {
      console.error("Follow failed", err);
      setIsFollowing(!isFollowing); 
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF007F" />
      </View>
    );
  }

  // --- DEBUGGING SECTION ---
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
           <TouchableOpacity onPress={() => router.back()}>
             <Ionicons name="chevron-back" size={28} color="#000" />
           </TouchableOpacity>
        </View>
        <View style={[styles.center, {padding: 20}]}>
          <Text style={{color: 'red', fontWeight: 'bold', marginBottom: 10}}>GraphQL Error:</Text>
          <Text style={{textAlign: 'center'}}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data?.user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
           <TouchableOpacity onPress={() => router.back()}>
             <Ionicons name="chevron-back" size={28} color="#000" />
           </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text>User data is null. (ID: {id})</Text>
        </View>
      </SafeAreaView>
    );
  }
  // -------------------------

  const user = data.user;

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.statsRow}>
        <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.avatarRing}>
          <View style={styles.avatarBorder}>
            <Image source={{ uri: getImageUrl(user.avatar) }} style={styles.avatar} />
          </View>
        </LinearGradient>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.postSet ? user.postSet.length : 0}</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followersCount}</Text>
            <Text style={styles.statLabel}>followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followingCount}</Text>
            <Text style={styles.statLabel}>following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.fullName}>{user.username}</Text>
          {user.isVerified && <Ionicons name="checkmark-circle" size={16} color="#1DA1F2" style={{ marginLeft: 4 }} />}
        </View>
        <Text style={styles.bioText}>{user.bio || "No bio yet."}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={{ flex: 1, marginRight: 8 }} onPress={handleFollow}>
          {isFollowing ? (
            <View style={styles.grayButton}><Text style={styles.grayButtonText}>Following</Text></View>
          ) : (
            <LinearGradient colors={['#FF007F', '#8B008B']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.gradientButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, marginRight: 8 }}>
          <View style={styles.grayButton}><Text style={styles.grayButtonText}>Message</Text></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconButton}><Feather name="user-plus" size={20} color="#000" /></View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navUsername}>{user?.username}</Text> 
        <TouchableOpacity>
         <Feather name="more-horizontal" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={user?.postSet || []}
        keyExtractor={(item: any) => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.gridItem}>
            <Image source={{ uri: getImageUrl(item.image) }} style={styles.gridImage} resizeMode="cover" />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}><Text style={{color: '#999'}}>No posts yet.</Text></View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  navUsername: { fontSize: 18, fontWeight: 'bold' },
  headerContent: { paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  avatarRing: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center' },
  avatarBorder: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 78, height: 78, borderRadius: 39 },
  statsContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-around', marginLeft: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  statLabel: { fontSize: 13, color: '#333' },
  bioContainer: { marginTop: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  fullName: { fontWeight: 'bold', fontSize: 15 },
  bioText: { fontSize: 14, color: '#333', lineHeight: 20 },
  actionsContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 10 },
  gradientButton: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  grayButton: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFEFEF', borderWidth: 1, borderColor: '#DDD' },
  grayButtonText: { color: '#000', fontWeight: '600', fontSize: 14 },
  iconButton: { width: 34, height: 34, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFEFEF', borderWidth: 1, borderColor: '#DDD' },
  gridItem: { width: COLUMN_SIZE, height: COLUMN_SIZE, padding: 1 },
  gridImage: { width: '100%', height: '100%' },
  emptyState: { alignItems: 'center', marginTop: 50 }
});
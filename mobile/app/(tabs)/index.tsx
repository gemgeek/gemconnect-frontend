import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity, 
  SafeAreaView, ScrollView, Dimensions, StatusBar, ActivityIndicator, RefreshControl 
} from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { useQuery, useMutation } from '@apollo/client/react';
import { LIKE_POST } from '../../src/graphql/mutations';
import { GET_ALL_POSTS } from '../../src/graphql/queries';
import CommentsModal from '../../src/components/CommentsModal';
import ShareModal from '../../src/components/ShareModal'; 

const { width } = Dimensions.get('window');

const API_URL = 'https://nonmanipulatory-fearsomely-nathanial.ngrok-free.dev'; 

const STORIES = [
  { 
    id: 'me', 
    username: 'Your story', 
    image: require('../../assets/images/story_me.jpg'), 
    isMe: true 
  },
  { 
    id: '1', 
    username: 'iam_dynamis', 
    image: require('../../assets/images/story_dynamis.png') 
  },
  { 
    id: '2', 
    username: 'gem_gem', 
    image: require('../../assets/images/story_gem.jpg') 
  },
  { 
    id: '3', 
    username: 'ximena_1', 
    image: require('../../assets/images/story_ximena.jpg') 
  },
  { 
    id: '4', 
    username: 'kofi_dev', 
    image: require('../../assets/images/story_kofi.jpg') 
  },
];

// COMPONENTS 

const StoryItem = ({ item }: { item: any }) => (
  <View style={styles.storyItem}>
    <View style={styles.storyRingContainer}>
      {item.isMe ? (
        <View style={styles.myStoryContainer}>
          <Image source={item.image} style={styles.storyImage} />
          <View style={styles.addStoryIcon}>
            <Ionicons name="add" size={12} color="#FFF" />
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={['#FF007F', '#8B008B']} 
          style={styles.gradientRing}
        >
          <View style={styles.whiteBorder}>
            <Image source={item.image} style={styles.storyImage} />
          </View>
        </LinearGradient>
      )}
    </View>
    <Text style={styles.storyUsername} numberOfLines={1}>{item.username}</Text>
  </View>
);

const PostItem = ({ item }: { item: any }) => {
  // SETUP LIKE MUTATION
  const [likePost] = useMutation(LIKE_POST);
  const [isLiked, setIsLiked] = useState(false);
  
  // Modal States
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false); 

  const handleLike = () => {
    setIsLiked(!isLiked);

    // Call Backend
    likePost({
      variables: { postId: item.id },
    }).catch((err: any) => {
      console.error("Like error", err);
      setIsLiked(!isLiked); 
    });
  };

  const getImageUrl = (imgString: string) => {
    if (!imgString) return null;
    if (imgString.startsWith('http')) return imgString;
    return `${API_URL}/media/${imgString}`;
  };

  const postImage = getImageUrl(item.image);
  // Fallback avatar logic
  const avatarImage = item.author.avatar 
    ? { uri: getImageUrl(item.author.avatar) } 
    : require('../../assets/images/story_me.jpg');

  return (
    <View style={styles.postContainer}>
      {/* POST HEADER */}
      <View style={styles.postHeader}>
        <View style={styles.postUserRow}>
          <View style={styles.storyRingSmall}>
             <LinearGradient colors={['#FF007F', '#8B008B']} style={styles.gradientRingSmall}>
                <View style={styles.whiteBorderSmall}>
                   <Image source={avatarImage} style={styles.postAvatar} />
                </View>
             </LinearGradient>
          </View>
          <Text style={styles.postUsername}>{item.author.username}</Text>
          {item.author.isVerified && (
             <Ionicons name="checkmark-circle" size={14} color="#1DA1F2" style={{ marginLeft: 4 }} />
          )}
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
      </View>

      {/* POST IMAGE */}
      <View>
        {postImage && (
          <Image source={{ uri: postImage }} style={styles.postImage} resizeMode="cover" />
        )}
      </View>

      {/* ACTION BAR */}
      <View style={styles.actionsRow}>
        <View style={styles.leftActions}>
          
          {/* LIKE BUTTON */}
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={28} 
              color={isLiked ? "#FF007F" : "#333"} 
            />
          </TouchableOpacity>

          {/* COMMENT BUTTON */}
          <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(true)}>
             <Ionicons name="chatbubble-outline" size={26} color="#333" />
          </TouchableOpacity>

          {/* SHARE BUTTON */}
          <TouchableOpacity style={styles.actionButton} onPress={() => setShowShare(true)}>
             <Feather name="send" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Feather name="bookmark" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          <Text style={styles.boldText}>{item.likes ? item.likes.length : 0}</Text> likes
        </Text>
        <Text style={styles.statsText}>
           view all {item.comments ? item.comments.length : 0} comments
        </Text>
      </View>

      {/* CAPTION */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.boldText}>{item.author.username}</Text> {item.content} 
        </Text>
        <Text style={styles.timeText}>{new Date(item.createdAt).toDateString()}</Text>
      </View>

      {/* MODALS */}
      <CommentsModal 
        visible={showComments} 
        onClose={() => setShowComments(false)}
        postId={item.id}         
        comments={item.comments}  
      />
      <ShareModal 
        visible={showShare} 
        onClose={() => setShowShare(false)} 
      />
    </View>
  );
};

export default function FeedScreen() {
  // FETCH REAL DATA FROM BACKEND
  const { data, loading, error, refetch } = useQuery<any>(GET_ALL_POSTS);
  const router = useRouter();

  // Loading State
  if (loading && !data) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF007F" />
      </SafeAreaView>
    );
  }

  // Error State
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Error: {error.message}</Text>
        <TouchableOpacity onPress={() => refetch()} style={{marginTop: 20}}>
           <Text style={{color: '#FF007F', fontWeight: 'bold'}}>Tap to Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>GemConnect</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
           <Ionicons name="notifications-outline" size={24} color="#000" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        </View>
      </View>

      {/* MAIN FEED LIST */}
      <FlatList
        data={data?.allPosts} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem item={item} />}
        
        // The Stories are now the "Header" of the feed list
        ListHeaderComponent={() => (
          <View>
            <View style={styles.storiesContainer}>
              <FlatList
                data={STORIES}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <StoryItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingLeft: 15 }}
              />
            </View>
            <View style={styles.divider} />
          </View>
        )}
        
        // Pull to Refresh logic
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} colors={['#FF007F']} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLogo: { fontSize: 24, fontWeight: '600', letterSpacing: 0.5 },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 15 },
  notificationDot: {
    position: 'absolute', top: 2, right: 2, width: 8, height: 8,
    borderRadius: 4, backgroundColor: '#FF0000',
  },

  // STORIES
  storiesContainer: { paddingVertical: 12 },
  storyItem: { alignItems: 'center', marginRight: 15, width: 70 },
  storyRingContainer: { marginBottom: 5 },
  gradientRing: {
    width: 68, height: 68, borderRadius: 34,
    justifyContent: 'center', alignItems: 'center',
  },
  whiteBorder: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
  },
  myStoryContainer: { width: 64, height: 64, justifyContent: 'center', alignItems: 'center' },
  storyImage: { width: 60, height: 60, borderRadius: 30 },
  addStoryIcon: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#000', width: 20, height: 20,
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFF',
  },
  storyUsername: { fontSize: 11, color: '#333' },

  divider: { height: 1, backgroundColor: '#EEE' },

  // POST
  postContainer: { marginBottom: 10 },
  postHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 10,
  },
  postUserRow: { flexDirection: 'row', alignItems: 'center' },
  storyRingSmall: { marginRight: 10 },
  gradientRingSmall: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  whiteBorderSmall: { width: 37, height: 37, borderRadius: 18.5, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  postAvatar: { width: 34, height: 34, borderRadius: 17 },
  postUsername: { fontWeight: 'bold', fontSize: 14, marginRight: 5 },
  
  postImage: { width: width, height: width * 1.1 },
  
  // Actions
  actionsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 12, paddingTop: 10,
  },
  leftActions: { flexDirection: 'row' },
  actionButton: { marginRight: 15 },

  // Stats & Caption
  statsContainer: { paddingHorizontal: 12, marginTop: 8 },
  statsText: { fontSize: 13, color: '#333', marginBottom: 2 },
  boldText: { fontWeight: 'bold' },
  
  captionContainer: { paddingHorizontal: 12, marginTop: 4 },
  captionText: { fontSize: 13, lineHeight: 18 },
  timeText: { fontSize: 11, color: '#888', marginTop: 4, marginBottom: 10 },
});
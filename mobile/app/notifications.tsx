import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, 
  SafeAreaView, StatusBar, ActivityIndicator 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useQuery } from '@apollo/client/react';
import { GET_NOTIFICATIONS } from '../src/graphql/queries';

const getImageUrl = (imgString: string) => {
  if (!imgString) return 'https://i.pravatar.cc/150?img=3';
  if (imgString.startsWith('http')) return imgString;
  return `https://nonmanipulatory-fearsomely-nathanial.ngrok-free.dev/media/${imgString}`;
};

const NotificationItem = ({ item }: { item: any }) => {
  // Determine text based on type
  let actionText = "";
  let detailText = "";

  switch (item.notificationType) {
    case 'like':
      actionText = "liked your post:";
      detailText = item.post ? item.post.content.substring(0, 50) + "..." : "";
      break;
    case 'comment':
      actionText = "commented on your post:";
      detailText = item.post ? item.post.content.substring(0, 50) + "..." : "";
      break;
    case 'follow':
      actionText = "started following you.";
      break;
    default:
      actionText = "interacted with you.";
  }

  // Styling for Read vs Unread (Pink background for unread)
  const containerStyle = item.isRead 
    ? styles.itemContainer 
    : [styles.itemContainer, { backgroundColor: '#fecedeff' }]; // Light Pink

  return (
    <View style={containerStyle}>
      {/* Avatar */}
      <Image 
        source={{ uri: getImageUrl(item.sender.avatar) }} 
        style={styles.avatar} 
      />

      {/* Content */}
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.boldText}>{item.sender.username} </Text>
          {actionText}
        </Text>
        {detailText ? <Text style={styles.detailText}>{detailText}</Text> : null}
        
        <Text style={styles.statsText}>Just now</Text>
      </View>

      {/* Right Side */}
      <View style={styles.rightAction}>
        {item.post && item.post.image && (
           <Image source={{ uri: getImageUrl(item.post.image) }} style={styles.postThumb} />
        )}
        <TouchableOpacity>
           <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All'); // 'All', 'My posts', 'Mentions'
  
  const { data, loading, error, refetch } = useQuery<any>(GET_NOTIFICATIONS);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
           <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View style={styles.filterContainer}>
        {['All', 'My posts', 'Mentions'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setFilter(tab)}
            style={[
              styles.filterPill, 
              filter === tab ? styles.activePill : styles.inactivePill
            ]}
          >
            {filter === tab ? (
               <LinearGradient
                 colors={['#FF007F', '#8B008B']}
                 style={styles.gradientBackground}
                 start={{x: 0, y: 0}} end={{x: 1, y: 0}}
               >
                 <Text style={styles.activeText}>{tab}</Text>
               </LinearGradient>
            ) : (
              <Text style={styles.inactiveText}>{tab}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF007F" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={data?.myNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No notifications yet</Text>
            </View>
          }
          onRefresh={refetch}
          refreshing={loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 15, paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },

  filterContainer: {
    flexDirection: 'row', paddingHorizontal: 15, marginBottom: 15,
  },
  filterPill: {
    borderRadius: 20, marginRight: 10, overflow: 'hidden',
  },
  activePill: { 
    // Gradient handles the background
  },
  inactivePill: {
    borderWidth: 1, borderColor: '#999', paddingVertical: 6, paddingHorizontal: 16,
  },
  gradientBackground: {
    paddingVertical: 7, paddingHorizontal: 18,
  },
  activeText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  inactiveText: { color: '#666', fontSize: 13 },

  // ITEM STYLES
  itemContainer: {
    flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  avatar: { width: 46, height: 46, borderRadius: 23, marginRight: 12 },
  textContainer: { flex: 1, justifyContent: 'center' },
  notificationText: { fontSize: 13, color: '#333', lineHeight: 18 },
  boldText: { fontWeight: 'bold' },
  detailText: { fontSize: 12, color: '#666', marginTop: 2, fontStyle: 'italic' },
  statsText: { fontSize: 11, color: '#999', marginTop: 4 },

  rightAction: { alignItems: 'flex-end', justifyContent: 'space-between' },
  postThumb: { width: 40, height: 40, borderRadius: 4, marginBottom: 5 },

  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', fontSize: 16 },
});
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Modal, TouchableOpacity, Image, 
  FlatList, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Alert 
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client/react';
import { CREATE_COMMENT } from '../graphql/mutations';
import { GET_ALL_POSTS } from '../graphql/queries';

const EMOJIS = ['🤩', '😘', '🔥', '💖', '🥰', '😍', '🎉', '🥺'];

const getImageUrl = (imgString: string) => {
  if (!imgString) return null; // No image? Return null.
  if (imgString.startsWith('http')) return imgString;
  return `https://nonmanipulatory-fearsomely-nathanial.ngrok-free.dev/media/${imgString}`;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  postId: string;
  comments: any[];
}

export default function CommentsModal({ visible, onClose, postId, comments }: Props) {
  const [commentText, setCommentText] = useState('');
  
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
    onCompleted: () => setCommentText('')
  });

  const handleSend = () => {
    if (!commentText.trim()) return;

    createComment({
      variables: {
        postId: postId,
        text: commentText
      }
    }).catch((err: any) => {
      Alert.alert("Error", "Could not post comment.");
      console.error(err);
    });
  };

  const renderComment = ({ item }: { item: any }) => {
    // 2. LOGIC: Use Backend URL if it exists, otherwise use Local 'Me' Image
    // (This makes your comments look like you!)
    const avatarSource = item.author.avatar 
      ? { uri: getImageUrl(item.author.avatar) } 
      : require('../../assets/images/story_me.jpg');

    return (
      <View style={styles.commentItem}>
        <Image source={avatarSource} style={styles.avatar} />
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.username}>{item.author.username}</Text>
            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Text>
          </View>
          <Text style={styles.text}>{item.text}</Text>
          <TouchableOpacity>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheet}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.handle} />
            <Text style={styles.headerTitle}>Comments ({comments ? comments.length : 0})</Text>
            <TouchableOpacity onPress={onClose} style={styles.sendIcon}>
               <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* LIST */}
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>No comments yet.</Text>
            }
          />

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.emojiRow}>
              {EMOJIS.map((emoji, index) => (
                <TouchableOpacity key={index} onPress={() => setCommentText(prev => prev + emoji)}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputRow}>
              {/* Input Avatar always shows 'Me' */}
              <Image source={require('../../assets/images/story_me.jpg')} style={styles.myAvatar} />
              <TextInput
                style={styles.input}
                placeholder="Have something to say?"
                placeholderTextColor="#999"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity onPress={handleSend} disabled={loading}>
                 {loading ? (
                   <ActivityIndicator size="small" color="#FF007F" />
                 ) : (
                   <Feather name="send" size={24} color="#FF007F" />
                 )}
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '75%' },
  header: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 },
  handle: { width: 40, height: 4, backgroundColor: '#CCC', borderRadius: 2, marginBottom: 10 },
  headerTitle: { fontWeight: 'bold', fontSize: 16 },
  sendIcon: { position: 'absolute', right: 15, top: 20 },
  divider: { height: 1, backgroundColor: '#EEE' },
  listContent: { padding: 15 },
  commentItem: { flexDirection: 'row', marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  commentContent: { flex: 1 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  username: { fontWeight: 'bold', fontSize: 13, marginRight: 5, color: '#333' },
  time: { fontSize: 11, color: '#999' },
  text: { fontSize: 13, color: '#333', lineHeight: 18 },
  replyText: { fontSize: 11, color: '#999', marginTop: 4, fontWeight: '600' },
  likeButton: { paddingTop: 5 },
  footer: { borderTopWidth: 1, borderTopColor: '#EEE', padding: 10, paddingBottom: 30 },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  emoji: { fontSize: 22 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  myAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  input: { flex: 1, height: 40, backgroundColor: '#FFF', fontSize: 14 },
});
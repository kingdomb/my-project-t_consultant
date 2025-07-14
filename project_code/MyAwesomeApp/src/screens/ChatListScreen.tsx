import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type ChatRoom = {
  id: string;
  participants: string[];
  otherUserEmail?: string; // add this to store fetched email
};

export default function ChatListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'chatRooms'),
      where('participants', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const rooms: ChatRoom[] = [];
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as ChatRoom;
        const otherUserId = data.participants.find(uid => uid !== auth.currentUser?.uid);
        let otherUserEmail = 'Loading...';

        if (otherUserId) {
          // Fetch the other user's email
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          if (userDoc.exists()) {
            otherUserEmail = userDoc.data().email || 'No Email';
          } else {
            otherUserEmail = 'Unknown User';
          }
        }

        rooms.push({ ...data, id: docSnap.id, otherUserEmail });
      }

      setChatRooms(rooms);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: ChatRoom }) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate('Chat', { chatRoomId: item.id, otherUserEmail: item.otherUserEmail })
        }
      >
        <Text style={styles.chatText}>Chat with {item.otherUserEmail}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No chats found. Start a new chat!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={chatRooms}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  chatText: {
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
});

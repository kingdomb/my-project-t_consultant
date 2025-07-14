import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the param list for your navigator with Chat screen params
type RootStackParamList = {
  Chat: {
    chatRoomId: string;
    otherUserEmail: string;
  };
  // add other screens if needed here
};

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderEmail: string;
  createdAt: Timestamp;
};

export default function ChatScreen({ route }: Props) {
  const { chatRoomId, otherUserEmail } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!chatRoomId) return;

    const messagesQuery = query(
      collection(db, 'chatRooms', chatRoomId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      }));
      setMessages(msgs);
    });

    return unsubscribe;
  }, [chatRoomId]);

  const handleSend = async () => {
    if (input.trim().length === 0) return;

    try {
      await addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), {
        text: input,
        senderId: auth.currentUser?.uid,
        senderEmail: auth.currentUser?.email,
        createdAt: Timestamp.now(),
      });
      setInput('');
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error: any) {
      console.error('Send message error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Chat with {otherUserEmail}</Text>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[
                styles.messageContainer,
                item.senderId === auth.currentUser?.uid
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}>
                <Text style={styles.sender}>{item.senderEmail}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your message"
              style={styles.input}
            />
            <Button title="Send" onPress={handleSend} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, padding: 10 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageList: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  messageContainer: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  sender: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    color: '#555',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});

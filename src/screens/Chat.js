import {getAuth} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  addDataToFirestore,
  listenDataFromFirestoreCollection,
} from '../helper/firebase/firestore';

const Chat = props => {
  let currentUserEmail = getAuth ().currentUser.email;
  const [message, setMessage] = useState (null);
  const [messages, setMessages] = useState (null);

  const onSendPressed = async () => {
    if (message) {
      let res = await addDataToFirestore ('Chat', {
        email: currentUserEmail,
        message,
      });
      res.success && setMessage (null);
    }
  };

  useEffect (() => {
    let subscriber = listenDataFromFirestoreCollection ('Chat', result => {
      setMessages (result);
    });
    return () => subscriber ();
  }, []);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        padding: 5,
      }}
    >
      <FlatList
        inverted
        data={messages}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={({item}) => {
          return (
            <View
              style={{
                backgroundColor: item.email == getAuth ().currentUser.email
                  ? 'green'
                  : 'black',
                width: '40%',
                padding: 5,
                borderRadius: 10,
                alignSelf: item.email == getAuth ().currentUser.email
                  ? 'flex-end'
                  : 'flex-start',
              }}
            >
              <Text style={styles.boldText}>
                {item.email == getAuth ().currentUser.email
                  ? 'You'
                  : item.email}
              </Text>
              <Text style={{color: 'white'}}>{item.message}</Text>
            </View>
          );
        }}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={message}
          placeholder="Enter you message"
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={onSendPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  input: {
    borderWidth: 1,
    height: 40,
    width: '80%',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boldText: {fontWeight: 'bold', color: 'white'},
});

export default Chat;

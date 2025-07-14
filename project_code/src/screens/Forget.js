import {signInWithEmailAndPassword, getAuth, sendPasswordResetEmail} from '@react-native-firebase/auth';
import {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
const Forget = props => {
  const [email, setEmail] = useState (null);
  const [password, setPassword] = useState (null);

  const onButtonPressed = () => {
    sendPasswordResetEmail (getAuth (), email)
      .then (() => {
        alert ('Restore password email sent!');
      })
      .catch (error => {
        if (error.code === 'auth/email-already-in-use') {
          alert ('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert ('That email address is invalid!');
        }

        alert (error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter email here"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
      />
     
      <Button title="Forget" onPress={onButtonPressed} />
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    margin: 5,
  },
});

export default Forget;

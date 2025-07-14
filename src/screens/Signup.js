import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

const Signup = props => {
  const [email, setEmail] = useState (null);
  const [password, setPassword] = useState (null);

  const onButtonPressed = () => {
    createUserWithEmailAndPassword (getAuth (), email, password)
      .then (() => {
        alert ('User account created & signed in!');
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
      <TextInput
        placeholder="Enter password"
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Signup" onPress={onButtonPressed} />
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
  },
});

export default Signup;

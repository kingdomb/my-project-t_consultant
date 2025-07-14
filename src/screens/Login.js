import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = props => {
  const [email, setEmail] = useState (null);
  const [password, setPassword] = useState (null);

  useEffect (() => {
    GoogleSignin.configure ({
      webClientId: '255206209072-rkoigml4f5t2up8k3avlk6k00d53snph.apps.googleusercontent.com',
    });
  });

  const onButtonPressed = () => {
    signInWithEmailAndPassword (getAuth (), email, password)
      .then (() => {
        alert ('User account created & signed in!');
        props.navigation.navigate ('Home');
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

  async function onGoogleButtonPress () {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices ({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn ();

      // Try the new style of google-sign in result, from v13+ of that module
      idToken = signInResult.data.idToken;
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error ('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential (
        signInResult.data.idToken
      );

      // Sign-in the user with the credential
      return signInWithCredential (getAuth (), googleCredential);
    } catch (e) {
      console.log ('Google sign problem', e);
    }
  }
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
      <Button title="Login" onPress={onButtonPressed} />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress ().then (() =>
            console.log ('Signed in with Google!')
          )}
      />
      <Button
        title="Forget Password"
        onPress={() => props.navigation.navigate ('Forget')}
      />

      <Button
        title="Go to signup"
        onPress={() => props.navigation.navigate ('Signup')}
      />

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

export default Login;

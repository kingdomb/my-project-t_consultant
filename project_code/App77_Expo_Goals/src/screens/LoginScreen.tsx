import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import apiClient from '../api/apiClient';
import { saveToken } from '../utils/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    if (!email || !password) {
      Alert.alert('Error', 'All inputs required.');
      return;
    }

    try {
      const response = await apiClient.post('/users/login', { email, password });

      console.log(response);
      console.log(response.data);
      console.log(response?.data?.data?.token);

      const token = response?.data?.data?.token;

      if (token) {
        await saveToken(token);
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch({ type: 'LOGIN', token });
      } else {
        Alert.alert('Error', 'Login failed.');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Login</Text>

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={text => (emailRef.current = text)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={text => (passwordRef.current = text)}
              secureTextEntry
              autoCorrect={false}
              textContentType="password"
            />

            <View style={styles.buttonSpacing}>
              <Button title="Login" onPress={handleLogin} />
            </View>

            <View style={styles.buttonSpacing}>
              <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  keyboardAvoiding: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginVertical: 6,
  },
});

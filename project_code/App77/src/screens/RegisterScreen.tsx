import React, { useState } from 'react';
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
  View
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../api/apiClient';
import { saveToken } from '../utils/storage';

export default function RegisterScreen({ setIsLoggedIn }: { setIsLoggedIn: (v: boolean) => void }) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await apiClient.post('/users', { name, email, password });
      console.log('📦 Raw response:', response);
      console.log('📄 response.data:', response.data);
      console.log('🔑 response.data.data.token:', response?.data?.data?.token);

      const token = response?.data?.data?.token;
      if (token) {
        await saveToken(token);
        setIsLoggedIn(true); // This will trigger navigator to switch to AppStack
      } else {
        Alert.alert('Error', 'Registration failed: no token received');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', error.response?.data?.message || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Register</Text>

            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="off"
              textContentType="name"
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCorrect={false}
              autoComplete="off"
              textContentType="newPassword"
            />

            <View style={styles.buttonSpacing}>
              <Button title="Register" onPress={handleRegister} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
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

// ScrollView does not use flex layout by default, you have to use flexGrow: 1 on contentContainerStyle if you want the scrollable content to stretch and center vertically when there's not much content.
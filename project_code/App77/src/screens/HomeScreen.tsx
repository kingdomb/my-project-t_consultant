import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ setIsLoggedIn }: { setIsLoggedIn: (v: boolean) => void }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token'); // Clearing stored token
      setIsLoggedIn(false); // Triggering navigation change
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 24, marginBottom: 20 },
});

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../utils/storage';
import apiClient from '../api/apiClient';
import { useDispatch } from 'react-redux';

type Goal = {
  _id: string;
  title: string;
};

export default function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editText, setEditText] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchGoals = async () => {
    setLoading(true);
    const token = await getToken();

    if (!token) {
      console.warn('No token found when trying to fetch goals. User might not be logged in.');
      dispatch({ type: 'LOGOUT' });
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.get('/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(res.data.data.slice(0, 3));
    } catch (e: any) {
      if (e.response?.status === 401) {
        Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
        dispatch({ type: 'LOGOUT' });
      } else {
        Alert.alert('Error', 'Failed to load goals.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.trim()) return;

    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'No token found. Please log in again.');
      dispatch({ type: 'LOGOUT' });
      return;
    }

    try {
      const res = await apiClient.post(
        '/goals',
        { title: newGoal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals([res.data.createdGoal, ...goals].slice(0, 3));
      setNewGoal('');
    } catch (e: any) {
      if (e.response?.status === 401) {
        Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
        dispatch({ type: 'LOGOUT' });
      } else {
        Alert.alert('Error', 'Could not add goal.');
      }
    }
  };

  const handleEditGoal = async (id: string) => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'No token found. Please log in again.');
      dispatch({ type: 'LOGOUT' });
      return;
    }

    try {
      const updated = editText[id];
      const res = await apiClient.put(
        `/goals/${id}`,
        { title: updated },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals(goals.map((g) => (g._id === id ? res.data.updatedGoal : g)));
      setEditMode(null);
    } catch (e: any) {
      if (e.response?.status === 401) {
        Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
        dispatch({ type: 'LOGOUT' });
      } else {
        Alert.alert('Error', 'Failed to update goal.');
      }
    }
  };

  const handleDeleteGoal = async (id: string) => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Error', 'No token found. Please log in again.');
      dispatch({ type: 'LOGOUT' });
      return;
    }

    try {
      await apiClient.delete(`/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(goals.filter((g) => g._id !== id));
    } catch (e: any) {
      if (e.response?.status === 401) {
        Alert.alert('Authentication Error', 'Your session has expired. Please log in again.');
        dispatch({ type: 'LOGOUT' });
      } else {
        Alert.alert('Error', 'Failed to delete goal.');
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    delete apiClient.defaults.headers.common.Authorization;
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading your goals...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>Your Goals</Text>

      <TextInput
        placeholder="Enter new goal"
        value={newGoal}
        onChangeText={setNewGoal}
        style={styles.input}
      />
      <Button title="Add Goal" onPress={handleAddGoal} />

      <FlatList
        data={goals}
        keyExtractor={(item) => item._id}
        testID="toDoList"
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            {editMode === item._id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editText[item._id] || item.title}
                  onChangeText={(text) =>
                    setEditText((prev) => ({ ...prev, [item._id]: text }))
                  }
                />
                <Button title="Save" onPress={() => handleEditGoal(item._id)} />
              </>
            ) : (
              <>
                <Text style={styles.goalText}>{item.title}</Text>
                <View style={styles.buttonRow}>
                  <Button title="Edit" onPress={() => setEditMode(item._id)} />
                  <Button title="Remove" onPress={() => handleDeleteGoal(item._id)} />
                </View>
              </>
            )}
          </View>
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  goalItem: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  goalText: { fontSize: 18 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

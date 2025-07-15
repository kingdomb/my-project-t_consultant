import axios from 'axios';
import { Platform } from 'react-native';

const LAN_IP = 'http://10.1.10.102:8000/api'; // Your Mac’s LAN IP

let baseURL = '';

if (Platform.OS === 'web') {
  baseURL = 'http://localhost:8000/api'; // Web runs in your Mac browser
} else if (Platform.OS === 'android') {
  baseURL = 'http://10.0.2.2:8000/api'; // Android Emulator
} else if (Platform.OS === 'ios') {
  baseURL = 'http://localhost:8000/api'; // iOS Simulator
} else {
  baseURL = LAN_IP; // fallback — physical devices
}

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

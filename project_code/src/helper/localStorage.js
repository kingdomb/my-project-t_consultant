import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageHelper {
  constructor () {
    console.log ('LocalStorageHelper initialized');
  }

  getItem = async key => {
    try {
      let value = await AsyncStorage.getItem (key);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (error) {
      console.error (`Error getting item with key ${key}:`, error);
      return null;
    }
  };

  setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem (key, value);
      return true;
    } catch (e) {
        console.error (`Error setting item with key ${key}:`, e);
        return false;
    }
  };
}
export default new LocalStorageHelper ();

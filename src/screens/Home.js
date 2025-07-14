/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Modal,
  View,
  Platform,
  FlatList,
} from 'react-native';
import Input from '../components/Input';
import LocalStorageHelper from '../helper/localStorage';
import FirstContext from '../store/context/FirstContext';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../reduxStore/action/counterActions';
import {incremented, decremented} from '../reduxStore/slice/counterSlice';
import permissions from '../helper/permissions';
import useLocalStorage from '../hooks/useLocalStorage';
import {signOut, getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {asyncThunkCreator} from '@reduxjs/toolkit';
import {
  addDataToFirestore,
  getDataFromFirestoreCollect,
  getDataFromFirestoreCollection,
  listenDataFromFirestoreCollection,
} from '../helper/firebase/firestore';
import messaging from '@react-native-firebase/messaging';

function Home (props): React.JSX.Element {
  const counter = useSelector (state => state);
  const reduxDispatch = useDispatch ();
  console.log ('re renderign on redux change');

  const expensiveCalculation = num => {
    console.log ('Calculating...');
    for (let i = 0; i < 1000000; i++) {
      num += 1;
    }
    return num;
  };

  const isDarkMode = useColorScheme () === 'dark';

  const [formData, setFormData] = useState ({
    name: null,
    age: null,
    address: null,
  });
  const [count, setCount] = useState (0);
  const [isEmailValid, setIsEmailValid] = useState (false);
  const [temperature, setTemperature] = useState (0);

  const [modalVisible, setModalVisible] = useState (false);

  const {state, increment} = useContext (FirstContext);
  const inputRef = useRef (null);

  const calculation = useMemo (() => expensiveCalculation (count), []);
  const [users, setUsers] = useState ([]);
  // const [value] = useLocalStorage ('email');

  console.log ('Home component rendered');
  //Mounting
  //Updating
  //Unmounting

  useEffect (() => {
    if (Platform.OS === 'android') {
      permissions
        .requestLocationPermissionForAndroid ()
        .then ((r, m) => {
          console.log ('Permission granted', r, m);
        })
        .catch (r => {
          console.log ('Permission denied', r);
        });
    }
    permissions
        .requsestPermissionForNotifications ()
        .then ((r, m) => {
          console.log ('Permission granted', r, m);
        })
        .catch (r => {
          console.log ('Permission denied', r);
        })
  }, []);

  const onPress = () => {
    alert ('Presssed');
  };
  const onSubmitPressed = () => {
    props.navigation.navigate ('Details');
  };

  const storeEmail = async () => {
    try {
      await LocalStorageHelper.setItem ('email', email);
    } catch (e) {
      console.log ('Error storing email', e);
    }
  };

  useEffect (() => {
    fetch (
      'https://api.openweathermap.org/data/2.5/weather?lat=31.5204&lon=74.3587&appid=4251b5f89948a271b3def71083a728f0&units=metric'
    )
      .then (res => res.json ())
      .then (data => setTemperature (data.main.temp))
      .catch (err => console.log (err));
  }, []);

  const onHeaderButtonPressed = useCallback (() => {
    alert ('Header Button Pressed');
  }, []);
  ///JSX => Javascript XML

  const onEmailChangeText = useCallback (text => {}, []);
  const onPasswordChange = useCallback (text => {}, []);
  const onAgeChanged = useCallback (text => {}, []);

  const loadData = async () => {
    let response = await getDataFromFirestoreCollection ('Users');
    if (response.success) setUsers (response.data);
  };

  useEffect (() => {
    const subscriber = listenDataFromFirestoreCollection ('Users', data => {
      setUsers (data);
    });

    return () => subscriber ();
  }, []);

  const onAddToFirestore = async () => {
    let res = await addDataToFirestore ('Users', formData);
    // alert (res.message);
  };

  const onChatStartPressed = () => {
    props.navigation.navigate ('Chat');
  };

  useEffect(() => {
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Welcome'} onPress={onHeaderButtonPressed} />
      <Text>Redux Counter: {counter.value} </Text>
      <Text>Context Count:{count}</Text>
      <Text>Temperature: {temperature}°C</Text>
      <Input
        ref={inputRef}
        value={formData.name}
        title="Name"
        onChangeText={t => setFormData ({...formData, name: t})}
      />
      {!isEmailValid
        ? <Text style={{color: 'red'}}>Email is invalid </Text>
        : null}
      <Input
        value={formData.age}
        title="Age"
        onChangeText={t => setFormData ({...formData, age: t})}
      />
      <Input
        value={formData.address}
        title="Address"
        onChangeText={t => setFormData ({...formData, address: t})}
      />
      <Button title="Start Chat" onPress={onChatStartPressed} />

      <Button title="Add Data To Firestore" onPress={onAddToFirestore} />
      <Button title="Signout" onPress={() => signOut (getAuth ())} />

      <Text style={styles.boldText}>Users List</Text>

      <FlatList
        data={users}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={({item}) => {
          return (
            <View style={styles.itemStyle}>
              <Text>{item.name}</Text>
              <Text>{item.address}</Text>
            </View>
          );
        }}
      />

      {/* <Button title="Submit Form" onPress={onSubmitPressed} />
      <Button title="Add" onPress={() => setCount (count + 1)} />
      <Button
        title="Go to home Class"
        onPress={() => props.navigation.navigate ('HomeClass')}
      />
      <Button
        title="Go to details"
        onPress={() => props.navigation.navigate ('Details')}
      />
      <Button
        title="Go to webview"
        onPress={() => props.navigation.navigate ('Webview')}
      />
      <Button
        title="Go to Maps"
        onPress={() => props.navigation.navigate ('Maps')}
      />
      <Button title="Add Context Count" onPress={() => increment ()} />
      <Button title="Show Modal" onPress={() => setModalVisible (true)} /> */}

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible (false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <SafeAreaView
            style={{
              height: '30%',
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <Text>Modal is open</Text>
            <Button
              title="Close Modal"
              onPress={() => setModalVisible (false)}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  boldText: {fontWeight: 'bold'},
  itemStyle: {
    backgroundColor: '#d3d3d3',
    height: 50,
    padding: 10,
  },
});

export default Home;

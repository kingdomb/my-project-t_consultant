import React, {useEffect, useState, useContext, useReducer} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  FlatList,
  View,
} from 'react-native';
import LocalStorageHelper from '../helper/localStorage';
import FirstContext from '../store/context/FirstContext';
import ToDoReducer from '../reducners/ToDoReducer';
import locationHelper from '../helper/locationHelper';

function Details (): React.JSX.Element {
  const [value, setValue] = useState (10);
  let count = 100;

  useEffect (
    () => {
      alert ('Details is updating because contextstate is changed');
      // This will run when the component mounts and whenever contextState changes
      return () => {
        alert ('Details is unmounting');
      };
    },
    [contextState]
  );

  const {contextState, setContextCount} = useContext (FirstContext);

  const [state, dispatch] = useReducer (ToDoReducer, []);

  const [input, setInput] = useState (null);

  useEffect (() => {}, []);

  useEffect (() => {
    const watchId = locationHelper.trackLocation (location => {
      console.log ('location', location);
    });
    return ()=>{
      locationHelper.clearLocationListener(watchId)
    }
  }, []);

  const onAddTodoPressed = () => {
    dispatch ({type: 'ADD_TODO', payload: input});
    setInput (null);
  };
  const onTodoDeletePressed = i => {
    dispatch ({type: 'REMOVE_TODO', payload: i});
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={input}
        placeholder="Enter Todo"
        style={styles.input}
        onChangeText={t => setInput (t)}
      />

      <Button title="Add todo" onPress={onAddTodoPressed} />

      <FlatList
        data={state}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'sapace-between',
              }}
            >
              <Text>{item}</Text>
              <Button
                title="Delete"
                onPress={() => onTodoDeletePressed (item)}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString ()}
      />
      {/* <Text>Count is :{contextState}</Text>
      <Text>Value is :{value}</Text>
      <ActivityIndicator animating={true} color="blue" size="large" />
      <ActivityIndicator animating={true} color="red" size="small" />
      <Text>Hello I am details screen!</Text>
      <Button
        title="Add Count"
        onPress={() => {
          count++;
          alert (count);
        }}
      />
      <Button
        title="Add Value"
        onPress={() => {
          setValue (value + 1);
        }}
      />
      <Button
        title="Sub Context Count"
        onPress={() => {
          setContextCount (contextState - 1);
        }}
      /> */}
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
});

export default Details;

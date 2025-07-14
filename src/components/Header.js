import {View, Text, StyleSheet, Button} from 'react-native';
import React, {memo} from 'react';

const Header = props => {
  console.log ('Header component rendered');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.title}</Text>
      <Button title="Press Me" onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
  },
});

export default memo (Header);

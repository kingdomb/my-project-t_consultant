import {useState, forwardRef, useImperativeHandle, memo} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
const Input = forwardRef ((props, ref) => {
  const {title, onChangeText, value} = props;

  const getInputComponentTitle = () => {
    return title ? title : 'Default Title';
  };
  useImperativeHandle (ref, () => {
    return {
      getInputComponentTitle,
    };
  });

  console.log ('Input component rendered');

  return (
    <View>
      <Text>{title}</Text>
      <TextInput
        value={value}
        style={styles.input} //in line styling
        placeholder="Enter your text here"
        onChangeText={onChangeText}
      />
    </View>
  );
});

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
});

export default memo(Input);

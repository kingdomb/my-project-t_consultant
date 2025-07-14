import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const Webview = props => {
  return (
    <View style={{flex: 1}}>
      <Text>It's webview component</Text>
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://reactnative.dev/'}}
      />
    </View>
  );
};

export default Webview;

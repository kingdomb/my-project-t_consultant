import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import HomeClass from '../screens/HomeClass';
import Webview from '../screens/Webview';
import Maps from '../screens/Maps';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forget from '../screens/Forget';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import Chat from '../screens/Chat';

export default function Navigation () {
  const Stack = createNativeStackNavigator ();

  const [isLoggedIn, setIsLoggedIn] = React.useState (false);

  onAuthStateChanged (getAuth (), user => {
    setIsLoggedIn (user);
    console.log ('User', user);
  });

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forget" component={Forget} />
      </Stack.Navigator>
    );
  };
  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="HomeClass" component={HomeClass} />
        <Stack.Screen name="Webview" component={Webview} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

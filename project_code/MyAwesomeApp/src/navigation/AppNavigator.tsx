import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }: { user: any }) {
  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Cast ChatScreen to React.ComponentType to avoid TS error */}
          <Stack.Screen name="Chat" component={ChatScreen as React.ComponentType} />
        </>
      )}
    </Stack.Navigator>
  );
}



// // src/navigation/AppNavigator.tsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator({ user }) {
//   return (
//     <Stack.Navigator>
//       {!user ? (
//         <>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//         </>
//       ) : (
//         <Stack.Screen name="Home" component={HomeScreen} />
//       )}
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

type Props = {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
};

export default function AppNavigator({ isLoggedIn, setIsLoggedIn }: Props) {
  return isLoggedIn ? (
    <AppStack setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <AuthStack setIsLoggedIn={setIsLoggedIn} />
  );
}

// ✅ Move these outside the main function

function AuthStack({ setIsLoggedIn }: { setIsLoggedIn: (v: boolean) => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {() => <RegisterScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppStack({ setIsLoggedIn }: { setIsLoggedIn: (v: boolean) => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {() => <HomeScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
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

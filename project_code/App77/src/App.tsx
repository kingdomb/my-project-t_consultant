import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { getToken } from './utils/storage';

export default function App() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setHasToken(!!token);
    };
    checkAuth();
  }, []);

  if (hasToken === null) return null;

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={hasToken} setIsLoggedIn={setHasToken} />
    </NavigationContainer>
  );
}

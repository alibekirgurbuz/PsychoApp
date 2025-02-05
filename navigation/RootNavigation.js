import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import UserStack from './UserStack';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();

    // AsyncStorage değişikliklerini dinle
    const authListener = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };

    // Event listener'ı ekle
    const interval = setInterval(authListener, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      // AsyncStorage'dan kullanıcı bilgilerini kontrol et
      const userDataString = await AsyncStorage.getItem('userData');
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      
      // Eğer kullanıcı giriş yapmışsa ve bilgileri varsa
      if (userDataString && authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Burada bir loading ekranı gösterilebilir
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Kullanıcı giriş yapmışsa
          <Stack.Screen name="MainApp" component={UserStack} />
        ) : (
          // Kullanıcı giriş yapmamışsa
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
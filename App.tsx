/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { 
  NavigationContainer 
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalContextProvider from './src/context/GlobalContext';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GlobalContextProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={AuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </GlobalContextProvider>
  );
}

export default App;

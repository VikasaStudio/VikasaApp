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
import AuthScreen from './src/screens/AuthScreen';

import GlobalContextProvider from './src/context/GlobalContext';
import { GlobalContext } from './src/context/GlobalContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GlobalContextProvider>

      
      <GlobalContext.Consumer>
        { val => {
          if(val.username){
            return (
              <View>
                <Text> Welcome Mr. {val.username} </Text>
              </View>
            );
          }
          
          return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={AuthScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          );
        }}
      </GlobalContext.Consumer>

      

    </GlobalContextProvider>
  );
}

export default App;

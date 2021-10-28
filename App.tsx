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
  Button,
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
import Dashboard from './src/screens/Dashboard';
import Orders from './src/screens/Orders/Orders';
import {HeaderRight} from './src/screens/Orders/Orders';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GlobalContextProvider>

      
      <GlobalContext.Consumer>
        { val => {
          if(!val.username){
            return (
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Order">
                  <Stack.Screen name="Dashboard" component={Dashboard} options={{
                    headerShown:false
                  }}/>
                  <Stack.Screen name="Order" component={Orders} options={{
                    headerShown:true,
                    headerRight: HeaderRight
                  }}/>
                </Stack.Navigator>
            </NavigationContainer>
            );
          }
          
          return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={AuthScreen} options={{
                    headerShown:false
                  }}/>
              </Stack.Navigator>
            </NavigationContainer>
          );
        }}
      </GlobalContext.Consumer>

      

    </GlobalContextProvider>
  );
}

export default App;

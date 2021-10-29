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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AuthScreen from './src/screens/AuthScreen';

import GlobalContextProvider from './src/context/GlobalContext';
import { GlobalContext } from './src/context/GlobalContext';
import Dashboard from './src/screens/Dashboard';
import Orders from './src/screens/Orders/Orders';
import {HeaderRight} from './src/screens/Orders/Orders';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function OrderNavigator(props: any){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pending" component={Orders} options={{
        title: "Pending",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Accepted" component={Orders} options={{
        title: "Accepted",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Shipped" component={Orders} options={{
        title: "Shipped",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Delivered" component={Orders} options={{
        title: "Delivered",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Rejected" component={Orders} options={{
        title: "Rejected",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
    </Tab.Navigator>);
}
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
                  <Stack.Screen name='Order' component={OrderNavigator} />
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

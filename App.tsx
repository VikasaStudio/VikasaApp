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
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();


function OrderNavigator(props: any){
  return (
    
    <Tab.Navigator>
      <Tab.Screen name="Pending" component={gestureHandlerRootHOC(Orders)} options={{
        title: "Pending",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Accepted" component={gestureHandlerRootHOC(Orders)} options={{
        title: "Accepted",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Shipped" component={gestureHandlerRootHOC(Orders)} options={{
        title: "Shipped",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Delivered" component={gestureHandlerRootHOC(Orders)} options={{
        title: "Delivered",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
      <Tab.Screen name="Rejected" component={gestureHandlerRootHOC(Orders)} options={{
        title: "Rejected",
        tabBarLabelStyle:{fontSize:10, color:'white'},
        tabBarStyle:{height:40, backgroundColor:'grey'},
        swipeEnabled:false
      }}/>
    </Tab.Navigator>

  );
}
export default function App() {
  return (
      <GlobalContextProvider>
        <GlobalContext.Consumer>
          { 
            val => {
            if(!val.username)
              return (
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="Dashboard">
                    <Stack.Screen name="Dashboard" component={gestureHandlerRootHOC(Dashboard)} options={{
                      headerShown:false
                    }}/>
                    <Stack.Screen name='Order' options={{headerTitle:'My Orders'}} component={gestureHandlerRootHOC(OrderNavigator)} />
                  </Stack.Navigator>
              </NavigationContainer>
              );
            
            
            return (
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={gestureHandlerRootHOC(AuthScreen)} options={{
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



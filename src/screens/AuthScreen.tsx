
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
  } from 'react-native';
import globalStyle from '../styles/GlobalStyle';
export default function(){
    
    return (
        <View >
            <Text>Vendor ID</Text>
            <TextInput style={globalStyle.Input}/>
        </View>
    );
}
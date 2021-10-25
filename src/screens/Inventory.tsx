import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    Button,
    Alert
  } from 'react-native';
import Card from '../components/Card';
import { GlobalContext } from '../context/GlobalContext';

export default function() {
    const globalContextValue = useContext(GlobalContext);
    return(
    <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#1A1A22"
    }}>
        <Text>Welcome To Inventory Pag Page</Text>
    </View>);
}
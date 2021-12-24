import { useNavigation } from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {logout} from '../utils/networking'
import {
    Button,
    Text,
    TouchableOpacity,
    View
  } from 'react-native';
import Card from '../components/Card';
import { GlobalContext } from '../context/GlobalContext';

/*
*/
export default function() {
    const globalContextValue = useContext(GlobalContext);
    const navigation = useNavigation<any>();

    return(
    <View style={{
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: "#1A1A22"
    }}>
        {/* Logout Button */}
        <Button
            onPress={(e : any) => {
                logout(globalContextValue).then(() => {
                    console.log('Logged out')
                })
            }}
            title="Log out"
            color="#841584"
        />


    </View>);
}
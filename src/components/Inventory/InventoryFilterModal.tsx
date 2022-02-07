import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Text,
    View,
    Button
  } from 'react-native';


export default function InventoryFilterModal(props : any)
{
    const navigation = useNavigation<any>();

    return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

        {/* Set Filters */}
        <View style={{flex:1}}>
        </View>

        {/* Ordered Items Table */}
        <Button title="Dismiss" onPress={()=> navigation.goBack()}/>

    </View>);
}
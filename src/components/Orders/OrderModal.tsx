import React, {useContext, useState} from 'react';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
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
    Alert,
    FlatList
  } from 'react-native';
import Card from '../Card';
import { GlobalContext } from '../../context/GlobalContext';
import SellOrderListItem from './SellOrderListItem';
import DataTableBase from '../DataTableBase';

function CustomerRow(props: any){
    let data = props.data;
    let iconType = props.iconType;
    return (<View style={{flex:1, flexDirection: 'column'}}>

    </View>)
}

const ColumnHeader = [
    {
        name: 'Item',
    },
    {
        name: 'Unit Price',
    },
    {
        name: 'Quantity',
    },
    {
        name: 'Total'
    }
]
export default function SellOrderModal(props : any){
    let orderData = props.data;
    return (
    <View style={{flex:1, flexDirection:'row'}}>
        
        {/* Customer Profile View */}
        <View style={{flex:1, flexDirection:'column'}}>
            <CustomerRow data = {orderData.customerName}/>
            <CustomerRow data = {orderData.email}/>
            <CustomerRow data = {orderData.address}/>
            <CustomerRow data = {orderData.customerName}/>
        </View>

        {/* Ordered Items Table */}
        <View>
            <DataTableBase columns={ColumnHeader} data={orderData.items}/>
        </View>

    </View>);
}
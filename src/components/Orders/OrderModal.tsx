import React from 'react';
import {
    Text,
    View,
  } from 'react-native';

function CustomerRow(props: any){
    console.log(props)
    return (
    <View style={{flex:1}}>
        <Text style={{backgroundColor:'red'}}>{props.data}</Text>
    </View>)
}

const ColumnHeader = [
    {
        name: 'Item',
        selector: (rowItem: { name: any; }) => rowItem.name
    },
    {
        name: 'Unit Price',
        selector: (rowItem: { price:any}) => rowItem.price
    },
    {
        name: 'Quantity',
        selector: (rowItem: { quantity:any}) => rowItem.quantity
    },
    {
        name: 'Total',
        selector: (rowItem: { total:any }) => rowItem.total
    }
]

export default function SellOrderModal(props : any){
    console.log('SellOrderModal',props.data.items);
    if(props == null || props === {}){
        return <View/>
    }
    return (
    <View style={{flex:1}}> 
        {/* Customer Profile View */}
        <View style={{flex:1}}>
            <CustomerRow data = {props.data.customerName}/>
            <CustomerRow data = {props.data.email}/>
            <CustomerRow data = {props.data.address}/>
            <CustomerRow data = {props.data.customerName}/>
        </View>

        {/* Ordered Items Table */}
        <View style={{flex:5}}>
        </View>
    </View>);
}
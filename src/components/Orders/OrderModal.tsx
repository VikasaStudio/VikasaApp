import React from 'react';
import {
    Text,
    View,
  } from 'react-native';
import DataTableBase from '../DataTableBase';

function CustomerRow(props: any){
    let data = props.data;
    return (
    <View style={{flex:1, flexDirection: 'column'}}>
        <Text>{data}</Text>
    </View>)
}

const ColumnHeader = [
    {
        name: 'Item',
        selector: (rowItem: { name:any }) => rowItem.name
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
    return (<View style={{flex:1, flexDirection:'row'}}>
        
        {/* Customer Profile View */}
        <View style={{flex:1, flexDirection:'column'}}>
            <CustomerRow data = {props.data.customerName}/>
            <CustomerRow data = {props.data.email}/>
            <CustomerRow data = {props.data.address}/>
            <CustomerRow data = {props.data.customerName}/>
        </View>

        {/* Ordered Items Table */}
        <View>
            <DataTableBase columns={ColumnHeader} data={props.data.items}/>
        </View>

    </View>);
}
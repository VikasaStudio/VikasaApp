import { useNavigation } from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import CONFIG from '../../utils/config'
import {
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    FlatList,
    Button
  } from 'react-native';
import Card from '../../components/Card';
import { GlobalContext } from '../../context/GlobalContext';
import styles from '../../styles/GlobalStyle';
import InventoryItem from '../../components/Inventory/InventoryItem';

export default function() {
    var DATA: readonly any[] | null | undefined = [];
    for(let i=0; i<100; i++){
        DATA = [...DATA, {
            id: i, 
            title:`item ${i}`, 
            inventoryName: 'inv', 
            inventoryId: i,
            shopName: 'myShop', 
            shopId:i, 
            price:100, 
            quantity:i
        }]
    }
    const navigation = useNavigation<any>();
    const renderItem = ({ item } :any) => (
        <InventoryItem 
            title={item.title}
            quantity={item.quantity} 
            price={item.price} 
            shopId={item.shopId}
            shopName={item.shopName}
            inventoryId={item.inventoryId}
            inventoryName={item.inventoryName}
        />
    );

    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* Filter/Search Container View */}
            <View style={{height:80,justifyContent:'center', alignItems: 'center', backgroundColor:'lime'}}>
                <Text>Inventory Search Options Here</Text>
            </View>

            {/* List View */}
            <View style={{flex:1, backgroundColor:'grey'}}>
                <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>

            {/* Button Bottom View */}
            <View style={{padding:10, paddingLeft:120, paddingRight:120}}>
                <Button title="New Item" onPress={()=>{
                    navigation.navigate({name: CONFIG.Screens.AddItem.name});
                }}></Button>
            </View>
        </View>
    );
}
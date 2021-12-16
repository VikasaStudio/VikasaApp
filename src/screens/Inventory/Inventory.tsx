import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
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
import { GlobalContext } from '../../context/GlobalContext';
import styles from '../../styles/GlobalStyle';
import InventoryItem from '../../components/Inventory/InventoryItem';
var DATA: readonly any[] | null | undefined = [];
for(let i=0; i<5; i++){
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

export default function() {
    
    const navigation = useNavigation<any>();
    const [selectedItems, setSelectedItem] = useState({});

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
            <View style={{flex:8, backgroundColor:'grey'}}>
                <FlatList data={DATA} renderItem={({ item } :any) => (
                <InventoryItem 
                    title={item.title}
                    quantity={item.quantity} 
                    price={item.price} 
                    shopId={item.shopId}
                    shopName={item.shopName}
                    inventoryId={item.inventoryId}
                    inventoryName={item.inventoryName}
                    onItemSelect={(e:any)=>{
                        console.log('Selected. ', e.title)
                    }}
                    onItemUnselect={(e:any)=>{
                        console.log('Unselected', e.title)
                    }}
                />
            )} keyExtractor={item => item.id} />
            </View>

            {/* Button Bottom View */}
            <View style={{flex:1}}>
                <View style={{padding:5, flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1, margin:5}}>
                        <Button title="New" onPress={()=>{
                            navigation.navigate({name: CONFIG.Screens.AddItem.name});
                        }}/>
                    </View>
                    <View style={{flex:1, margin:5}}>
                        <Button title="Delete" onPress={()=>{
                            console.log('delete selected item')
                        }}></Button>
                    </View>
                    <View style={{flex:1, margin:5}}>
                        <Button title="Unselect All" onPress={()=>{
                            console.log('delete selected item')
                        }}></Button>
                    </View>
                </View>
            </View>
        </View>
    );
}
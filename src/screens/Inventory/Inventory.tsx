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
import { getItems } from '../../utils/networking';
import ToggableViewContainer from '../../components/ToggableViewContainer';
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
    const [selectedItems, setSelectedItems] = useState(new Map<string | number, any>());
    const [itemList, setItemList] = useState([]);

    useEffect(()=>{

    }, [selectedItems])

    //preload items
    useEffect(()=>{
        var toLoad = true;
        async function preloadItemsList() {
            let res = await getItems('fgdfgdfgd', {});
            if(!toLoad)
                return;
            if(!res) {
                setItemList([]);
                return;
            }
            
            let resArray = res.data;
    
            setItemList(resArray);
        }
        preloadItemsList();
        return ()=>{toLoad = false}
    }, []);
    
    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* List View */}
            <View style={{flex:8, backgroundColor:'grey'}}>
                <FlatList data={itemList} renderItem={({ item } :any) => (
                    <InventoryItem
                        itemId = {item.itemId}
                        title={item.SellableItemProfile.displayName}
                        quantity={item.SellableItemProfile.quantity} 
                        price={item.SellableItemProfile.pricePerUnit}

                        shopId={item.SellableItemProfile.storeId}
                        shopName={item.SellableItemProfile.storeId}

                        inventoryId={item.SellableItemProfile.inventoryId}
                        inventoryName={item.SellableItemProfile.inventoryId}

                        onItemSelect={(e: { itemId: string; })=>{
                            var currentMap = selectedItems;
                            currentMap.set(e.itemId, e)
                            setSelectedItems(new Map(currentMap))
                        }}
                        onItemUnselect={(e:any)=>{
                            var currentMap = selectedItems;
                            currentMap.delete(e.itemId)
                            setSelectedItems(new Map(currentMap))
                        }}
                    /> 
                )} keyExtractor={(item:any)=>item.itemId}/>
            </View>

            {/* Button Bottom View */}
            <View style={{flex:1}}>
                <View style={{padding:5, flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1, margin:5}}>
                        <Button title="New" onPress={()=>{
                            navigation.navigate({name: CONFIG.Screens.AddItem.name});
                        }}/>
                    </View>
                    <ToggableViewContainer index={selectedItems.size > 0 ? 0 : 1}>
                        <View style={{flex:1, margin:5}}>
                                <Button title="Delete" onPress={()=>{
                                    console.log('delete selected item')
                                }}></Button>
                        </View>
                        <></>
                    </ToggableViewContainer>
                    <View style={{flex:1, margin:5}}>
                        <ToggableViewContainer index={selectedItems.size > 0 ? 0 : 1}>
                            <Button title="Unselect All" onPress={()=>{
                                selectedItems.forEach( (v, k)=>{
                                    v.setChecked(false);
                                })
                            }}/>
                            <Button title="Select All" onPress={()=>{
                            }}/>
                        </ToggableViewContainer>
                    </View>
                </View>
            </View>
        </View>
    );
}
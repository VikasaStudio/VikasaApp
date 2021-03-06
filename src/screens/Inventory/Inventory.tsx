import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import CONFIG from '../../utils/config'
import {
    View,
    FlatList,
    Button,
    ActivityIndicator
  } from 'react-native';
import InventoryItem from '../../components/Inventory/InventoryItem';
import ToggableViewContainer from '../../components/ToggableViewContainer';
import { GlobalContext } from '../../context/GlobalContext';
import { InventoryContext } from '../../context/InventoryContext';
import { useActivityIndicator } from '../../hooks/useActivityIndicator';

export default function(props:any) {
    
    const navigation = useNavigation<any>();
    const globalContextValue = useContext(GlobalContext);

    var {pending, startLoading, endLoading} = useActivityIndicator(0);

    const {items, selectedItems, selectItem, unselectItem, deleteItem, filter} = useContext(InventoryContext);

    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* List View */}
            <View style={{flex:8, backgroundColor:'grey'}}>
                
                <FlatList data={[...items.values()]} renderItem={({ item } :any) => (
                    <InventoryItem

                        itemId = {item.itemId}
                        title={item.SellableItemProfile.displayName}
                        quantity={item.SellableItemProfile.quantity} 
                        price={item.SellableItemProfile.pricePerUnit}

                        shopId={item.SellableItemProfile.storeId}
                        shopName={item.SellableItemProfile.storeId}

                        inventoryId={item.SellableItemProfile.inventoryId}
                        inventoryName={item.SellableItemProfile.inventoryId}

                        setChecked={selectItem}
                        setUnchecked={unselectItem}
                        selectedItems={selectedItems}

                        onItemSelect={(e: { itemId: string; })=>{
                            console.log(e);
                        }}
                        onItemUnselect={(e:any)=>{
                            
                        }}

                        onPress={(data:any)=>{
                            console.log('Pressed : ', data);
                        }}
                    /> 
                )}
                    keyExtractor={(item:any)=>item.itemId} 
                    onEndReachedThreshold={0.5} 
                    onEndReached={(info : any)=>{
                    console.log('reached end', info);
                }} />

                <ToggableViewContainer index={pending > 0 ? 0 : 1}>
                    <View style={{backgroundColor: 'transparent'}}>
                        <ActivityIndicator size="large" 
                        style={{padding:10, backgroundColor: 'transparent'}} />
                    </View>
                    <></>
                </ToggableViewContainer>
            
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
                                <Button title="Delete" onPress={async ()=>{
                                    var dup = selectedItems;
                                    dup.forEach( async (itemId:any)=>{
                                        console.log(itemId)
                                        startLoading();
                                        let deleted = await deleteItem(itemId)
                                        endLoading();
                                    });
                                    
                                }}></Button>
                        </View>
                        <></>
                    </ToggableViewContainer>
                    <View style={{flex:1, margin:5}}>
                        <ToggableViewContainer index={selectedItems.size > 0 ? 0 : 1}>
                            <Button title="Unselect All" onPress={()=>{
                                unselectItem();
                            }}/>
                            <Button title="Select All" onPress={()=>{
                                startLoading();
                                items.forEach( (item: any, itemId: any) => {  
                                    selectItem(itemId);
                                })
                                endLoading();
                            }}/>

                        </ToggableViewContainer>
                    </View>
                </View>
            </View>
        </View>
    );
}
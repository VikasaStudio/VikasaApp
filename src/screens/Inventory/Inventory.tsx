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
import { deleteItem, getItems } from '../../utils/networking';
import ToggableViewContainer from '../../components/ToggableViewContainer';
import { GlobalContext } from '../../context/GlobalContext';
import { useFetchedInventoryItems } from '../../hooks/useFetchedInventoryItems';
export default function() {
    
    const navigation = useNavigation<any>();
    const globalContextValue = useContext(GlobalContext);

    //selected/unselected handler
    const [itemSetCheckedHandler, setItemSetCheckedHandler] = useState(new Map<string, any>());

    const [isLoading, setLoading] = useState(false);

    const [dataLoadTrigger, setDataLoadTrigger] = useState(false);
    const {items, selectedItems, selectItem, unselectItem} = useFetchedInventoryItems(new Map<string, any>(), {storeId: 'fgdfgdfgd'});
    
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

                        setChecked={item.setChecked}
                        selectedItems={selectedItems}

                        onItemSelect={(e: { itemId: string; })=>{
                            
                        }}
                        onItemUnselect={(e:any)=>{
                            
                        }}
                    /> 
                )}
                    keyExtractor={(item:any)=>item.itemId} 
                    onEndReachedThreshold={-1} 
                    onEndReached={(info : any)=>{
                    console.log('reached end', info);
                }} />
                <ToggableViewContainer index={isLoading ? 0 : 1}>
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

                                    selectedItems.forEach( async (item:any, itemId:string)=>{
                                        let res = await deleteItem({
                                            storeId: item.shopId,
                                            itemId: item.itemId,
                                            inventoryId: item.inventoryId,
                                            vendorId: globalContextValue.username
                                        }).catch(err=>{console.log('err',err)});
                                        
                                        if(res){
                                            setDataLoadTrigger(!dataLoadTrigger);
                                        }
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
                                console.log('select all items');
                                items.forEach( (item, itemId) => {  
                                    selectItem(itemId);
                                })
                            }}/>

                        </ToggableViewContainer>
                    </View>
                </View>
            </View>
        </View>
    );
}
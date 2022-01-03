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

export default function() {
    
    const navigation = useNavigation<any>();
    const globalContextValue = useContext(GlobalContext);
    const [selectedItems, setSelectedItems] = useState(new Map<string, any>());

    const [rawItemData, setRawItemData] = useState([]);
    const [itemSetCheckedHandler, setItemSetCheckedHandler] = useState(new Map<string, any>());

    const [isLoading, setLoading] = useState(false);

    const [dataLoadTrigger, setDataLoadTrigger] = useState(false);

    useEffect(()=>{
    }, [selectedItems])

    //preload items
    useEffect(()=>{
        var toLoad = true;
        async function preloadItemsList() {
            setLoading(true);

            //clear existing load content
            setRawItemData([])
            setSelectedItems(new Map<string, any>());
            setItemSetCheckedHandler(new Map<string, any>());

            let res = await getItems({storeId:'fgdfgdfgd', offset:0, limit:55});
            setLoading(false);
            if(!toLoad)
                return;
            if(!res) {
                setRawItemData([]);
                return;
            }
            
            let resArray = res.data;
            setRawItemData(resArray);
        }
        preloadItemsList();
        return ()=>{toLoad = false}
    }, [dataLoadTrigger]);
    
    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* List View */}
            <View style={{flex:8, backgroundColor:'grey'}}>
                <FlatList data={rawItemData} renderItem={({ item } :any) => (
                    <InventoryItem
                        //store this instance in a state as well, so as to fetch it back
                        onItemInitialize={(item:any)=>{
                            if(!item) return;
                            var d = itemSetCheckedHandler;
                            d.set(item.itemId, item.setChecked);
                            setItemSetCheckedHandler(new Map<string, any>(d));
                        }}
                        onItemDelete={(item:any)=>{
                            if(!item) return;
                            var d = itemSetCheckedHandler;
                            d.delete(item.itemId);
                            setItemSetCheckedHandler(new Map<string, any>(d));
                        }}

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
                                selectedItems.forEach( (v, k)=>{
                                    v.setChecked(false);
                                })
                            }}/>
                            <Button title="Select All" onPress={()=>{
                                itemSetCheckedHandler.forEach( (setChecked)=>{
                                    setChecked(true);
                                })
                            }}/>
                        </ToggableViewContainer>
                    </View>
                </View>
            </View>
        </View>
    );
}
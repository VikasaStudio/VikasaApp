import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {
    Text,
    View,
    Button,
    ActivityIndicator
  } from 'react-native';
import {InventoryContext} from '../../context/InventoryContext';
import {GlobalContext} from '../../context/GlobalContext';
import { getInventories, getShops } from '../../utils/networking';
import {useActivityIndicator} from '../../hooks/useActivityIndicator';

export default function InventoryFilterModal(props : any)
{
    const navigation = useNavigation<any>();
    
    // Stores the state of dropdowns (whether open/close)
    const [shopDropdownState, setShopDropdownOpen] = useState(false);
    const [invDropdownState, setInvDropdownOpen] = useState(false);

    // Stores the current selected value of dropdowns
    const [shopDropdownSelectedValue, setShopDropdownSelectedValue] = useState(null);
    const [invDropdownSelectedValue, setInvDropdownSelectedValue] = useState(null);
    
    // Stores Content of Dropdowns
    const [shopDropdownItems, setShopDropdownItems] = useState(new Array());
    const [invDropdownItems, setInvDropdownItems] = useState(new Array());

    
    const {filter} = useContext(InventoryContext);
    const globalContextValue = useContext(GlobalContext);

    const activityLoaderController = useActivityIndicator(0);

    //Fetch Shops whenever modal is displayed.
    useEffect(()=>{
        
        var toLoad = true;
        async function getVendorShops() {
            activityLoaderController.startLoading();
            let res = await getShops(globalContextValue).catch(err=>{
                console.log('error while fetching shops ', err);
            })
            activityLoaderController.endLoading();
            if(!toLoad){
                return;
            }
            if(!res) {
                setShopDropdownItems([]);
                return;
            }
            activityLoaderController.startLoading();
            let resArray = res.data.map((item: { displayName: any; storeId: any; }) =>{
                return {
                    'label': item.displayName, 
                    'value': item.storeId
                }
            });
            setShopDropdownItems(resArray);
            activityLoaderController.endLoading();
        }
        getVendorShops();
        return ()=>{toLoad = false}
    }, []);

    //Fetch Inventories whenever shop is selected.
    useEffect(()=>{
        var toLoad = true;
        async function getShopInventories() {
            if(!shopDropdownSelectedValue) 
                return;

            activityLoaderController.startLoading();
            filter.setStoreId(shopDropdownSelectedValue);
            let res = await getInventories(shopDropdownSelectedValue).catch(err=>{
                console.log('failed to fetch inv. ', err);
            })
            activityLoaderController.endLoading();
            if(!toLoad)
                return;
            if(!res) {
                setInvDropdownItems([]);
                return;
            }

            activityLoaderController.startLoading();
            let resArray = res.data.map((item: { displayName: any; inventoryId: any; }) =>{
                return {
                    'label': item.displayName, 
                    'value': item.inventoryId
                }
            });
            activityLoaderController.endLoading();

            setInvDropdownItems(resArray);
        }
        getShopInventories();
        return ()=>{toLoad=false}
    }, [shopDropdownSelectedValue]);

    useEffect(()=>{
        filter.setInventoryId(invDropdownSelectedValue);
    }, [invDropdownSelectedValue])
    return (
    <View style={{flex:1}}>
        {/* Set Filters */}
        <View style={{flex:1}}>

            {/* Row 1 - Shop Dropdown */}
            <View style={{flex:1, flexDirection:'column', minHeight:1}}>
                <DropDownPicker 
                    open={shopDropdownState}
                    setOpen={setShopDropdownOpen}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    style={{
                        zIndex:100
                    }}
                    value={shopDropdownSelectedValue}
                    setValue={setShopDropdownSelectedValue}
                    setItems={setShopDropdownItems}
                    items={shopDropdownItems}
                    placeholder="Select Shop"
                    onOpen={()=>{
                        setInvDropdownOpen(false)
                    }}
                />
                <DropDownPicker 
                    open={invDropdownState}
                    setOpen={setInvDropdownOpen}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    style={{
                        backgroundColor: "white",
                        zIndex:0
                    }}
                    value={invDropdownSelectedValue}
                    setValue={setInvDropdownSelectedValue}
                    setItems={setInvDropdownItems}
                    items={invDropdownItems}
                    placeholder="Select Inventory"
                    onOpen={()=>{
                        setShopDropdownOpen(false)
                    }}
                />
            </View>
            <View style={{flex:1, flexDirection:'row', padding:10, minHeight:1}}>
                
            </View>
            
        </View>

        { activityLoaderController.pending > 0 ?<ActivityIndicator size="large" color="red"/>: <></>}
        {/* Ordered Items Table */}
        <Button title="Dismiss" onPress={()=> navigation.goBack()}/>

    </View>);
}
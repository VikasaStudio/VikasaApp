import {
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    Button,
    StyleSheet
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../../context/GlobalContext';
import React, {useContext, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import ToggableViewContainer from '../../components/ToggableViewContainer';
import { createEmptyStore, createItem, getInventories, getShops } from '../../utils/networking';

const Styles = StyleSheet.create({
    textInputStyle:{
        borderStyle: 'solid', 
        backgroundColor:'white',
        width: '100%',
        margin:5
    },

    ViewStyle:{
        justifyContent: 'center',
        flex:1,
        minHeight:1
    },

    productInfoView:{
        padding:10,
        minHeight:1,
        justifyContent: 'center',
        alignItems: 'center',
        flex:5,
        flexDirection: 'column'
    }
})

export default function(props : any){

    // Stores the state of dropdowns (whether open/close)
    const [shopDropdownState, setShopDropdownOpen] = useState(false);
    const [invDropdownState, setInvDropdownOpen] = useState(false);

    // Stores the current selected value of dropdowns
    const [shopDropdownSelectedValue, setShopDropdownSelectedValue] = useState(null);
    const [invDropdownSelectedValue, setInvDropdownSelectedValue] = useState(null);
    
    // Manage whether we want to show dropdown or text input
    const [shopIndex, setShopIndex] = useState(0)
    const [invIndex, setInvIndex] = useState(0)

    // Stores Content of Dropdowns
    const [shopDropdownItems, setShopDropdownItems] = useState(new Array());
    const [invDropdownItems, setInvDropdownItems] = useState(new Array());


    // Additional Text Inputs value
    const [itemName, setItemName] = useState('')
    const [itemCategory, setItemCategory] = useState('')
    const [itemVariant, setItemVariant] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemDesc, setItemDesc] = useState('')

    const globalContextValue = useContext(GlobalContext);

    // Load Shops and Inventory
    useEffect(()=>{
        
        var toLoad = true;
        async function getVendorShops() {
            let res = await getShops(globalContextValue).catch(err=>{
                console.log('error while fetching shops ', err);
            })
            if(!toLoad)
                return;
            if(!res) {
                setShopDropdownItems([]);
                return;
            }

            let resArray = res.data.map((item: { displayName: any; storeId: any; }) =>{
                return {
                    'label': item.displayName, 
                    'value': item.storeId
                }
            });

            console.log('res-array', resArray)
            setShopDropdownItems(resArray);
        }
        getVendorShops();
        return ()=>{toLoad = false}
    }, []);

    useEffect(()=>{
        var toLoad = true;
        async function getShopInventories() {
            if(!shopDropdownSelectedValue) 
                return;
            let res = await getInventories(shopDropdownSelectedValue).catch(err=>{
                console.log('failed to fetch inv. ', err);
            })
            if(!toLoad)
                return;
            if(!res) {
                setInvDropdownItems([]);
                return;
            }

            let resArray = res.data.map((item: { displayName: any; inventoryId: any; }) =>{
                return {
                    'label': item.displayName, 
                    'value': item.inventoryId
                }
            });

            console.log('res-array', resArray)
            setInvDropdownItems(resArray);
        }
        getShopInventories();
        return ()=>{toLoad=false}
    }, [shopDropdownSelectedValue]);

    return (
        <ScrollView nestedScrollEnabled={true} style={{flex:1}}>
            {/* Create Shop & Inventory Dropdown Panel */}
            <View style={Styles.ViewStyle}>
                
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{padding:10, color:'white'}}>Select/Create Shop & Inventory </Text>
                </View>

                {/* rows container */}
                <View style={{flex:1, flexDirection: 'column', minHeight:1}}>

                    {/* row-1 : shop dropdown and checkbox */}
                    <View style={{flex:1, flexDirection: 'row', padding:10, minHeight:1}}>

                        {/*col-0 : dropdown*/}
                        <View style={{flex:4, minHeight:1}}>
                            <ToggableViewContainer index={shopIndex}>
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
                                <TextInput style={Styles.textInputStyle}
                                    placeholder="New Shop"
                                />
                            </ToggableViewContainer>
                        </View>

                        {/*col-1: checkbox*/}
                        <View style={{flex:1, justifyContent: 'center', paddingLeft:10, minHeight:1}}>
                            <CheckBox
                                onClick={()=>{
                                    setShopIndex((shopIndex + 1)%2)
                                }}
                                isChecked={(shopIndex === 1)}
                                leftText="New"
                            />
                        </View>
                    
                    </View>
                    {/* ----- end of row-1 -----------*/}

                    {/* row-2 : shop dropdown and checkbox */}
                    <View style={{flex:1, flexDirection: 'row', padding:10, minHeight:1}}>

                        {/*col-0 : dropdown*/}
                        <View style={{flex:4, minHeight:1}}>
                            <ToggableViewContainer index={invIndex}>
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
                                <TextInput style={Styles.textInputStyle}
                                    placeholder="New Inventory"
                                />
                            </ToggableViewContainer>
                        </View>

                        {/*col-1: checkbox*/}
                        <View style={{flex:1, justifyContent: 'center', paddingLeft:10}}>
                            <CheckBox
                                onClick={()=>{
                                    setInvIndex((invIndex+1)%2)
                                }}
                                isChecked={(invIndex === 1)}
                                leftText="New"
                            />
                        </View>
                    
                    </View>
                    {/* ----- end of row-2 -----------*/}

                </View>

            </View>

            {/* Product Information Inputs */}
            <View style={Styles.productInfoView}>
                <Text style={{padding:10}}>  Product Information </Text>
                <TextInput style={Styles.textInputStyle}
                    placeholder="Name"
                    onChangeText={setItemName}
                />

                <TextInput style={Styles.textInputStyle}
                    placeholder="Category"
                    onChangeText={setItemCategory}
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Variant"
                    onChangeText={setItemVariant}
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Quantity"
                    onChangeText={setItemQuantity}
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Price/Unit"
                    onChangeText={setItemPrice}
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Description"
                    onChangeText={setItemDesc}
                    editable
                    multiline
                />
            </View>

            <View style={{flex:1}}>
                <Button title="Create" onPress={async (e : any)=>{
                    // Create Shop
                    var itemDetail = {
                        displayName: itemName,
                        category: itemCategory,
                        variant: itemVariant,
                        quantity: itemQuantity,
                        pricePerUnit: itemPrice,
                        description: itemDesc,
                        storeId: shopDropdownSelectedValue,
                        inventoryId: invDropdownSelectedValue
                    }
                    console.log(itemDetail)
                    var isNewShopRequired : boolean = (shopIndex === 1);
                    var isNewInvRequired : boolean = (invIndex === 1);
                    if(!isNewShopRequired && !isNewInvRequired) {
                        var res = await createItem(itemDetail).catch(err=>{console.log('Error while creating item : ', err)});
                        if(res){

                        }
                        return;
                    }
                }}/>
            </View>
        </ScrollView>
    )
}
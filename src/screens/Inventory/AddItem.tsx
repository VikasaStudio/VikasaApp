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
    const [shopDropdownState, setShopDropdownOpen] = useState(false);
    const [invDropdownState, setInvDropdownOpen] = useState(false);

    const [value, setValue] = useState(null);
    
    const [shopIndex, setShopIndex] = useState(0)
    const [invIndex, setInvIndex] = useState(0)

    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'Lime', value: 'lime'},
        {label: 'Chocolate', value: 'Chocolate'},
        {label: 'Strawberry', value: 'Strawberry'},
        {label: 'Vanilla', value: 'Vanilla'},
        {label: 'Tomato', value: 'tomato'}
    ]);

    // Load Shops and Inventory
    useEffect(()=>{
        console.log('Load Shop and Inventory')
    }, [])

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
                                    value={value}
                                    setValue={setValue}
                                    setItems={setItems}
                                    items={items}
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
                                    value={value}
                                    setValue={setValue}
                                    setItems={setItems}
                                    items={items}
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
                />

                <TextInput style={Styles.textInputStyle}
                    placeholder="Category"
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Variant"
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Quantity"
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Price/Unit"
                />
                <TextInput style={Styles.textInputStyle}
                    placeholder="Description"
                    editable
                    multiline
                />
            </View>

            <View style={{flex:1}}>
                <Button title="Create" onPress={(e : any)=>{
                    
                }}/>
            </View>
        </ScrollView>
    )
}
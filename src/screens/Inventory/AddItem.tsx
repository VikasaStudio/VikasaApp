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
import React, {useContext, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';

const Styles = StyleSheet.create({
    textStyle:{
        borderStyle: 'solid', 
        backgroundColor:'white',
        width: '100%',
        margin: 10
    },

    ViewStyle:{
        justifyContent: 'center',
        flex:1,
        minHeight:1
    },

    ViewStyleBehind:{
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        zIndex:-5,
        flexDirection: 'column',
    }
})

export default function(props : any){
    const [shopDropdownState, setShopDropdownOpen] = useState(false);
    const [invpDropdownState, setInvDropdownOpen] = useState(false);

    const [value, setValue] = useState(null);
    
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'}
    ]);

    return (
        <ScrollView nestedScrollEnabled={true}  style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* Create Shop & Inventory Dropdown Panel */}
            <View style={Styles.ViewStyle}>
                
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{padding:10, color:'white'}}>Select/Create Shop & Inventory </Text>
                </View>

                {/* rows container */}
                <View style={{flex:1, flexDirection: 'column'}}>

                    {/* row-1 : shop dropdown and checkbox */}
                    <View style={{flex:1, flexDirection: 'row', backgroundColor:'yellow', padding:10, zIndex:100}}>

                        {/*col-0 : dropdown*/}
                        <View style={{flex:2}}>
                            <DropDownPicker 
                                open={shopDropdownState}
                                setOpen={setShopDropdownOpen}
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                style={{
                                    backgroundColor: "white",
                                    zIndex:1000
                                }}
                                value={value}
                                setValue={setValue}
                                setItems={setItems}
                                items={items}
                                placeholder="Select Shop"
                            />
                        </View>

                        {/*col-1: checkbox*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <CheckBox
                                onClick={()=>{}}
                                isChecked={false}
                                leftText="New"
                            />
                        </View>
                    
                    </View>
                    {/* ----- end of row-1 -----------*/}

                    {/* row-2 : shop dropdown and checkbox */}
                    <View style={{flex:1, flexDirection: 'row', backgroundColor:'green', padding:10, zIndex:99}}>

                        {/*col-0 : dropdown*/}
                        <View style={{flex:2}}>
                            <DropDownPicker 
                                open={shopDropdownState}
                                setOpen={setShopDropdownOpen}
                                listMode="SCROLLVIEW"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                }}
                                style={{
                                    backgroundColor: "white",
                                    zIndex:1000
                                }}
                                value={value}
                                setValue={setValue}
                                setItems={setItems}
                                items={items}
                                placeholder="Select Inventory"
                            />
                        </View>

                        {/*col-1: checkbox*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <CheckBox
                                onClick={()=>{}}
                                isChecked={false}
                                leftText="New"
                            />
                        </View>
                    
                    </View>
                    {/* ----- end of row-2 -----------*/}

                </View>

            </View>

            {/* Product Information Inputs */}
            <View style={Styles.ViewStyleBehind}>
                <Text style={{padding:10}}>  Product Information </Text>
                <TextInput style={Styles.textStyle}
                    placeholder="Name"
                />

                <TextInput style={Styles.textStyle}
                    placeholder="Category"
                />
                <TextInput style={Styles.textStyle}
                    placeholder="Variant"
                />
                <TextInput style={Styles.textStyle}
                    placeholder="Quantity"
                />
                <TextInput style={Styles.textStyle}
                    placeholder="Price/Unit"
                />
                <TextInput style={Styles.textStyle}
                    placeholder="Description"
                    editable
                    multiline
                />
            </View>


            <Button title="Create" onPress={(e : any)=>{
                
            }}/>

        </ScrollView>
    )
}
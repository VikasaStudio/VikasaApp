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

const Styles = StyleSheet.create({
    textStyle:{
        borderStyle: 'solid', 
        backgroundColor:'#dadad0',
        width: '100%',
        margin: 10
    },

    ViewStyle:{
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        flexDirection: 'column',
        minHeight:1
    },

    ViewStyleBehind:{
        padding:10,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        zIndex:-5,
        flexDirection: 'column',
    }
})

export default function(props : any){
    const [addItemModalVisibility, setAddItemModalVisibility] = useState(false);

    const [isDropdownOpen, setDropdownState] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'a', value: 'a'},
        {label: 'b', value: 'b'},
        {label: 'c', value: 'c'},
        {label: 'd', value: 'd'},
        {label: 'e', value: 'e'},
        {label: 'f', value: 'f'},
        {label: 'f2', value: '2f'},
        {label: '3f', value: '3f'},
        {label: '4f', value: 'f4'},
        {label: 'f5', value: '5f'},
    ]);

    return (
        <ScrollView nestedScrollEnabled={true}  style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* Create Shop & Inventory Dropdown Panel */}
            <View style={Styles.ViewStyle}>
                <Text style={{padding:10}}>  Select/Create Shop & Inventory </Text>
                <DropDownPicker 
                    open={isDropdownOpen}
                    setOpen={setDropdownState}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    style={{
                        backgroundColor: "crimson",
                        zIndex:1000,
                        marginBottom:10,
                      }}
                    value={value}
                    setValue={setValue}
                    setItems={setItems}
                    items={items}
                />

                <DropDownPicker 
                    open={isDropdownOpen}
                    setOpen={setDropdownState}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    style={{
                        backgroundColor: "crimson",
                        zIndex:999
                      }}
                    value={value}
                    setValue={setValue}
                    setItems={setItems}
                    items={items}
                />
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
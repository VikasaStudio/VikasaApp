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
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        flexDirection: 'column',
    }
})

export default function(props : any){
    const [addItemModalVisibility, setAddItemModalVisibility] = useState(false);

    const [isDropdownOpen, setDropdownState] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
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
                <TextInput style={Styles.textStyle}
                    placeholder="Shop"
                />
                <DropDownPicker 
                    open={isDropdownOpen}
                    setOpen={setDropdownState}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    value={value}
                    setValue={setValue}
                    theme="DARK"
                    setItems={setItems}
                    items={items}
                />
            </View>

            {/* Product Information Inputs */}
            <View style={Styles.ViewStyle}>
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
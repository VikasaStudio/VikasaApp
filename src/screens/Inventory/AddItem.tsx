import {
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    Button
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../../context/GlobalContext';
import React, {useContext, useState} from 'react';
import AddItemModal from '../../components/Inventory/AddItemModal';

export default function(props : any){
    const [addItemModalVisibility, setAddItemModalVisibility] = useState(false);
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            <AddItemModal visible={addItemModalVisibility} setVisible={(visibility:boolean)=>{
                setAddItemModalVisibility(false);
            }}/>

            <TextInput style={{borderColor:'red', borderStyle: 'solid', backgroundColor:'white', margin:10, padding:10}} placeholder="Name"/>
            <TextInput style={{borderColor:'red', borderStyle: 'solid', backgroundColor:'white', margin:10, padding:10}} placeholder="Description"/>
            <View style={{margin:10, marginLeft:120, marginRight:120}}>
                <Button title="Add Item" onPress={()=>{setAddItemModalVisibility(!addItemModalVisibility)}}></Button>
            </View>
            <View style={{backgroundColor:'black', margin:5, flex:1}}>

            </View>
            <Button title="Create" onPress={()=>{}}></Button>
        </View>
    )
}
import { useNavigation } from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    FlatList,
    Button
  } from 'react-native';
import Card from '../../components/Card';
import { GlobalContext } from '../../context/GlobalContext';
import styles from '../../styles/GlobalStyle';

const Item = ({ title } : any) => (
    <TouchableOpacity>
        <View style={{margin:5, padding:10, backgroundColor:'green'}}>
            <Text>{title}</Text>
        </View>
    </TouchableOpacity>
);
export default function() {
    var DATA: readonly any[] | null | undefined = [];
    for(let i=0; i<515; i++){
        DATA = [...DATA, {
            id: i, title:i+' InventoryName'
        }]
    }
    const navigation = useNavigation<any>();
    const renderItem = ({ item } :any) => (
        <Item title={item.title} />
    );

    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#1A1A22"
        }}>
            {/* Filter/Search Container View */}
            <View style={{height:80,justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                <Text>Inventory Search Options Here</Text>
            </View>

            {/* List View */}
            <View style={{flex:1, backgroundColor:'grey'}}>
                <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>

            {/* Button Bottom View */}
            <View style={{padding:10, paddingLeft:120, paddingRight:120}}>
                <Button title="New Inventory" onPress={()=>{
                    navigation.navigate({name:'CreateInventory'});
                }}></Button>
            </View>
        </View>
    );
}
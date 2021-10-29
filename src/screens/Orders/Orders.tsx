import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    TouchableOpacity,
    View,
    Button,
    Alert,
    FlatList
  } from 'react-native';
import Card from '../../components/Card';
import { GlobalContext } from '../../context/GlobalContext';
import SellOrderListItem from '../../components/Orders/SellOrderListItem';

/* React Native Navigation Custom Headers */
var HeaderRight = function(){
  return (
    <View style={{flexDirection: 'row',backgroundColor:'red'}}>
      <Button onPress={()=>{}} title="Info" color="#red"/>
      <Button onPress={()=>{}} title="Info" color="#00cc00" />
    </View>
  )
}

export {HeaderRight}

export default function() {
    var DATA: readonly any[] | null | undefined = [
      ];
    for(let i=1; i<4; i++){
      DATA = [...DATA, {
        id: i,
        customerName: 'Keshav '+i,
        state:'Delhi',
        country:'India',
        mobile:'999921108'+i,
        total:'5'+i,
        itemQuantity:(i+5)
      }]
    }
    const globalContextValue = useContext(GlobalContext);
    return(
    <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white"
    }}>
        <View style={{height:80, justifyContent:'center', alignItems: 'center'}}>
          <Text>Swipe Left to Reject, Swipe Right to Accept Order</Text>
        </View>
        <FlatList data={DATA} renderItem = {(orderData)=>{
          return <SellOrderListItem titleColor='white' fontSize='18' sellOrderDetail={orderData}/>
        }} keyExtractor={item=> item.id}/>

        <View>
          <TouchableOpacity>
            <View style={{width:100, height:50, backgroundColor:'red', borderRadius:50, justifyContent:'center', alignItems: 'center'}}>
              <Text>Back</Text></View>
            </TouchableOpacity>
        </View>

    </View>);
}
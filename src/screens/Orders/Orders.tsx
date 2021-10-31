import React, {useContext, useState} from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
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
        key: i,
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
        
        <SwipeListView 
          data={DATA}
          useFlatList = {true} 
          renderItem = {
          (orderData)=>{
            return (
              <TouchableOpacity onPress={()=>{console.log('SwipeRow Item Pressed.')}} style={{
                flex:1,
                flexDirection: 'row'
              }}>
                <SellOrderListItem titleColor='white' fontSize='18' sellOrderDetail={orderData}/>
              </TouchableOpacity>)
          }} 
          renderHiddenItem={ ({item}) => {
            console.log(item);
            return (
            <View style={{backgroundColor:'red', flex:1, marginBottom:5}}>
                
            </View>
          )}}
          keyExtractor={item=> item.id}
          leftOpenValue={205} 
          rightOpenValue={-175}
        />
    </View>);
}
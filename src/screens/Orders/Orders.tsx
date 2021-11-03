import React, {useContext, useState} from 'react';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
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
var DATA: readonly any[] | null | undefined = [
];
for(let i=1; i<5; i++){
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

const HiddenItem = function(props: any)
{
  if(props.swipeDirection ==='left'){
    return (<View style={{backgroundColor:'red', flex:1, marginBottom:5}}/>)
  }
  return (<View style={{backgroundColor:'lime', flex:1, marginBottom:5}}/>)
}

const SwipeRowWrapper = function(props:any){
  const [swipeDirection, setSwipeDirection] = useState('left');
  var orderData = props.data;
  function OnSwipe({value}:any){
    if(value <= 0)
      setSwipeDirection('left');
    else setSwipeDirection('right');
  }
  return (
    <SwipeRow onSwipeValueChange={OnSwipe}>

      {/* Hidden Item */}
      <HiddenItem swipeDirection={swipeDirection}/>

      {/* Front Item */}
      <TouchableOpacity onPress={()=>{console.log('SwipeRow Item Pressed.')}} style={{
        flex:1,
        flexDirection: 'row'
      }}>
        <SellOrderListItem titleColor='white' fontSize='18' data={orderData}/>
      </TouchableOpacity>

    </SwipeRow>)
}
export default function() {
      
  
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
        renderItem = {({item, index})=><View><SwipeRowWrapper data={item}/></View>}
        leftOpenValue={205} 
        rightOpenValue={-175}
      />
  </View>);
}
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
    Modal,
    Alert,
    FlatList
  } from 'react-native';
import Card from '../../components/Card';
import { GlobalContext } from '../../context/GlobalContext';
import SellOrderListItem from '../../components/Orders/SellOrderListItem';
var DATA: readonly any[] | null | undefined = [
];

for(let i=1; i<5; i++){
  //console.log(`for loop ${i}, time : ${new Date().getTime()}`);
  DATA = [...DATA,{
    id: i,
    key: i,
    customerName: 'Keshav '+i,
    state:'Delhi',
    address:'AB XYZ',
    country:'India',
    email:'sharmakeshav15157@gmail.com',
    mobile:'00912830'+i,
    total:'5'+i,
    items:[{name:'item1', price:50, quantity:50, total:2500}]
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

const SwipeRowWrapper = function(props:any){
  const [swipeDirection, setSwipeDirection] = useState('left');

  let hidden = <View/>;
  if(swipeDirection === 'left')
    hidden = <View style={{backgroundColor:'red', flex:1}}/>;
  else 
    hidden=<View style={{backgroundColor:'lime', flex:1}}/>

  function OnSwipe({value}:any){
    if(value == 0)
      setSwipeDirection('none');
    else if(value < 0)
      setSwipeDirection('left');
    else setSwipeDirection('right');
  }
  return (
    <SwipeRow onSwipeValueChange={OnSwipe}>

      {/* Hidden Item */}
      {hidden}
      
      {/* Front Item */}
      <TouchableOpacity style={{flex:1,flexDirection: 'row'}}>
        <SellOrderListItem titleColor='white' fontSize='18' data={props.data}/>
      </TouchableOpacity>

    </SwipeRow>)
}

function renderItem({item} : any){
  return <View><SwipeRowWrapper data={item}/></View>;
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
        renderItem = {renderItem}
        leftOpenValue={75} 
        rightOpenValue={-75}
      />
  </View>);
}
import React, {Fragment, useContext, useState} from 'react';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {useFetchedOrders} from '../../hooks/useFetchedOrders';
import {
    Text,
    TouchableOpacity,
    View,
    Button,
    Modal
  } from 'react-native';
import Card from '../../components/Card';
import { GlobalContext } from '../../context/GlobalContext';
import SellOrderListItem from '../../components/Orders/SellOrderListItem';
import SellOrderModal from '../../components/Orders/OrderModal';

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
  const [modalVisible, setModalVisibility] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  let hidden = <View style={{backgroundColor:'black'}}/>;
  if(swipeDirection === 'left') hidden = <View style={{backgroundColor:'red', flex:1}}/>;
  else hidden=<View style={{backgroundColor:'lime', flex:1}}/>

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
      <Fragment>
        <Modal visible={modalVisible} presentationStyle="pageSheet" animationType="slide">
          <View style={{backgroundColor:'red', flex:1}}>

            <SellOrderModal data={selectedOrder} style={{flex:1}}/>
            <Button  onPress={()=>{setModalVisibility(false)}}  title="Close"  color="black"/>
            
          </View>
        </Modal>
        <TouchableOpacity style={{flex:1,flexDirection: 'row'}} onPress={(e)=>{setModalVisibility(true); setSelectedOrder(props.data)}}>
          <SellOrderListItem titleColor='white' fontSize='18' data={props.data}/>
        </TouchableOpacity>
      </Fragment>
    </SwipeRow>)
}

function renderItem({item} : any){

  return <View><SwipeRowWrapper data={item}/></View>;
}
export default function() {
  var {items, selectedItems, unselectItem, selectItem, deleteItem} = useFetchedOrders(new Map<string, any>(), {storeId: 'buglessbytes'})
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
        data={[...items.values()]}
        useFlatList = {true}
        renderItem = {renderItem}
        leftOpenValue={75} 
        rightOpenValue={-75}
      />
  </View>);
}
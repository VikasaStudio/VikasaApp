import React from 'react';
import {
    Button,
    Modal,
    Text,
    View,
  } from 'react-native';

/* 
  Display form where user will enter details of item they need to create.

  This form also allows user to 
  1. Create Shop* 
  2. Create Inventory or Choose Existing One (Dropdown)
  3. Basic Item Details
*/
export default function AddItemModal(props : any){
    return (
        <Modal  style={{
            backgroundColor: 'white',
            margin: 15, 
            alignItems: undefined,
            justifyContent: undefined,
        }} visible={props.visible}>
            <View style={{backgroundColor:'red'}}>
                <Text>Hellos!</Text>
            </View>
            <Button onPress={()=>{props.setVisible(false)}} title="Close"/>
        </Modal>
    );
}
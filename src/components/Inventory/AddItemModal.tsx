import React from 'react';
import {
    Button,
    Modal,
    Text,
    View,
  } from 'react-native';

/* */
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
import React, {useState} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * 
 * @param props [onStateChange, leftButtonText, rightButtonText]
 * @summary  Bind event handlers using onStateChange listener. Event Handler must be of type function(state : number){...}
 * @returns JSX
 */
export default function(props: any){
    const [switchPosition, setSwitchPosition] = useState(0);

    const changeSwitchPosition = (val: number) => {
        setSwitchPosition(val);
        if(props.onStateChange != undefined){
            props.onStateChange(val);
        }
    }

    return (
        <View style={{
            flexDirection: "row", 
            justifyContent: 'center', 
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "#2a264a",
            height: 35, width: 250, 
            backgroundColor: "#2a264a",
            marginBottom: 20
        }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => changeSwitchPosition(0)}
                style={{
                    flex: 1,
                    backgroundColor: switchPosition == 0 ? '#796edb' : '#2a264a',
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                    color: switchPosition == 0 ? 'white' : 'grey',
                    }}>
                    {props.leftButtonText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => changeSwitchPosition(1)}
                style={{
                    flex: 1,
                    backgroundColor: switchPosition == 1 ? '#796edb' : '#2a264a',
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                    color: switchPosition == 1 ? 'white' : 'grey',
                    }}>
                    {props.rightButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

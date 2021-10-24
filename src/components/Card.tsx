import React from "react"
import { Text, View } from "react-native"

export default function(props: any){
    return (
        <View style={{
            borderRadius: parseInt(props.borderRadius)  || 20,
            width: parseInt(props.size) || 162,
            height: parseInt(props.size)  || 162,
            backgroundColor: 'grey',
            opacity: 1,
            marginTop: 18,
            padding:5
        }}>
            <Text style={{color:'white', fontSize:25}}>
                {props.title}
            </Text>
        </View>
    )
}
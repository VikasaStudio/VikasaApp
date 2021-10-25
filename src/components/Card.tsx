import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

/**
 * 
 * @param props {borderRadius | size | backgroundColor | titleColor}
 * @returns 
 */
export default function(props: any){
    
    return (
        <TouchableOpacity onPress={()=>{}}>
            <View style={{
                borderRadius: parseInt(props.borderRadius)  || 20,
                width: parseInt(props.size) || parseInt(props.width) || 162,
                height: parseInt(props.size)  || parseInt(props.height) ||162,
                backgroundColor: props.backgroundColor || 'black' ,
                opacity: 1,
                marginTop: 15,
                padding: props.padding || 10
            }}>
                <Text style={{color: props.titleColor || 'white', fontSize: props.fontSize || 18}}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
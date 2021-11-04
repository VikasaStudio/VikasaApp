import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
/**
 * 
 * @param props {borderRadius | size | backgroundColor | titleColor}
 * @returns 
 */
export default function(props: any){
    const OrderData = props.data;
    return (
        <View style={{
            minHeight:80,
            backgroundColor: '#373737',
            flex:1,
            flexDirection: 'row'
        }}>
            {/* Text Container */}
            <View style={{
                flex:2,
                flexDirection: 'column',
                padding: 10,
                margin:0
            }}>
                {/* First Row */}
                <View>
                    <Text style={{color: props.titleColor || 'white', fontSize: 13}}>
                        {OrderData.customerName}
                    </Text>
                </View>

                {/* Second Row Container*/}
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    backgroundColor:'black'
                }}>

                    {/* Second Row - Column 1*/}
                    <View style={{backgroundColor: 'red'}}>
                        <Text style={{color: props.titleColor || 'white', fontSize: 13}}>
                            {OrderData.customerName}
                        </Text>
                    </View>
                    <View style={{backgroundColor: 'blue'}}>
                        <Text style={{color: props.titleColor || 'white', fontSize: 13}}>
                            {'50'}
                        </Text>
                    </View>
                    <View style={{backgroundColor: 'green'}}>
                        <Text style={{color: props.titleColor || 'white', fontSize: 13}}>
                            {OrderData.mobile}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Total Price Container */}
            <View style={{
                flex:1,
                flexDirection: 'row',
                justifyContent:'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width:100,
                    height:40,
                    backgroundColor:'#202020',
                    borderRadius:25, 
                    alignItems: 'center',
                    justifyContent: 'center'
                }}> 
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}> {OrderData.total} </Text>
                </View>
            </View>
        </View>
    )
}
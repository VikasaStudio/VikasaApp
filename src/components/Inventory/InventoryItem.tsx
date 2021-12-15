import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const styles = StyleSheet.create({
    cell: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'white',
        marginTop:1,
        marginBottom:1,
        minHeight:50,
        justifyContent: 'space-around'
    }
})
export default function(props: any){
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{flex:1, flexDirection:'row'}}>
                {/*left cell*/}
                <View style={styles.cell}>

                    {/* row-1 */}
                    <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                        {<Text style={{flex:1, padding:5}}>{props.title}</Text>}
                        {<Text style={{flex:1, padding:5}}>Qty: {props.quantity}</Text>}    
                    </View>

                    {/* row-2 */}
                    <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', justifyContent: 'center'}}>
                        {<Text style={{flex:1, padding:5}}>Store: {props.shopName}</Text>}
                        {<Text style={{flex:1, padding:5}}>Inventory: {props.inventoryName}</Text>} 
                    </View>
                </View>

                {/*right cell*/}
                <View style={styles.cell}>
                    {<Text>{props.quantity}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}
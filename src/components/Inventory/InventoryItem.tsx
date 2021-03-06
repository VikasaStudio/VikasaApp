import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CheckBox from 'react-native-check-box'

const styles = StyleSheet.create({
    cell: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'white',
        marginTop:1,
        marginBottom:1,
        minHeight:50,
        justifyContent: 'space-around'
    },
    cell2x:{
        flex:4,
        alignItems: 'center',
        backgroundColor:'white',
        marginTop:1,
        marginBottom:1,
        minHeight:50,
        justifyContent: 'space-around'
    }
})
export default function(props: any) {
    const [isSelected, setSelected] = useState(props.selectedItems.has(props.itemId) || false);
    useEffect(()=>{
        if(isSelected && props.onItemSelect){
            props.onItemSelect(props);
        }
        else if(!isSelected && props.onItemUnselect){
            props.onItemUnselect(props);
        }
    }, []);

    useEffect(()=>{
        setSelected(props.selectedItems.has(props.itemId))
    }, [props.selectedItems]);

    return (
        <TouchableOpacity onPress={()=>{props.onPress(props)}}>
            <View style={{flex:1, flexDirection:'row'}}>
                {/*left cell*/}
                <View style={styles.cell2x}>

                    {/* row-1 */}
                    <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                        {<Text style={{flex:1, padding:5}}>Item : {props.title}</Text>}
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
                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        
                        onClick={()=>{
                            if(!isSelected)
                                props.setChecked(props.itemId)
                            else 
                                props.setUnchecked(props.itemId)
                        }}

                        isChecked={isSelected}
                        leftText={"CheckBox"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
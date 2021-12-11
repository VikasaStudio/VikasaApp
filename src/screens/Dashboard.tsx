import { useNavigation } from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import CONFIG from '../utils/config'
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
    Alert
  } from 'react-native';
import Card from '../components/Card';
import { GlobalContext } from '../context/GlobalContext';

export default function() {
    const globalContextValue = useContext(GlobalContext);
    const navigation = useNavigation<any>();

    return(
    <View style={{
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: "#1A1A22"
    }}>
        
        {/*--- HEADER --- */}
        <View style={{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            padding:10
        }}>
            {/* Profile/Menu Button */}
            <TouchableOpacity style={{flex:1}} onPress={()=>{
                navigation.navigate({
                    name: CONFIG.Screens.ProfileMenu.name
                })
            }}>
                <View style={{backgroundColor:'blue', width:45, height:45, borderRadius:50}}></View>
            </TouchableOpacity>

            <Text style={{color:'white', fontSize:25, flex:2}}>
                Welcome {globalContextValue.username}
            </Text>
        </View>

        {/*--- UI Container --- */}
        <View style={{
            flexGrow: 15,
            flexDirection: 'column',
            backgroundColor: '#796edb',
            borderTopLeftRadius: 40, 
            borderTopRightRadius: 40,
        }}>

            {/*---Top 3 Cards--- */}
            <View style={{
                flex: 0.25,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                
                <Card size="85" backgroundColor="white"/>
                <Card size="85" backgroundColor="white"/>
                <Card size="85" backgroundColor="white"/>

            </View>
            
            {/*--- Services Cards--- */}
            <View style={{
                    flex:1,
                    borderTopLeftRadius: 20, 
                    borderTopRightRadius: 20,
                    flexDirection: 'column',
                    backgroundColor: "#1A1A22",
                    paddingTop:5,
                    paddingBottom:5
                }}>
                    <ScrollView scrollEnabled={true}  contentContainerStyle={{
                        flexGrow:1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap'
                    }}>
                        <Card title="Orders" backgroundColor="pink" titleColor="black" onPress={(e: any)=>{
                            navigation.navigate({name: CONFIG.Screens.OrderDashboard.name})
                        }}/>

                        <Card title="Inventory"  backgroundColor="pink" titleColor="black" onPress={(e: any)=>{
                            navigation.navigate({name:'InventoryNavigator'})
                        }}/>
                        
                        <Card title="Staff"  backgroundColor="pink" titleColor="black"/>
                        <Card title="Coupons"  backgroundColor="pink" titleColor="black"/>

                    </ScrollView>
            </View>
        </View>
    </View>);
}
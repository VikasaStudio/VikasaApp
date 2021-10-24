import React, {useContext, useState} from 'react';
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
    return(
    <View style={{
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: "#1A1A22"
    }}>
        
        {/*--- TOP BAR --- */}
        <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            padding:10
        }}>
            <Text style={{color:'white', fontSize:25}}>
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
                <Card size="85"/>
                <Card size="85"/>
                <Card size="85"/>
            </View>
            
            {/*--- Services Cards--- */}
            <View style={{
                    flex:1,
                    borderTopLeftRadius: 20, 
                    borderTopRightRadius: 20,
                    flexDirection: 'column',
                    backgroundColor: "#1A1A22",
                    paddingTop:15
                }}>
                    <ScrollView scrollEnabled={true}  contentContainerStyle={{
                        flexGrow:1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap'
                    }}>
                        <Card title="Orders" />
                        <Card title="Inventory"/>
                        <Card title="Stock"/>
                        <Card title="Stock"/>
                        <Card title="Stock"/>
                        <Card title="Stock"/>
                        <Card title="Stock"/>
                    </ScrollView>
            </View>
        </View>
    </View>);
}
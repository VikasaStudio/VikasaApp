import React, {useState} from 'react';
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

export default function() {
    return(
    <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#1A1A22"
    }}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            
        }}>
        </View>
        <View style={{
            flex: 9,
            flexDirection: 'column',
            backgroundColor: '#796edb',
            borderTopLeftRadius: 40, 
            borderTopRightRadius: 40,
        }}>
            <View style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 25,
                paddingRight: 25
            }}>
                <View style={{
                    borderRadius: 20,
                    width: 100,
                    height: 85,
                    backgroundColor: 'white',
                    opacity: 0.1
                }}>
                </View>
                <View style={{
                    borderRadius: 20,
                    width: 100,
                    height: 85,
                    backgroundColor: 'white',
                    opacity: 0.1
                }}></View>
                <View style={{
                    borderRadius: 20,
                    width: 100,
                    height: 85,
                    backgroundColor: 'white',
                    opacity: 0.1
                }}></View>
            </View>
            <View style={{
                flex: 7,
                flexDirection: 'row',
                backgroundColor: "#1A1A22",
                borderTopLeftRadius: 40, 
                borderTopRightRadius: 40,  
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                paddingTop: 10,
                paddingLeft: 25,
                paddingRight: 25
            }}>
                <View style={{
                    borderRadius: 20,
                    width: 162,
                    height: 162,
                    backgroundColor: 'white',
                    opacity: 0.05,
                    marginTop: 18
                }}></View>
                <View style={{
                    borderRadius: 20,
                    width: 162,
                    height: 162,
                    backgroundColor: 'white',
                    opacity: 0.05,
                    marginTop: 18
                }}></View>
                <View style={{
                    borderRadius: 20,
                    width: 162,
                    height: 162,
                    backgroundColor: 'white',
                    opacity: 0.05,
                    marginTop: 18
                }}></View>
                <View style={{
                    borderRadius: 20,
                    width: 162,
                    height: 162,
                    backgroundColor: 'white',
                    opacity: 0.05,
                    marginTop: 18
                }}></View>
            </View>
        </View>
    </View>);
}
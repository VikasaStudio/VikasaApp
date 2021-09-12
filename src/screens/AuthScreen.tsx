
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
import globalStyle from '../styles/GlobalStyle';
export default function(){
    
    const [switchPosition, setSwitchPosition] = useState(1);

    const changeSwitchPosition = (val: number) => {
        setSwitchPosition(val);
    }

    return (
        <View style={{
            flex : 1,
            flexDirection: "column",
            backgroundColor: "#2a264a"
          }}>
            <View style={{ flex: 1 }} />
            <View style={{ 
                flex: 4,
                padding: 30,
                backgroundColor: "#1A1A22", 
                borderTopLeftRadius: 40, 
                borderTopRightRadius: 40,
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "space-around"}} >
                <View style={{
                    flexDirection: "row", 
                    justifyContent: 'center', 
                    borderRadius: 40,
                    borderWidth: 1,
                    borderColor: "#2a264a",
                    height: 35, width: 250, 
                    backgroundColor: "#2a264a"}}>
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
                            LogIn
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => changeSwitchPosition(2)}
                        style={{
                            flex: 1,
                            backgroundColor: switchPosition == 2 ? '#796edb' : '#2a264a',
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                            color: switchPosition == 2 ? 'white' : 'grey',
                            }}>
                            SignUp
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        //onChangeText={onChangeNumber}
                        //value={number}
                        placeholder="Vendor Id"
                    />
                    <TextInput
                        style={styles.input}
                        //onChangeText={onChangeNumber}
                        //value={number}
                        placeholder="Password"
                    />
                    <Text style={{textAlign: "center", 
                        color: 'grey'}}>
                        Forgot Password?
                    </Text>
                </View>
                <View style={{
                    flexDirection: "column",
                    alignItems: 'center',
                    padding: 15
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => changeSwitchPosition(1)}
                        style={{
                            backgroundColor: '#796edb',
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50, width: 300
                        }}>
                        <Text
                            style={{
                            color: 'white',
                            }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => changeSwitchPosition(1)}
                            style={{
                                borderRadius: 50,
                                borderWidth: .5,
                                borderColor: 'grey',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign: "center", 
                        color: 'grey',
                        padding: 15}}>
                        By continuing you agree to Vikasa's Terms of Services and Privacy Policy.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 300,
      margin: 12,
      backgroundColor: 'white',
      borderWidth: .5,
      borderRadius: 5,
      padding: 10,
    },
  });
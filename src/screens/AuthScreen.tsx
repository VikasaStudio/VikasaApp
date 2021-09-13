
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
import CustomSwitch from '../components/CustomSwitch';
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

                <CustomSwitch leftButtonText="Login" rightButtonText="Sign-Up" onStateChange={(val: number)=>{Alert.alert(`state is : ${val}`)}}></CustomSwitch>

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
                        onPress={() => {}}
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
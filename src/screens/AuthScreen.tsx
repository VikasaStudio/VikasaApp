
import React, {useEffect, useState} from 'react';
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

function InputFields(props: any){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //ensures that onStateChange prop method is called only after state updates are applied.
    useEffect( ()=>{
        if(props.onStateChange)
            props.onStateChange({username, password, confirmPassword});
    }, [username, password, confirmPassword]); //// Only re-run the effect if following state changes

    if (props.val==1) 
        return(<View>
        <TextInput
            style={styles.input}
            onChangeText={(text)=>{setUsername(text);}}
            value={username}
            placeholder="Username"
        />
        <TextInput
            style={styles.input}
            onChangeText={(text)=>{setPassword(text);}}
            value={password}
            placeholder="Password"
        />
        <Text style={{textAlign: "center", 
            color: 'grey'}}>
            Forgot Password?
        </Text>
    </View>)
    else
        return(<View>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setUsername(text);}}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setPassword(text);}}
                value={password}
                placeholder="Password"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setConfirmPassword(text);}}
                value={confirmPassword}
                placeholder="Confirm Password"
            />
        </View>)
}

/**
 * 
 * @param username 
 * @param password 
 * @returns Promise
 * @summary Attempts Login via local-strategy, if success then it stores cookies otherwise throws relevant error message.
 */
async function AttemptLocalLogin(username:string, password:string){
    try{
    const res = await fetch('http://10.0.2.2:3000/api/auth/vendor/login', {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "strategy": "local"
        })
    });

    console.log(res.headers.get('set-cookie'));
    console.log(res.status);
    
    const responseJSON = res.json();
    console.log(responseJSON);
    }
    catch(err){
        console.error(err);
    }
}

export default function(){

    const[switchVal,setSwitchVal]=useState(1);

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

                <CustomSwitch leftButtonText="Login" rightButtonText="Register" onStateChange={(val: number)=>{setSwitchVal(val)}}></CustomSwitch>
                
                <InputFields val={switchVal} onStateChange={(newState : any)=>{
                    console.log(newState);
                }}/>

                <View style={{
                    flexDirection: "column",
                    alignItems: 'center',
                    padding: 15
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            AttemptLocalLogin('keshav','keshav');
                        }}
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
                                {switchVal==1 ? 'Login' : 'Register'}     
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
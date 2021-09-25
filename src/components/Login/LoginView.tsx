import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import styles from '../../styles/GlobalStyle';
/**
 * @property onStateChange({username:'', password:''}), onLoginClicked({username:'', password:''})
 * @returns JSX
 * @summary A Login View, bind handlers to onStateChange to listen for user inputs event.
 */


export default function LoginView(props : any){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    useEffect(()=>{
        if(props.onStateChange)
            props.onStateChange({username, password});
    }, [username, password]);


    return (
    <View>
        <View style={{
            paddingBottom: 60,
            paddingTop: 24
        }}>
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text)=>{setUsername(text);}}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.InputStyle}
                onChangeText={(text)=>{setPassword(text);}}
                value={password}
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
            
            <TouchableOpacity activeOpacity={1} onPress={() => {
                if(props.onLoginClicked)
                    props.onLoginClicked({username, password});
            }} style={{
                backgroundColor: '#796edb',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50, width: 300
            }}>
                <Text style={{color: 'white'}}> Login </Text>
            </TouchableOpacity>
            
            <Text style={{textAlign: "center", 
                color: 'grey',
                padding: 15}}>
                By continuing you agrere to Vikasa's Terms of Services and Privacy Policy.
            </Text>
        </View>
    </View>
    )
}
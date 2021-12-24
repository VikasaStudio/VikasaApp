import React, {useEffect, useState} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View  } from 'react-native';

import styles from '../../styles/GlobalStyle';
import { registerVendor, sendMobileOTP, verifyOTP } from '../../utils/networking';


import ToggableViewContainer from '../ToggableViewContainer';

/**
 * @property onStateChange({username:'', password:''})
 * @returns JSX
 * @summary A Login View, bind handlers to onStateChange to listen for user inputs event.
 */
export default function RegisterView(props: any){
    
    const [username, setUsername] = useState('');
    const [bussinessName, setBusinessName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOTP] = useState('');

    const [activeForm, setActiveForm] = useState(0);

    useEffect(()=>{
        if(props.onStateChange)
            props.onStateChange({username, mobile, otp});
    }, [username, mobile, otp]);

    return (
    <View>
        <ToggableViewContainer index={activeForm}>
            <View style={{
                flexDirection: "column",
                alignItems: 'center',
                padding: 15
            }}>
                <View style={{
                    paddingBottom: 40
                }}>
                    
                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setMobile(text);}}
                        value={mobile}
                        placeholder="Mobile"
                    />

                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setOTP(text);}}
                        value={otp}
                        placeholder="OTP"
                    />
                </View>
                <TouchableOpacity activeOpacity={1} onPress={async () => {
                    try{
                        if(mobile.trim().length < 7) return;
                        var message = await sendMobileOTP(mobile);
                        setActiveForm(1);
                        console.log('OTP send , reply from server : '+message);
                    }catch(err){
                        console.log('error while sending otp:', err);
                    }
                }} style={{
                    backgroundColor: '#796edb',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50, width: 300
                }}>
                    <Text style={{color: 'white'}}> Send OTP </Text>
                </TouchableOpacity>
                

                <Text style={{textAlign: "center", 
                    color: 'grey',
                    padding: 15}}>
                    By continuing you agrere to Vikasa's Terms of Services and Privacy Policy.
                </Text>

            </View>
            

            <View style={{
                flexDirection: "column",
                alignItems: 'center',
                padding: 15
            }}>
                <View style={{
                    paddingBottom: 40
                }}>
                    
                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setMobile(text);}}
                        value={mobile}
                        placeholder="Mobile"
                    />

                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setOTP(text);}}
                        value={otp}
                        placeholder="OTP"
                    />
                    <TouchableOpacity onPress={async ()=>{
                        try{
                            
                            let otpStatus = await sendMobileOTP(mobile);
                            console.log(otpStatus);

                        }
                        catch(err){
                            console.log(err);
                        }
                    }}>
                        <Text style={{textAlign: "center", 
                            color: 'grey'}}>
                            Get New OTP?
                        </Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity activeOpacity={1} onPress={async () => {
                    try{
                        if(mobile.trim().length < 7) return;
                        var message = await verifyOTP(mobile, otp);
                        setActiveForm(2);
                        console.log('OTP send , reply from server : '+message);
                    }catch(err){
                        console.log('error while sending otp:', err);
                    }
                }} style={{
                    backgroundColor: '#796edb',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50, width: 300
                }}>
                    <Text style={{color: 'white'}}> Verify OTP </Text>
                </TouchableOpacity>
            </View>


            <View style={{
                flexDirection: "column",
                alignItems: 'center',
                padding: 15
            }}>
                <View style={{
                    paddingBottom: 40
                }}>
                    
                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setUsername(text);}}
                        value={username}
                        placeholder="Username"
                    />
                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setBusinessName(text);}}
                        value={bussinessName}
                        placeholder="Bussiness Name"
                    />
                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setPassword(text);}}
                        value={password}
                        placeholder="Password"
                    />

                    <TextInput
                        style={styles.InputStyle}
                        onChangeText={(text)=>{setConfirmPassword(text);}}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                    />

                </View>
                <TouchableOpacity activeOpacity={1} onPress={async () => {
                    try{
                        if(mobile.trim().length < 7) return;
                        if(password !== confirmPassword){
                            console.log('password mismatch.');
                            return;
                        }
                        if(props.onRegisterClicked){
                            props.onRegisterClicked({username, password, bussinessName, mobile});
                        }
                        const status  = await registerVendor({username, password, bussinessName, mobile});
                        console.log(status);
                    }catch(err){
                        console.log('error while sending otp:', err);
                    }
                }} style={{
                    backgroundColor: '#796edb',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50, width: 300
                }}>
                    <Text style={{color: 'white'}}> Register </Text>
                </TouchableOpacity>
            </View>
        
        </ToggableViewContainer>
        
        
    </View>
    );
}
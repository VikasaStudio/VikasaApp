
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
import ToggableViewContainer from '../components/ToggableViewContainer';



/**
 * @property onStateChange({username:'', password:''}), onLoginClicked({username:'', password:''})
 * @returns JSX
 * @summary A Login View, bind handlers to onStateChange to listen for user inputs event.
 */
function LoginView(props : any){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(props.onStateChange)
            props.onStateChange({username, password});
    }, [username, password]);
    
    return (
    <View>
        <View>
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

/**
 * @property onStateChange({username:'', password:''})
 * @returns JSX
 * @summary A Login View, bind handlers to onStateChange to listen for user inputs event.
 */
function RegisterView(props: any){
    
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOTP] = useState('');

    useEffect(()=>{
        if(props.onStateChange)
            props.onStateChange({username, mobile, otp});
    }, [username, mobile, otp]);

    return (
    <View>
        <View>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setUsername(text);}}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setMobile(text);}}
                value={mobile}
                placeholder="Mobile"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>{setOTP(text);}}
                value={otp}
                placeholder="OTP"
            />
        </View>
        <View style={{
            flexDirection: "column",
            alignItems: 'center',
            padding: 15
        }}>
            
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{
                backgroundColor: '#796edb',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50, width: 300
            }}>
                <Text style={{color: 'white'}}> Register </Text>
            </TouchableOpacity>
            
            <Text style={{textAlign: "center", 
                color: 'grey',
                padding: 15}}>
                By continuing you agrere to Vikasa's Terms of Services and Privacy Policy.
            </Text>
        </View>
    </View>
    );
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
        console.log(res);
        console.log(res.headers.get('set-cookie'));
        console.log(res.status);
        
        const responseJSON = await res.json();
        console.log(responseJSON);
    }
    catch(err){
        console.error(err);
    }
}

/**
 * 
 * @param mobileNumber 
 * @summary Generates OTP and associates it with mobileNumber.
 */
async function sendMobileOTP(mobileNumber : string){
    try{
        const res = await fetch('http://10.0.2.2:3000/api/auth/otp', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "address":mobileNumber,
                "addressType":"mobile"
            })
        });

        console.log(res.headers.get('set-cookie')?.split(','));
        console.log(res.status);
        
        const responseJSON = await res.json();
        console.log(responseJSON);
    }
    catch(err){
        console.error(err);
    }
}

/**
 * 
 * @param mobileNumber 
 * @param otp 
 * @summary verify otp associated with given string (mobile/email)
 */
async function verifyOTP(key : string, otp : string){
    try{
        const res = await fetch('http://10.0.2.2:3000/api/auth/verify/otp', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "address":key,
                "otp":otp
            })
        });

        console.log(res.status);
        
        const responseJSON = await res.json();
        console.log(responseJSON);
    }
    catch(err){
        console.error(err);
    }
}

/**
 * 
 * @returns AuthScreen with LoginView & RegisterView
 */
export default function AuthScreen(){

    const[switchVal,setSwitchVal]=useState(0);

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
                
                <ToggableViewContainer index={switchVal}>
                    
                    <LoginView onStateChange={(newState: { username: string | undefined; password: string | undefined; })=>{
                        console.log('LoginView new-state :',newState);
                    }} onLoginClicked={(credentials: any)=>{
                        console.log('login pressed.');
                        AttemptLocalLogin(credentials.username, credentials.password);
                    }}/>

                    <RegisterView onStateChange={(newState: { username: string | undefined; password: string | undefined; })=>{
                        console.log('LoginView new-state :',newState);
                    }}/>

                </ToggableViewContainer>
            
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
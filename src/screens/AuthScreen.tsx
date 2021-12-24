
import React, {useContext, useEffect, useState} from 'react';
import { View } from 'react-native';
import CustomSwitch from '../components/CustomSwitch';
import ToggableViewContainer from '../components/ToggableViewContainer';
import { GlobalContext } from '../context/GlobalContext';
import LoginView from '../components/Login/LoginView';
import RegisterView from '../components/Register/RegisterView';
import { AttemptLocalLogin, registerVendor, checkIfTokenValid } from '../utils/networking';



/**
 * 
 * @returns AuthScreen with LoginView & RegisterView
 */

var onLoginRequest = async (credentials: any, globalContextValue: any) => {
    console.log('----Login Requested-------');
    let res = await AttemptLocalLogin(credentials.username, credentials.password).catch(err=>{
        console.log(err);
    });
    if(res === credentials.username) {
        globalContextValue.setUsername(res);
    }
    else {
        globalContextValue.setUsername(null);
    } 
}

export default function AuthScreen() {

    const[switchVal,setSwitchVal]=useState(0);
    const globalContextValue = useContext(GlobalContext);
    
    //executed once
    useEffect(function() {
        async function checkAuthenticationStatus(){
            await checkIfTokenValid(globalContextValue);
        }
        checkAuthenticationStatus();
    }, [])

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
                    }} onLoginClicked={(credentials: any)=>onLoginRequest(credentials, globalContextValue)}/>

                    <RegisterView onStateChange={(newState: { username: string | undefined; password: string | undefined; })=>{
                        console.log('LoginView new-state :',newState);
                    }} onRegisterClicked={async (credentials : any)=>{
                        var res  = await registerVendor(credentials).catch(err=>{
                            console.log(err);
                        });
                        if(res){
                            globalContextValue.setUsername(credentials.username);
                        }
                    }}/>

                </ToggableViewContainer>
            
            </View>
        </View>
    );
}
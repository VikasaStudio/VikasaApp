
import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import CustomSwitch from '../components/CustomSwitch';
import ToggableViewContainer from '../components/ToggableViewContainer';
import { GlobalContext } from '../context/GlobalContext';
import LoginView from '../components/Login/LoginView';
import RegisterView from '../components/Register/RegisterView';
import { AttemptLocalLogin } from '../utils/helpers';



/**
 * 
 * @returns AuthScreen with LoginView & RegisterView
 */
export default function AuthScreen(){

    const[switchVal,setSwitchVal]=useState(0);
    const globalContextValue = useContext(GlobalContext);

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
                    }} onLoginClicked={async (credentials: any)=>{
                        console.log('login pressed.');
                        let res = await AttemptLocalLogin(credentials.username, credentials.password).catch(err=>{
                            console.log(err);
                        });
                        if(res === credentials.username)
                            globalContextValue.setUsername(res);
                        else
                            globalContextValue.setUsername(null); 
                    }}/>

                    <RegisterView onStateChange={(newState: { username: string | undefined; password: string | undefined; })=>{
                        console.log('LoginView new-state :',newState);
                    }}/>

                </ToggableViewContainer>
            
            </View>
        </View>
    );
}
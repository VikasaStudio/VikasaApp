
import React from 'react';
import {useState, createContext} from 'react';
import defaultTheme from '../assets/colors/colors';

export const GlobalContext = createContext();

function GlobalContextProvider(props){

    var [theme, setTheme] = useState(defaultTheme);
    var [vendor, setVendor] = useState(null);

    function loginVendor(vendorData){
        setVendor(vendorData);
    }
    function logoutVendor(){
        setVendor(null);
    }

    function switchTheme(newTheme){
        setTheme();
    }

    return (
        <GlobalContext.Provider value = {theme, switchTheme, vendor, loginVendor, logoutVendor}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
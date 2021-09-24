
import React from 'react';
import {useState, createContext} from 'react';
import defaultTheme from '../assets/colors/colors';

export const GlobalContext = createContext();

/**
 * 
 * @param {*} props 
 * @returns 
 * @summary Provides state [theme, username, AccessToken, RefreshToken] and methods to change [theme, username]
 */
function GlobalContextProvider(props){

    var [theme, setTheme] = useState(defaultTheme);
    var [username, setUsername] = useState(null);

    return (
        <GlobalContext.Provider value = {{
            theme, 
            username,
            setTheme,
            setUsername
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
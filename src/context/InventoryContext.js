
import React from 'react';
import {useState, createContext} from 'react';
import {useFetchedInventoryItems} from '../hooks/useFetchedInventoryItems';

export const InventoryContext = createContext();

/**
 * 
 * @param {*} props 
 * @returns 
 * @summary Fetches the Inventory data and provides additional methods to manage the result.
 */
 export default function InventoryContextProvider(props){

    const value= useFetchedInventoryItems();
    //{items, selectedItems, selectItem, unselectItem, deleteItem, filter} 
    
    return (
        <InventoryContext.Provider value = {value}>
            {props.children}
        </InventoryContext.Provider>
    )
}
 
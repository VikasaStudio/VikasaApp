
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

    const {items, selectedItems, selectItem, unselectItem, deleteItem, filter} = useFetchedInventoryItems();

    return (
        <InventoryContext.Provider value = {{
            items, selectedItems, selectItem, unselectItem, deleteItem, filter
        }}>
            {props.children}
        </InventoryContext.Provider>
    )
}
 
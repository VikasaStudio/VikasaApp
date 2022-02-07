
import React from 'react';
import {useState, createContext} from 'react';
import {useFetchedOrders} from '../hooks/useFetchedOrders';

export const OrderContext = createContext();

/**
 * 
 * @param {*} props 
 * @returns 
 * @summary Fetches the Order data and provides additional methods to manage the result.
 */
 export default function OrderContextProvider(props){

    var {items, selectedItems, unselectItem, selectItem, deleteItem} = useFetchedOrders(null, {storeId: props && props.storeId ? props.storeId : null})

    return (
        <OrderContext.Provider value = {{
            items, selectedItems, unselectItem, selectItem, deleteItem
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}
 
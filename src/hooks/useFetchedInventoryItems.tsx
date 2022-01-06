import { useEffect, useState } from "react";
import { getItems } from "../utils/networking";

//fetch items for store / inventory.
export function useFetchedInventoryItems(initialVal : Map<string,any>, initialFilter : any | null)
{
    //dict of fetched items.
    const [items, setItems] = useState(new Map<string, any>(initialVal));
    
    //set of items that are currently selected.
    const [selectedItems, setSelectedItems] = useState(new Set<string>());

    //whether new data needs to be appended or overwrriten
    const [isAppended, setDataAppended] = useState(true);
    
    //filters
    if(initialFilter == null){

    }
    const [storeId, setStoreId] = useState((initialFilter && initialFilter.storeId)? initialFilter.storeId:null);
    const [inventoryId, setInventoryId] = useState((initialFilter && initialFilter.inventoryId)? initialFilter.inventoryId:null);
    const [offset, setOffset] = useState((initialFilter && initialFilter.offset)?initialFilter.offset : 0);
    const [limit, setLimit] = useState((initialFilter && initialFilter.limit) ? initialFilter.limit : 20);

    useEffect(() => {
        var toLoad = true;

        async function loadData(){
            let res = await getItems({offset, limit, storeId}).catch(err=>{
                console.error('Error', err);
            });
            if(!res)
                return;
            if(!toLoad)
                return;
            
            let newMap: Map<string, any>;
            if(isAppended)
                newMap = new Map<string, any>(items);    
            else
                newMap = new Map<string, any>();
            
            (res.data).forEach((item: { itemId: string; }) => {
                newMap.set(item.itemId, item);
            });
            setItems(newMap);
        }

        loadData();

        //cleanup
        return ()=>{
            toLoad = false;
        }

    }, [offset, limit]);

    // API Functions to interact with containers
    function selectItem(itemId:string) {
        if(items.has(itemId)){
            setSelectedItems( (oldState) => {
                return new Set<string>([...oldState, itemId])
            });
        }
    }
    function unselectItem(itemId?:string) {
        if(!itemId){
            //unselect all
            setSelectedItems(new Set<string>());
            return;
        }
        var dup = selectedItems;
        if(dup.has(itemId))
            dup.delete(itemId);
        setSelectedItems(new Set<string>(dup));
    }
    function deleteItem(itemId:string) {

    }

    return {items, selectedItems, unselectItem, selectItem}
}
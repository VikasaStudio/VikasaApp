import { SetStateAction, useContext, useEffect, useState } from "react";
import { getItems, deleteItem as DeleteItem} from "../utils/networking";
import { GlobalContext } from '../context/GlobalContext';

export function useFetchedInventoryItems(initialVal : Map<string,any>, initialFilter : any)
{
    if(!initialVal)
        initialVal = new Map<string, any>();

    //dict of fetched items.
    const [items, setItems] = useState(new Map<string, any>(initialVal));
    
    //set of items that are currently selected.
    const [selectedItems, setSelectedItems] = useState(new Set<string>());

    //whether new data needs to be appended or overwrriten
    const [isAppended, setDataAppended] = useState(true);
    const globalContextValue = useContext(GlobalContext);
    
    //filters
    if(initialFilter == null){

    }

    const [storeId, setStoreId] = useState((initialFilter && initialFilter.storeId)? initialFilter.storeId:'mystore');
    const [inventoryId, setInventoryId] = useState((initialFilter && initialFilter.inventoryId)? initialFilter.inventoryId:null);
    const [offset, setOffset] = useState((initialFilter && initialFilter.offset)?initialFilter.offset : 0);
    const [limit, setLimit] = useState((initialFilter && initialFilter.limit) ? initialFilter.limit : 50);

    useEffect(() => {
        var toLoad = true;
        async function loadData(){
            if(storeId == null)
                return;

            let res = await getItems({offset, limit, storeId}).catch(err=>{
                console.error('Error', err);
            });
            if(!res){
                return;
            }
            if(!toLoad){
                return;
            }
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

    useEffect(()=>{
        var selection = selectedItems;
        var updateRequired = false;


        
        selection.forEach( (itemId)=>{
            if(!items.has(itemId)){
                updateRequired = true;
                selection.delete(itemId);
            }
        });
        
        setSelectedItems(new Set<string>(selection));
    }, [items])

    
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
    async function deleteItem(itemId:string) {
        var dup = items;
        
        if(!items.has(itemId))
            return false;
        var data = items.get(itemId);
        if(dup.has(data.itemId))
        {
            let res = await DeleteItem({
                itemId: data.itemId,
                inventoryId: data.inventoryId,
                storeId: data.storeId,
                vendorId: globalContextValue.username
            }).catch(err=>{console.log(err)});
            if(!res)
                return false;
            dup.delete(data.itemId);
        }
        setItems(new Map<string, any>(dup));
        return true;
    }

    return {
        items, 
        selectedItems, 
        unselectItem, 
        selectItem, deleteItem, 

        filter:{
            setStoreId,
            setInventoryId,
            setOffset,
            setLimit
        }
    }
}
import { SetStateAction, useContext, useEffect, useState } from "react";
import { getItems, deleteItem as DeleteItem} from "../utils/networking";
import { GlobalContext } from '../context/GlobalContext';

export function useActivityIndicator(counter : number)
{
    const [pending, setPending] = useState(counter || 0);
    var startLoading = function(){setPending(pending+1);}
    var endLoading = function(){
        let p = pending-1;
        setPending(p < 0 ? 0 : p)
    }

    useEffect(()=>{
        console.log(`Pending Tasks : ${pending}`)
    }, [pending])
    return {
        pending,
        startLoading,
        endLoading
    }
}
import { useEffect } from "react";

export default function ToggableViewContainer(props: any){
    
    const switchableViews = props.children;
    if(props.index >= props.children.length){
        throw new Error("[ToggableViewContainer] : Invalid View Index, Index exceeded Component's children count.")
    }
    return switchableViews[props.index]
}
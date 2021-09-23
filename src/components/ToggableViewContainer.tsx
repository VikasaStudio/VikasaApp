import { useEffect } from "react";

export default function ToggableViewContainer(props: any){
    
    const switchableViews = props.children;
    return switchableViews[props.index]
}
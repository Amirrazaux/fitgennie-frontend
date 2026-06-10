"use client";

import {use, useEffect, useState} from "react";

export default function About(){
    const[count,setCount]=useState(0)

    useEffect(()=>
    {
        console.log("Aamir")
    },[])
    return(

        <div>
            <button onClick={()=>setCount(count-1)}>-</button>
            <p>Count:{count}</p>
            <button onClick={()=>setCount(count+1)}>+</button>

        </div>
    );
}
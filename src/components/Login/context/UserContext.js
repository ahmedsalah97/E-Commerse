import { createContext, useState } from "react";



export let Usercontext =createContext();



export default function Usercontextprovider (props){


    let [userToken, setuserToken ]= useState(null)
    return <>
    <Usercontext.Provider value={{userToken,setuserToken}}>
        {props.children}

    </Usercontext.Provider>


    
    
    
    </>

}


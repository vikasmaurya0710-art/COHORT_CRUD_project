import { useState } from "react";
import { createContext } from "react";

export const MyContext = createContext()

export const ContextProvider = ({children})=>{

   const [accessToken,setAccessToken] = useState(localStorage.getItem("accessToken") || null)

    return <MyContext.Provider value={{accessToken,setAccessToken}} >{children}</MyContext.Provider>
}
import React, { createContext, useState, useContext } from "react";
import io from 'socket.io-client'

const GeneralContext = createContext()

const socket = io('http://localhost:8080')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

export default function GeneralContextProvider({children}){
  const [portIsOn,setPortIsOn] = useState(null)

  return (
    <GeneralContext.Provider
      value={{
        socket,
        portIsOn,
        setPortIsOn
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export function useGeneralContext() {
  const context = useContext(GeneralContext)
  if (!context) throw new Error("useGeneralContext must be used within a GeneralContext");
  const {socket, portIsOn, setPortIsOn} = context
  return {socket, portIsOn, setPortIsOn}
}
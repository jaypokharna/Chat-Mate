/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSocketContext } from '../Context/SocketContext'
import useConversation from '../zustand/useConversation'
import notiSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
  
    const {socket} = useSocketContext()
    const {messages,setMessages} = useConversation();

    useEffect(()=>{
         socket?.on("newMessage",(newMessage)=>{
            const sound = new Audio(notiSound);
            sound.play();
            newMessage.shouldShake = true;
            setMessages([...messages,newMessage])
         })

         return ()=>socket?.off("newMessage")
    },[socket,setMessages,messages])

}

export default useListenMessages
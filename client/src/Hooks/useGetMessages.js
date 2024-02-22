/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';

const useGetMessages = () => {
  
const [loading, setsetLoading] = useState(false)

const {messages,setMessages,selectedConversation} = useConversation();

useEffect(() => {

    const getMessages = async ()=>{

        try {
            
            const res = await fetch(`http://localhost:5000/api/message/${selectedConversation._id}`,{
  credentials: 'include',
        });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error)
            }

            setMessages(data)
            
        } catch (error) {

            toast.error(error.message)
            
        }
        finally{
            setsetLoading(false)
        }

    }

if (selectedConversation?._id){ getMessages() }
}, [selectedConversation?._id,setMessages])

return{messages,loading}

}

export default useGetMessages
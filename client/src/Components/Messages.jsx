/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../Hooks/useGetMessages'
import MessageSkeleton from './MessageSkeleton'
import useListenMessages from '../Hooks/useListenMessages'

const Messages = () => {

    const {messages,loading} = useGetMessages()

    useListenMessages();

    const lastMessageRef = useRef();

    useEffect(() => {

        setTimeout(()=>{
        lastMessageRef.current?.scrollIntoView({behaviour : "smooth"});
        },1)
        
      return () => {
        
      }
    }, [messages])
    

  return (
        <>
        <div className='px-4 flex-1 overflow-auto overflow-x-hidden'>

            
            {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx}/>)}
            {messages.length === 0 && (
                <p className='text-center'>Send a message to start a conversation...!</p>
            )}

            {!loading && messages.length > 0 && messages.map((message)=><div key={message._id} ref={lastMessageRef}><Message message={message} /></div>)}

        </div>
        </>
    )
}

export default Messages
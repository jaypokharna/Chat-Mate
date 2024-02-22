/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../Context/SocketContext';

const Conversation = ({conversationn,lastIdx,status}) => {

    const {selectedConversation , setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversationn._id
    // The ? is the optional chaining operator in JavaScript, which prevents errors if selectedConversation is null or undefined.
    const {onlineUsers} = useSocketContext();
    const isOline = onlineUsers.includes(conversationn._id)

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500/80 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500/80' : ''}`}
    onClick={()=>setSelectedConversation(conversationn)}
    >
        <div className={`avatar ${isOline ? 'online' : ''}`}>
            <div className='w-12 rounded-full'>
                <img src={conversationn.profilePicture} alt="Profile" />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200 '>{conversationn.fullName}</p>
                <span className='text-xl'>{conversationn.emojie}</span>
            </div>
            <div className='text-xs'>{status}</div>
        </div>
    </div>
    {!lastIdx && <div className='divider m-0 py-0 h-1'/>}
    </>
  )
}

export default Conversation
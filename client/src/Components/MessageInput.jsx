/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSentMessage from '../Hooks/useSentMessage';
import { useSocketContext } from '../Context/SocketContext';
import useConversation from '../zustand/useConversation';
import { useAuthContext } from '../Context/AuthContext';

const MessageInput = () => {

  const [message, setMessagee] = useState("")

  const { sendMessage, loading } = useSentMessage();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message) { return }

    await sendMessage(message)
    setMessagee('')
  }

  const { selectedConversation } = useConversation();

  const { authUser } = useAuthContext()
  const { socket } = useSocketContext()
  const handleChange = (e) => {
    socket.emit('typing', selectedConversation._id, authUser._id);
  }

  return (
    <>
      <form action="" className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input
            type="text"
            className='border textsm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-700 text-white pr-10'
            placeholder='...'
            value={message}
            onInput={(e) => {
              handleChange(e);
              setMessagee(e.target.value);
            }}/>

          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
          </button>
        </div>
      </form>
    </>
  )
}

export default MessageInput
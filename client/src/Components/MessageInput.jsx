/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSentMessage from '../Hooks/useSentMessage';
import typingSound from "../assets/sounds/typing.mp3"


const MessageInput = () => {

const [message, setMessagee] = useState("")

const {sendMessage,loading} = useSentMessage();

const handleSubmit =async (e)=>{
e.preventDefault()

if(!message) {return}

await sendMessage(message)
setMessagee('')
}

const typing = new Audio(typingSound);

  
  return (
    <>
    <form action="" className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text" className='border textsm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-700 text-white pr-10' placeholder='...'
            value={message}
            onChange={(e)=>{
              typing.play();
              setMessagee(e.target.value)
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
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TbMessages } from "react-icons/tb";
import useConversation from "../zustand/useConversation";
import { Phone } from 'lucide-react';
import { Video } from 'lucide-react';
import { AuthContext, useAuthContext } from "../Context/AuthContext";
import { useSocketContext } from "../Context/SocketContext";

const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {

    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])

  const {authUser} = useAuthContext()
  console.log(authUser)

  const { socket } = useSocketContext();

  const [status, setStatus] = useState('');
  const [typingUserId, setTypingUserId] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('');
    }, 3000);
  
    // Clear the timer when the component unmounts or when the timer needs to be reset
    return () => clearTimeout(timer);
  }, [status]); // Reset the timer whenever the status changes
  
  useEffect(() => {
    const handleTyping = (senderId) => {
      if (senderId) {
        setTypingUserId(senderId);
        setStatus('Typing...');
      }
    };
  
    socket.on('isTyping', handleTyping);
  
    return () => {
      socket.off('isTyping', handleTyping);
    };
  }, [socket]); // Effect will run only when the socket changes

  return (
    <>
      <div className="md:min-w-[450px] flex flex-col overflow-x-hidden w-full">
        {!selectedConversation ? (
          <NoChatSelected user={authUser}/>
        ) : (
          <>
            <div className=" flex items-center justify-between gap-3 px-5 py-2 mb-2 w-full border-b-2 border-white">
              <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={selectedConversation.profilePicture} />
                </div>
              </div>
              <div>
              <span className="text-white font-bold">{selectedConversation.fullName}</span>
              <div className="text-xs">
                {typingUserId === selectedConversation._id ? status : ''}
              </div>
              </div>
              </div>

            <div className="callvid flex gap-5">
            <button className=""><Phone /></button>
            <button className=""><Video /></button>
            </div>

             </div>

            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </>
  );
};

export default MessageContainer;

const NoChatSelected = ({user}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <div className="avatar mb-1">
                <div className="w-20 rounded-full">
                  <img src={user.profilePicture} />
                </div>
              </div>
          <p>Welcome,  {user.fullName}  {user.emojie}</p>
          <p>Select a conversation to start a chat.</p>
          <TbMessages className="text-3xl md:text-6xl text-center"/>
        </div>
      </div>
    </>
  );
};

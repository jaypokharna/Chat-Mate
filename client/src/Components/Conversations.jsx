/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Conversation from './Conversation';
import useGetConversations from '../Hooks/useGetConversations';
import { useSocketContext } from '../Context/SocketContext';
import useConversation from "../zustand/useConversation";


const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { socket } = useSocketContext();

  const [status, setStatus] = useState('');
  const [typingUserId, setTypingUserId] = useState('');

  const { selectedConversation } = useConversation();


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
      <div className='py-1 flex flex-col overflow-auto gap-1'>
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversationn={conversation}
            lastIdx={idx === conversations.length - 1}
            status={typingUserId === conversation._id && !selectedConversation ? status : ''}
          />
        ))}

        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
      </div>
    </>
  );
};

export default Conversations;

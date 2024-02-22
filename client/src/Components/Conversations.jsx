/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../Hooks/useGetConversations';
import { getRandomEmojie } from '../utils/emojies';

const Conversations = () => {

  const {loading,conversations} = useGetConversations();

  return (
    <>
    <div className='py-1 flex flex-col overflow-auto gap-1'>
        
        { conversations.map((conversation,idx)=>[
          <Conversation key={conversation._id} conversationn={conversation}
          emojie={getRandomEmojie()}
          lastIdx={idx === conversations.length-1}/>
        ])}

      

        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

    </div>
    </>
  )
}

export default Conversations
import Conversation from "../models/converstation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socket/socket.js"


export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id 

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId , receiverId]},

        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        
        // This will run both operations parallely with the help of Promise
        await  Promise.all([conversation.save(),newMessage.save()])
        
        // SOCKET IO FUNCTIONALITY

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }
``
        res.status(201).json(newMessage)
        

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const getMessage = async (req,res) => {

    try {

        const {id : userToChatId} = req.params;
        
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId , userToChatId]}
        }).populate("messages");

        if( !conversation ) return res.status(200).json([]);

        const messages  = conversation.messages;

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getMessages - ",error.message)
        res.status(500).json({error : "Internal server error"})
        
    }

}
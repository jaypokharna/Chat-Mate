import mongoose from "mongoose";
import Message from "./message.model.js";

const converstationSchema = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :  'User'
    }],
    messages : [
      {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Message',
        default : []
      }]    
},{timestamps : true});

const  Conversation = mongoose.model('Conversation',converstationSchema);

export default  Conversation;
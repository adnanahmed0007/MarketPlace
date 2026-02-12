import mongoose from "mongoose";
const messageschema=mongoose.Schema({
    text:
    {
        type:String,
        required:true,
    },
    timestamps:
    {
        type:Date,
        default:Date.now
    }

},{timestamps:true})
const Messages=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.ObjectId,
        ref:"Buyersschema",
        required:true,

    },
    buyername:
    {
        type:String,
        required:true,

    },
    farmerName:
    {
        type:String,
        required:true,

    }
,
    recevierId:
    {
        type:mongoose.Schema.ObjectId,
        ref:"SigningFarmer",
        required:true,
    }
,
  all_messages:[messageschema]
   

},{timestamps:true})
const SetMeessages=mongoose.model("Messages",Messages);
export default SetMeessages;
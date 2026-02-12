 
import mongoose from "mongoose";
export const buyersSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true

    }

},{timestamps:true});
const buyersmodel1=mongoose.model("Buyersschema",buyersSchema);
export default buyersmodel1;
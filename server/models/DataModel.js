import mongoose from "mongoose";
 
const DtaModel=mongoose.Schema({
    User_Id:
    {
        type:mongoose.Schema.ObjectId,
        ref:"SigningFarmer",
    },
    cropName:
    {
        type:String,
        required:true,
        
    },
    cropQuantity:
    {
        type:Number,
        required:true,

    },
    Pickup_Location:
    {
        type:String,
        required:true,
    },
    cropPrice:
    {
        type:Number,
        required:true,
    },
    phoneNumber:{
        type:Number,
       
       
        
    },
})
const dataModel=mongoose.model("datamodel",DtaModel);
export default dataModel;
import mongoose from "mongoose";
const farmerDetails=mongoose.Schema({
    FarmerName:
    {
        type:String,
        required:true,
    },
    LandDetail:
    {
       type:String,
       required:true, 
    },
    AboutFarmer:
    {
        type:String,
        required:true,
    },
    FarmerId:
    {
        type:mongoose.Schema.ObjectId,
        ref:"SigningFarmer",
            unique:true,
    }
    ,
    FarmerImage:
    {
        type:String,
    }

},{timestamps:true})
const FarmerDeatils=mongoose.model("farmerDeatils",farmerDetails);
export default FarmerDeatils;
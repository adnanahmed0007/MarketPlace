import mongoose,{Mongoose} from "mongoose";
export const Dta_bid=mongoose.Schema({

        cropName:
        {
            type:String,
            required:true,

        },
        User_Id:
        {
            type:mongoose.Schema.ObjectId,
            ref:"Buyersschema",
        },
        cropQuantity:
        {
            type:Number,
            required:true,
        },
        phoneNumber:
        {
            type:Number,
            
        },
        Location_Buyer:
        {
            type:String,
            required:true,
        },
        cropPrice:{
            type:Number,
            required:true,
        }
},{timestamps:true})
 const Dtamodelbuyer=mongoose.model("databuyerretail",Dta_bid);
 export default Dtamodelbuyer;
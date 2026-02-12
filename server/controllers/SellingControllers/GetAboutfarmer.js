import FarmerDeatils from "../../models/Farmerdeatis.js";
const GetAaboutfarmer=async(req,res)=>
{
    const userId=req.user1;
 const findAboutfarmer=await FarmerDeatils.find({FarmerId:userId._id})
 if(!findAboutfarmer)
 {
    return res
    .status(400)
    .json({
        message:"there is no about section of the farmer"
    })
 }
   
 return res
 .status(200)
 .json({
 
    message:"we your about",
    findAboutfarmer
 })
  
}
export default GetAaboutfarmer
 import dataModel from "../../models/DataModel.js";

const Data_Get=async(req,res)=>
{
    try 
    {
   const userId=req.user1._id;
   if(!userId)
   {
    return res
    .status(400)
    .json({
        message:"User is not registered or re-login cookies expired"
    })
   }
   const datagett=await dataModel.find({User_Id:userId});
   if(!datagett||datagett.length===0)
   {
    return res
    .status(400)
    .json({
        message:"no data is present or error occured"
    })
   }
   return res
   .status(200)
   .json({
    message:"Data being fetched",
    datagett
   })

    }
    catch(e)
    {
        console.log(e)
        return res
        .status(400)
        .json({
            message:"internal server error"
        })
    }
}
export default Data_Get;
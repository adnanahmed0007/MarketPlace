 import Dtamodelbuyer from "../../models/data_bid_buyer.js";
 const farmerbuydaata=async(req,res)=>
 {
try{
    const response1=await Dtamodelbuyer.find()
     if(!response1)
     {
        return res
        .status(400)
        .json({
            message:"we coul not get the response"
        })
     }
     return res
     .status(200)
     .json({
        message:"we got all the data",
        response1
     })
}
catch(e)
{
    return res
    .status(400)
    .json({
        message:"server error"
    })
}
 }
 export default farmerbuydaata
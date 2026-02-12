 
import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const BuyerCropnameandcropquanityt=async(req,res,next)=>{
 try{
const {cropName,cropQuantity}=req.body;
if(cropName&&cropQuantity)
{
    const datafindquantity=await Dtamodelbuyer.find({cropName,cropQuantity:{$gte:cropQuantity}})
    if(!datafindquantity)
    {
        return res
        .status(400)
        .json({
            message:"we can not find that crop at that location"
        })
    }
    else if(datafindquantity.length==0)
    {
        return res
        .status(400)
        .json({
            message:"we cant find that crop"
        })
    }
    return res
    .status(200)
    .json({
        message:"we got the crops",
        datafindquantity,
    })
   
}
else
{
    return res
    .status(400)
    .json({
        message:"please enter all the details"
    }) 
}

 }
 catch(e)
 {
    console.log(e);
    return res
    .status(400)
    .json({
        message:"server error occured"
    })
 }
}
export default BuyerCropnameandcropquanityt
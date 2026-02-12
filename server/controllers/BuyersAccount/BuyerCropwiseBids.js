import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const BuyerCropwiseBids=async(req,res,next)=>
{
     try{
       const {cropName}=req.body;
       if(!cropName)
       {
        return res
        .status(400)
        .json({
            message:"enter the cropName",
        })
       }
       else{
          const findALLBUyercrop=await Dtamodelbuyer.find({cropName});
         if(findALLBUyercrop.length==0)
         {
            return res
            .status(400)
            .json({
                message:"cant find the crops"
            })
         }
          
         return res
         .status(200)
         .json({
            message:"we got the crop buyers bid",
            findALLBUyercrop

         })
       }
     }
     catch(e)
     {
        return res
        .status(400)
        .json({
            message:"error occured"
        })

     }

}
export default BuyerCropwiseBids
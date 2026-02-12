import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const CropNamandPIKUPLOCAtion=async(req,res,next)=>
{
     try{
        const {cropName,Location_Buyer}=req.body;
        if(cropName&&Location_Buyer)
        {
                  const findalllocaandcrop=await Dtamodelbuyer.find({cropName,Location_Buyer});
                  console.log(findalllocaandcrop)
                  if(!findalllocaandcrop)
                  {
                    return res
                    .status(400)
                    .json({
                        message:"we could not find the crop at this picuploaction"
                    })
                  }
                  else if(findalllocaandcrop.length==0)
                  {
                    return res
                    .status(400)
                    .json({
                        message:"we could not find the crop at this picuploaction"
                    })

                  }
                  return res
                  .status(200)
                  .json({
                    messagge:"got the crop at this lpcation",
                    findalllocaandcrop
                  })
        }
        else{
            return res
            .status(400)
            .json({
                message:"error occures enter all the details"
            })
        }

     }
     catch(e)
     {
        console.log(e);
     }
}
export default CropNamandPIKUPLOCAtion
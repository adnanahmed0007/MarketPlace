 
import dataModel from "../../models/DataModel.js";


const Buy_place_crop=async(req1,res)=>
{
  try{
    const {cropName,Pickup_Location,
        cropQuantity}=req1.body;
    if(cropName&&Pickup_Location&&cropQuantity)
    {
        const find_Crop_location=await dataModel.find({ cropName, Pickup_Location,cropQuantity:{$gte:cropQuantity}});
         

        if(find_Crop_location.length>0)
        {
            return res
            .status(200)
            .json({
                message:"got the details",
                find_Crop_location
            })
        }
        
        else if(!find_Crop_location)
        {
            return res
            .status(400)
            .json({
                message:"no data found we cant not found the crop"
            })
        }
        else{
            return res
            .status(400)
            .json({
                message:"no data found"
            })
        }

    }else{
    return res
    .status(400)
    .json({
        message:"fill the credentials"
    })
}
   

  }
  catch(e)
  {
     
    return res
    .status(400)
    .json({
        message:"error ocured"
    })
  }
}
export default Buy_place_crop;
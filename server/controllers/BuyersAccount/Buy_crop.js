import dataModel from "../../models/DataModel.js";
const BuyCrop=async(req,res)=>
{
    try{
       
       
        const {cropName,Pickup_Location}=req.body;
        if(cropName&&Pickup_Location)
        {
            const find_Crop_location=await dataModel.find({ cropName, Pickup_Location});
            console.log(find_Crop_location)
            if(!find_Crop_location)
            {
                return res
                .status(400)
                .json({
                    message:"we can not find that "
                })
            }
            else if (find_Crop_location.length==0)
            {
                return res
                .status(400)
                .json({
                    message:"empty rrat"
                })
            }
            return res
            .status(200)
            .json({
                message:"got the details",
                find_Crop_location
            }
            )

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
        console.log(e)
        return res
        .status(400)
        .json({
            message:"failed to get error occured"
        })
    }
    
}
export default BuyCrop;
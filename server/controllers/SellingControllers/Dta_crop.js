import dataModel from "../../models/DataModel.js";
const Dta_crop= async (req,res)=>
{
try{
    const {cropName}=req.body;
    if(!cropName)
    {
              return res
              .status(400)
              .json({
                message:"give the crop name",
              })
    }
    const find_Crop=await dataModel.find({
        cropName:cropName})
         if(!find_Crop||find_Crop.length===0)
         {
            return res
            .status(400)
            .json({
                message:"we could not find the crop",
            })
         }
         return res
         .status(200)
         .json({
            message:"got the details",
            find_Crop
         })
}
catch(e)
{
    return res
    .status(400)
    .json({
        message:"internal server error"
    })
}

     


}
export default Dta_crop
import dataModel from "../../models/DataModel.js";

const Onlycrop=async(req,res,next)=>
{
     
    try{
        const {cropName}=req.body;
        if(!cropName)
        {
            return res
            .status(400)
            .json({
                message:"enter crop name"
            })
        }
        const findcrop=await dataModel.find({cropName});
           if(!findcrop.length)
           {
            return res 
            .status(400)
            .json({
                message:"crop is not there"
            })
           }
           else if(findcrop&&findcrop.length>0)
           {
            return res
            .status(200)
            .json({
                message:"we got the crops",
                findcrop
            })
           }
    }
    catch(e)
    {
        console.log(e);
        return res
        .status(400)
        .json({
            message:"server error"
        })
    }

}
export default Onlycrop;
import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const DeltedBuyer=async(req,res,next)=>
{
    try{
     const {id}=req.params;
     const findAnddelted=await Dtamodelbuyer.findByIdAndDelete(
        id
        )
        if(!findAnddelted)
        {
             return res
             .status(400)
             .json({
                message:"error occured"
             })
        }
        return  res
        .status(200)
        .json({
            message:"delted the folowing id"
        })
        
    }
    catch(e)
    {
        console.log(e)
        return res
        .status(400)
        .json({
            message:"server error"
        })
    }
}
export default DeltedBuyer
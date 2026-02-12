import Dtamodelbuyer from "../../models/data_bid_buyer.js";

const databuyer=async(req,res,next)=>
{
    try{
        const userbuyers=req.user;
       
        const {cropName,cropQuantity, Location_Buyer,cropPrice}=req.body;
        if(cropName&&cropQuantity&&Location_Buyer&&cropPrice)
        {
            const phoneNumber=userbuyers.phoneNumber;
            const  User_Id=userbuyers._id;
             
                const newdata= await   Dtamodelbuyer({
                    cropName:cropName.toLowerCase(),
                    cropQuantity:cropQuantity,
                    Location_Buyer:Location_Buyer.toLowerCase(),    
                 User_Id:User_Id,
                 phoneNumber:phoneNumber,
                 cropPrice:cropPrice,

                })
                const chcek=await newdata.save();
                if(!chcek)
                {
                    return res
                    .status(400)
                    .json({
                        message:"erroer coccurefd while saving data",
                        
                    })
                }
                return res
                .status(200)
                .json({
                    message:"saved data successfullt",
                    chcek

                })

        }
        else{
            return res
            .status(400)
            .json({
                message:"please enter all the details"
            })
        }

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
export default databuyer;
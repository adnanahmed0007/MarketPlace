import Dtamodelbuyer from "../../models/data_bid_buyer.js";
import buyersmodel1 from "../../models/BuyersSchema.js";
const InfoBuyerDeyail=async(req,res,next)=>
{
    try{
            const {id}=req.params;
             if(!id)
             {
                return res
                .status(400)
                .json({
                    message:"not having id "
                })
             }
             const findbuyerId=await buyersmodel1.findById(id)
              if(!findbuyerId)
              {
                return res
                .status(400)
                .json({
                    message:"we cant find the buyere deatils"
                })
              }
              return res
              .status(200)
              .json({
                message:"we got the Buyer details",
                findbuyerId
              })
    }
    catch(e)
    {
        console.log(e);
    }
}
export default InfoBuyerDeyail
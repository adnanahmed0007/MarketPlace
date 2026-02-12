import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const BuyerCropnameQuantityandlocation = async (req, res, next) => {
    try {
        const {cropName,cropQuantity,Location_Buyer }=req.body;
        if(cropName&&cropQuantity&&Location_Buyer)
        {
                 const response1=await Dtamodelbuyer.find({cropName,Location_Buyer,cropQuantity:{$gte:cropQuantity}});
                  if(!response1)
                  {
                    return res
                    .status(400)
                    .json({
                        message:"cant get the crops"
                    })
                  }
                  else if(response1.length==0)
                  {
                    return res
                    .status(400)
                    .json({
                        message:"we can not get the crop"
                    })
                  }
                  return res
                  .status(200)
                  .json({
                    message:"we got the crops",
                    response1
                  })

        }
        else{
            return res
            .status(400)
            .json({
                message:"fill all the drtials"
            })
        }

    }
    catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({
                message: "server error"
            })
    }
}
export default BuyerCropnameQuantityandlocation
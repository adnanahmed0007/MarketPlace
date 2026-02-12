import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const AllBidsBuyerall=async(req,res,next)=>
{
    try{
        const user=req.user;
        const UserId=user._id;
        
        const response=await Dtamodelbuyer.find({User_Id:UserId});
         if(response.length==0)
         {
            return res
            .status(400)
            .json({
                message:"there is no bid"
            })
         }
          else if(!response)
          {
            return res
            .status(400)
            .json({
                message:"something went wrogn"
            })
          }
          return res
          .status(200)
          .json({
            mesaage:"go all the bids",
            response
          })
    
    }
    catch(e)
    {
        console.log(e)
    }
    
}
export default AllBidsBuyerall
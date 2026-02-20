import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const AllBidsallbuyeAllbuyer = async (req, res, next) => {
   const datagetall = await Dtamodelbuyer.find();
   if (datagetall.length == 0) {
      return res
         .status(400)
         .json({
            message: "no bids is there "
         })
   }
   else if (!datagetall) {
      return res
         .status(400)
         .json({
            message: "we could not find the buyers"
         })
   }
   return res
      .status(200)
      .json({
         message: "we got all the bids",
         datagetall
      })
}
export default AllBidsallbuyeAllbuyer
import dataModel from "../../models/DataModel.js";
const Sell_data=async(req,res)=>
{
    try{
       const getDta=await dataModel.find();
      if(!getDta||getDta.length===0)
      {
        return res
        .status(400)
        .json({
            message:"no data is prsenet"
        })
      }
      return res
      .status(200)
      .json({
        message:"we got the data",
        getDta
      })

    }
    catch(e)
    {
      return res
      .status(400)
      .json({
        message:"error occured"
      })

    }

}
export default Sell_data;
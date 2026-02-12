import buyersmodel1 from "../../models/BuyersSchema.js";
const GetBuyerInfo=async(req,res,next)=>
{
 
    try{
        const user=req.user;
      if(!user)
      {
        console.log("user not found")
        alert("user not found")
        return res
        .status(400)
        .json({
            message:"user not found"
            
        })
      }
      else{
      
        return res
        .status(200)
        .json({
            message:"user found",
            user
        })
      }
    }
    catch(e)
    {
        console.log(e);
        return res
        .status(400)
        .json({
            message:"internal occured"
        })
    }

}
export default GetBuyerInfo
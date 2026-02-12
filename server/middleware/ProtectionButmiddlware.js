 
import buyersmodel1 from "../models/BuyersSchema.js";
import jwt from "jsonwebtoken"
const jwtsecret ="mysecret12311";
const ProtectionBuyer=async(req,res,next)=>
{
    const token=req.cookies.jwt;
    
    if(!token)
    {
        return res
        .status(400)
        .json({
            message:"we cant find token"
        })
    }
    try{
    const token=req.cookies.jwt;
    if(!token)
    {
        return res
        .status(400)
        .json({
            message:"we cant find token"
        })
    }
    const check=jwt.verify(token,jwtsecret);
  if(!check)
  {
    return res
    .status(400)
    .json({
        message:"verification faled"
    })
  }
  const finduser=await buyersmodel1.findById(check.userId);
  if(!finduser)
  {
    return res
    .status(400)
    .json({
        message:"user not found"
    })
  }
 req.user=finduser;
 next();

}
catch(e)
{
    console.log(e)
    return res
    .status(400)
    .json({
        message:"error occured",e
    })
}
}
export default ProtectionBuyer
 
import jwt from "jsonwebtoken"
const jwtsecret="mysecret12311";
const Generatetoken=async(userId,res)=>
{
    const token=jwt.sign({userId},jwtsecret,{expiresIn:"15d"})
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
         
        sameSite: "lax",
       secure: process.env.NODE_ENV === "production"
         // Ensures cross-site requests work

    });
   
    return token

}
export default Generatetoken;
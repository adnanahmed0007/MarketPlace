 
import buyersmodel1 from "../../models/BuyersSchema.js";
 import Generatetoken from "../../utils/GenerateToke.js";
import bcrypt from "bcrypt"
const Login=async(req,res,next)=>
{
    try{
        const {email,password}=req.body;
        if(email&&password)
        {
            const find=await buyersmodel1.findOne({email});
            if(!find)
            {
                return res
                .status(400)
                .json({
                    message:"user not found"
                })
            }
            const checkPassword=await bcrypt.compare(password,find.password);
            if(!checkPassword)
            {
                return res
                .status(400)
                .json({
                    message:"password is in correct"
                })
            }
          const cookie=  await Generatetoken(find._id,res);
          if(!cookie)
          {
              return res
              .status(400)
              .json({
                  message:"cookie not set"
              })
          }
          return res
          .status(200)
          .json({
            message:"Login successfully",
            find
          })
            

        }
        else{
            return res
            .status(400)
            .json({
                message:"fill the credentials"
            })
        }

    }catch(e)
    {
        console.log(e)
        return res
        .status(400)
        .json({
            message:"internal error occures"
        })
    }
}
export default Login;
import UserSiging from "../../models/SigningModel.js"
 

const Buyfarmer=async (req,res)=>
{
    try
    {
const {id}=req.params;
if(!id)
{
    return res
    .status(400)
    .json({
        message:"server error"
    })
}
const findfarmer=await UserSiging.findById(id);
if(!findfarmer)
{
    return res
    .status(400)
    .json({
        message:"error occured cant find the user"
    })
}
return res
.status(200)
.json({
    message:"we got the farmers deatils",
    findfarmer
})
    }
    catch(e)
    {
        console.log(e);
        return res
        .status(400)
        .json({
            message:"error occured"
        })
    }
 
}
export default Buyfarmer
 import SetMeessages from "../../models/Messagesbuyerfarmers.js"
const BuyersendMessagegeFarmer=async(req,res)=>
{
    try
    {
  const user=req.user;
  const id=user._id;
   if(!id)
   {
    return res
    .status(400)
    .json({
        message:"error occured"
    })
   }
   const findsenderId=await SetMeessages.find({senderId:id});
    

  if(!findsenderId)
  {
    return res
    .status(400)
    .json({
        message:"we does not have chats".
        findsenderId
    })
  }
  return res
  .status(200)
  .json({
    message:"we got all your chats",
    findsenderId
  })

    }
    catch(e)
    {
        console.log(e)
    }
}
export default BuyersendMessagegeFarmer
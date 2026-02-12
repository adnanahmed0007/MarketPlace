import SetMeessages from "../../models/Messagesbuyerfarmers.js";
import buyersmodel1 from "../../models/BuyersSchema.js";
import UserSiging from "../../models/SigningModel.js";

 

const Buyer_Farmerchat=async(req,res)=>
{
  
     try{
             const {senderId,recevierId,messages:incomingmessage}=req.body;
     
             if(senderId&&recevierId)
             {
             const findsenderId=await buyersmodel1.findById(senderId);
             console.log(findsenderId.fullName)
             const buyername=findsenderId.fullName;

          
             const  findRecieverId=await UserSiging.findById(recevierId)
             console.log(findRecieverId.fullName)
             const farmerName=findRecieverId.fullName;
    
             if(!findsenderId&&!findRecieverId)
             {
                return res
                .status(400)
                .json({
                    message:"we does noy have thye usender abd receuibe"
                })
             }
             const findchats=await SetMeessages.findOne({senderId,recevierId})
            if(findchats)
            {
                findchats.all_messages.push({text:incomingmessage})
                const updated=await findchats.save();
                return res
                .status(200)
                .json({
                    message:"send the message to the farmer",
                    updated
                })
            }
            console.log("buyername:", buyername, "farmerName:", farmerName);

            if(findRecieverId&&findsenderId)
            {
             const messages=new SetMeessages({
            senderId,
                recevierId,
                farmerName,
                buyername,

                
                all_messages:[{text:incomingmessage}],
             })
             console.log("buyername:", buyername, "farmerName:", farmerName);

             const saveddata=await messages.save();
             if(!saveddata)
             {
                return res
                .status(400)
                .json({
                    message:"we could not save thye message"
                })
             }
             return res
             .status(200)
             .json({
                message:"send message to the farmer",
                saveddata,

             })
             
              
            
             }
             else 
             {
                return res
                .status(400)
                .json({
                    message:"all fields are required"
                })
             }
            }
            
     }
     catch(e)
     {
        console.log(e)
        return res
        .status(400)
        .json({
            message:"server error"
        })
     }

}
export default Buyer_Farmerchat;
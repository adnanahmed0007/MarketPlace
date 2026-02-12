import dataModel from "../../models/DataModel.js";
const Data_saved=async(req,res)=>
{
  try{
    const {cropName,cropQuantity,Pickup_Location,cropPrice}=req.body;
    const iduser=req.user1._id;
    const  phoneNumber=req.user1.phoneNumber;
    if(!iduser)
    {
        return res
        .status(400)
        .json({
            message:"user is not autheticated"
        })
    }
    if(cropName&&cropQuantity&&Pickup_Location&&cropPrice)
    {
          const newdata=await dataModel({
            cropName:cropName.toLowerCase(),
            cropQuantity,
            Pickup_Location:Pickup_Location.toLowerCase(),
            cropPrice,
            User_Id:iduser,
            phoneNumber,
            


          })
          if(!newdata)
          {
            return res
            .status(400)
            .json({
                message:"can not create the user"
            })
          }
              const saveddata=await newdata.save();
              if(!saveddata)
              {
                return res
                .status(400)
                .json({
                    message:"can not saved the data "
                })
              }
            
              return res
              .status(200)
              .json({
                message:"data is saved suuceffuly",
                newdata

              })
    }

  }
  catch(e)
  {
    console.log(e)
    return res
    .status(400)
    .json({

        message:"something error occured"
    })
  }
     
   
}
export default Data_saved;
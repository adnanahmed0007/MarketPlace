import FarmerDeatils from "../../models/Farmerdeatis.js";
  
 import { v2 as cloudinary } from 'cloudinary';
 import dotenv from "dotenv"
 dotenv.config();

  cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

const AboutFarmer=async(req,res)=>
{
    try{
        const userId=req.user1;
        
   const findUsder=await FarmerDeatils.findOne({ FarmerId:userId._id});
   if(findUsder)
   {
    return res
    .status(400)
    .json({

        message:"about detail already exits ",
        findUsder
    })

   }
   else{

   
        const {FarmerName,LandDetail,AboutFarmer}=req.body;
        if(FarmerName&&LandDetail&&AboutFarmer)
        {
                const file =req.file
             if (file) {
            const uploadimage=await cloudinary.uploader.upload_stream(
               
            
            async (error,result)=>
            {
                if(error)
                {
                    console.log(error)
                    return res
                    .status(400)
                    .json({
                         message:"image upload failed"
                    })
                }
                const newUser=new  FarmerDeatils(
                    {
                        FarmerName,
                        LandDetail,
                        AboutFarmer,
                        FarmerId:userId._id,
                          FarmerImage:result.secure_url,

                    })
                    const check= await newUser.save()
                    if(!check)
                    {
                        return res
                        .status(400)
                        .json({
                            message:"we could not saved the data ",
                             
                        })
                    }
                    return res
                    .status(200)
                    .json({
                        message:"data saved successfully",
                        check
                        
                    })
                    
                     
            });uploadimage.end(file.buffer);
        }
        }
    }
    

    }
    catch(e)
    {
        console.log(e);
        return res
        .status(400)
        .json({message:"error occured"}) 
    }
  
}
export default AboutFarmer;
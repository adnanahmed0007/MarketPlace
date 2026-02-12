import dataModel from "../../models/DataModel.js";
const DeleteDta=async(req,res)=>
{
 try{
    const { id } = req.params;
     console.log(id)
    
     
         const delete1=await dataModel.findById(id)
         if(!delete1)
         {
            return res
            .status(400)
            .json({
               message:"in correct details"
            })
         }
         const deletandupadt=await dataModel.findByIdAndDelete(id);
         if(deletandupadt)
         {
            return res
            .status(200)
            .json({
               message:"we deleted the details",
               
            })
         }

    
    
 }
 catch(e)
 {
    console.log(e)
 }
}
export default DeleteDta;
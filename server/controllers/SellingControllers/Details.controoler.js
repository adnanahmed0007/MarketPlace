const Detail_user=async(req,res)=>
{
    try{
const user=req.user1;
if(!user)
{
    return res
    .status(400)
    .json({
        message:"user is not authentivated "
    })
}
 
return res
.status(200)
.json({
    message:"got the user",
    user

})
    }
    catch(e)
    {
        console.log(e)
        return res
        .status(400)
        .json({
            message:"error occured"
        })
    }

}
export default Detail_user;
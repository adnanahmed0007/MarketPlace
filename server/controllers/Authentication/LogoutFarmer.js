const Logout_Farmer=async(req,res,next)=>
{
  try{
    res.cookie("jwt","",{
        maxAge:0,
        httpOnly:true,
        sameSite:"lax",
        secure: process.env.NODE_ENV === "production"

    });
    return res
    .status(200)
    .json({
        message:"Successfully loged out"

    })
       
  }
  catch(e)
  {
    console.log(e);
    return res
    .status(400)
    .json({
        message:"log out failed try again"
    })

  }
}
export default Logout_Farmer
const LogoutBuyer = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res
      .status(200)
      .json({
        message: "successfully loged out"
      })
  }
  catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({
        message: "server error "
      })
  }
}
export default LogoutBuyer
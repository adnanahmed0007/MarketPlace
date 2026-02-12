import buyersmodel1 from "../../models/BuyersSchema.js";
import bcrypt from "bcrypt"
import Generatetoken from "../../utils/GenerateToke.js";
const Signup = async (req, res, next) => {
    try {
        const { fullName, age, address, phoneNumber, email, password } = req.body;
        if (fullName && age && address && phoneNumber && email && password) {
            const hashedpassword=await bcrypt.hash(password,5);
            console.log(hashedpassword)
            const check = await buyersmodel1.findOne({ email })
            if (check) {
                return res
                    .status(400)
                    .json({
                        message: "user already register go to login"
                    })
            }
            const newUser =  new buyersmodel1({
                fullName, age, address, phoneNumber, email,
                password:hashedpassword,
            })
          await   Generatetoken(newUser._id, res)
            const User=await newUser.save();
            if(!User)
            {
                return res
                .status(400)
                .json({
                    message:"user cound not be created error occured"
                })
            }
             
            return res
            .status(200)
            .json({
                message:"user created successfully",
                User
            })

           

        }
        else {
            return res
                .status(400)
                .json({ message: "enter all the credeentials" })
        }

    }
    catch (e) {
        console.log("error occured", e)
        return res
            .status(400)
            .json({
                message: "error occured"
            })
    }
}
export default Signup;
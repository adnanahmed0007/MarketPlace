import UserSiging from "../../models/SigningModel.js";
import bcrypt from "bcrypt"
import Generatetoken from "../../utils/GenerateToke.js";
const LoginAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const check = await UserSiging.findOne({
                email
            })
            if (!check) {
                return res
                    .status(401)
                    .json({
                        message: "user is not resgister "
                    })
            }
            const CorrectPassword = check.password
            const ifPasswordCorrect = await bcrypt.compare(password, CorrectPassword);
            if (!ifPasswordCorrect) {
                return res
                    .status(400)
                    .json({
                        message: "Password is not correct"
                    })
            }
            console.log(check)
            Generatetoken(check._id, res);

            return res
                .status(200)
                .json({
                    message: "login succesfully ",
                    check
                })

        }
        return res
            .status(400)
            .json({
                message: "all fields are required"
            })

    }
    catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({
                message: "getting error"
            })
    }
     
};
export default LoginAuth
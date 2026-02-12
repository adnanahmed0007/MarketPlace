import UserSiging from "../../models/SigningModel.js";
import bcrypt from "bcrypt"
const UserPassword = async (req, res) => {
    try {
        const user = req.user1;

        if (!user) {
            return res
                .status(400)
                .json({
                    message: "user is not authenticated",
                })
        }

        const id = user._id;

        const find = await UserSiging.findById(id)


        if (!find) {
            return res
                .status(400)
                .json({
                    message: "we cant the user"
                })
        }
        const passwordOriginal = user.password;

        const { old_password, newPassword } = req.body;
        if (old_password && find && newPassword) {
            const check = await bcrypt.compare(old_password, passwordOriginal)
            if (!check) {
                return res
                    .status(400)
                    .json({
                        message: "password is not correct",

                    })
            }
            const update_password = await bcrypt.hash(newPassword, 5)

            const find_update = await UserSiging.findByIdAndUpdate(id, {
                password: update_password

            })


            if (find_update) {


                return res
                    .status(200)
                    .json({
                        message: "changed password successfully",

                    })
            }

        }
        else {
            return res
                .status(400)
                .json({
                    message: "all fileds are required"
                })
        }





    }
    catch (e) {
        

    }


}
export default UserPassword
import UserSiging from "../../models/SigningModel.js";
import bcrypt from "bcrypt";
import Generatetoken from "../../utils/GenerateToke.js";

const Signup = async (req, res) => {
    try {
        const { fullName, address, age, email, phoneNumber, password } = req.body;

        console.log("Incoming Data:", req.body);

        if (!fullName || !address || !age || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const existingUser = await UserSiging.findOne({
            $or: [{ email }, { phoneNumber }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserSiging.create({
            fullName,
            address,
            age: Number(age),
            email,
            phoneNumber: Number(phoneNumber),
            password: hashedPassword
        });


        await Generatetoken(newUser._id, res);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("SERVER ERROR:", error.message);

        return res.status(500).json({
            message: error.message
        });
    }
};

export default Signup;

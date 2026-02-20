import buyersmodel1 from "../../models/BuyersSchema.js";
import bcrypt from "bcrypt";
import Generatetoken from "../../utils/GenerateToke.js";

const Signup = async (req, res) => {
    try {
        const { fullName, age, address, phoneNumber, email, password } = req.body;



        if (!fullName || !age || !address || !phoneNumber || !email || !password) {
            return res.status(400).json({
                message: "Please enter all credentials",
            });
        }


        const existingUser = await buyersmodel1.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already registered. Please login.",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new buyersmodel1({
            fullName,
            age,
            address,
            phoneNumber,
            email,
            password: hashedPassword,
        });


        const savedUser = await newUser.save();

        await Generatetoken(savedUser._id, res);


        return res.status(201).json({
            message: "User created successfully",
            user: savedUser,
        });

    } catch (error) {
        console.log("Signup Error:", error);

        return res.status(500).json({
            message: error.message || "Server error",
        });
    }
};

export default Signup;

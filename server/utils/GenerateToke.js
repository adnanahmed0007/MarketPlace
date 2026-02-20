

import jwt from "jsonwebtoken";

const Generatetoken = (userId, res) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    console.log("JWT SECRET IN VERIFY:", process.env.JWT_SECRET);

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
    );

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return token;
};

export default Generatetoken;

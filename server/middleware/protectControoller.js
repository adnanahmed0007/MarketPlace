 import UserSigning from "../models/SigningModel.js";
import jwt from "jsonwebtoken";

const jwtsecret = "mysecret12311";

const ProtectionMiddleware = async (req, res, next) => {
    try {
         
        const token = req.cookies.jwt;
       

        if (!token) {
            return res.status(400).json({ message: "Cookies expired, please log in again" });
        }

        const verify = jwt.verify(token, jwtsecret);

        if (!verify) {
            return res.status(400).json({ message: "Unauthenticated" });
        }

        const user1 = await UserSigning.findById(verify.userId);

        if (!user1) {
            return res.status(400).json({ message: "We can't find the user" });
        }

        req.user1 = user1;
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "Error occurred" });
    }
};

export default ProtectionMiddleware;
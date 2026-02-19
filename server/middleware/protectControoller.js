import jwt from "jsonwebtoken";
import UserSigning from "../models/SigningModel.js";

const ProtectionMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Please login again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserSigning.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default ProtectionMiddleware;

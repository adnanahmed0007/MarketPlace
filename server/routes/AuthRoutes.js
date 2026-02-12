 
 import express from "express"
 import LoginAuth from "../controllers/Authentication/LoginController.js";
 import changepassword from "../controllers/Authentication/Passworduser.js"
 import Signup from "../controllers/Authentication/SignupController.js"
 import ProtectionMiddleware from "../middleware/protectControoller.js";
 import Logout_Farmer from "../controllers/Authentication/LogoutFarmer.js";
 const router=express.Router();
 router.post("/login",LoginAuth);
 router.post("/sign",Signup)
 router.post("/changepassword",ProtectionMiddleware,changepassword)
 router.post("/logout/farmer",ProtectionMiddleware,Logout_Farmer)
 export default router;
 
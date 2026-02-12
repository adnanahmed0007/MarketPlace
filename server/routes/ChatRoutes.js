import express from "express"
import Buyer_Farmerchat from "../controllers/CharbuyerToFarmer/ChatFarmer_Biyers.js";
import BuyersendMessagegeFarmer from "../controllers/CharbuyerToFarmer/BuyerSendmessages.js";
import ProtectionBuyer from "../middleware/ProtectionButmiddlware.js";

const router_chat=express.Router();
router_chat.post("/chat/farmer/buyer",ProtectionBuyer,Buyer_Farmerchat);
router_chat.get("/chat/buyerto/farmer",ProtectionBuyer,BuyersendMessagegeFarmer);
export default router_chat;

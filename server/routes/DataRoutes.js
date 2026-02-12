import express from "express";
import Data_saved from  "../controllers/SellingControllers/DataController.js"
import ProtectionMiddeware from "../middleware/protectControoller.js";
import Data_Get from "../controllers/SellingControllers/Data_Getcontrollers.js";
import Sell_data from "../controllers/SellingControllers/SellDtacontroller.js";
import Dta_crop from "../controllers/SellingControllers/Dta_crop.js";
import Detail_user from "../controllers/SellingControllers/Details.controoler.js";
import DeleteDta from "../controllers/SellingControllers/DeleteControllers.js";
import Dta_Crop_Update from "../controllers/SellingControllers/Dta_Crop_update.js";
import farmerbuydaata from "../controllers/SellingControllers/Farmers_Bid.js";
import cropNameBuyer from "../controllers/SellingControllers/BuyerCropnam.js";
import CropNamandPIKUPLOCAtion from "../controllers/SellingControllers/BuyerCropnameandLocation.js";
import BuyerCropnameandcropquanityt from "../controllers/SellingControllers/BuyerCropnameQuantity.js";
import BuyerCropnameQuantityandlocation from "../controllers/SellingControllers/BuyerCropnamequnatitylocation.js"
import InfoBuyerDeyail from "../controllers/SellingControllers/BuyerInforetails.js";
import AboutFarmer from "../controllers/SellingControllers/AboutFarmeerOnetime.js";
import GetAaboutfarmer from "../controllers/SellingControllers/GetAboutfarmer.js";
import ulpoad from "../middleware/MulterMiddleware.js";
 
const router=express.Router();
router.post("/datasell",ProtectionMiddeware,Data_saved)
router.get("/datagett",ProtectionMiddeware,Data_Get);
router.get("/selldatashow",ProtectionMiddeware,Sell_data);
router.post("/dtacrop",ProtectionMiddeware,Dta_crop)
router.get("/detailsuser",ProtectionMiddeware,Detail_user)
router.delete("/deletecrop/:id",ProtectionMiddeware,DeleteDta);
router.post("/crop/update",ProtectionMiddeware,Dta_Crop_Update)
router.get("/farmer/data",ProtectionMiddeware,farmerbuydaata)
router.post("/farmer/data/cropname",ProtectionMiddeware,cropNameBuyer)
router.post("/farmer/data/cropname/pickuplocation",ProtectionMiddeware,CropNamandPIKUPLOCAtion)
router.post("/farmer/data/cropname/cropQunatuty",ProtectionMiddeware,BuyerCropnameandcropquanityt)
router.post("/farmer/data/cropname/cropQunatuty/place",ProtectionMiddeware,BuyerCropnameQuantityandlocation)
router.post("/farmer/data/details/buyers/:id",InfoBuyerDeyail)
router.post("/farmer/about/details",ProtectionMiddeware,ulpoad.single("FarmerImage"),AboutFarmer)
router.get("/farmer/details/about",ProtectionMiddeware,GetAaboutfarmer)

export default router
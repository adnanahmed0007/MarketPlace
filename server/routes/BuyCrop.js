import express from "express";
import BuyCrop from "../controllers/BuyersAccount/Buy_crop.js";
import ProtectionBuyer from "../middleware/ProtectionButmiddlware.js";
import Buy_place_crop from "../controllers/BuyersAccount/Buy_place_cropName_quantity.js";
import buy_quantity from "../controllers/BuyersAccount/Buy_quantity.js";
import GetBuyerInfo from "../controllers/BuyersAccount/Buyersinfo.js";
import Onlycrop from "../controllers/BuyersAccount/Buyonlycrop.js";
import Buyfarmer from "../controllers/BuyersAccount/BuyfarmerDetails.js";
import databuyer from "../controllers/BuyersAccount/Buyers_Bid.js";
import AllBidsBuyerall from "../controllers/BuyersAccount/AllBidsBuiyerall.js";
import DeltedBuyer from "../controllers/BuyersAccount/BuyDeltedCrop.js";
import AllBidsallbuyeAllbuyer from "../controllers/BuyersAccount/BuyerAllBidsacross.js";
import BuyerCropwiseBids from "../controllers/BuyersAccount/BuyerCropwiseBids.js";
const router123 = express.Router();
router123.post("/crop/place/location", ProtectionBuyer, BuyCrop)
router123.post("/crop/place/quantity/location", ProtectionBuyer, Buy_place_crop)
router123.post("/crop/quantity/name", ProtectionBuyer, buy_quantity)
router123.get("/buyer/info", ProtectionBuyer, GetBuyerInfo)
router123.post("/crop", ProtectionBuyer, Onlycrop)
router123.post("/detailsfarmer/:id", Buyfarmer)
router123.post("/buyer/bid", ProtectionBuyer, databuyer);
router123.get("/all/bids/buyer", ProtectionBuyer, AllBidsBuyerall)
router123.delete("/buyer/delte/:id", ProtectionBuyer, DeltedBuyer)
router123.get("/all/buyer/bidsall/all/buyer", ProtectionBuyer, AllBidsallbuyeAllbuyer)
router123.post("/all/cropwise/buyers/bids", ProtectionBuyer, BuyerCropwiseBids)
export default router123
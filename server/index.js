
import express from "express"
import mongoose from "mongoose";
import router from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import routerData from "./routes/DataRoutes.js";
import cors from "cors"
import router123 from "./routes/BuyCrop.js";
import router_chat from "./routes/ChatRoutes.js";

import routerBuy from "./routes/AuthBuyersRouet.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const url1 = process.env.DB_URL;

const port = 9808;

app.use(cors(
    {
        origin: 'http://localhost:5173',  // Your React frontend URL
        credentials: true,

    }
))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", router)
app.use("/api/sell", routerData)
app.use("/api/buy", router123)
app.use("/api/auth/buy", routerBuy)
app.use("/api/chats", router_chat)

const connect = await mongoose.connect(url1)
    .then(() => {
        app.listen(port, () => {
            console.log(` we are on port ${port}`);
            console.log(url1)
        })
    })
    .catch((e) => {
        console.log(e)
    })


import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";



connectDB()
const app = express()
app.use(cors()) // enable cross-origin resource sharing
//middlewherw
app.use(express.json());
app.use(clerkMiddleware());

// API to listen webhook
app.use("/api/clerk", clerkWebhooks)


app.get('/', (req, res) => res.send("API IS WORKING"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

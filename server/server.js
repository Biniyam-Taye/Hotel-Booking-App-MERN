import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";



connectDB()
connectCloudinary()

const app = express()
app.use(cors()) // enable cross-origin resource sharing
//middlewherw
app.use(express.json());
app.use(clerkMiddleware());

// API to listen webhook
app.use("/api/clerk", clerkWebhooks)


app.get('/', (req, res) => res.send("API IS WORKING"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

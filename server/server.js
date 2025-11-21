// server.js

import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from "@clerk/express"
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./configs/cloudinary.js"
import roomRouter from "./routes/roomRoute.js"
import bookingRouter from "./routes/bookingRoutes.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"

connectDB()
connectCloudinary()

const app = express()
app.use(cors())

// 1. STRIPE WEBHOOK HANDLER: Must use express.raw() and come first.
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks)

// 2. GLOBAL MIDDLEWARE: Process standard JSON requests for all other routes.
app.use(express.json())
app.use(clerkMiddleware())

// 3. API Routes
// Clerk Webhook
app.use("/api/clerk", clerkWebhooks)

app.get("/", (req, res) => res.send("API IS WORKING"))
app.use("/api/user", userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
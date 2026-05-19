import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import Hotel from "../models/Hotel.js";

const signToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET || "hotel-booking-dev-secret", {
        expiresIn: "7d",
    });

const formatUser = (user) => ({
    _id: user._id,
    email: user.email,
    username: user.username,
    image: user.image,
    role: user.role,
    isOwner: user.role === "hotelOwner",
});

export const signup = async (req, res) => {
    try {
        const { email, password, username, role, hotel } = req.body;

        if (!email || !password || !username || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!["user", "hotelOwner"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid account type" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        if (role === "hotelOwner") {
            if (!hotel?.name || !hotel?.address || !hotel?.contact || !hotel?.city) {
                return res.status(400).json({ success: false, message: "Hotel details are required for owners" });
            }
        }

        const userId = new mongoose.Types.ObjectId().toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            _id: userId,
            email: email.toLowerCase(),
            username,
            password: hashedPassword,
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
            role,
            recentSearchedCities: [],
        });

        if (role === "hotelOwner") {
            await Hotel.create({
                name: hotel.name,
                address: hotel.address,
                contact: hotel.contact,
                city: hotel.city,
                owner: userId,
            });
        }

        const token = signToken(userId);

        res.json({
            success: true,
            message: role === "hotelOwner" ? "Hotel owner account created" : "Account created successfully",
            token,
            user: formatUser(user),
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = signToken(user._id);

        res.json({
            success: true,
            message: "Logged in successfully",
            token,
            user: formatUser(user),
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

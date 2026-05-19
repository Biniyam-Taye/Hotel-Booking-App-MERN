import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.js";

const ensureAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.log("Admin seed skipped: set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
        return;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
        if (existing.role !== "admin") {
            existing.role = "admin";
            existing.ownerStatus = "none";
            await existing.save();
            console.log("Existing user promoted to admin");
        }
        return;
    }

    const userId = new mongoose.Types.ObjectId().toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        _id: userId,
        email: email.toLowerCase(),
        username: "Admin",
        password: hashedPassword,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`,
        role: "admin",
        ownerStatus: "none",
        recentSearchedCities: [],
    });

    console.log("Admin account created:", email);
};

export default ensureAdmin;

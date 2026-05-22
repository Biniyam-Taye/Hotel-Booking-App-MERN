import connectDB from "./configs/db.js";
import mongoose from "mongoose";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import Hospitality from "./models/Hospitality.js";

// Dummy owner ID – replace with a real user ID if needed
const dummyOwnerId = new mongoose.Types.ObjectId();

const hotels = [
  {
    name: "Sunrise Resort",
    address: "123 Beach Blvd",
    contact: "+1234567890",
    city: "Miami",
    description: "A luxurious beachside resort with stunning ocean views.",
    owner: dummyOwnerId,
    status: "approved",
  },
  {
    name: "Mountain Escape",
    address: "456 Alpine Way",
    contact: "+0987654321",
    city: "Aspen",
    description: "Cozy cabins nestled in the mountains, perfect for a winter getaway.",
    owner: dummyOwnerId,
    status: "approved",
  },
];

const rooms = [
  // Rooms for Sunrise Resort
  {
    hotel: "Sunrise Resort",
    title: "Ocean View Suite",
    description: "Spacious suite with a private balcony overlooking the sea.",
    roomType: "Suite",
    pricePerNight: 250,
    amenities: ["WiFi", "Breakfast", "Pool Access"],
    images: [
      "https://source.unsplash.com/featured/800x600?hotel",
      "https://source.unsplash.com/featured/800x600?room",
    ],
    isAvailable: true,
  },
  // Rooms for Mountain Escape
  {
    hotel: "Mountain Escape",
    title: "Alpine Cabin",
    description: "Rustic cabin with a fireplace and mountain views.",
    roomType: "Cabin",
    pricePerNight: 180,
    amenities: ["Fireplace", "Hot Tub", "Hiking Trails"],
    images: [
      "https://source.unsplash.com/featured/800x600?mountain",
      "https://source.unsplash.com/featured/800x600?cabin",
    ],
    isAvailable: true,
  },
];

const hospitalityItems = [
  {
    hotel: "Sunrise Resort",
    title: "Spa Treatment",
    description: "Relaxing full‑body massage and facial.",
    category: "Wellness",
    price: 120,
    features: ["Aromatherapy", "Hot Stones"],
    image: "https://source.unsplash.com/featured/800x600?spa",
    isAvailable: true,
  },
  {
    hotel: "Mountain Escape",
    title: "Guided Snowshoe Tour",
    description: "Explore snowy trails with an experienced guide.",
    category: "Adventure",
    price: 80,
    features: ["Equipment Provided", "Hot Cocoa"],
    image: "https://source.unsplash.com/featured/800x600?snowshoe",
    isAvailable: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Database connected. Seeding data...");

    // Clear existing collections
    await Promise.all([
      Hotel.deleteMany({}),
      Room.deleteMany({}),
      Hospitality.deleteMany({}),
    ]);

    // Insert hotels first to obtain their IDs
    const createdHotels = await Hotel.insertMany(hotels);
    const hotelMap = {};
    createdHotels.forEach((h) => (hotelMap[h.name] = h._id));

    // Replace hotel name references with ObjectId for rooms and hospitality
    const roomsWithIds = rooms.map((r) => ({
      ...r,
      hotel: hotelMap[r.hotel],
    }));

    const hospitalityWithIds = hospitalityItems.map((h) => ({
      ...h,
      hotel: hotelMap[h.hotel],
    }));

    await Room.insertMany(roomsWithIds);
    await Hospitality.insertMany(hospitalityWithIds);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();

const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing users
    await User.deleteMany({});
    
    // Create initial 10 users
    const initialUsers = [
      { name: "Rahul" },
      { name: "Kamal" },
      { name: "Sanak" },
      { name: "Priya" },
      { name: "Amit" },
      { name: "Neha" },
      { name: "Vikram" },
      { name: "Anjali" },
      { name: "Rohit" },
      { name: "Kavya" }
    ];
    
    await User.insertMany(initialUsers);
    console.log("Database seeded with initial users");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedUsers();

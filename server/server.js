const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Leaderboard API ready!`);
  console.log(`🔗 Backend URL: http://localhost:${PORT}`);
});

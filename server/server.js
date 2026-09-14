
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const destinations = require("./data/destination");
const authRoutes = require("./routes/auth");
const savedRoutes = require("./routes/saved");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/saved", savedRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Travya API is running 🚀",
  });
});

// Get all destinations
app.get("/api/destinations", (req, res) => {
  res.json(destinations);
});

// Get one destination by ID
app.get("/api/destinations/:id", (req, res) => {
  const destination = destinations.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  res.json(destination);
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
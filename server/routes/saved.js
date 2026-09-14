const express = require("express");
const SavedDestination = require("../models/SavedDestination");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
  Get all saved destinations for the logged-in user
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const savedDestinations = await SavedDestination.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(savedDestinations);
  } catch (error) {
    console.error("Error fetching saved destinations:", error);

    res.status(500).json({
      message: "Unable to fetch saved destinations",
    });
  }
});

/*
  Save a destination
*/
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
    } = req.body;

    if (!destinationId || !destinationName) {
      return res.status(400).json({
        message: "Destination ID and name are required",
      });
    }

    const alreadySaved = await SavedDestination.findOne({
      user: req.user.userId,
      destinationId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        message: "Destination already saved",
      });
    }

    const savedDestination = await SavedDestination.create({
      user: req.user.userId,
      destinationId,
      destinationName,
    });

    res.status(201).json({
      message: "Destination saved successfully",
      savedDestination,
    });
  } catch (error) {
    console.error("Error saving destination:", error);

    res.status(500).json({
      message: "Unable to save destination",
    });
  }
});

/*
  Remove a saved destination
*/
router.delete("/:destinationId", authMiddleware, async (req, res) => {
  try {
    const deletedDestination = await SavedDestination.findOneAndDelete({
      user: req.user.userId,
      destinationId: Number(req.params.destinationId),
    });

    if (!deletedDestination) {
      return res.status(404).json({
        message: "Saved destination not found",
      });
    }

    res.json({
      message: "Destination removed successfully",
    });
  } catch (error) {
    console.error("Error removing destination:", error);

    res.status(500).json({
      message: "Unable to remove destination",
    });
  }
});

module.exports = router;
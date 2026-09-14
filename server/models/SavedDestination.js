const mongoose = require("mongoose");

const savedDestinationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destinationId: {
      type: Number,
      required: true,
    },

    destinationName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

savedDestinationSchema.index(
  {
    user: 1,
    destinationId: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "SavedDestination",
  savedDestinationSchema
);
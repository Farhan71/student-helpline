const mongoose = require("mongoose");

const AccommodationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    locationDetails: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    member: {
      type: Number,
      required: true
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accommodation", AccommodationSchema);

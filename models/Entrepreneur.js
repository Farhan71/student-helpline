const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    startUpName: {
      type: String,
      required: true,
    },
    startUpType: {
      type: String,
      required: false,
    },
    productType: {
      type: String,
      required: true,
    },

    locationRange: {
      type: String,
      required: false,
    },

    quantity: {
      type: Number,
      required: false,
  },
  price: {
      type: Number,
      required: false,
  },
  contact: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entrepreneur", PostSchema);

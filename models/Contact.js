const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        unique: true,
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
    email: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);

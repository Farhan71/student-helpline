const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    group: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
    },
    patientState: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    bags: {
        type: String,
        required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    contact: {
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blood", PostSchema);

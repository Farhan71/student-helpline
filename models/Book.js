const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookAuthor: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        required: true,
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

module.exports = mongoose.model("Books", BooksSchema);

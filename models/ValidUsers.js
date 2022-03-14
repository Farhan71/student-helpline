const mongoose = require("mongoose");

const ValidUsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  }, 
  { collection: 'validusers' }
);

module.exports = mongoose.model("ValidUsers", ValidUsersSchema,"validusers");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    isDonor: {
      type: String,
      required: true,
    },

    isEntrepreneur: {
      type: String,
      required: true,
    },

    isReporter: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

module.exports = mongoose.model("User", UserSchema);

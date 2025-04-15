const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
        password: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          default: "https://example.com/default-avatar.png",
        },
        bannerImage: {
          type: String,
          default: "https://example.com/default-banner.png",
        },
        status:{
                type: String,
                enum: ["Online", "Offline"],
                default: "actiOnline",
        },
        createDate: {
          type: Date,
          default: Date.now,
        },
        modifyDate: {
          type: Date,
          default: Date.now,
        }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

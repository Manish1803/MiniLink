const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please enter a valid url"],
    trim: true,
  },
  shortCode: {
    type: String,
    unique: true,
    trim: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
  },
  remarks: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;

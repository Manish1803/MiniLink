const mongoose = require("mongoose");

const linkAccessSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
  },
  accessedAt: {
    type: Date,
    default: Date.now,
  },
  ipaddress: {
    type: String,
    required: true,
  },
  userAgent: {
    browser: String,
    device: String,
    os: String,
  },
  originalUrl: String,
  shortCode: String,
});

const LinkAccess = mongoose.model("LinkAccess", linkAccessSchema);

module.exports = LinkAccess;

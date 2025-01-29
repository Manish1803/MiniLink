const express = require("express");
const Link = require("./../models/Link");
const LinkAccess = require("./../models/LinkAccess");
const UAParser = require("ua-parser-js");

const router = express.Router();

router.get("/:shortCode", async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (link.expiredAt && link.expiredAt < Date.now()) {
      return res.status(404).json({ message: "Link has expired" });
    }

    const ua = new UAParser(req.headers["user-agent"]);
    const device = ua.getDevice().type || "desktop";
    const userAgent = {
      browser: ua.getBrowser().name,
      device: device,
      os: ua.getOS().name,
    };

    const formattedUserAgent = {
      browser: String(userAgent.browser),
      device: String(userAgent.device),
      os: String(userAgent.os),
    };

    const access = await LinkAccess.create({
      linkId: link._id,
      ipaddress: req.ip,
      userAgent: formattedUserAgent,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
    });

    link.viewCount += 1;
    await link.save();

    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

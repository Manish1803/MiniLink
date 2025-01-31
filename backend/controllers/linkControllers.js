const { nanoid } = require("nanoid");
const Link = require("./../models/Link");
const LinkAccess = require("./../models/LinkAccess");

// Get Information of Dashboard
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const userLinks = await Link.find({ userId: req.user._id });
    const linkIds = userLinks.map((link) => link._id);

    const totalViews = userLinks.reduce((sum, link) => sum + link.viewCount, 0);

    const accessRecords = await LinkAccess.find({
      linkId: { $in: linkIds },
    });

    const dateWiseClicks = {};
    const deviceWiseClicks = {
      desktop: 0,
      tablet: 0,
      mobile: 0,
      other: 0,
    };

    accessRecords.forEach((record) => {
      const date = record.accessedAt.toISOString().split("T")[0];
      dateWiseClicks[date] = (dateWiseClicks[date] || 0) + 1;

      const device = record.userAgent?.device;
      if (device === "desktop") deviceWiseClicks.desktop += 1;
      else if (device === "tablet") deviceWiseClicks.tablet += 1;
      else if (device === "mobile") deviceWiseClicks.mobile += 1;
      else deviceWiseClicks.other += 1;
    });

    let totalCount = 0;
    const dateWiseClicksArray = Object.entries(dateWiseClicks)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => {
        totalCount += count;
        return { date, count: totalCount };
      })
      .reverse();

    const deviceWiseClickArray = [
      { device: "Dasktop", count: deviceWiseClicks.desktop },
      { device: "Mobile", count: deviceWiseClicks.mobile },
      { device: "Tablet", count: deviceWiseClicks.tablet },
      { device: "other", count: deviceWiseClicks.other },
    ];

    res.status(200).json({
      totalViews,
      totalLinks: userLinks.length,
      dateWise: dateWiseClicksArray,
      deviceWise: deviceWiseClickArray,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Information of Links
exports.getAllLinks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalLinks = await Link.countDocuments({ userId: req.user._id });
    const totalPages = Math.ceil(totalLinks / limit);

    const links = await Link.find({ userId: req.user._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!links || links.length === 0) {
      return res.json({
        links: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    }

    const formattedLinks = links.map(({ _id, ...link }) => ({
      ...link,
      id: _id,
    }));

    res.json({
      links: formattedLinks,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalLinks,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Information of Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userLinks = await Link.find({ userId: req.user._id });
    const linkIds = userLinks.map((link) => link._id);

    const totalLogs = await LinkAccess.countDocuments({
      linkId: { $in: linkIds },
    });
    const totalPages = Math.ceil(totalLogs / limit);

    const logs = await LinkAccess.find({
      linkId: { $in: linkIds },
    })
      .sort({
        accessedAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!logs || logs.length === 0) {
      return res.json({
        logs: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    }

    const formattedLogs = logs.map(({ _id, userAgent, ...log }) => ({
      ...log,
      id: _id,
      userAgent: userAgent
        ? `${userAgent.browser} on ${userAgent.device} (${userAgent.os})`
        : "Unknown User Agent",
    }));

    res.json({
      logs: formattedLogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalLogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ********************* //
// *    Short Links    * //
// ********************* //

exports.createLink = async (req, res) => {
  try {
    const { originalUrl, remarks, expiredAt } = req.body;
    const shortCode = nanoid(6);

    const link = await Link.create({
      originalUrl,
      shortCode,
      remarks,
      userId: req.user._id,
      expiredAt: expiredAt || null,
    });
    res.status(201).json({ message: "Link created!", link });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Short Link
exports.updateShortLink = async (req, res) => {
  try {
    const { originalUrl, remarks, expiredAt } = req.body;

    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    link.originalUrl = originalUrl;
    link.remarks = remarks;
    link.expiredAt = expiredAt;

    await link.save();

    res.status(200).json({ message: "Link updated!", link });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get one short link details
exports.getShortLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Short Link
exports.deleteShortLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    await LinkAccess.deleteMany({ linkId: link._id });

    await Link.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Link deleted!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

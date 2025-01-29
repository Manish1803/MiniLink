const auth = require("../middleware/auth");
const linkController = require("./../controllers/linkControllers");

const express = require("express");
const router = express.Router();

// Get Information
router.get("/dashboard", auth, linkController.getAnalyticsSummary);
router.get("/links", auth, linkController.getAllLinks);
router.get("/analytics", auth, linkController.getAnalytics);

// Short Link
router.post("/link", auth, linkController.createLink);
router.get("/link/:id", auth, linkController.getShortLink);
router.patch("/link/:id", auth, linkController.updateShortLink);
router.delete("/link/:id", auth, linkController.deleteShortLink);

module.exports = router;

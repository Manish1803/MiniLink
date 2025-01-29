const express = require("express");
const authController = require("../controllers/authControllers");
const auth = require("../middleware/auth");

const router = express.Router();

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);

// Profile
router.get("/profile", auth, authController.getProfile);
router.patch("/profile", auth, authController.updateProfile);

// Delete Account
router.delete("/delete", auth, authController.deleteAccount);

module.exports = router;

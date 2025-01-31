const User = require("./../models/User");
const BlacklistedToken = require("./../models/BlacklistedToken");
const jwt = require("jsonwebtoken");
const Link = require("../models/Link");
const LinkAccess = require("../models/LinkAccess");

exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already registered"
            : "Mobile number already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
      confirmPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Registration successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await BlacklistedToken.create({ token });
    res.json({
      message: "Logout successful. See you again soon!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Logout failed",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user._id;
  try {
    const userLinks = await Link.find({ userId });
    const linkIds = userLinks.map((link) => link._id);
    await LinkAccess.deleteMany({ linkId: { $in: linkIds } });

    await Link.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({
      message: "Your account has been successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Account deletion failed",
    });
  }
};

exports.getProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      mobile: req.user.mobile,
    },
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const updates = {};

    if (email || mobile) {
      const query = { _id: { $ne: req.user._id } };
      if (email) query.email = email;
      if (mobile) query.mobile = mobile;

      const existingUser = await User.findOne(query);
      if (existingUser) {
        return res.status(400).json({
          message:
            existingUser.email === email
              ? "Email already registered"
              : "Mobile number already registered",
        });
      }
    }

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (mobile) updates.mobile = mobile;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res.json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Profile update failed",
    });
  }
};

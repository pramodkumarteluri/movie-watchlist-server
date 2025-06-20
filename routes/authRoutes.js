const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

// Register route
router.post("https://movie-wishlist-server.onrender.com/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1d",
    });

    res.status(201).json({ token, username: newUser.username, email: newUser.email });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1d",
    });

    res.json({ token, email: user.email });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
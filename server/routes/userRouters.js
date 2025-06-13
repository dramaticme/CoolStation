// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// --- REGISTER ---
router.post("/register", async (req, res) => {
  let {
    firstname,
    middlename,
    lastname,
    dob,
    city,
    country,
    bio,
    username,
    password,
  } = req.body;

  // Trim values
  firstname = firstname.trim();
  middlename = middlename?.trim();
  lastname = lastname.trim();
  dob = dob.trim();
  city = city.trim();
  country = country.trim();
  bio = bio.trim();

  if (/\s/.test(username)) {
    return res.status(400).json({ error: "Username must not contain spaces" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      middlename,
      lastname,
      dob,
      city,
      country,
      bio,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Something went wrong during registration." });
  }
});


// --- LOGIN ---
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Incorrect password" });

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});


// --- GET PROFILE BY ID ---
router.get("/:id", async (req, res) => {
  try {
    console.log("GET /:id called with ID:", req.params.id); // ✅ Add this
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
});


// --- UPDATE PROFILE ---
router.put("/:id", async (req, res) => {
  try {
    const updateFields = { ...req.body };
    delete updateFields.password; // Prevent direct password updates

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

module.exports = router;

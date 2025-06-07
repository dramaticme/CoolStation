const express = require("express");
const router = express.Router();
const DidYouKnow = require("../models/DidYouKnow");

// Middleware to parse JSON (make sure your main server file has this too)
router.use(express.json());  // Usually this is in your main app.js, not here, but just a reminder

// POST a new fact
router.post("/add", async (req, res) => {
  console.log("Request body received:", req.body);  // <-- Add this line

  try {
    const { title, content, username, userId } = req.body;

    if (!title || !content || !username || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newFact = new DidYouKnow({
      title,
      content,
      username,
      userId,
    });

    await newFact.save();
    res.status(201).json({ message: "Fact added!", fact: newFact });
  } catch (err) {
    res.status(500).json({ message: "Failed to add fact", error: err.message });
  }
});


// GET all facts, sorted newest first
router.get("/all", async (req, res) => {
  try {
    const posts = await DidYouKnow.find().sort({ postedAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching facts:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

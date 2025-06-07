const express = require("express");
const router = express.Router();
const DidYouKnow = require("../models/DidYouKnow");

// POST a new fact
router.post("/add", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new DidYouKnow({
      title,
      content,
      userId,   // store userId if you want to link
      username, // store username so you can show who posted it
      postedAt: new Date()
    });

    await newPost.save();

    res.status(201).json({ message: "Fact added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add fact" });
  }
});

// GET all posts
router.get("/all", async (req, res) => {
  try {
    const posts = await DidYouKnow.find().sort({ postedAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("CoolStation backend is running!");
});

const didYouKnowRoutes = require("./routes/DidYouKnowRoutes");
app.use("/api/didyouknow", didYouKnowRoutes);

const userRoutes = require("./routes/userRouters");
app.use("/api/users", userRoutes);

// ✅ Clean MongoDB Connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Handlers
app.use('/auth', require('./routes/authRoutes'));
app.use("/api/movies", require("./routes/movieRoutes"));

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.get("/", (req, res) => {
  res.send("<h1>Movie Watchlist App Running..</h1>");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
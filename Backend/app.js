// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes =  require("./routes/authRoutes")
 
const airoute = require("./routes/aiRoutes")


const bodyParser = require('body-parser'); 
const app = express();
app.use(express.json()); // Required to parse JSON body
app.use(express.urlencoded({ extended: true })); // Optional, for URL-encoded data




// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Adjust based on frontend URL
    credentials: true
  }));
  app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes ); 
app.use("/api/ai", airoute);

app.get("/hi", (req, res) => {
    res.send("Hello, World!");
});
// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

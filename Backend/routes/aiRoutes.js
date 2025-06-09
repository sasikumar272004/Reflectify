const express = require("express");
const app = express();
const emotionController = require("../controllers/emotionController")
const expenseController = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Emotion (Behavior Analysis) Route
router.post("/emotion",protect, emotionController.analyzeEmotion);


// Expense Tracking Route
router.post("/expense", protect, expenseController.expenses);

module.exports = router;

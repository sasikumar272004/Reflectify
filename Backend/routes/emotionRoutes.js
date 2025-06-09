// routes/emotionRoutes.js
const express = require("express");
const { addEmotion, getEmotions } = require("../controllers/emotionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addEmotion);
router.get("/", protect, getEmotions);

module.exports = router;

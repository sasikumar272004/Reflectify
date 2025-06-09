const mongoose = require("mongoose");

const EmotionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String,  },
    userprompt: { type: String, required: true },
    aiscore: { type: Number, required: true },
    aianalysis: { type: String, },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emotion", EmotionSchema);

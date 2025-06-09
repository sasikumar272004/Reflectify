 // controllers/aiController.js
const { generateEmotionContent } = require("../services/ai.api");
const Emotion = require("../models/Emotion"); // ✅ Correct import

// Controller for behavior analysis / emotion endpoint
module.exports.analyzeEmotion = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await generateEmotionContent(prompt);
    const responseLines = response.split("\n");
    const data = {};

    responseLines.forEach((line) => {
      if (line.startsWith("Mood:")) data.mood = line.replace("Mood:", "").trim();
      if (line.startsWith("Score:")) data.aiscore = parseInt(line.replace("Score:", "").trim());
      if (line.startsWith("Behavior Analysis:")) data.aianalysis = line.replace("Behavior Analysis:", "").trim();
      if (line.startsWith("Mood Changer:")) data.moodchanger = line.replace("Mood Changer:", "").trim();
    });

    // ✅ Ensure userId is retrieved from req.user
    const newEmotion = new Emotion({
      user: req.user._id, // ✅ Corrected user ID retrieval
      mood: data.mood,
      userprompt: prompt,
      aiscore: data.aiscore,
      aianalysis: data.aianalysis,
    });

    await newEmotion.save();

    res.status(201).json({
      mood: data.mood,
      score: data.aiscore,
      analysis: data.aianalysis,
      moodchanger: data.moodchanger,
      message: "Emotion analysis saved successfully!",
    });
     console.log(res.data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

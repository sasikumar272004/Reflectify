const { generateExpenseContent } = require("../services/ai.api");

// Controller for expense tracking endpoint
module.exports.expenses = async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await generateExpenseContent(prompt);
    const responseLines = response.split("\n");
    const data = {};

    

    return res.send(response)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};